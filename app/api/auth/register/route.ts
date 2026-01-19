// app/api/auth/register/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/bcrypt';
import { createOTP } from '@/lib/auth/otp';
import { sendVerificationEmail } from '@/lib/services/email-service';
import { 
  creerSuccessResponse, 
  creerErrorResponse,
} from '@/lib/types';
import { API_ERROR_CODES } from '@/lib/types/api';
import { validateRegistration } from '@/lib/validation/user-registration-schema';
import type { ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const validation = validateRegistration(body);

    if (!validation.success) {
      const errors: ValidationError[] = validation.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      }));

      return NextResponse.json(
        creerErrorResponse('Validation échouée', API_ERROR_CODES.VALIDATION_ERROR, errors),
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Vérification email unique
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: validatedData.email },
      select: { 
        id: true,
        emailVerifie: true,
        statutCompte: true,
      },
    });

    if (existingUser) {
      // ✅ Si l'utilisateur existe mais n'a jamais vérifié son email
      if (!existingUser.emailVerifie && existingUser.statutCompte === 'EN_ATTENTE_VERIFICATION') {
        return NextResponse.json(
          creerErrorResponse(
            'Un compte existe déjà avec cet email mais n\'est pas vérifié. Veuillez vérifier votre boîte email ou demander un nouveau code.',
            API_ERROR_CODES.ACCOUNT_NOT_VERIFIED,
            [{
              field: 'email',
              message: 'Compte non vérifié',
              code: 'ALREADY_EXISTS',
            }]
          ),
          { status: 409 }
        );
      }

      return NextResponse.json(
        creerErrorResponse(
          'Cet email est déjà utilisé',
          API_ERROR_CODES.EMAIL_ALREADY_EXISTS,
          [{
            field: 'email',
            message: 'Cet email est déjà associé à un compte',
            code: 'ALREADY_EXISTS',
          }]
        ),
        { status: 409 }
      );
    }

    // Création du compte utilisateur
    const hashedPassword = await hashPassword(validatedData.motDePasse);

    const utilisateur = await prisma.utilisateur.create({
      data: {
        email: validatedData.email,
        motDePasse: hashedPassword,
        prenom: validatedData.prenom,
        nom: validatedData.nom,
        telephone: validatedData.telephone,
        pays: validatedData.pays,
        ville: validatedData.ville,
        langue: 'fr',
        typeUtilisateur: 'VISITEUR',
        statutCompte: 'EN_ATTENTE_VERIFICATION',
        emailVerifie: false,
        accepteNewsletter: validatedData.accepteNewsletter ?? false,
        accepteNotifications: true,
        notificationsSMS: false,
      },
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        dateCreation: true,
      },
    });

    // Génération et envoi du code de vérification
    const otp = await createOTP({
      utilisateurId: utilisateur.id,
      type: 'VERIFICATION_EMAIL',
      destinataire: utilisateur.email,
      metadata: {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        operation: 'registration',
      },
    });

    await sendVerificationEmail({
      destinataire: utilisateur.email,
      code: otp.code,
      prenomUtilisateur: utilisateur.prenom,
      otpId: otp.otpId,
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: utilisateur.id,
        action: 'INSCRIPTION',
        entite: 'Utilisateur',
        entiteId: utilisateur.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({
        message: 'Inscription réussie. Un code de vérification a été envoyé à votre email.',
        utilisateur: {
          id: utilisateur.id,
          email: utilisateur.email,
          prenom: utilisateur.prenom,
          nom: utilisateur.nom,
        },
        requiresVerification: true,
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          creerErrorResponse(
            'Cet email est déjà utilisé',
            API_ERROR_CODES.EMAIL_ALREADY_EXISTS
          ),
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      creerErrorResponse(
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
        API_ERROR_CODES.INTERNAL_ERROR
      ),
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
    },
  });
}