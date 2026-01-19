import prisma from '@/lib/prisma';
import { 
  validateCreateMedia,
  validateUpdateMedia,
  type CreateMediaInput, 
  type UpdateMediaInput
} from '@/lib/validation/media-schema';
import type { TypeMedia } from '@/lib/generated/prisma/client';

export class MediaService {
  /**
   * Récupérer tous les médias avec pagination et filtres
   */
  static async getMedias(options: {
    editionId?: string;
    typeMedia?: TypeMedia;
    estPublic?: boolean;
    page?: number;
    limit?: number;
    userId?: string;
  }) {
    const {
      editionId,
      typeMedia,
      estPublic,
      page = 1,
      limit = 10,
      userId
    } = options;

    const skip = (page - 1) * limit;

    // Construire la clause where avec des types stricts
    const where: {
      editionId?: string;
      typeMedia?: TypeMedia;
      estPublic?: boolean;
      OR?: Array<{ estPublic: boolean } | { auteurId: string }>;
    } = {};

    if (editionId) {
      where.editionId = editionId;
    }

    if (typeMedia) {
      where.typeMedia = typeMedia;
    }

    if (estPublic !== undefined) {
      where.estPublic = estPublic;
    }
    
    // Si userId est fourni, montrer les médias publics OU les propres médias de l'utilisateur
    if (userId) {
      where.OR = [
        { estPublic: true },
        { auteurId: userId }
      ];
    }

    const [medias, total] = await Promise.all([
      prisma.media.findMany({
        where,
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
              slug: true
            }
          }
        },
        orderBy: { dateCreation: 'desc' },
        skip,
        take: limit
      }),
      prisma.media.count({ where })
    ]);

    return {
      data: medias,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Récupérer un média par ID
   */
  static async getMediaById(id: string, userId?: string) {
    const media = await prisma.media.findUnique({
      where: { id },
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
      throw new Error('Média non trouvé');
    }

    // Vérifier l'accès
    if (!media.estPublic && userId && userId !== media.auteurId) {
      throw new Error('Accès non autorisé');
    }

    return media;
  }

  /**
   * Créer un nouveau média
   */
  static async createMedia(data: CreateMediaInput) {
    const validation = validateCreateMedia(data);
    
    if (!validation.success) {
      throw new Error('Données invalides pour la création du média');
    }

    const validatedData = validation.data;

    return await prisma.media.create({
      data: {
        titre: validatedData.titre,
        description: validatedData.description,
        typeMedia: validatedData.typeMedia,
        url: validatedData.url,
        miniature: validatedData.miniature || validatedData.url,
        auteurId: validatedData.auteurId,
        editionId: validatedData.editionId,
        estPublic: validatedData.estPublic ?? true
      },
      include: {
        auteur: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true
          }
        }
      }
    });
  }

  /**
   * Mettre à jour un média
   */
  static async updateMedia(id: string, data: UpdateMediaInput, userId: string) {
    const validation = validateUpdateMedia(data);
    
    if (!validation.success) {
      throw new Error('Données invalides pour la mise à jour du média');
    }

    const validatedData = validation.data;

    const media = await prisma.media.findUnique({
      where: { id },
      select: { auteurId: true }
    });

    if (!media) {
      throw new Error('Média non trouvé');
    }

    if (media.auteurId !== userId) {
      throw new Error('Vous n\'êtes pas autorisé à modifier ce média');
    }

    // Préparer les données de mise à jour avec les types corrects
    const updateData: any = {
      dateModification: new Date()
    };

    if (validatedData.titre !== undefined) updateData.titre = validatedData.titre;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.typeMedia !== undefined) updateData.typeMedia = validatedData.typeMedia;
    if (validatedData.miniature !== undefined) updateData.miniature = validatedData.miniature;
    if (validatedData.estPublic !== undefined) updateData.estPublic = validatedData.estPublic;

    return await prisma.media.update({
      where: { id },
      data: updateData,
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
  }

  /**
   * Supprimer un média
   */
  static async deleteMedia(id: string, userId: string) {
    const media = await prisma.media.findUnique({
      where: { id },
      select: { auteurId: true, url: true }
    });

    if (!media) {
      throw new Error('Média non trouvé');
    }

    if (media.auteurId !== userId) {
      throw new Error('Vous n\'êtes pas autorisé à supprimer ce média');
    }

    await prisma.media.delete({
      where: { id }
    });

    return { success: true };
  }

  /**
   * Obtenir les statistiques des médias
   */
  static async getMediaStats(editionId?: string) {
    const where: any = {};
    if (editionId) where.editionId = editionId;

    const stats = await prisma.media.groupBy({
      by: ['typeMedia'],
      where,
      _count: {
        id: true
      }
    });

    const total = await prisma.media.count({ where });

    return {
      stats: stats.map(stat => ({
        typeMedia: stat.typeMedia,
        count: stat._count.id
      })),
      total
    };
  }

  /**
   * Obtenir la galerie média d'une édition
   */
  static async getGalerieMedia(editionId: string) {
    const medias = await prisma.media.findMany({
      where: {
        editionId,
        estPublic: true
      },
      include: {
        auteur: {
          select: {
            id: true,
            prenom: true,
            nom: true
          }
        }
      },
      orderBy: { dateCreation: 'desc' }
    });

    return {
      photos: medias.filter(m => m.typeMedia === 'PHOTO'),
      videos: medias.filter(m => m.typeMedia === 'VIDEO'),
      documents: medias.filter(m => m.typeMedia === 'DOCUMENT' || m.typeMedia === 'RAPPORT'),
      total: medias.length
    };
  }
}