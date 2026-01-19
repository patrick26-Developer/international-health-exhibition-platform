// types/inscription.ts
/**
 * Types strictement typés pour les Inscriptions
 * Cohérent avec le schéma Prisma
 */

import type {
  TypeInscription,
  StatutInscription,
  Inscription as PrismaInscription,
  Utilisateur as PrismaUtilisateur,
  Edition as PrismaEdition,
} from '../generated/prisma/client';

// ============================================
// TYPES DE BASE INSCRIPTION
// ============================================

/**
 * Inscription complète (depuis DB)
 */
export type InscriptionComplete = PrismaInscription;

/**
 * Inscription avec relations
 */
export interface InscriptionAvecRelations extends PrismaInscription {
  readonly utilisateur: PrismaUtilisateur;
  readonly edition: PrismaEdition;
}

/**
 * Inscription publique
 */
export interface InscriptionPublique {
  readonly id: string;
  readonly typeInscription: TypeInscription;
  readonly statut: StatutInscription;
  readonly dateInscription: Date;
  readonly dateValidation: Date | null;
  readonly edition: {
    readonly id: string;
    readonly nom: string;
    readonly ville: string;
    readonly pays: string;
    readonly dateDebut: Date;
    readonly dateFin: Date;
  };
}

// ============================================
// TYPES POUR CRÉATION
// ============================================

/**
 * Données de base pour inscription
 */
export interface InscriptionBaseDTO {
  readonly utilisateurId: string;
  readonly editionId: string;
  readonly typeInscription: TypeInscription;
}

/**
 * Données pour inscription VISITEUR
 */
export interface InscriptionVisiteurDTO extends InscriptionBaseDTO {
  readonly typeInscription: 'VISITEUR';
  readonly centresInteret?: CentresInteret;
}

/**
 * Centres d'intérêt visiteur
 */
export interface CentresInteret {
  readonly sportSante?: boolean;
  readonly nutrition?: boolean;
  readonly bienEtre?: boolean;
  readonly preventionMNT?: boolean;
  readonly santeMentale?: boolean;
  readonly autres?: readonly string[];
}

/**
 * Données pour inscription EXPOSANT
 */
export interface InscriptionExposantDTO extends InscriptionBaseDTO {
  readonly typeInscription: 'EXPOSANT';
  readonly nomOrganisation: string;
  readonly secteurActivite: string;
  readonly typeOrganisation: TypeOrganisation;
  readonly description?: string;
  readonly logo?: string;
  readonly siteWeb?: string;
  readonly personneContact?: string;
  readonly emailContact?: string;
  readonly telephoneContact?: string;
}

/**
 * Type d'organisation exposante
 */
export type TypeOrganisation =
  | 'ENTREPRISE'
  | 'ONG'
  | 'INSTITUTION'
  | 'ASSOCIATION'
  | 'STARTUP';

/**
 * Données pour inscription BÉNÉVOLE
 */
export interface InscriptionBenevoleDTO extends InscriptionBaseDTO {
  readonly typeInscription: 'BENEVOLE';
  readonly competences?: string;
  readonly disponibilites?: Disponibilites;
  readonly tachesPreferees?: string;
  readonly experience?: string;
  readonly motivation?: string;
}

/**
 * Disponibilités bénévole
 */
export interface Disponibilites {
  readonly jours: readonly JourDisponible[];
  readonly creneaux: readonly CreneauHoraire[];
  readonly flexibilite: NiveauFlexibilite;
}

/**
 * Jour disponible
 */
export type JourDisponible =
  | 'LUNDI'
  | 'MARDI'
  | 'MERCREDI'
  | 'JEUDI'
  | 'VENDREDI'
  | 'SAMEDI'
  | 'DIMANCHE';

/**
 * Créneau horaire
 */
export type CreneauHoraire = 'MATIN' | 'APRES_MIDI' | 'SOIR' | 'JOURNEE_COMPLETE';

/**
 * Niveau de flexibilité
 */
export type NiveauFlexibilite = 'FAIBLE' | 'MOYENNE' | 'ELEVEE';

/**
 * Union des types d'inscription
 */
export type CreateInscriptionDTO =
  | InscriptionVisiteurDTO
  | InscriptionExposantDTO
  | InscriptionBenevoleDTO;

// ============================================
// TYPES POUR VALIDATION/REFUS
// ============================================

/**
 * Données pour valider une inscription
 */
export interface ValiderInscriptionDTO {
  readonly inscriptionId: string;
  readonly commentaire?: string;
  readonly emailNotification?: boolean;
}

/**
 * Données pour refuser une inscription
 */
export interface RefuserInscriptionDTO {
  readonly inscriptionId: string;
  readonly motifRefus: string;
  readonly emailNotification?: boolean;
}

/**
 * Données pour annuler une inscription
 */
export interface AnnulerInscriptionDTO {
  readonly inscriptionId: string;
  readonly motifAnnulation: string;
}

// ============================================
// TYPES STATISTIQUES
// ============================================

/**
 * Statistiques des inscriptions
 */
export interface StatistiquesInscriptions {
  readonly total: number;
  readonly parType: Record<TypeInscription, number>;
  readonly parStatut: Record<StatutInscription, number>;
  readonly parEdition: Record<string, number>;
  readonly evolutionMensuelle: readonly EvolutionMensuelle[];
}

/**
 * Évolution mensuelle
 */
export interface EvolutionMensuelle {
  readonly mois: string; // YYYY-MM
  readonly total: number;
  readonly visiteurs: number;
  readonly exposants: number;
  readonly benevoles: number;
}

// ============================================
// TYPES FILTRES
// ============================================

/**
 * Filtres pour recherche d'inscriptions
 */
export interface FiltresInscription {
  readonly editionId?: string;
  readonly typeInscription?: TypeInscription | readonly TypeInscription[];
  readonly statut?: StatutInscription | readonly StatutInscription[];
  readonly utilisateurId?: string;
  readonly dateInscriptionMin?: Date;
  readonly dateInscriptionMax?: Date;
}

/**
 * Tri des inscriptions
 */
export interface TriInscription {
  readonly champ: 'dateInscription' | 'dateValidation' | 'typeInscription' | 'statut';
  readonly ordre: 'asc' | 'desc';
}

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si l'inscription est validée
 */
export function estInscriptionValidee(
  inscription: Pick<PrismaInscription, 'statut'>
): boolean {
  return inscription.statut === 'VALIDEE';
}

/**
 * Vérifie si l'inscription est en attente
 */
export function estInscriptionEnAttente(
  inscription: Pick<PrismaInscription, 'statut'>
): boolean {
  return inscription.statut === 'EN_ATTENTE';
}

/**
 * Vérifie si l'inscription peut être annulée
 */
export function peutAnnulerInscription(
  inscription: Pick<PrismaInscription, 'statut'>
): boolean {
  return inscription.statut === 'EN_ATTENTE' || inscription.statut === 'VALIDEE';
}

/**
 * Type guard pour inscription visiteur
 */
export function estInscriptionVisiteur(
  dto: CreateInscriptionDTO
): dto is InscriptionVisiteurDTO {
  return dto.typeInscription === 'VISITEUR';
}

/**
 * Type guard pour inscription exposant
 */
export function estInscriptionExposant(
  dto: CreateInscriptionDTO
): dto is InscriptionExposantDTO {
  return dto.typeInscription === 'EXPOSANT';
}

/**
 * Type guard pour inscription bénévole
 */
export function estInscriptionBenevole(
  dto: CreateInscriptionDTO
): dto is InscriptionBenevoleDTO {
  return dto.typeInscription === 'BENEVOLE';
}