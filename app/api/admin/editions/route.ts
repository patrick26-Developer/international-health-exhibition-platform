// app/api/admin/editions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { createEditionSchema } from '@/lib/validation/edition-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const search = searchParams.get('search');
    const statut = searchParams.get('statut');
    const pays = searchParams.get('pays');
    const ville = searchParams.get('ville');
    const annee = searchParams.get('annee');
    
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { ville: { contains: search, mode: 'insensitive' } },
        { pays: { contains: search, mode: 'insensitive' } },
        { thematique: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (statut) {
      where.statut = statut;
    }

    if (pays) {
      where.pays = pays;
    }

    if (ville) {
      where.ville = ville;
    }

    if (annee) {
      const startDate = new Date(`${annee}-01-01`);
      const endDate = new Date(`${annee}-12-31`);
      where.dateDebut = {
        gte: startDate,
        lte: endDate
      };
    }

    const [editions, total] = await Promise.all([
      prisma.edition.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              inscriptions: true,
              exposants: true,
              benevoles: true,
              programmes: true,
              medias: true
            }
          }
        },
        orderBy: { dateCreation: 'desc' }
      }),
      prisma.edition.count({ where })
    ]);

    return NextResponse.json(
      creerSuccessResponse({
        items: editions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      })
    );
  } catch (error) {
    console.error('Erreur récupération éditions admin:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validation
    const validation = createEditionSchema.safeParse(body);
    
    if (!validation.success) {
      const errors: ValidationError[] = validation.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      }));

      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Vérifier si le slug existe déjà
    const existingEdition = await prisma.edition.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingEdition) {
      return NextResponse.json(
        creerErrorResponse('Une édition avec ce slug existe déjà', 'CONFLICT'),
        { status: 409 }
      );
    }

    const edition = await prisma.edition.create({
      data: {
        nom: validatedData.nom,
        slug: validatedData.slug,
        ville: validatedData.ville,
        pays: validatedData.pays,
        lieu: validatedData.lieu,
        dateDebut: new Date(validatedData.dateDebut),
        dateFin: new Date(validatedData.dateFin),
        dateFinInscriptions: validatedData.dateFinInscriptions ? new Date(validatedData.dateFinInscriptions) : null,
        description: validatedData.description,
        thematique: validatedData.thematique,
        capaciteEstimeeVisiteurs: validatedData.capaciteEstimeeVisiteurs,
        capaciteEstimeeExposants: validatedData.capaciteEstimeeExposants,
        capaciteEstimeeBenevoles: validatedData.capaciteEstimeeBenevoles,
        siteWeb: validatedData.siteWeb,
        emailContact: validatedData.emailContact,
        telephoneContact: validatedData.telephoneContact,
        estPublique: validatedData.estPublique ?? true
      }
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
      creerSuccessResponse(edition, 'Édition créée avec succès'),
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