// lib/types/edition.ts - CORRIGÉ (conforme au schéma Prisma)
import type {
  StatutEdition,
  Edition as PrismaEdition,
  BilanEdition as PrismaBilanEdition,
  ProgrammeEdition as PrismaProgrammeEdition,
  Inscription as PrismaInscription,
  Exposant as PrismaExposant,
  Benevole as PrismaBenevole,
  Media as PrismaMedia,
} from '../generated/prisma/client';

// ============================================
// TYPES DE BASE ÉDITION
// ============================================

export type EditionComplete = PrismaEdition;

export interface EditionAvecRelations extends PrismaEdition {
  readonly inscriptions: readonly PrismaInscription[];
  readonly programmes: readonly PrismaProgrammeEdition[];
  readonly exposants: readonly PrismaExposant[];
  readonly benevoles: readonly PrismaBenevole[];
  readonly medias: readonly PrismaMedia[];
  readonly bilan: PrismaBilanEdition | null;
}

export interface EditionPublique {
  readonly id: string;
  readonly nom: string;
  readonly slug: string;
  readonly ville: string;
  readonly pays: string;
  readonly lieu: string | null;
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly description: string | null;
  readonly thematique: string | null;
  readonly statut: StatutEdition;
  readonly siteWeb: string | null;
  readonly emailContact: string | null;
  readonly telephoneContact: string | null;
  readonly estPublique: boolean;
}

export interface EditionResume {
  readonly id: string;
  readonly nom: string;
  readonly slug: string;
  readonly ville: string;
  readonly pays: string;
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly statut: StatutEdition;
  readonly nombreInscrits?: number;
  readonly nombreExposants?: number;
  readonly nombreBenevoles?: number;
}

// ============================================
// TYPES POUR CRÉATION/MISE À JOUR
// ============================================

/**
 * ✅ CORRIGÉ : Noms conformes au schéma Prisma
 */
export interface CreateEditionDTO {
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

/**
 * ✅ CORRIGÉ : Noms conformes au schéma Prisma
 */
export interface UpdateEditionDTO {
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

// ============================================
// TYPES BILAN D'ÉDITION
// ============================================

export type BilanEditionComplet = PrismaBilanEdition;

export interface CreateBilanDTO {
  editionId: string;
  nombreVisiteurs: number;
  nombreExposants: number;
  nombreBenevoles: number;
  actionsSensibilisation: number;
  partenariatsActifs: number;
  retombeesSociales?: string;
  retombeesSanitaires?: string;
  satisfactionMoyenne?: number;
  recommandation?: number;
}

export interface BilanPublic {
  readonly nombreVisiteurs: number;
  readonly nombreExposants: number;
  readonly nombreBenevoles: number;
  readonly actionsSensibilisation: number;
  readonly partenariatsActifs: number;
  readonly satisfactionMoyenne: number | null;
  readonly recommandation: number | null;
}

// ============================================
// TYPES STATISTIQUES ÉDITION
// ============================================

export interface StatistiquesEdition {
  readonly editionId: string;
  readonly totalInscriptions: number;
  readonly inscriptionsParType: {
    readonly visiteurs: number;
    readonly exposants: number;
    readonly benevoles: number;
  };
  readonly inscriptionsParStatut: {
    readonly enAttente: number;
    readonly validees: number;
    readonly refusees: number;
    readonly annulees: number;
  };
  readonly tauxRemplissage: {
    readonly visiteurs: number;
    readonly exposants: number;
    readonly benevoles: number;
  };
  readonly nombreProgrammes: number;
  readonly nombreMedias: number;
}

/**
 * ✅ CORRIGÉ : Noms conformes au schéma Prisma
 */
export interface CapacitesEdition {
  readonly capaciteEstimeeVisiteurs: number | null;
  readonly capaciteEstimeeExposants: number | null;
  readonly capaciteEstimeeBenevoles: number | null;
  readonly visiteurInscrits: number;
  readonly exposantsInscrits: number;
  readonly benevolesInscrits: number;
  readonly estComplet: boolean;
}

// ============================================
// TYPES FILTRES & RECHERCHE
// ============================================

export interface FiltresEdition {
  readonly statut?: StatutEdition | readonly StatutEdition[];
  readonly pays?: string;
  readonly ville?: string;
  readonly annee?: number;
  readonly dateDebutMin?: Date;
  readonly dateDebutMax?: Date;
  readonly estPublique?: boolean;
  readonly estArchivee?: boolean;
}

export interface TriEdition {
  readonly champ: 'nom' | 'dateDebut' | 'dateFin' | 'dateCreation';
  readonly ordre: 'asc' | 'desc';
}

// ============================================
// TYPES GUARDS
// ============================================

export function estEditionEnCours(edition: Pick<PrismaEdition, 'statut'>): boolean {
  return edition.statut === 'EN_COURS';
}

export function estEditionTerminee(edition: Pick<PrismaEdition, 'statut'>): boolean {
  return edition.statut === 'TERMINEE';
}

export function estEditionAVenir(
  edition: Pick<PrismaEdition, 'statut' | 'dateDebut'>
): boolean {
  return (
    edition.statut === 'PLANIFIEE' &&
    new Date(edition.dateDebut) > new Date()
  );
}

export function inscriptionsOuvertes(
  edition: Pick<PrismaEdition, 'statut' | 'dateDebut'>
): boolean {
  return (
    edition.statut === 'INSCRIPTIONS_OUVERTES' ||
    (edition.statut === 'PLANIFIEE' && new Date(edition.dateDebut) > new Date())
  );
}

/**
 * ✅ CORRIGÉ : Utilise les bons noms de champs
 */
export function capaciteAtteinte(
  capacites: CapacitesEdition,
  type: 'visiteurs' | 'exposants' | 'benevoles'
): boolean {
  switch (type) {
    case 'visiteurs':
      return capacites.capaciteEstimeeVisiteurs !== null &&
             capacites.visiteurInscrits >= capacites.capaciteEstimeeVisiteurs;
    case 'exposants':
      return capacites.capaciteEstimeeExposants !== null &&
             capacites.exposantsInscrits >= capacites.capaciteEstimeeExposants;
    case 'benevoles':
      return capacites.capaciteEstimeeBenevoles !== null &&
             capacites.benevolesInscrits >= capacites.capaciteEstimeeBenevoles;
  }
}