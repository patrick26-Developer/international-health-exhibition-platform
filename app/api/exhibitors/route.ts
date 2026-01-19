// app/api/exhibitors/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse, creerPaginatedResponse } from '@/lib/types';
import { validateCreateExposant } from '@/lib/validation/exhibitor-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import type { Prisma } from '@/lib/generated/prisma/client';

/**
 * GET /api/exhibitors
 * Liste des exposants
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const editionId = searchParams.get('editionId');
    const statut = searchParams.get('statut');
    const secteur = searchParams.get('secteur');
    
    const skip = (page - 1) * limit;
    
    // ✅ Construction correcte des filtres avec le type Prisma
    const where: Prisma.ExposantWhereInput = {};
    
    if (editionId) {
      where.editionId = editionId;
    }
    
    if (statut) {
      where.statut = statut;
    }
    
    if (secteur) {
      where.secteurActivite = { contains: secteur, mode: 'insensitive' };
    }

    const [exposants, total] = await Promise.all([
      prisma.exposant.findMany({
        where,
        skip,
        take: limit,
        include: {
          utilisateur: {
            select: {
              id: true,
              email: true,
              prenom: true,
              nom: true,
              telephone: true,
            },
          },
          edition: {
            select: {
              id: true,
              nom: true,
              dateDebut: true,
              dateFin: true,
            },
          },
        },
        orderBy: { dateCreation: 'desc' },
      }),
      prisma.exposant.count({ where }),
    ]);

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(exposants, total, { page, limit })
      )
    );
  } catch (error) {
    console.error('Erreur récupération exposants:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/exhibitors
 * Créer un profil exposant
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non authentifié', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation
    let exposantData;
    try {
      exposantData = validateCreateExposant(body);
    } catch (error: any) {
      const errors: ValidationError[] = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      })) || [];
      
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Vérifier permissions
    if (exposantData.utilisateurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Vérifier doublon
    const exposantExistant = await prisma.exposant.findUnique({
      where: {
        utilisateurId_editionId: {
          utilisateurId: exposantData.utilisateurId,
          editionId: exposantData.editionId,
        },
      },
    });

    if (exposantExistant) {
      return NextResponse.json(
        creerErrorResponse('Un profil exposant existe déjà pour cette édition', 'CONFLICT'),
        { status: 409 }
      );
    }

    // Créer le profil exposant
    const exposant = await prisma.exposant.create({
      data: {
        utilisateurId: exposantData.utilisateurId,
        editionId: exposantData.editionId,
        nomOrganisation: exposantData.nomOrganisation,
        typeOrganisation: exposantData.typeOrganisation,
        secteurActivite: exposantData.secteurActivite,
        description: exposantData.description || null,
        logo: exposantData.logo || null,
        siteWeb: exposantData.siteWeb || null,
        personneContact: exposantData.personneContact || null,
        emailContact: exposantData.emailContact || null,
        telephoneContact: exposantData.telephoneContact || null,
        statut: 'EN_ATTENTE',
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
          },
        },
        edition: {
          select: {
            id: true,
            nom: true,
          },
        },
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Exposant',
        entiteId: exposant.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(exposant),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création exposant:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}