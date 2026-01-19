// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createOTP } from '@/lib/auth/otp';
import { sendPasswordResetEmail } from '@/lib/services/email-service';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateEmail } from '@/lib/utils/validators';
import type { MotDePasseOublieRequest, ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: MotDePasseOublieRequest = await request.json();

    // Validation
    const emailError = validateEmail(body.email);
    if (emailError) {
      const errors: ValidationError[] = [emailError];
      return NextResponse.json(
        creerErrorResponse('Email invalide', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!utilisateur) {
      // Ne pas révéler que l'utilisateur n'existe pas (sécurité)
      return NextResponse.json(
        creerSuccessResponse({ message: 'Si cet email existe, vous recevrez un code de réinitialisation' })
      );
    }

    // Vérifier si le compte est actif
    if (utilisateur.statutCompte !== 'ACTIF') {
      return NextResponse.json(
        creerErrorResponse('Ce compte n\'est pas actif', 'ACCOUNT_BLOCKED'),
        { status: 403 }
      );
    }

    // Créer un OTP pour réinitialisation
    const otp = await createOTP({
      utilisateurId: utilisateur.id,
      type: 'REINITIALISATION_MDP',
      destinataire: utilisateur.email,
      metadata: {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        operation: 'password_reset',
      },
    });

    // Envoyer l'email de réinitialisation
    await sendPasswordResetEmail({
      destinataire: utilisateur.email,
      code: otp.code,
      prenomUtilisateur: utilisateur.prenom,
      otpId: otp.otpId,
    });

    // Journaliser la demande
    await prisma.journalAudit.create({
      data: {
        utilisateurId: utilisateur.id,
        action: 'REINITIALISATION_MDP',
        entite: 'Utilisateur',
        entiteId: utilisateur.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Si cet email existe, vous recevrez un code de réinitialisation' })
    );
  } catch (error) {
    console.error('Erreur mot de passe oublié:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}