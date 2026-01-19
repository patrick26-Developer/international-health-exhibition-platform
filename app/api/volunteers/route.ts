// app/api/volunteers/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { safeValidateCreateBenevole } from '@/lib/validation/volunteer-profile-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import type { Prisma } from '@/lib/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: session.sub },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const editionId = searchParams.get('editionId');
    const statut = searchParams.get('statut');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // ✅ Construction correcte des filtres avec le type Prisma
    const where: Prisma.BenevoleWhereInput = {};
    
    if (editionId) {
      where.editionId = editionId;
    }
    
    if (statut) {
      where.statut = statut;
    }

    // Permissions : bénévole voit son profil, admin voit tout
    if (!isAdmin(utilisateur.typeUtilisateur)) {
      where.utilisateurId = utilisateur.id;
    }

    const [benevoles, total] = await Promise.all([
      prisma.benevole.findMany({
        where,
        include: {
          utilisateur: {
            select: {
              id: true,
              prenom: true,
              nom: true,
              email: true,
              telephone: true,
            },
          },
          edition: {
            select: {
              id: true,
              nom: true,
              ville: true,
              dateDebut: true,
              dateFin: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { dateCreation: 'desc' },
      }),
      prisma.benevole.count({ where }),
    ]);

    const formattedBenevoles = benevoles.map(benevole => ({
      id: benevole.id,
      competences: benevole.competences,
      disponibilites: benevole.disponibilites,
      tachesPreferees: benevole.tachesPreferees,
      experience: benevole.experience,
      motivation: benevole.motivation,
      missionsAssignees: benevole.missionsAssignees,
      statut: benevole.statut,
      dateCreation: benevole.dateCreation,
      utilisateur: benevole.utilisateur,
      edition: benevole.edition,
    }));

    return NextResponse.json(
      creerSuccessResponse({
        items: formattedBenevoles,
        total,
        page,
        limit,
      })
    );
  } catch (error) {
    console.error('Erreur récupération bénévoles:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // ✅ Validation avec la fonction safe
    const validationResult = safeValidateCreateBenevole(body);
    
    if (!validationResult.success) {
      const errors: ValidationError[] = validationResult.errors!.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      }));
      
      return NextResponse.json(
        creerErrorResponse(
          'Données invalides',
          'VALIDATION_ERROR',
          errors
        ),
        { status: 400 }
      );
    }

    const data = validationResult.data!;

    // Vérification de sécurité
    if (data.utilisateurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: data.utilisateurId },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier si l'édition existe
    const edition = await prisma.edition.findUnique({
      where: { id: data.editionId },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier doublon
    const existingBenevole = await prisma.benevole.findUnique({
      where: {
        utilisateurId_editionId: {
          utilisateurId: data.utilisateurId,
          editionId: data.editionId,
        },
      },
    });

    if (existingBenevole) {
      return NextResponse.json(
        creerErrorResponse('Déjà inscrit comme bénévole pour cette édition', 'CONFLICT'),
        { status: 409 }
      );
    }

    // Créer le bénévole
    const benevole = await prisma.benevole.create({
      data: {
        utilisateurId: data.utilisateurId,
        editionId: data.editionId,
        competences: data.competences,
        disponibilites: data.disponibilites as Prisma.InputJsonValue,
        tachesPreferees: data.tachesPreferees,
        experience: data.experience,
        motivation: data.motivation,
        statut: 'CANDIDAT',
      },
    });

    // Créer une inscription associée
    await prisma.inscription.create({
      data: {
        utilisateurId: data.utilisateurId,
        editionId: data.editionId,
        typeInscription: 'BENEVOLE',
        statut: 'EN_ATTENTE',
        competences: data.competences,
        disponibilites: data.disponibilites as Prisma.InputJsonValue,
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: data.utilisateurId,
        action: 'CREATION',
        entite: 'Benevole',
        entiteId: benevole.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({
        message: 'Inscription bénévole créée avec succès',
        benevoleId: benevole.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création bénévole:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}