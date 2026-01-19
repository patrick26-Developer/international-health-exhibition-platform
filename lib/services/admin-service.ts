// lib/services/admin-service.ts
// lib/services/admin-service.ts
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/bcrypt';
import type { 
  TypeUtilisateur, 
  StatutCompte,
  StatutInscription,
  Prisma 
} from '@/lib/generated/prisma/client';

export interface AdminDashboardStats {
  utilisateurs: {
    total: number;
    actifs: number;
    enAttente: number;
    parType: Record<TypeUtilisateur, number>;
  };
  editions: {
    total: number;
    enCours: number;
    planifiees: number;
    terminees: number;
  };
  inscriptions: {
    total: number;
    enAttente: number;
    validees: number;
    parType: Record<string, number>;
  };
  alertes: Array<{
    type: 'warning' | 'error' | 'info';
    titre: string;
    message: string;
    date: Date;
  }>;
}

export class AdminService {
  /**
   * Tableau de bord admin
   */
  static async getDashboard(): Promise<AdminDashboardStats> {
    const [
      totalUtilisateurs,
      utilisateursActifs,
      utilisateursEnAttente,
      utilisateursParType,
      totalEditions,
      editionsEnCours,
      editionsPlanifiees,
      editionsTerminees,
      totalInscriptions,
      inscriptionsEnAttente,
      inscriptionsValidees,
      inscriptionsParType,
    ] = await Promise.all([
      // Utilisateurs
      prisma.utilisateur.count(),
      prisma.utilisateur.count({ where: { statutCompte: 'ACTIF' } }),
      prisma.utilisateur.count({ where: { statutCompte: 'EN_ATTENTE_VERIFICATION' } }),
      prisma.utilisateur.groupBy({
        by: ['typeUtilisateur'],
        _count: { id: true },
      }),

      // Éditions
      prisma.edition.count(),
      prisma.edition.count({ where: { statut: 'EN_COURS' } }),
      prisma.edition.count({ where: { statut: 'PLANIFIEE' } }),
      prisma.edition.count({ where: { statut: 'TERMINEE' } }),

      // Inscriptions
      prisma.inscription.count(),
      prisma.inscription.count({ where: { statut: 'EN_ATTENTE' } }),
      prisma.inscription.count({ where: { statut: 'VALIDEE' } }),
      prisma.inscription.groupBy({
        by: ['typeInscription'],
        _count: { id: true },
      }),
    ]);

    // Formater utilisateurs par type
    const parType: any = {
      SUPER_ADMIN: 0,
      ADMIN: 0,
      PARTENAIRE: 0,
      EXPOSANT: 0,
      BENEVOLE: 0,
      VISITEUR: 0,
      MEDIA: 0,
    };
    utilisateursParType.forEach((item) => {
      parType[item.typeUtilisateur] = item._count.id;
    });

    // Formater inscriptions par type
    const inscriptionsParTypeFormatted: Record<string, number> = {};
    inscriptionsParType.forEach((item) => {
      inscriptionsParTypeFormatted[item.typeInscription] = item._count.id;
    });

    // Générer des alertes
    const alertes: AdminDashboardStats['alertes'] = [];

    if (utilisateursEnAttente > 10) {
      alertes.push({
        type: 'warning',
        titre: 'Vérifications en attente',
        message: `${utilisateursEnAttente} utilisateurs en attente de vérification email`,
        date: new Date(),
      });
    }

    if (inscriptionsEnAttente > 50) {
      alertes.push({
        type: 'warning',
        titre: 'Inscriptions en attente',
        message: `${inscriptionsEnAttente} inscriptions en attente de validation`,
        date: new Date(),
      });
    }

    return {
      utilisateurs: {
        total: totalUtilisateurs,
        actifs: utilisateursActifs,
        enAttente: utilisateursEnAttente,
        parType,
      },
      editions: {
        total: totalEditions,
        enCours: editionsEnCours,
        planifiees: editionsPlanifiees,
        terminees: editionsTerminees,
      },
      inscriptions: {
        total: totalInscriptions,
        enAttente: inscriptionsEnAttente,
        validees: inscriptionsValidees,
        parType: inscriptionsParTypeFormatted,
      },
      alertes,
    };
  }

  /**
   * Créer un utilisateur (admin)
   */
  static async createUser(data: {
    email: string;
    motDePasse: string;
    prenom: string;
    nom: string;
    typeUtilisateur: TypeUtilisateur;
    emailVerifie?: boolean;
  }) {
    const hashedPassword = await hashPassword(data.motDePasse);

    return await prisma.utilisateur.create({
      data: {
        email: data.email.toLowerCase(),
        motDePasse: hashedPassword,
        prenom: data.prenom,
        nom: data.nom,
        typeUtilisateur: data.typeUtilisateur,
        emailVerifie: data.emailVerifie ?? false,
        statutCompte: data.emailVerifie ? 'ACTIF' : 'EN_ATTENTE_VERIFICATION',
      },
    });
  }

  /**
   * Mettre à jour le statut d'un utilisateur
   */
  static async updateUserStatus(
    userId: string,
    statutCompte: StatutCompte
  ) {
    return await prisma.utilisateur.update({
      where: { id: userId },
      data: { statutCompte, dateModification: new Date() },
    });
  }

  /**
   * Valider une inscription
   */
  static async validerInscription(
    inscriptionId: string,
    commentaire?: string
  ) {
    return await prisma.inscription.update({
      where: { id: inscriptionId },
      data: {
        statut: 'VALIDEE',
        dateValidation: new Date(),
        commentaire,
      },
    });
  }

  /**
   * Refuser une inscription
   */
  static async refuserInscription(
    inscriptionId: string,
    commentaire: string
  ) {
    return await prisma.inscription.update({
      where: { id: inscriptionId },
      data: {
        statut: 'REFUSEE',
        commentaire,
      },
    });
  }

  /**
   * Obtenir les statistiques détaillées d'une édition
   */
  static async getEditionStatistics(editionId: string) {
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
        where: { id: editionId },
        include: { bilan: true },
      }),
      prisma.inscription.count({ where: { editionId } }),
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
      prisma.exposant.count({ where: { editionId } }),
      prisma.benevole.count({ where: { editionId } }),
      prisma.programmeEdition.count({ where: { editionId } }),
    ]);

    if (!edition) {
      throw new Error('Édition non trouvée');
    }

    const inscriptionsParTypeFormatted: Record<string, number> = {};
    inscriptionsParType.forEach((item) => {
      inscriptionsParTypeFormatted[item.typeInscription] = item._count.id;
    });

    const inscriptionsParStatutFormatted: Record<string, number> = {};
    inscriptionsParStatut.forEach((item) => {
      inscriptionsParStatutFormatted[item.statut] = item._count.id;
    });

    return {
      edition: {
        id: edition.id,
        nom: edition.nom,
        dateDebut: edition.dateDebut,
        dateFin: edition.dateFin,
        statut: edition.statut,
      },
      inscriptions: {
        total: totalInscriptions,
        parType: inscriptionsParTypeFormatted,
        parStatut: inscriptionsParStatutFormatted,
      },
      exposants,
      benevoles,
      programmes,
      bilan: edition.bilan,
    };
  }

  /**
   * Exporter les données
   */
  static async exportData(type: 'users' | 'inscriptions' | 'editions') {
    switch (type) {
      case 'users':
        return await prisma.utilisateur.findMany({
          select: {
            email: true,
            prenom: true,
            nom: true,
            typeUtilisateur: true,
            statutCompte: true,
            dateCreation: true,
          },
        });

      case 'inscriptions':
        return await prisma.inscription.findMany({
          include: {
            utilisateur: {
              select: { email: true, prenom: true, nom: true },
            },
            edition: {
              select: { nom: true, dateDebut: true },
            },
          },
        });

      case 'editions':
        return await prisma.edition.findMany({
          include: {
            _count: {
              select: {
                inscriptions: true,
                exposants: true,
                benevoles: true,
              },
            },
          },
        });

      default:
        throw new Error('Type d\'export invalide');
    }
  }
}