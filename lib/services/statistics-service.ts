// lib/services/statistics-service.ts
// lib/services/statistics-service.ts
import prisma from '@/lib/prisma';
import type { PeriodeAdmin, PeriodeTendance } from '@/lib/types/statistics';

export interface GlobalStatistics {
  totalUtilisateurs: number;
  totalEditions: number;
  totalInscriptions: number;
  utilisateursActifs: number;
  editionsEnCours: number;
  inscriptionsEnAttente: number;
}

export interface TrendData {
  date: string;
  valeur: number;
}

export class StatisticsService {
  /**
   * Obtenir les statistiques globales
   */
  static async getGlobalStats(): Promise<GlobalStatistics> {
    const date30jours = new Date();
    date30jours.setDate(date30jours.getDate() - 30);

    const [
      totalUtilisateurs,
      totalEditions,
      totalInscriptions,
      utilisateursActifs,
      editionsEnCours,
      inscriptionsEnAttente,
    ] = await Promise.all([
      prisma.utilisateur.count(),
      prisma.edition.count(),
      prisma.inscription.count(),
      prisma.utilisateur.count({
        where: {
          derniereConnexion: { gte: date30jours },
        },
      }),
      prisma.edition.count({
        where: { statut: 'EN_COURS' },
      }),
      prisma.inscription.count({
        where: { statut: 'EN_ATTENTE' },
      }),
    ]);

    return {
      totalUtilisateurs,
      totalEditions,
      totalInscriptions,
      utilisateursActifs,
      editionsEnCours,
      inscriptionsEnAttente,
    };
  }

  /**
   * Calculer la date de début selon la période
   */
  private static getStartDate(periode: PeriodeAdmin): Date {
    const now = new Date();
    const start = new Date();

    switch (periode) {
      case '7jours':
        start.setDate(now.getDate() - 7);
        break;
      case '30jours':
        start.setDate(now.getDate() - 30);
        break;
      case '90jours':
        start.setDate(now.getDate() - 90);
        break;
      case 'annee':
        start.setFullYear(now.getFullYear() - 1);
        break;
      default:
        start.setDate(now.getDate() - 30);
    }

    return start;
  }

  /**
   * Tendances d'inscriptions
   */
  static async getInscriptionTrends(params?: {
    editionId?: string;
    periode?: PeriodeTendance;
  }): Promise<TrendData[]> {
    const { editionId, periode = 'mois' } = params || {};

    const where: any = {};
    if (editionId) where.editionId = editionId;

    // Déterminer le format de date selon la période
    let dateFormat: string;
    let startDate = new Date();

    switch (periode) {
      case 'jour':
        dateFormat = '%Y-%m-%d';
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'semaine':
        dateFormat = '%Y-W%V';
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'mois':
        dateFormat = '%Y-%m';
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case 'annee':
        dateFormat = '%Y';
        startDate.setFullYear(startDate.getFullYear() - 5);
        break;
      default:
        dateFormat = '%Y-%m';
        startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Requête raw SQL pour les tendances
    const trends = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT 
        TO_CHAR("dateInscription", ${dateFormat}) as date,
        COUNT(*) as count
      FROM "inscriptions"
      WHERE "dateInscription" >= ${startDate}
      ${editionId ? prisma.$queryRaw`AND "editionId" = ${editionId}` : prisma.$queryRaw``}
      GROUP BY TO_CHAR("dateInscription", ${dateFormat})
      ORDER BY date DESC
      LIMIT 50
    `;

    return trends.map((t) => ({
      date: t.date,
      valeur: Number(t.count),
    }));
  }

  /**
   * Statistiques par édition
   */
  static async getEditionStats(editionId: string) {
    const [
      edition,
      inscriptionsParType,
      inscriptionsParStatut,
      exposantsParStatut,
      benevolesParStatut,
      programmes,
    ] = await Promise.all([
      prisma.edition.findUnique({
        where: { id: editionId },
        include: { bilan: true },
      }),
      prisma.inscription.groupBy({
        by: ['typeInscription'],
        where: { editionId },
        _count: { id: true },
      }),
      prisma.inscription.groupBy({
        by: ['statut'],
        where: { editionId },
        _count: { id: true },
      }),
      prisma.exposant.groupBy({
        by: ['statut'],
        where: { editionId },
        _count: { id: true },
      }),
      prisma.benevole.groupBy({
        by: ['statut'],
        where: { editionId },
        _count: { id: true },
      }),
      prisma.programmeEdition.count({ where: { editionId } }),
    ]);

    if (!edition) {
      throw new Error('Édition non trouvée');
    }

    return {
      edition,
      inscriptions: {
        parType: inscriptionsParType.reduce((acc, item) => {
          acc[item.typeInscription] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        parStatut: inscriptionsParStatut.reduce((acc, item) => {
          acc[item.statut] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      },
      exposants: {
        parStatut: exposantsParStatut.reduce((acc, item) => {
          acc[item.statut] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      },
      benevoles: {
        parStatut: benevolesParStatut.reduce((acc, item) => {
          acc[item.statut] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      },
      programmes,
    };
  }

  /**
   * Statistiques utilisateur (pour un utilisateur normal)
   */
  static async getUserStats(userId: string) {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: {
            inscriptions: true,
            exposants: true,
            benevoles: true,
          },
        },
        inscriptions: {
          select: {
            id: true,
            typeInscription: true,
            statut: true,
            dateInscription: true,
            edition: {
              select: {
                id: true,
                nom: true,
                ville: true,
                dateDebut: true,
                dateFin: true,
              },
            },
          },
          orderBy: { dateInscription: 'desc' },
          take: 10,
        },
        exposants: {
          select: {
            id: true,
            nomOrganisation: true,
            statut: true,
            edition: {
              select: { nom: true },
            },
          },
          take: 10,
        },
        benevoles: {
          select: {
            id: true,
            statut: true,
            edition: {
              select: { nom: true },
            },
          },
          take: 10,
        },
      },
    });

    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }

    return {
      totalInscriptions: utilisateur._count.inscriptions,
      totalExposants: utilisateur._count.exposants,
      totalBenevoles: utilisateur._count.benevoles,
      inscriptions: utilisateur.inscriptions,
      exposants: utilisateur.exposants,
      benevoles: utilisateur.benevoles,
    };
  }
}