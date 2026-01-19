// app/api/programs/route.ts - CORRECTION FINALE AVEC Prisma.NullableJsonNullValueInput
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse, creerPaginatedResponse } from '@/lib/types';
import { safeValidateCreateProgramme } from '@/lib/validation/program-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import { Prisma } from '@/lib/generated/prisma/client';

/**
 * GET /api/programs
 * Liste des programmes avec filtres et pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const editionId = searchParams.get('editionId');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;

    const where: Prisma.ProgrammeEditionWhereInput = {};

    if (editionId) {
      where.editionId = editionId;
    }

    if (type) {
      where.type = type as any;
    }

    if (search) {
      where.OR = [
        { titre: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { lieu: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const [programmes, total] = await Promise.all([
      prisma.programmeEdition.findMany({
        where,
        skip,
        take: limit,
        include: {
          edition: {
            select: {
              id: true,
              nom: true,
              ville: true,
              pays: true,
            },
          },
        },
        orderBy: { dateDebut: 'asc' },
      }),
      prisma.programmeEdition.count({ where }),
    ]);

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(programmes, total, { page, limit })
      )
    );
  } catch (error) {
    console.error('Erreur récupération programmes:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/programs
 * Créer un nouveau programme (admin seulement)
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

    if (!isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validation
    const validation = safeValidateCreateProgramme(body);
    
    if (!validation.success) {
      const errors: ValidationError[] = validation.errors!.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      }));
      
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Vérifier que l'édition existe
    const edition = await prisma.edition.findUnique({
      where: { id: data.editionId },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // ✅ CORRECTION : Utilisation correcte de Prisma.NullableJsonNullValueInput
    const intervenantsJson = data.intervenants 
      ? (data.intervenants as unknown as Prisma.InputJsonValue)
      : Prisma.JsonNull;

    // Créer le programme
    const programme = await prisma.programmeEdition.create({
      data: {
        editionId: data.editionId,
        type: data.type,
        titre: data.titre,
        description: data.description || null,
        dateDebut: data.dateDebut,
        dateFin: data.dateFin,
        lieu: data.lieu || null,
        intervenants: intervenantsJson,
        maxParticipants: data.maxParticipants || null,
      },
      include: {
        edition: {
          select: {
            id: true,
            nom: true,
            ville: true,
          },
        },
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'ProgrammeEdition',
        entiteId: programme.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(programme, 'Programme créé avec succès'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création programme:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2003') {
        return NextResponse.json(
          creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}