// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOTP } from '@/lib/auth/otp';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateEmail, validateOTP } from '@/lib/utils/validators';
import type { VerifierOTPRequest, ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: VerifierOTPRequest = await request.json();

    // Validation
    const errors: ValidationError[] = [];
    
    const emailError = validateEmail(body.email);
    if (emailError) errors.push(emailError);

    const otpError = validateOTP(body.code);
    if (otpError) errors.push(otpError);

    if (!body.type) {
      errors.push({
        field: 'type',
        message: 'Le type d\'OTP est requis',
        code: 'REQUIRED',
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier l'OTP
    const result = await verifyOTP({
      utilisateurId: utilisateur.id,
      code: body.code,
      type: body.type,
    });

    if (!result.success) {
      return NextResponse.json(
        creerErrorResponse(result.error || 'Code invalide', 'OTP_INVALID'),
        { status: 400 }
      );
    }

    // Déterminer l'action suivante selon le type
    let nextStep: string | undefined;
    
    switch (body.type) {
      case 'VERIFICATION_EMAIL':
        // Activer le compte
        await prisma.utilisateur.update({
          where: { id: utilisateur.id },
          data: {
            emailVerifie: true,
            dateVerificationEmail: new Date(),
            statutCompte: 'ACTIF',
          },
        });
        nextStep = 'complete_registration';
        break;
        
      case 'REINITIALISATION_MDP':
        nextStep = 'reset_password';
        break;
        
      case 'CHANGEMENT_EMAIL':
        nextStep = 'change_email';
        break;
        
      case 'SUPPRESSION_COMPTE':
        nextStep = 'delete_account';
        break;
    }

    // Journaliser la vérification
    await prisma.journalAudit.create({
      data: {
        utilisateurId: utilisateur.id,
        action: 'VERIFICATION_EMAIL',
        entite: 'OTP',
        entiteId: result.otpId,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({
        message: 'Code vérifié avec succès',
        nextStep,
      })
    );
  } catch (error) {
    console.error('Erreur vérification OTP:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}