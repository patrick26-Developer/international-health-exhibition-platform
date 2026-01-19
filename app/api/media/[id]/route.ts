import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateUpdateMedia } from '@/lib/validation/media-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError, TypeMedia } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/media/[id]
 * Récupérer un média spécifique
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    const media = await prisma.media.findUnique({
      where: { id: params.id },
      include: {
        auteur: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true,
            photoProfil: true
          }
        },
        edition: {
          select: {
            id: true,
            nom: true,
            slug: true,
            ville: true,
            pays: true
          }
        }
      }
    });

    if (!media) {
      return NextResponse.json(
        creerErrorResponse('Média non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier les permissions d'accès
    if (!media.estPublic) {
      if (!session) {
        return NextResponse.json(
          creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
          { status: 401 }
        );
      }

      if (session.sub !== media.auteurId && !isAdmin(session.typeUtilisateur)) {
        return NextResponse.json(
          creerErrorResponse('Accès interdit', 'FORBIDDEN'),
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      creerSuccessResponse(media)
    );
  } catch (error) {
    console.error('Erreur récupération média:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/media/[id]
 * Mettre à jour un média
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation
    const validation = validateUpdateMedia(body);
    
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

    const updateData = validation.data!;

    // Récupérer le média existant
    const existingMedia = await prisma.media.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        auteurId: true,
        titre: true,
        typeMedia: true
      }
    });

    if (!existingMedia) {
      return NextResponse.json(
        creerErrorResponse('Média non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier les permissions
    if (existingMedia.auteurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé à modifier ce média', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Préparer les données de mise à jour avec le bon type
    const dataToUpdate: any = {
      dateModification: new Date()
    };

    if (updateData.titre !== undefined) dataToUpdate.titre = updateData.titre;
    if (updateData.description !== undefined) dataToUpdate.description = updateData.description || null;
    if (updateData.typeMedia !== undefined) dataToUpdate.typeMedia = updateData.typeMedia;
    if (updateData.miniature !== undefined) dataToUpdate.miniature = updateData.miniature || null;
    if (updateData.estPublic !== undefined) dataToUpdate.estPublic = updateData.estPublic;

    // Mettre à jour le média
    const updatedMedia = await prisma.media.update({
      where: { id: params.id },
      data: dataToUpdate,
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
        action: 'MODIFICATION',
        entite: 'Media',
        entiteId: updatedMedia.id,
        modifications: {
          avant: existingMedia,
          apres: updatedMedia
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(updatedMedia, 'Média mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour média:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/media/[id]
 * Supprimer un média
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Récupérer le média
    const media = await prisma.media.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        auteurId: true,
        titre: true,
        url: true
      }
    });

    if (!media) {
      return NextResponse.json(
        creerErrorResponse('Média non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier les permissions
    if (media.auteurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé à supprimer ce média', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // TODO: Supprimer le fichier du stockage ici
    
    // Supprimer le média de la base
    await prisma.media.delete({
      where: { id: params.id }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Media',
        entiteId: params.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Média supprimé avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression média:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}