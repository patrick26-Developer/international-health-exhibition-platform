// app/api/editions/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse, creerPaginatedResponse } from '@/lib/types';
import { validateCreateEdition } from '@/lib/validation/edition-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError, EditionPublique } from '@/lib/types';
import type { Prisma } from '@/lib/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const statut = searchParams.get('statut');
    const pays = searchParams.get('pays');
    const ville = searchParams.get('ville');
    const estPublique = searchParams.get('estPublique');
    
    const skip = (page - 1) * limit;
    
    // ✅ Construction correcte des filtres avec le type Prisma
    const where: Prisma.EditionWhereInput = {};
    
    if (statut) {
      where.statut = statut as any;
    }
    
    if (pays) {
      where.pays = { contains: pays, mode: 'insensitive' };
    }
    
    if (ville) {
      where.ville = { contains: ville, mode: 'insensitive' };
    }
    
    if (estPublique !== null) {
      where.estPublique = estPublique === 'true';
    }
    
    where.estArchivee = false;

    const [editions, total] = await Promise.all([
      prisma.edition.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateDebut: 'desc' },
        select: {
          id: true,
          nom: true,
          slug: true,
          ville: true,
          pays: true,
          lieu: true,
          dateDebut: true,
          dateFin: true,
          description: true,
          thematique: true,
          statut: true,
          siteWeb: true,
          emailContact: true,
          telephoneContact: true,
          estPublique: true,
        },
      }),
      prisma.edition.count({ where }),
    ]);

    const editionsPubliques: EditionPublique[] = editions;

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(editionsPubliques, total, { page, limit })
      )
    );
  } catch (error) {
    console.error('Erreur récupération éditions:', error);
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
        creerErrorResponse('Non authentifié', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    if (!isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès refusé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();

    // ✅ Validation avec fonction qui retourne les bons noms de champs
    let editionData;
    try {
      editionData = validateCreateEdition(body);
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

    // Vérifier unicité du slug
    const existingEdition = await prisma.edition.findUnique({
      where: { slug: editionData.slug },
    });

    if (existingEdition) {
      return NextResponse.json(
        creerErrorResponse('Ce slug est déjà utilisé', 'CONFLICT'),
        { status: 409 }
      );
    }

    // ✅ Création avec les bons noms de champs Prisma
    const edition = await prisma.edition.create({
      data: {
        nom: editionData.nom,
        slug: editionData.slug,
        ville: editionData.ville,
        pays: editionData.pays,
        lieu: editionData.lieu || null,
        dateDebut: editionData.dateDebut,
        dateFin: editionData.dateFin,
        dateFinInscriptions: editionData.dateFinInscriptions || null,
        description: editionData.description || null,
        thematique: editionData.thematique || null,
        capaciteEstimeeVisiteurs: editionData.capaciteEstimeeVisiteurs || null,
        capaciteEstimeeExposants: editionData.capaciteEstimeeExposants || null,
        capaciteEstimeeBenevoles: editionData.capaciteEstimeeBenevoles || null,
        siteWeb: editionData.siteWeb || null,
        emailContact: editionData.emailContact || null,
        telephoneContact: editionData.telephoneContact || null,
        estPublique: editionData.estPublique ?? true,
        statut: 'PLANIFIEE',
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Edition',
        entiteId: edition.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(edition),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création édition:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}