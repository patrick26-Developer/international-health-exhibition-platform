import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { 
  creerSuccessResponse, 
  creerErrorResponse
} from '@/lib/types';
import { validateUploadMedia } from '@/lib/validation/media-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError, TypeMedia } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    const { searchParams } = new URL(request.url);
    const editionId = searchParams.get('editionId');
    const typeMedia = searchParams.get('typeMedia') as TypeMedia | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const estPublicParam = searchParams.get('estPublic');
    
    const skip = (page - 1) * limit;

    // Construire la clause where avec des types stricts
    const where: any = {};

    if (editionId) {
      where.editionId = editionId;
    }

    // Valider que le typeMedia est valide
    const validTypeMediaValues: TypeMedia[] = ['PHOTO', 'VIDEO', 'DOCUMENT', 'COMMUNIQUE_PRESSE', 'INFOGRAPHIE', 'RAPPORT'];
    if (typeMedia && validTypeMediaValues.includes(typeMedia)) {
      where.typeMedia = typeMedia;
    }

    if (estPublicParam !== null) {
      where.estPublic = estPublicParam === 'true';
    }

    // Si pas admin, montrer seulement les médias publics ou de l'utilisateur
    if (!session || !isAdmin(session.typeUtilisateur)) {
      where.OR = [
        { estPublic: true },
        ...(session ? [{ auteurId: session.sub }] : [])
      ];
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
              email: true
            }
          },
          edition: {
            select: {
              id: true,
              nom: true,
              slug: true
            }
          }
        },
        orderBy: { dateCreation: 'desc' },
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json(
      creerSuccessResponse({
        items: medias,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      })
    );
  } catch (error) {
    console.error('Erreur récupération médias:', error);
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
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Extraire les données du formulaire avec vérifications de type
    const titre = formData.get('titre');
    const description = formData.get('description');
    const typeMedia = formData.get('typeMedia');
    const editionId = formData.get('editionId');
    const estPublic = formData.get('estPublic');
    const file = formData.get('file');

    // Vérifications de base
    if (!titre || typeof titre !== 'string') {
      return NextResponse.json(
        creerErrorResponse('Titre requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    if (!typeMedia || typeof typeMedia !== 'string') {
      return NextResponse.json(
        creerErrorResponse('Type de média requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Valider que le typeMedia est valide
    const validTypeMediaValues: TypeMedia[] = ['PHOTO', 'VIDEO', 'DOCUMENT', 'COMMUNIQUE_PRESSE', 'INFOGRAPHIE', 'RAPPORT'];
    if (!validTypeMediaValues.includes(typeMedia as TypeMedia)) {
      return NextResponse.json(
        creerErrorResponse('Type de média invalide', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        creerErrorResponse('Fichier requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Validation des données
    const validation = validateUploadMedia({
      titre,
      description: typeof description === 'string' ? description : undefined,
      typeMedia: typeMedia as TypeMedia,
      editionId: typeof editionId === 'string' ? editionId : undefined,
      estPublic: estPublic === 'true'
    });

    if (!validation.success) {
      const errors: ValidationError[] = validation.error?.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      })) || [];

      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const validatedData = validation.data!;

    // TODO: Implémenter l'upload vers Cloudinary/S3/local
    // Pour l'instant, on simule l'URL
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uploadUrl = `/uploads/${timestamp}-${safeFilename}`;

    // Création du média en base
    const media = await prisma.media.create({
      data: {
        titre: validatedData.titre,
        description: validatedData.description || null,
        typeMedia: validatedData.typeMedia,
        url: uploadUrl,
        miniature: uploadUrl, // À remplacer par une miniature si image
        auteurId: session.sub,
        editionId: validatedData.editionId || null,
        estPublic: validatedData.estPublic
      },
      include: {
        auteur: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true
          }
        },
        edition: {
          select: {
            id: true,
            nom: true,
            slug: true
          }
        }
      }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Media',
        entiteId: media.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(media, 'Média téléchargé avec succès'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création média:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}