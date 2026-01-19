// types/exposant.ts
/**
 * Types strictement typés pour les Exposants
 * Cohérent avec le schéma Prisma
 */

import type {
  Exposant as PrismaExposant,
  Utilisateur as PrismaUtilisateur,
  Edition as PrismaEdition,
} from '../generated/prisma/client';

// ============================================
// TYPES DE BASE EXPOSANT
// ============================================

/**
 * Exposant complet (depuis DB)
 */
export type ExposantComplet = PrismaExposant;

/**
 * Exposant avec relations
 */
export interface ExposantAvecRelations extends PrismaExposant {
  readonly utilisateur: PrismaUtilisateur;
  readonly edition: PrismaEdition;
}

/**
 * Exposant public (pour affichage)
 */
export interface ExposantPublic {
  readonly id: string;
  readonly nomOrganisation: string;
  readonly typeOrganisation: string;
  readonly secteurActivite: string;
  readonly description: string | null;
  readonly logo: string | null;
  readonly siteWeb: string | null;
  readonly emplacementStand: string | null;
  readonly numeroStand: string | null;
}

/**
 * Exposant pour liste/catalogue
 */
export interface ExposantListe {
  readonly id: string;
  readonly nomOrganisation: string;
  readonly typeOrganisation: string;
  readonly secteurActivite: string;
  readonly logo: string | null;
  readonly numeroStand: string | null;
}

// ============================================
// TYPES POUR CRÉATION/MISE À JOUR
// ============================================

/**
 * Données pour créer un profil exposant
 */
export interface CreateExposantDTO {
  readonly utilisateurId: string;
  readonly editionId: string;
  readonly nomOrganisation: string;
  readonly typeOrganisation: string;
  readonly secteurActivite: string;
  readonly description?: string;
  readonly logo?: string;
  readonly siteWeb?: string;
  readonly personneContact?: string;
  readonly emailContact?: string;
  readonly telephoneContact?: string;
}

/**
 * Données pour mettre à jour un exposant
 */
export interface UpdateExposantDTO {
  readonly nomOrganisation?: string;
  readonly typeOrganisation?: string;
  readonly secteurActivite?: string;
  readonly description?: string;
  readonly logo?: string;
  readonly siteWeb?: string;
  readonly personneContact?: string;
  readonly emailContact?: string;
  readonly telephoneContact?: string;
  readonly emplacementStand?: string;
  readonly numeroStand?: string;
}

/**
 * Données pour approuver un exposant
 */
export interface ApprouverExposantDTO {
  readonly exposantId: string;
  readonly emplacementStand?: string;
  readonly numeroStand?: string;
  readonly emailNotification?: boolean;
}

/**
 * Données pour refuser un exposant
 */
export interface RefuserExposantDTO {
  readonly exposantId: string;
  readonly motifRefus: string;
  readonly emailNotification?: boolean;
}

// ============================================
// TYPES POUR STAND
// ============================================

/**
 * Informations de stand
 */
export interface InformationsStand {
  readonly emplacement: string;
  readonly numero: string;
  readonly surface?: number; // en m²
  readonly equipements?: readonly string[];
  readonly acces?: string;
}

/**
 * Demande d'attribution de stand
 */
export interface DemandeAttributionStand {
  readonly exposantId: string;
  readonly emplacementSouhaite?: string;
  readonly besoinsSpecifiques?: readonly string[];
  readonly surfaceRequise?: number;
}

// ============================================
// TYPES STATISTIQUES
// ============================================

/**
 * Statistiques exposants
 */
export interface StatistiquesExposants {
  readonly total: number;
  readonly parTypeOrganisation: Record<string, number>;
  readonly parSecteurActivite: Record<string, number>;
  readonly parStatut: {
    readonly enAttente: number;
    readonly approuves: number;
    readonly refuses: number;
  };
  readonly parEdition: Record<string, number>;
  readonly tauxApprobation: number; // pourcentage
}

/**
 * Profil secteur d'activité
 */
export interface ProfilSecteur {
  readonly secteur: string;
  readonly nombreExposants: number;
  readonly pourcentage: number;
  readonly exposantsPrincipaux: readonly ExposantListe[];
}

// ============================================
// TYPES FILTRES
// ============================================

/**
 * Filtres pour recherche d'exposants
 */
export interface FiltresExposant {
  readonly editionId?: string;
  readonly typeOrganisation?: string | readonly string[];
  readonly secteurActivite?: string | readonly string[];
  readonly statut?: string | readonly string[];
  readonly recherche?: string; // Recherche texte libre
  readonly avecStand?: boolean;
}

/**
 * Tri des exposants
 */
export interface TriExposant {
  readonly champ: 'nomOrganisation' | 'secteurActivite' | 'dateCreation' | 'numeroStand';
  readonly ordre: 'asc' | 'desc';
}

// ============================================
// TYPES CATALOGUE
// ============================================

/**
 * Exposant pour catalogue public
 */
export interface ExposantCatalogue {
  readonly id: string;
  readonly nomOrganisation: string;
  readonly typeOrganisation: string;
  readonly secteurActivite: string;
  readonly description: string | null;
  readonly logo: string | null;
  readonly siteWeb: string | null;
  readonly numeroStand: string | null;
  readonly contacts: ContactsExposant | null;
}

/**
 * Contacts exposant (pour catalogue)
 */
export interface ContactsExposant {
  readonly email: string | null;
  readonly telephone: string | null;
  readonly siteWeb: string | null;
}

/**
 * Catégorie d'exposants
 */
export interface CategorieExposants {
  readonly categorie: string;
  readonly exposants: readonly ExposantCatalogue[];
  readonly total: number;
}

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si l'exposant est approuvé (administrativement)
 */
export function estExposantApprouve(
  exposant: Pick<PrismaExposant, 'statut'>
): boolean {
  return exposant.statut === 'APPROUVE';
}

/**
 * Vérifie si l'exposant est en attente d'approbation
 */
export function estExposantEnAttente(
  exposant: Pick<PrismaExposant, 'statut'>
): boolean {
  return exposant.statut === 'EN_ATTENTE';
}

/**
 * Vérifie si l'exposant a été refusé
 */
export function estExposantRefuse(
  exposant: Pick<PrismaExposant, 'statut'>
): boolean {
  return exposant.statut === 'REFUSE';
}

/**
 * Vérifie si l'exposant a un stand attribué
 */
export function aStandAttribue(
  exposant: Pick<PrismaExposant, 'numeroStand' | 'emplacementStand'>
): boolean {
  return exposant.numeroStand !== null && exposant.emplacementStand !== null;
}