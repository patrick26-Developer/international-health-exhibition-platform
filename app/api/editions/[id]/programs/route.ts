// app/api/editions/[id]/programs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse, creerPaginatedResponse } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/editions/[id]/programs
 * Récupérer les programmes d'une édition spécifique
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const type = searchParams.get('type');
    
    const skip = (page - 1) * limit;

    // Vérifier que l'édition existe
    const edition = await prisma.edition.findUnique({
      where: { id: params.id },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const where = {
      editionId: params.id,
      ...(type && { type: type as any }),
    };

    const [programmes, total] = await Promise.all([
      prisma.programmeEdition.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateDebut: 'asc' },
        select: {
          id: true,
          type: true,
          titre: true,
          description: true,
          dateDebut: true,
          dateFin: true,
          lieu: true,
          maxParticipants: true,
        },
      }),
      prisma.programmeEdition.count({ where }),
    ]);

    // Formater pour une réponse publique
    const programmesPublic = programmes.map(programme => ({
      ...programme,
      placesDisponibles: programme.maxParticipants 
        ? programme.maxParticipants 
        : null,
    }));

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(programmesPublic, total, { page, limit })
      )
    );
  } catch (error) {
    console.error('Erreur récupération programmes édition:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}