import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse, creerPaginatedResponse } from '@/lib/types';
import type { TypeMedia } from '@/lib/generated/prisma/client';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const typeMedia = searchParams.get('typeMedia') as TypeMedia | null;
    const estPublic = searchParams.get('estPublic');
    
    const skip = (page - 1) * limit;

    const edition = await prisma.edition.findUnique({
      where: { id },
      select: {
        id: true,
        nom: true,
        slug: true,
        estPublique: true,
      },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const where: any = {
      editionId: id,
    };

    const validTypeMediaValues: TypeMedia[] = [
      'PHOTO',
      'VIDEO',
      'DOCUMENT',
      'COMMUNIQUE_PRESSE',
      'INFOGRAPHIE',
      'RAPPORT',
    ];

    if (typeMedia && validTypeMediaValues.includes(typeMedia)) {
      where.typeMedia = typeMedia;
    }

    if (estPublic !== null && estPublic !== undefined) {
      where.estPublic = estPublic === 'true';
    } else {
      where.estPublic = true;
    }

    const [medias, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        include: {
          auteur: {
            select: {
              id: true,
              prenom: true,
              nom: true,
              email: true,
              photoProfil: true,
            },
          },
        },
        orderBy: { dateCreation: 'desc' },
      }),
      prisma.media.count({ where }),
    ]);

    const mediasFormatted = medias.map((media) => ({
      id: media.id,
      titre: media.titre,
      description: media.description,
      typeMedia: media.typeMedia,
      url: media.url,
      miniature: media.miniature,
      estPublic: media.estPublic,
      dateCreation: media.dateCreation,
      auteur: {
        id: media.auteur.id,
        prenom: media.auteur.prenom,
        nom: media.auteur.nom,
        photoProfil: media.auteur.photoProfil,
      },
    }));

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(mediasFormatted, total, { page, limit })
      )
    );
  } catch (error) {
    console.error('Erreur récupération médias édition:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}