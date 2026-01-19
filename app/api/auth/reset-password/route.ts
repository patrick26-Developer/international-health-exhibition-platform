// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/bcrypt';
import { verifyOTP } from '@/lib/auth/otp';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateEmail, validatePassword, validateOTP } from '@/lib/utils/validators';
import type { ReinitialisationMDPRequest, ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ReinitialisationMDPRequest = await request.json();

    // Validation
    const errors: ValidationError[] = [];
    
    const emailError = validateEmail(body.email);
    if (emailError) errors.push(emailError);

    const otpError = validateOTP(body.code);
    if (otpError) errors.push(otpError);

    const passwordErrors = validatePassword(body.nouveauMotDePasse);
    errors.push(...passwordErrors);

    if (body.nouveauMotDePasse !== body.confirmationMotDePasse) {
      errors.push({
        field: 'confirmationMotDePasse',
        message: 'Les mots de passe ne correspondent pas',
        code: 'PATTERN_MISMATCH',
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
      type: 'REINITIALISATION_MDP',
    });

    if (!result.success) {
      return NextResponse.json(
        creerErrorResponse(result.error || 'Code invalide', 'OTP_INVALID'),
        { status: 400 }
      );
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien
    const bcrypt = require('bcryptjs');
    const samePassword = await bcrypt.compare(body.nouveauMotDePasse, utilisateur.motDePasse);
    
    if (samePassword) {
      return NextResponse.json(
        creerErrorResponse('Le nouveau mot de passe doit être différent de l\'ancien', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await hashPassword(body.nouveauMotDePasse);

    // Mettre à jour le mot de passe
    await prisma.utilisateur.update({
      where: { id: utilisateur.id },
      data: {
        motDePasse: hashedPassword,
        tentativesEchouees: 0,
        compteBloqueLe: null,
        dateModification: new Date(),
      },
    });

    // Ajouter à l'historique des mots de passe
    await prisma.historiqueMDP.create({
      data: {
        utilisateurId: utilisateur.id,
        hashMDP: utilisateur.motDePasse, // Ancien hash
      },
    });

    // Journaliser la réinitialisation
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
      creerSuccessResponse({ message: 'Mot de passe réinitialisé avec succès' })
    );
  } catch (error) {
    console.error('Erreur réinitialisation mot de passe:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}