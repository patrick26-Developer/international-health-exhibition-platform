// lib/services/edition-service.ts - COMPLET ET COHÉRENT AVEC PRISMA
import prisma from '@/lib/prisma';
import type { 
  StatutEdition,
  Edition,
  Prisma 
} from '@/lib/generated/prisma/client';

export interface CreateEditionInput {
  nom: string;
  slug: string;
  ville: string;
  pays: string;
  lieu?: string;
  dateDebut: Date;
  dateFin: Date;
  dateFinInscriptions?: Date;
  description?: string;
  thematique?: string;
  capaciteEstimeeVisiteurs?: number;
  capaciteEstimeeExposants?: number;
  capaciteEstimeeBenevoles?: number;
  siteWeb?: string;
  emailContact?: string;
  telephoneContact?: string;
  estPublique?: boolean;
}

export interface UpdateEditionInput {
  nom?: string;
  slug?: string;
  ville?: string;
  pays?: string;
  lieu?: string;
  dateDebut?: Date;
  dateFin?: Date;
  dateFinInscriptions?: Date;
  description?: string;
  thematique?: string;
  statut?: StatutEdition;
  capaciteEstimeeVisiteurs?: number;
  capaciteEstimeeExposants?: number;
  capaciteEstimeeBenevoles?: number;
  siteWeb?: string;
  emailContact?: string;
  telephoneContact?: string;
  estPublique?: boolean;
}

export class EditionService {
  /**
   * Créer une édition
   */
  static async create(data: CreateEditionInput): Promise<Edition> {
    // Vérifier unicité du slug
    const existing = await prisma.edition.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new Error('Ce slug est déjà utilisé');
    }

    return await prisma.edition.create({
      data: {
        nom: data.nom,
        slug: data.slug,
        ville: data.ville,
        pays: data.pays,
        lieu: data.lieu || null,
        dateDebut: data.dateDebut,
        dateFin: data.dateFin,
        dateFinInscriptions: data.dateFinInscriptions || null,
        description: data.description || null,
        thematique: data.thematique || null,
        capaciteEstimeeVisiteurs: data.capaciteEstimeeVisiteurs || null,
        capaciteEstimeeExposants: data.capaciteEstimeeExposants || null,
        capaciteEstimeeBenevoles: data.capaciteEstimeeBenevoles || null,
        siteWeb: data.siteWeb || null,
        emailContact: data.emailContact || null,
        telephoneContact: data.telephoneContact || null,
        estPublique: data.estPublique ?? true,
        statut: 'PLANIFIEE',
      },
    });
  }

  /**
   * Mettre à jour une édition
   */
  static async update(id: string, data: UpdateEditionInput): Promise<Edition> {
    // Vérifier existence
    const existing = await prisma.edition.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error('Édition non trouvée');
    }

    // Vérifier unicité du slug si changé
    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.edition.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists) {
        throw new Error('Ce slug est déjà utilisé');
      }
    }

    // Préparer les données de mise à jour
    const updateData: Prisma.EditionUpdateInput = {
      dateModification: new Date(),
    };

    if (data.nom !== undefined) updateData.nom = data.nom;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.ville !== undefined) updateData.ville = data.ville;
    if (data.pays !== undefined) updateData.pays = data.pays;
    if (data.lieu !== undefined) updateData.lieu = data.lieu;
    if (data.dateDebut !== undefined) updateData.dateDebut = data.dateDebut;
    if (data.dateFin !== undefined) updateData.dateFin = data.dateFin;
    if (data.dateFinInscriptions !== undefined) updateData.dateFinInscriptions = data.dateFinInscriptions;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.thematique !== undefined) updateData.thematique = data.thematique;
    if (data.statut !== undefined) updateData.statut = data.statut;
    if (data.capaciteEstimeeVisiteurs !== undefined) updateData.capaciteEstimeeVisiteurs = data.capaciteEstimeeVisiteurs;
    if (data.capaciteEstimeeExposants !== undefined) updateData.capaciteEstimeeExposants = data.capaciteEstimeeExposants;
    if (data.capaciteEstimeeBenevoles !== undefined) updateData.capaciteEstimeeBenevoles = data.capaciteEstimeeBenevoles;
    if (data.siteWeb !== undefined) updateData.siteWeb = data.siteWeb;
    if (data.emailContact !== undefined) updateData.emailContact = data.emailContact;
    if (data.telephoneContact !== undefined) updateData.telephoneContact = data.telephoneContact;
    if (data.estPublique !== undefined) updateData.estPublique = data.estPublique;

    return await prisma.edition.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Récupérer une édition par ID
   */
  static async getById(id: string) {
    const edition = await prisma.edition.findUnique({
      where: { id },
      include: {
        inscriptions: {
          select: {
            id: true,
            typeInscription: true,
            statut: true,
          },
        },
        programmes: {
          select: {
            id: true,
            type: true,
            titre: true,
            dateDebut: true,
            dateFin: true,
          },
        },
        exposants: {
          where: { statut: 'APPROUVE' },
          select: {
            id: true,
            nomOrganisation: true,
            secteurActivite: true,
          },
        },
        benevoles: {
          where: { statut: 'ACCEPTE' },
          select: {
            id: true,
          },
        },
        bilan: true,
      },
    });

    if (!edition) {
      throw new Error('Édition non trouvée');
    }

    return edition;
  }

  /**
   * Lister les éditions avec filtres
   */
  static async list(params: {
    page?: number;
    limit?: number;
    statut?: StatutEdition;
    pays?: string;
    ville?: string;
    estPublique?: boolean;
  }) {
    const { page = 1, limit = 20, statut, pays, ville, estPublique } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.EditionWhereInput = {
      estArchivee: false,
    };

    if (statut) where.statut = statut;
    if (pays) where.pays = { contains: pays, mode: 'insensitive' };
    if (ville) where.ville = { contains: ville, mode: 'insensitive' };
    if (estPublique !== undefined) where.estPublique = estPublique;

    const [editions, total] = await Promise.all([
      prisma.edition.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateDebut: 'desc' },
      }),
      prisma.edition.count({ where }),
    ]);

    return {
      editions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Supprimer (archiver) une édition
   */
  static async delete(id: string) {
    return await prisma.edition.update({
      where: { id },
      data: {
        estArchivee: true,
        dateModification: new Date(),
      },
    });
  }

  /**
   * Obtenir les statistiques d'une édition
   */
  static async getStatistics(id: string) {
    const [
      edition,
      totalInscriptions,
      inscriptionsParType,
      inscriptionsParStatut,
      exposants,
      benevoles,
      programmes,
    ] = await Promise.all([
      prisma.edition.findUnique({
        where: { id },
        include: { bilan: true },
      }),
      prisma.inscription.count({ where: { editionId: id } }),
      prisma.inscription.groupBy({
        by: ['typeInscription'],
        where: { editionId: id },
        _count: { id: true },
      }),
      prisma.inscription.groupBy({
        by: ['statut'],
        where: { editionId: id },
        _count: { id: true },
      }),
      prisma.exposant.count({ where: { editionId: id } }),
      prisma.benevole.count({ where: { editionId: id } }),
      prisma.programmeEdition.count({ where: { editionId: id } }),
    ]);

    if (!edition) {
      throw new Error('Édition non trouvée');
    }

    return {
      edition,
      inscriptions: {
        total: totalInscriptions,
        parType: inscriptionsParType.reduce((acc, item) => {
          acc[item.typeInscription] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        parStatut: inscriptionsParStatut.reduce((acc, item) => {
          acc[item.statut] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      },
      exposants,
      benevoles,
      programmes,
      bilan: edition.bilan,
    };
  }
}