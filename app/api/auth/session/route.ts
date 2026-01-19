// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse, type UtilisateurPublic } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Session invalide', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: session.sub },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier si le compte est actif
    if (utilisateur.statutCompte !== 'ACTIF' || !utilisateur.emailVerifie) {
      return NextResponse.json(
        creerErrorResponse('Compte non activé ou suspendu', 'ACCOUNT_BLOCKED'),
        { status: 403 }
      );
    }

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

    return NextResponse.json(
      creerSuccessResponse({
        utilisateur: utilisateurPublic,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      })
    );
  } catch (error) {
    console.error('Erreur vérification session:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}