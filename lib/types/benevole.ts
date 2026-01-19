// types/benevole.ts
/**
 * Types strictement typés pour les Bénévoles
 * Cohérent avec le schéma Prisma
 */

import type {
  Benevole as PrismaBenevole,
  Utilisateur as PrismaUtilisateur,
  Edition as PrismaEdition,
} from '../generated/prisma/client';
import type { Disponibilites } from './inscription';

// ============================================
// TYPES DE BASE BÉNÉVOLE
// ============================================

/**
 * Bénévole complet (depuis DB)
 */
export type BenevoleComplet = PrismaBenevole;

/**
 * Bénévole avec relations
 */
export interface BenevoleAvecRelations extends PrismaBenevole {
  readonly utilisateur: PrismaUtilisateur;
  readonly edition: PrismaEdition;
}

/**
 * Bénévole public
 */
export interface BenevolePublic {
  readonly id: string;
  readonly prenom: string;
  readonly nom: string;
  readonly competences: string | null;
  readonly missionsAssignees: string | null;
  readonly statut: string;
}

// ============================================
// TYPES POUR CRÉATION/MISE À JOUR
// ============================================

/**
 * Données pour créer un profil bénévole
 */
export interface CreateBenevoleDTO {
  readonly utilisateurId: string;
  readonly editionId: string;
  readonly competences?: string;
  readonly disponibilites?: Disponibilites;
  readonly tachesPreferees?: string;
  readonly experience?: string;
  readonly motivation?: string;
}

/**
 * Données pour mettre à jour un bénévole
 */
export interface UpdateBenevoleDTO {
  readonly competences?: string;
  readonly disponibilites?: Disponibilites;
  readonly tachesPreferees?: string;
  readonly missionsAssignees?: string;
  readonly statut?: StatutBenevole;
}

/**
 * Statut bénévole
 */
export type StatutBenevole = 'CANDIDAT' | 'ACCEPTE' | 'REFUSE' | 'ACTIF' | 'TERMINE';

// ============================================
// TYPES POUR MISSIONS
// ============================================

/**
 * Mission assignée à un bénévole
 */
export interface MissionBenevole {
  readonly id: string;
  readonly titre: string;
  readonly description: string;
  readonly date: Date;
  readonly heureDebut: string; // Format HH:mm
  readonly heureFin: string;
  readonly lieu: string;
  readonly responsable?: string;
  readonly instructions?: string;
}

/**
 * Données pour assigner une mission
 */
export interface AssignerMissionDTO {
  readonly benevoleId: string;
  readonly mission: MissionBenevole;
  readonly emailNotification?: boolean;
}

/**
 * Planning bénévole
 */
export interface PlanningBenevole {
  readonly benevoleId: string;
  readonly missions: readonly MissionBenevole[];
  readonly totalHeures: number;
  readonly joursAssignes: readonly string[];
}

// ============================================
// TYPES COMPÉTENCES
// ============================================

/**
 * Compétence bénévole
 */
export interface CompetenceBenevole {
  readonly categorie: CategorieCompetence;
  readonly competences: readonly string[];
  readonly niveauExperience?: NiveauExperience;
}

/**
 * Catégorie de compétence
 */
export type CategorieCompetence =
  | 'LOGISTIQUE'
  | 'ACCUEIL'
  | 'COMMUNICATION'
  | 'ANIMATION'
  | 'TECHNIQUE'
  | 'SANTE'
  | 'TRADUCTION'
  | 'AUTRE';

/**
 * Niveau d'expérience
 */
export type NiveauExperience = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE' | 'EXPERT';

// ============================================
// TYPES ÉVALUATION
// ============================================

/**
 * Évaluation d'un bénévole
 */
export interface EvaluationBenevole {
  readonly benevoleId: string;
  readonly editionId: string;
  readonly note: number; // 1-5
  readonly ponctualite: number;
  readonly autonomie: number;
  readonly communication: number;
  readonly motivation: number;
  readonly commentaire?: string;
  readonly dateEvaluation: Date;
}

/**
 * Données pour évaluer un bénévole
 */
export interface EvaluerBenevoleDTO {
  readonly benevoleId: string;
  readonly note: number;
  readonly ponctualite: number;
  readonly autonomie: number;
  readonly communication: number;
  readonly motivation: number;
  readonly commentaire?: string;
}

// ============================================
// TYPES STATISTIQUES
// ============================================

/**
 * Statistiques bénévoles
 */
export interface StatistiquesBenevoles {
  readonly total: number;
  readonly parStatut: Record<StatutBenevole, number>;
  readonly parCompetence: Record<string, number>;
  readonly parEdition: Record<string, number>;
  readonly totalHeuresEngagees: number;
  readonly moyenneHeuresParBenevole: number;
  readonly tauxAcceptation: number; // pourcentage
}

/**
 * Rapport d'activité bénévole
 */
export interface RapportActiviteBenevole {
  readonly benevoleId: string;
  readonly editionId: string;
  readonly totalMissions: number;
  readonly heuresEffectuees: number;
  readonly evaluationMoyenne: number | null;
  readonly missions: readonly MissionBenevole[];
}

// ============================================
// TYPES FILTRES
// ============================================

/**
 * Filtres pour recherche de bénévoles
 */
export interface FiltresBenevole {
  readonly editionId?: string;
  readonly statut?: StatutBenevole | readonly StatutBenevole[];
  readonly competences?: readonly string[];
  readonly disponible?: boolean;
  readonly recherche?: string;
}

/**
 * Tri des bénévoles
 */
export interface TriBenevole {
  readonly champ: 'nom' | 'dateCreation' | 'statut';
  readonly ordre: 'asc' | 'desc';
}

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si le bénévole est accepté
 */
export function estBenevoleAccepte(
  benevole: Pick<PrismaBenevole, 'statut'>
): boolean {
  return benevole.statut === 'ACCEPTE' || benevole.statut === 'ACTIF';
}

/**
 * Vérifie si le bénévole a des missions assignées
 */
export function aMissionsAssignees(
  benevole: Pick<PrismaBenevole, 'missionsAssignees'>
): boolean {
  return benevole.missionsAssignees !== null && benevole.missionsAssignees.trim() !== '';
}

/**
 * Vérifie si le bénévole est disponible
 */
export function estBenevoleDisponible(
  benevole: Pick<PrismaBenevole, 'statut' | 'disponibilites'>
): boolean {
  return (
    (benevole.statut === 'ACCEPTE' || benevole.statut === 'ACTIF') &&
    benevole.disponibilites !== null
  );
}