// app/api/auth/verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOTP } from '@/lib/auth/otp';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateEmail, validateOTP } from '@/lib/utils/validators';
import type { VerificationEmailRequest, ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: VerificationEmailRequest = await request.json();

    // Validation
    const emailError = validateEmail(body.email);
    if (emailError) {
      const errors: ValidationError[] = [emailError];
      return NextResponse.json(
        creerErrorResponse('Email invalide', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const otpError = validateOTP(body.code);
    if (otpError) {
      const errors: ValidationError[] = [otpError];
      return NextResponse.json(
        creerErrorResponse('Code invalide', 'VALIDATION_ERROR', errors),
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

    if (utilisateur.emailVerifie) {
      return NextResponse.json(
        creerErrorResponse('Email déjà vérifié', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Vérifier l'OTP
    const result = await verifyOTP({
      utilisateurId: utilisateur.id,
      code: body.code,
      type: 'VERIFICATION_EMAIL',
    });

    if (!result.success) {
      return NextResponse.json(
        creerErrorResponse(result.error || 'Code invalide', 'OTP_INVALID'),
        { status: 400 }
      );
    }

    // Activer le compte
    await prisma.utilisateur.update({
      where: { id: utilisateur.id },
      data: {
        emailVerifie: true,
        dateVerificationEmail: new Date(),
        statutCompte: 'ACTIF',
        dateModification: new Date(),
      },
    });

    // Journaliser la vérification
    await prisma.journalAudit.create({
      data: {
        utilisateurId: utilisateur.id,
        action: 'VERIFICATION_EMAIL',
        entite: 'Utilisateur',
        entiteId: utilisateur.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Email vérifié avec succès' })
    );
  } catch (error) {
    console.error('Erreur vérification email:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}