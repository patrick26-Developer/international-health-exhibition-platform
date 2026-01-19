// app/api/auth/connexion/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';
import { creerSuccessResponse, creerErrorResponse, type UtilisateurPublic } from '@/lib/types';
import { validateEmail, validatePassword } from '@/lib/utils/validators';
import type { ConnexionRequest, AuthResponse, ValidationError } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ConnexionRequest = await request.json();

    // Validation
    const emailError = validateEmail(body.email);
    if (emailError) {
      const errors: ValidationError[] = [emailError];
      return NextResponse.json(
        creerErrorResponse('Email invalide', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const passwordErrors = validatePassword(body.motDePasse);
    if (passwordErrors.length > 0) {
      return NextResponse.json(
        creerErrorResponse('Mot de passe invalide', 'VALIDATION_ERROR', passwordErrors),
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Email ou mot de passe incorrect', 'INVALID_CREDENTIALS'),
        { status: 401 }
      );
    }

    // Vérifier le statut du compte
    if (utilisateur.statutCompte === 'SUSPENDU' || utilisateur.statutCompte === 'SUPPRIME') {
      return NextResponse.json(
        creerErrorResponse('Compte suspendu ou supprimé', 'ACCOUNT_BLOCKED'),
        { status: 403 }
      );
    }

    if (utilisateur.compteBloqueLe && new Date() < utilisateur.compteBloqueLe) {
      return NextResponse.json(
        creerErrorResponse('Compte temporairement bloqué', 'ACCOUNT_BLOCKED'),
        { status: 403 }
      );
    }

    if (!utilisateur.emailVerifie) {
      return NextResponse.json(
        creerErrorResponse('Email non vérifié', 'ACCOUNT_NOT_VERIFIED'),
        { status: 403 }
      );
    }

    // Vérifier le mot de passe
    const motDePasseValide = await verifyPassword(body.motDePasse, utilisateur.motDePasse);
    
    if (!motDePasseValide) {
      // Incrémenter les tentatives échouées
      const nouvellesTentatives = utilisateur.tentativesEchouees + 1;
      
      await prisma.utilisateur.update({
        where: { id: utilisateur.id },
        data: {
          tentativesEchouees: nouvellesTentatives,
          ...(nouvellesTentatives >= 5 ? {
            compteBloqueLe: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          } : {}),
        },
      });

      // Journaliser la tentative
      await prisma.historiqueConnexion.create({
        data: {
          utilisateurId: utilisateur.id,
          adresseIP: request.headers.get('x-forwarded-for') || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
          reussi: false,
          raisonEchec: 'Mot de passe incorrect',
        },
      });

      return NextResponse.json(
        creerErrorResponse('Email ou mot de passe incorrect', 'INVALID_CREDENTIALS'),
        { status: 401 }
      );
    }

    // Réinitialiser les tentatives échouées
    await prisma.utilisateur.update({
      where: { id: utilisateur.id },
      data: {
        tentativesEchouees: 0,
        compteBloqueLe: null,
        derniereConnexion: new Date(),
        adresseIPConnexion: request.headers.get('x-forwarded-for') || undefined,
        derniereActivite: new Date(),
      },
    });

    // Journaliser la connexion réussie
    await prisma.historiqueConnexion.create({
      data: {
        utilisateurId: utilisateur.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
        reussi: true,
      },
    });

    // Créer les tokens
    const accessToken = signAccessToken({
      sub: utilisateur.id,
      email: utilisateur.email,
      typeUtilisateur: utilisateur.typeUtilisateur,
    });

    const refreshToken = signRefreshToken({
      sub: utilisateur.id,
      email: utilisateur.email,
      typeUtilisateur: utilisateur.typeUtilisateur,
    });

    // Stocker la session
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes

    await prisma.session.create({
      data: {
        utilisateurId: utilisateur.id,
        jeton: accessToken,
        jetonRafraichi: refreshToken,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
        expiresAt,
        estActive: true,
      },
    });

    // Définir les cookies
    const cookieStore = await cookies();
    
    cookieStore.set('sis_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    if (body.seSouvenir) {
      cookieStore.set('sis_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 jours
        path: '/',
      });
    }

    // Préparer la réponse
    const utilisateurPublic: UtilisateurPublic = {
      id: utilisateur.id,
      email: utilisateur.email,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      telephone: utilisateur.telephone,
      pays: utilisateur.pays,
      ville: utilisateur.ville,
      adresse: utilisateur.adresse,
      codePostal: utilisateur.codePostal,
      langue: utilisateur.langue,
      typeUtilisateur: utilisateur.typeUtilisateur,
      statutCompte: utilisateur.statutCompte,
      emailVerifie: utilisateur.emailVerifie,
      dateVerificationEmail: utilisateur.dateVerificationEmail,
      derniereConnexion: utilisateur.derniereConnexion,
      adresseIPConnexion: utilisateur.adresseIPConnexion,
      photoProfil: utilisateur.photoProfil,
      biographie: utilisateur.biographie,
      siteWeb: utilisateur.siteWeb,
      organisation: utilisateur.organisation,
      poste: utilisateur.poste,
      reseauxSociaux: utilisateur.reseauxSociaux as Record<string, string> | null,
      accepteNewsletter: utilisateur.accepteNewsletter,
      accepteNotifications: utilisateur.accepteNotifications,
      notificationsSMS: utilisateur.notificationsSMS,
      dateCreation: utilisateur.dateCreation,
      dateModification: utilisateur.dateModification,
      dateSuppression: utilisateur.dateSuppression,
      derniereActivite: utilisateur.derniereActivite,
    };

    const authResponse: AuthResponse = {
      success: true,
      utilisateur: utilisateurPublic,
      jeton: accessToken,
      jetonRafraichi: refreshToken,
      expiresAt,
      message: 'Connexion réussie',
    };

    return NextResponse.json(creerSuccessResponse(authResponse));
  } catch (error) {
    console.error('Erreur connexion:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}