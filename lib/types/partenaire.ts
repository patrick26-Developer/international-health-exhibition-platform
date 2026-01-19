// types/partenaire.ts
/**
 * Types strictement typés pour les Partenaires et Sponsors
 * Cohérent avec le schéma Prisma
 */

import type {
  Partenaire as PrismaPartenaire,
  Utilisateur as PrismaUtilisateur,
} from '../generated/prisma/client';

// ============================================
// TYPES DE BASE PARTENAIRE
// ============================================

/**
 * Partenaire complet (depuis DB)
 */
export type PartenaireComplet = PrismaPartenaire;

/**
 * Partenaire avec relations
 */
export interface PartenaireAvecRelations extends PrismaPartenaire {
  readonly utilisateur: PrismaUtilisateur;
}

/**
 * Partenaire public (pour affichage)
 */
export interface PartenairePublic {
  readonly id: string;
  readonly nomOrganisation: string;
  readonly typePartenaire: string;
  readonly niveauPartenariat: string | null;
  readonly description: string | null;
  readonly logo: string | null;
  readonly siteWeb: string | null;
}

// ============================================
// TYPES CATÉGORIES
// ============================================

/**
 * Type de partenaire
 */
export type TypePartenaire = 'SPONSOR' | 'INSTITUTION' | 'MECENE' | 'MEDIA' | 'TECHNIQUE';

/**
 * Niveau de partenariat
 */
export type NiveauPartenariat = 'PLATINE' | 'OR' | 'ARGENT' | 'BRONZE' | 'INSTITUTIONNEL';

// ============================================
// TYPES POUR CRÉATION/MISE À JOUR
// ============================================

/**
 * Données pour créer un partenaire
 */
export interface CreatePartenaireDTO {
  readonly utilisateurId: string;
  readonly nomOrganisation: string;
  readonly typePartenaire: TypePartenaire;
  readonly niveauPartenariat?: NiveauPartenariat;
  readonly description?: string;
  readonly logo?: string;
  readonly siteWeb?: string;
  readonly personneContact?: string;
  readonly emailContact?: string;
  readonly telephoneContact?: string;
  readonly dateDebut?: Date;
  readonly dateFin?: Date;
}

/**
 * Données pour mettre à jour un partenaire
 */
export interface UpdatePartenaireDTO {
  readonly nomOrganisation?: string;
  readonly typePartenaire?: TypePartenaire;
  readonly niveauPartenariat?: NiveauPartenariat;
  readonly description?: string;
  readonly logo?: string;
  readonly siteWeb?: string;
  readonly personneContact?: string;
  readonly emailContact?: string;
  readonly telephoneContact?: string;
  readonly dateDebut?: Date;
  readonly dateFin?: Date;
  readonly afficherSurSite?: boolean;
}

// ============================================
// TYPES VISIBILITÉ & AVANTAGES
// ============================================

/**
 * Avantages par niveau de partenariat
 */
export interface AvantagesPartenariat {
  readonly niveau: NiveauPartenariat;
  readonly visibilite: readonly string[];
  readonly contreparties: readonly string[];
  readonly espacesStand?: {
    readonly surface: number; // m²
    readonly emplacement: 'PREMIUM' | 'STANDARD';
  };
  readonly invitations?: number;
  readonly logoSurSite: boolean;
  readonly logoDansCommunication: boolean;
  readonly mentionDiscours: boolean;
}

/**
 * Package partenariat
 */
export interface PackagePartenariat {
  readonly niveau: NiveauPartenariat;
  readonly tarif: number;
  readonly devise: string;
  readonly avantages: AvantagesPartenariat;
  readonly dureeEngagement: number; // mois
}

// ============================================
// TYPES CONTRAT
// ============================================

/**
 * Informations de contrat
 */
export interface ContratPartenariat {
  readonly partenaireId: string;
  readonly numeroContrat: string;
  readonly dateSignature: Date;
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly montant: number;
  readonly devise: string;
  readonly niveauPartenariat: NiveauPartenariat;
  readonly documentContrat?: string; // URL
  readonly statut: StatutContrat;
}

/**
 * Statut du contrat
 */
export type StatutContrat = 
  | 'EN_NEGOCIATION'
  | 'SIGNE'
  | 'ACTIF'
  | 'EXPIRE'
  | 'RESILIE';

// ============================================
// TYPES STATISTIQUES
// ============================================

/**
 * Statistiques partenaires
 */
export interface StatistiquesPartenaires {
  readonly total: number;
  readonly parType: Record<TypePartenaire, number>;
  readonly parNiveau: Record<NiveauPartenariat, number>;
  readonly partenairesActifs: number;
  readonly valeurTotalePartenariats: number;
  readonly renouvellements: {
    readonly total: number;
    readonly tauxRenouvellement: number; // pourcentage
  };
}

/**
 * Rapport d'activité partenaire
 */
export interface RapportActivitePartenaire {
  readonly partenaireId: string;
  readonly periode: {
    readonly debut: Date;
    readonly fin: Date;
  };
  readonly visibilite: {
    readonly logoAffichages: number;
    readonly visitesProfile: number;
    readonly mentionsCommunication: number;
  };
  readonly retourInvestissement: {
    readonly valeurEstimee: number;
    readonly metriques: Record<string, number>;
  };
}

// ============================================
// TYPES FILTRES
// ============================================

/**
 * Filtres pour recherche de partenaires
 */
export interface FiltresPartenaire {
  readonly typePartenaire?: TypePartenaire | readonly TypePartenaire[];
  readonly niveauPartenariat?: NiveauPartenariat | readonly NiveauPartenariat[];
  readonly actif?: boolean;
  readonly recherche?: string;
}

/**
 * Tri des partenaires
 */
export interface TriPartenaire {
  readonly champ: 'nomOrganisation' | 'niveauPartenariat' | 'dateDebut' | 'dateFin';
  readonly ordre: 'asc' | 'desc';
}

// ============================================
// TYPES CATALOGUE PUBLIC
// ============================================

/**
 * Partenaire pour affichage public
 */
export interface PartenaireCatalogue {
  readonly id: string;
  readonly nomOrganisation: string;
  readonly logo: string | null;
  readonly siteWeb: string | null;
  readonly niveauPartenariat: NiveauPartenariat | null;
  readonly description: string | null;
}

/**
 * Groupe de partenaires par niveau
 */
export interface GroupePartenaires {
  readonly niveau: NiveauPartenariat;
  readonly partenaires: readonly PartenaireCatalogue[];
  readonly total: number;
}

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si le partenariat est actif
 */
export function estPartenaireActif(
  partenaire: Pick<PrismaPartenaire, 'dateDebut' | 'dateFin' | 'afficherSurSite'>
): boolean {
  const maintenant = new Date();
  const debut = partenaire.dateDebut ? new Date(partenaire.dateDebut) : null;
  const fin = partenaire.dateFin ? new Date(partenaire.dateFin) : null;

  if (!debut) return false;
  if (maintenant < debut) return false;
  if (fin && maintenant > fin) return false;
  
  return partenaire.afficherSurSite === true;
}

/**
 * Vérifie si le partenariat arrive à expiration
 */
export function partenaireExpireBientot(
  partenaire: Pick<PrismaPartenaire, 'dateFin'>,
  joursAvant: number = 30
): boolean {
  if (!partenaire.dateFin) return false;
  
  const maintenant = new Date();
  const fin = new Date(partenaire.dateFin);
  const diffJours = Math.ceil((fin.getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffJours > 0 && diffJours <= joursAvant;
}