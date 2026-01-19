// lib/services/inscription-service.ts
import prisma from '@/lib/prisma';
import { sendEmail } from './email-service';
import type { 
  TypeInscription, 
  StatutInscription,
  Inscription,
  Prisma 
} from '@/lib/generated/prisma/client';

export interface CreateInscriptionInput {
  utilisateurId: string;
  editionId: string;
  typeInscription: TypeInscription;
  centresInteret?: any;
  nomOrganisation?: string;
  secteurActivite?: string;
  competences?: string;
  disponibilites?: any;
}

export class InscriptionService {
  /**
   * Créer une inscription
   */
  static async create(data: CreateInscriptionInput): Promise<Inscription> {
    // Vérifier doublon
    const existing = await prisma.inscription.findUnique({
      where: {
        utilisateurId_editionId_typeInscription: {
          utilisateurId: data.utilisateurId,
          editionId: data.editionId,
          typeInscription: data.typeInscription,
        },
      },
    });

    if (existing) {
      throw new Error('Vous êtes déjà inscrit pour cette édition');
    }

    // Vérifier que l'édition existe et accepte les inscriptions
    const edition = await prisma.edition.findUnique({
      where: { id: data.editionId },
      select: {
        id: true,
        statut: true,
        dateFinInscriptions: true,
      },
    });

    if (!edition) {
      throw new Error('Édition non trouvée');
    }

    if (edition.statut !== 'INSCRIPTIONS_OUVERTES' && edition.statut !== 'PLANIFIEE') {
      throw new Error('Les inscriptions sont fermées pour cette édition');
    }

    if (edition.dateFinInscriptions && new Date() > edition.dateFinInscriptions) {
      throw new Error('La date limite d\'inscription est dépassée');
    }

    // Créer l'inscription
    const dataToCreate: Prisma.InscriptionCreateInput = {
      utilisateur: { connect: { id: data.utilisateurId } },
      edition: { connect: { id: data.editionId } },
      typeInscription: data.typeInscription,
      statut: 'EN_ATTENTE',
    };

    if (data.centresInteret) {
      dataToCreate.centresInteret = data.centresInteret as Prisma.InputJsonValue;
    }

    if (data.nomOrganisation) {
      dataToCreate.nomOrganisation = data.nomOrganisation;
    }

    if (data.secteurActivite) {
      dataToCreate.secteurActivite = data.secteurActivite;
    }

    if (data.competences) {
      dataToCreate.competences = data.competences;
    }

    if (data.disponibilites) {
      dataToCreate.disponibilites = data.disponibilites as Prisma.InputJsonValue;
    }

    return await prisma.inscription.create({
      data: dataToCreate,
      include: {
        utilisateur: {
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
          },
        },
        edition: {
          select: {
            id: true,
            nom: true,
            dateDebut: true,
            dateFin: true,
          },
        },
      },
    });
  }

  /**
   * Valider une inscription
   */
  static async valider(id: string, commentaire?: string): Promise<Inscription> {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: {
        utilisateur: {
          select: {
            email: true,
            prenom: true,
          },
        },
        edition: {
          select: {
            nom: true,
          },
        },
      },
    });

    if (!inscription) {
      throw new Error('Inscription non trouvée');
    }

    const updated = await prisma.inscription.update({
      where: { id },
      data: {
        statut: 'VALIDEE',
        dateValidation: new Date(),
        commentaire,
      },
    });

    // Envoyer email de confirmation
    await sendEmail({
      destinataire: inscription.utilisateur.email,
      type: 'INSCRIPTION_CONFIRMEE',
      sujet: `Inscription confirmée - ${inscription.edition.nom}`,
      contenuHTML: `
        <h2>Inscription confirmée</h2>
        <p>Bonjour ${inscription.utilisateur.prenom},</p>
        <p>Votre inscription en tant que ${inscription.typeInscription} pour l'édition "${inscription.edition.nom}" a été validée.</p>
        ${commentaire ? `<p>Message de l'organisateur : ${commentaire}</p>` : ''}
      `,
      contenuText: `Votre inscription a été confirmée.`,
    });

    return updated;
  }

  /**
   * Refuser une inscription
   */
  static async refuser(id: string, motif: string): Promise<Inscription> {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: {
        utilisateur: {
          select: {
            email: true,
            prenom: true,
          },
        },
        edition: {
          select: {
            nom: true,
          },
        },
      },
    });

    if (!inscription) {
      throw new Error('Inscription non trouvée');
    }

    const updated = await prisma.inscription.update({
      where: { id },
      data: {
        statut: 'REFUSEE',
        commentaire: motif,
      },
    });

    // Envoyer email de refus
    await sendEmail({
      destinataire: inscription.utilisateur.email,
      type: 'INSCRIPTION_REFUSEE',
      sujet: `Inscription non retenue - ${inscription.edition.nom}`,
      contenuHTML: `
        <h2>Inscription non retenue</h2>
        <p>Bonjour ${inscription.utilisateur.prenom},</p>
        <p>Votre inscription pour "${inscription.edition.nom}" n'a malheureusement pas pu être retenue.</p>
        <p>Motif : ${motif}</p>
      `,
      contenuText: `Votre inscription n'a pas été retenue.`,
    });

    return updated;
  }

  /**
   * Annuler une inscription
   */
  static async annuler(id: string, utilisateurId: string, motif: string): Promise<Inscription> {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
    });

    if (!inscription) {
      throw new Error('Inscription non trouvée');
    }

    if (inscription.utilisateurId !== utilisateurId) {
      throw new Error('Non autorisé');
    }

    return await prisma.inscription.update({
      where: { id },
      data: {
        statut: 'ANNULEE',
        commentaire: motif,
      },
    });
  }

  /**
   * Lister les inscriptions avec filtres
   */
  static async list(params: {
    page?: number;
    limit?: number;
    editionId?: string;
    utilisateurId?: string;
    typeInscription?: TypeInscription;
    statut?: StatutInscription;
  }) {
    const { page = 1, limit = 20, editionId, utilisateurId, typeInscription, statut } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.InscriptionWhereInput = {};

    if (editionId) where.editionId = editionId;
    if (utilisateurId) where.utilisateurId = utilisateurId;
    if (typeInscription) where.typeInscription = typeInscription;
    if (statut) where.statut = statut;

    const [inscriptions, total] = await Promise.all([
      prisma.inscription.findMany({
        where,
        skip,
        take: limit,
        include: {
          utilisateur: {
            select: {
              id: true,
              email: true,
              prenom: true,
              nom: true,
              telephone: true,
            },
          },
          edition: {
            select: {
              id: true,
              nom: true,
              dateDebut: true,
              dateFin: true,
              ville: true,
              pays: true,
            },
          },
        },
        orderBy: { dateInscription: 'desc' },
      }),
      prisma.inscription.count({ where }),
    ]);

    return {
      inscriptions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}