// lib/auth/otp.ts

/**
 * Service de génération et vérification des codes OTP
 * Pour : vérification email, réinitialisation MDP, changement email, suppression compte
 */

import prisma from '@/lib/prisma';
import type { TypeOTP, StatutOTP } from '@/lib/types';

const OTP_LENGTH = 6;
const OTP_EXPIRATION_MINUTES = parseInt(process.env.OTP_EXPIRATION_MINUTES || '10', 10);
const OTP_MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '3', 10);

/**
 * Génère un code OTP à 6 chiffres
 */
function generateOTPCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

/**
 * Crée un nouvel OTP pour un utilisateur
 */
export async function createOTP(params: {
  utilisateurId: string;
  type: TypeOTP;
  destinataire: string;
  metadata?: {
    ip: string;
    userAgent: string;
    operation: string;
  };
}): Promise<{
  code: string;
  expiresAt: Date;
  otpId: string;
}> {
  const { utilisateurId, type, destinataire, metadata } = params;

  // Invalider les OTP existants du même type pour cet utilisateur
  await prisma.oTP.updateMany({
    where: {
      utilisateurId,
      type,
      statut: 'EN_ATTENTE',
    },
    data: {
      statut: 'ANNULE',
    },
  });

  // Générer un nouveau code
  const code = generateOTPCode();

  // Calculer la date d'expiration
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRATION_MINUTES);

  // Créer l'OTP en base
  const otp = await prisma.oTP.create({
    data: {
      utilisateurId,
      type,
      code,
      destinataire,
      expiresAt,
      statut: 'EN_ATTENTE',
      tentatives: 0,
      metadata: metadata || {},
    },
  });

  return {
    code,
    expiresAt,
    otpId: otp.id,
  };
}

/**
 * Vérifie un code OTP
 */
export async function verifyOTP(params: {
  utilisateurId: string;
  code: string;
  type: TypeOTP;
}): Promise<{
  success: boolean;
  error?: string;
  otpId?: string;
}> {
  const { utilisateurId, code, type } = params;

  // Rechercher l'OTP
  const otp = await prisma.oTP.findFirst({
    where: {
      utilisateurId,
      type,
      statut: 'EN_ATTENTE',
    },
    orderBy: {
      dateCreation: 'desc',
    },
  });

  // OTP non trouvé
  if (!otp) {
    return {
      success: false,
      error: 'Code invalide ou expiré',
    };
  }

  // OTP expiré
  if (new Date() > otp.expiresAt) {
    await prisma.oTP.update({
      where: { id: otp.id },
      data: { statut: 'EXPIRE' },
    });

    return {
      success: false,
      error: 'Code expiré',
    };
  }

  // Trop de tentatives
  if (otp.tentatives >= OTP_MAX_ATTEMPTS) {
    await prisma.oTP.update({
      where: { id: otp.id },
      data: { statut: 'ANNULE' },
    });

    return {
      success: false,
      error: 'Nombre maximum de tentatives atteint',
    };
  }

  // Code incorrect
  if (otp.code !== code) {
    await prisma.oTP.update({
      where: { id: otp.id },
      data: {
        tentatives: otp.tentatives + 1,
      },
    });

    return {
      success: false,
      error: 'Code incorrect',
    };
  }

  // Code valide
  await prisma.oTP.update({
    where: { id: otp.id },
    data: {
      statut: 'VERIFIE',
      dateUtilisation: new Date(),
    },
  });

  return {
    success: true,
    otpId: otp.id,
  };
}

/**
 * Vérifie si un utilisateur peut recevoir un nouvel OTP
 * (limite de rate limiting)
 */
export async function canSendOTP(params: {
  utilisateurId: string;
  type: TypeOTP;
}): Promise<{
  canSend: boolean;
  remainingTime?: number; // en secondes
}> {
  const { utilisateurId, type } = params;

  // Vérifier s'il existe un OTP récent (< 60 secondes)
  const recentOTP = await prisma.oTP.findFirst({
    where: {
      utilisateurId,
      type,
      dateCreation: {
        gte: new Date(Date.now() - 60000), // 60 secondes
      },
    },
    orderBy: {
      dateCreation: 'desc',
    },
  });

  if (!recentOTP) {
    return { canSend: true };
  }

  const elapsed = Date.now() - recentOTP.dateCreation.getTime();
  const remainingTime = Math.ceil((60000 - elapsed) / 1000);

  return {
    canSend: false,
    remainingTime,
  };
}

/**
 * Nettoie les OTP expirés (à exécuter périodiquement)
 */
export async function cleanExpiredOTPs(): Promise<number> {
  const result = await prisma.oTP.deleteMany({
    where: {
      OR: [
        {
          statut: 'VERIFIE',
          dateUtilisation: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // > 24h
          },
        },
        {
          statut: 'EXPIRE',
          expiresAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // > 24h
          },
        },
        {
          statut: 'ANNULE',
          dateCreation: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // > 24h
          },
        },
      ],
    },
  });

  return result.count;
}