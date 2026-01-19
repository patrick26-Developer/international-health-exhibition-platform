// lib/services/email-service.ts
/**
 * Service d'envoi d'emails via Nodemailer
 * Gère la file d'attente et les templates d'emails
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import prisma from '@/lib/prisma';
import type { TypeEmail } from '@/lib/types';

// Configuration du transporteur SMTP
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Envoie un email de vérification avec OTP
 */
export async function sendVerificationEmail(params: {
  destinataire: string;
  prenomUtilisateur: string;
  code: string;
  otpId: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { destinataire, prenomUtilisateur, code } = params;

  const sujet = 'Vérification de votre compte - S.I.S.';
  
  const contenuHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Bienvenue sur le Salon International de la Santé</h2>
        
        <p>Bonjour ${prenomUtilisateur},</p>
        
        <p>Merci de vous être inscrit(e) au Salon International de la Santé.</p>
        
        <p>Pour activer votre compte, veuillez utiliser le code de vérification suivant :</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${code}</span>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">Ce code est valable pendant 10 minutes.</p>
        
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Cet email a été envoyé par le Salon International de la Santé (S.I.S.)<br>
          © ${new Date().getFullYear()} Tous droits réservés.
        </p>
      </div>
    </body>
    </html>
  `;

  const contenuText = `
Bienvenue sur le Salon International de la Santé

Bonjour ${prenomUtilisateur},

Merci de vous être inscrit(e) au Salon International de la Santé.

Pour activer votre compte, veuillez utiliser le code de vérification suivant :

${code}

Ce code est valable pendant 10 minutes.

Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.

---
Cet email a été envoyé par le Salon International de la Santé (S.I.S.)
© ${new Date().getFullYear()} Tous droits réservés.
  `;

  return await sendEmail({
    destinataire,
    sujet,
    contenuHTML,
    contenuText,
    type: 'VERIFICATION',
    otpId: params.otpId,
  });
}

/**
 * Envoie un email de réinitialisation de mot de passe
 */
export async function sendPasswordResetEmail(params: {
  destinataire: string;
  prenomUtilisateur: string;
  code: string;
  otpId: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { destinataire, prenomUtilisateur, code } = params;

  const sujet = 'Réinitialisation de votre mot de passe - S.I.S.';
  
  const contenuHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Réinitialisation de mot de passe</h2>
        
        <p>Bonjour ${prenomUtilisateur},</p>
        
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        
        <p>Voici votre code de vérification :</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${code}</span>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">Ce code est valable pendant 10 minutes.</p>
        
        <p style="color: #dc2626; font-weight: bold;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et sécuriser votre compte.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Cet email a été envoyé par le Salon International de la Santé (S.I.S.)<br>
          © ${new Date().getFullYear()} Tous droits réservés.
        </p>
      </div>
    </body>
    </html>
  `;

  const contenuText = `
Réinitialisation de mot de passe

Bonjour ${prenomUtilisateur},

Vous avez demandé à réinitialiser votre mot de passe.

Voici votre code de vérification :

${code}

Ce code est valable pendant 10 minutes.

Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et sécuriser votre compte.

---
Cet email a été envoyé par le Salon International de la Santé (S.I.S.)
© ${new Date().getFullYear()} Tous droits réservés.
  `;

  return await sendEmail({
    destinataire,
    sujet,
    contenuHTML,
    contenuText,
    type: 'RESET_PASSWORD',
    otpId: params.otpId,
  });
}

/**
 * Envoie un email (fonction générique)
 */
export async function sendEmail(params: {
  destinataire: string;
  sujet: string;
  contenuHTML: string;
  contenuText: string;
  type: TypeEmail;
  otpId?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { destinataire, sujet, contenuHTML, contenuText, type, otpId } = params;

  // Ajouter à la file d'attente
  const emailQueue = await prisma.fileAttenteEmail.create({
    data: {
      type,
      destinataire,
      sujet,
      contenuHTML,
      contenuText,
      statut: 'EN_ATTENTE',
      tentatives: 0,
      otpId,
    },
  });

  try {
    // Envoyer l'email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: destinataire,
      subject: sujet,
      text: contenuText,
      html: contenuHTML,
    });

    // Mettre à jour le statut
    await prisma.fileAttenteEmail.update({
      where: { id: emailQueue.id },
      data: {
        statut: 'ENVOYE',
        dateEnvoi: new Date(),
        messageId: info.messageId,
      },
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Erreur envoi email:', error);

    // Mettre à jour le statut
    await prisma.fileAttenteEmail.update({
      where: { id: emailQueue.id },
      data: {
        statut: 'ECHEC',
        tentatives: emailQueue.tentatives + 1,
        erreur: error instanceof Error ? error.message : 'Erreur inconnue',
      },
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Email de bienvenue (après vérification)
export async function sendWelcomeEmail(params: {
  destinataire: string;
  prenomUtilisateur: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const sujet = 'Bienvenue sur le Salon International de la Santé';
  
  const contenuHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Bienvenue sur le Salon International de la Santé</h2>
        
        <p>Bonjour ${params.prenomUtilisateur},</p>
        
        <p>Votre compte a été activé avec succès !</p>
        
        <p>Vous pouvez maintenant vous connecter et profiter de toutes les fonctionnalités de notre plateforme.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Accéder à mon tableau de bord
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Cet email a été envoyé par le Salon International de la Santé (S.I.S.)<br>
          © ${new Date().getFullYear()} Tous droits réservés.
        </p>
      </div>
    </body>
    </html>
  `;

  const contenuText = `
Bienvenue sur le Salon International de la Santé

Bonjour ${params.prenomUtilisateur},

Votre compte a été activé avec succès !

Vous pouvez maintenant vous connecter et profiter de toutes les fonctionnalités de notre plateforme.

Accédez à votre tableau de bord : ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

---
Cet email a été envoyé par le Salon International de la Santé (S.I.S.)
© ${new Date().getFullYear()} Tous droits réservés.
  `;

  return await sendEmail({
    destinataire: params.destinataire,
    sujet,
    contenuHTML,
    contenuText,
    type: 'WELCOME',
  });
}