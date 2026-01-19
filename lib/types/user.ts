// types/user.ts
/**
 * Types strictement typés pour les utilisateurs
 * Basés sur le schéma Prisma - AUCUN type permissif
 */

import type { 
  TypeUtilisateur, 
  StatutCompte,
  Utilisateur as PrismaUtilisateur,
  Session as PrismaSession,
  OTP as PrismaOTP
} from '../generated/prisma/client';

// ============================================
// TYPES DE BASE UTILISATEUR
// ============================================

/**
 * Utilisateur complet (provenant de la DB)
 */
export type UtilisateurComplet = PrismaUtilisateur;

/**
 * Utilisateur sans mot de passe (pour API publique)
 */
export type UtilisateurPublic = Omit<
  PrismaUtilisateur,
  | 'motDePasse'
  | 'tentativesEchouees'
  | 'compteBloqueLe'
  | 'raisonBlocage'
>;

/**
 * Profil utilisateur (données modifiables)
 */
export interface ProfilUtilisateur {
  readonly id: string;
  prenom: string;
  nom: string;
  telephone: string | null;
  pays: string | null;
  ville: string | null;
  adresse: string | null;
  codePostal: string | null;
  langue: string;
  photoProfil: string | null;
  biographie: string | null;
  siteWeb: string | null;
  organisation: string | null;
  poste: string | null;
  reseauxSociaux: ReseauxSociaux | null;
}

/**
 * Réseaux sociaux
 */
export interface ReseauxSociaux {
  readonly linkedin?: string;
  readonly twitter?: string;
  readonly facebook?: string;
  readonly instagram?: string;
}

/**
 * Préférences utilisateur
 */
export interface PreferencesUtilisateur {
  readonly accepteNewsletter: boolean;
  readonly accepteNotifications: boolean;
  readonly notificationsSMS: boolean;
}

// ============================================
// TYPES POUR CRÉATION/MISE À JOUR
// ============================================

/**
 * Données pour créer un utilisateur
 */
export interface CreateUtilisateurDTO {
  readonly email: string;
  readonly motDePasse: string;
  readonly prenom: string;
  readonly nom: string;
  readonly telephone?: string;
  readonly pays?: string;
  readonly ville?: string;
  readonly langue?: string;
  readonly typeUtilisateur?: TypeUtilisateur;
}

/**
 * Données pour mettre à jour le profil
 */
export interface UpdateProfilDTO {
  readonly prenom?: string;
  readonly nom?: string;
  readonly telephone?: string;
  readonly pays?: string;
  readonly ville?: string;
  readonly adresse?: string;
  readonly codePostal?: string;
  readonly langue?: string;
  readonly photoProfil?: string;
  readonly biographie?: string;
  readonly siteWeb?: string;
  readonly organisation?: string;
  readonly poste?: string;
  readonly reseauxSociaux?: ReseauxSociaux;
}

/**
 * Données pour mettre à jour les préférences
 */
export interface UpdatePreferencesDTO {
  readonly accepteNewsletter?: boolean;
  readonly accepteNotifications?: boolean;
  readonly notificationsSMS?: boolean;
}

// ============================================
// TYPES POUR SÉCURITÉ
// ============================================

/**
 * Informations de connexion
 */
export interface InfoConnexion {
  readonly adresseIP: string;
  readonly userAgent: string;
  readonly navigateur?: string;
  readonly systemeExploit?: string;
  readonly appareil?: 'desktop' | 'mobile' | 'tablet';
}

/**
 * Tentative de connexion
 */
export interface TentativeConnexion {
  readonly email: string;
  readonly motDePasse: string;
  readonly infoConnexion: InfoConnexion;
}

/**
 * Historique de connexion
 */
export interface HistoriqueConnexionItem {
  readonly id: string;
  readonly adresseIP: string | null;
  readonly userAgent: string | null;
  readonly reussi: boolean;
  readonly raisonEchec: string | null;
  readonly dateCreation: Date;
}

// ============================================
// TYPES POUR SESSION
// ============================================

/**
 * Session utilisateur
 */
export type SessionUtilisateur = PrismaSession;

/**
 * Données de session pour le client
 */
export interface SessionClient {
  readonly utilisateur: UtilisateurPublic;
  readonly jeton: string;
  readonly expiresAt: Date;
}

/**
 * Payload JWT
 */
export interface JWTPayload {
  readonly sub: string; // ID utilisateur
  readonly email: string;
  readonly typeUtilisateur: TypeUtilisateur;
  readonly iat: number; // Issued at
  readonly exp: number; // Expiration
}

// ============================================
// TYPES POUR STATISTIQUES
// ============================================

/**
 * Statistiques utilisateur
 */
export interface StatistiquesUtilisateur {
  readonly totalUtilisateurs: number;
  readonly utilisateursActifs: number;
  readonly utilisateursEnAttente: number;
  readonly utilisateursBloques: number;
  readonly repartitionParType: Record<TypeUtilisateur, number>;
  readonly repartitionParStatut: Record<StatutCompte, number>;
}

// ============================================
// TYPES GUARDS (pour validation runtime)
// ============================================

/**
 * Vérifie si un utilisateur est actif
 */
export function estUtilisateurActif(
  utilisateur: Pick<PrismaUtilisateur, 'statutCompte' | 'emailVerifie'>
): boolean {
  return (
    utilisateur.statutCompte === 'ACTIF' &&
    utilisateur.emailVerifie === true
  );
}

/**
 * Vérifie si un utilisateur peut se connecter
 */
export function peutSeConnecter(
  utilisateur: Pick<PrismaUtilisateur, 'statutCompte' | 'compteBloqueLe'>
): boolean {
  if (utilisateur.statutCompte === 'SUPPRIME') return false;
  if (utilisateur.statutCompte === 'SUSPENDU') return false;
  if (utilisateur.compteBloqueLe !== null) return false;
  return true;
}

/**
 * Vérifie si un utilisateur est admin
 */
export function estAdmin(
  utilisateur: Pick<PrismaUtilisateur, 'typeUtilisateur'>
): boolean {
  return (
    utilisateur.typeUtilisateur === 'SUPER_ADMIN' ||
    utilisateur.typeUtilisateur === 'ADMIN'
  );
}