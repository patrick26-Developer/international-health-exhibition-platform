// types/auth.ts
/**
 * Types strictement typés pour l'authentification
 * AUCUN type permissif - Tout est explicite
 */

import type { 
  TypeOTP, 
  StatutOTP,
  OTP as PrismaOTP 
} from '../generated/prisma/client';
import type { UtilisateurPublic, InfoConnexion } from './user';

// ============================================
// TYPES D'AUTHENTIFICATION DE BASE
// ============================================

/**
 * Requête d'inscription
 */
export interface InscriptionRequest {
  readonly email: string;
  readonly motDePasse: string;
  readonly confirmationMotDePasse: string;
  readonly prenom: string;
  readonly nom: string;
  readonly telephone?: string;
  readonly pays?: string;
  readonly ville?: string;
  readonly accepteCGU: boolean;
  readonly acceptePolitique: boolean;
}

/**
 * Requête de connexion
 */
export interface ConnexionRequest {
  readonly email: string;
  readonly motDePasse: string;
  readonly seSouvenir?: boolean;
}

/**
 * Réponse d'authentification
 */
export interface AuthResponse {
  readonly success: true;
  readonly utilisateur: UtilisateurPublic;
  readonly jeton: string;
  readonly jetonRafraichi?: string;
  readonly expiresAt: Date;
  readonly message: string;
}

/**
 * Erreur d'authentification
 */
export interface AuthError {
  readonly success: false;
  readonly error: string;
  readonly code: AuthErrorCode;
  readonly details?: Record<string, string[]>;
}

/**
 * Codes d'erreur d'authentification
 */
// types/auth.ts
export type AuthErrorCode =
  | 'CREDENTIALS_INVALID'
  | 'EMAIL_ALREADY_EXISTS'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_BLOCKED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_DELETED'
  | 'TOO_MANY_ATTEMPTS'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'OTP_INVALID'
  | 'OTP_EXPIRED'
  | 'OTP_MAX_ATTEMPTS'
  | 'VALIDATION_ERROR';
// ============================================
// TYPES OTP
// ============================================

/**
 * OTP complet
 */
export type OTPComplet = PrismaOTP;

/**
 * Requête de génération d'OTP
 */
export interface GenererOTPRequest {
  readonly email: string;
  readonly type: TypeOTP;
  readonly metadata?: OTPMetadata;
}

/**
 * Métadonnées OTP
 */
export interface OTPMetadata {
  readonly ip: string;
  readonly userAgent: string;
  readonly operation: string;
}

/**
 * Requête de vérification d'OTP
 */
export interface VerifierOTPRequest {
  readonly email: string;
  readonly code: string;
  readonly type: TypeOTP;
}

/**
 * Réponse de vérification d'OTP
 */
export interface VerifierOTPResponse {
  readonly success: true;
  readonly message: string;
  readonly nextStep?: 'complete_registration' | 'reset_password' | 'change_email';
}

/**
 * Données OTP pour l'email
 */
export interface OTPEmailData {
  readonly destinataire: string;
  readonly code: string;
  readonly type: TypeOTP;
  readonly expiresAt: Date;
  readonly prenomUtilisateur?: string;
}

// ============================================
// TYPES MOT DE PASSE
// ============================================

/**
 * Requête de mot de passe oublié
 */
export interface MotDePasseOublieRequest {
  readonly email: string;
}

/**
 * Requête de réinitialisation de mot de passe
 */
export interface ReinitialisationMDPRequest {
  readonly email: string;
  readonly code: string;
  readonly nouveauMotDePasse: string;
  readonly confirmationMotDePasse: string;
}

/**
 * Requête de changement de mot de passe
 */
export interface ChangementMDPRequest {
  readonly ancienMotDePasse: string;
  readonly nouveauMotDePasse: string;
  readonly confirmationMotDePasse: string;
}

/**
 * Politique de mot de passe
 */
export interface PolitiqueMotDePasse {
  readonly longueurMin: number;
  readonly longueurMax: number;
  readonly requireMajuscule: boolean;
  readonly requireMinuscule: boolean;
  readonly requireChiffre: boolean;
  readonly requireSpecial: boolean;
  readonly caractereSpeciauxAutorises: string;
}

// ============================================
// TYPES SESSION
// ============================================

/**
 * Contexte de session
 */
export interface SessionContext {
  readonly utilisateur: UtilisateurPublic | null;
  readonly jeton: string | null;
  readonly expiresAt: Date | null;
  readonly estConnecte: boolean;
  readonly estChargement: boolean;
}

/**
 * Options de session
 */
export interface SessionOptions {
  readonly dureeValidite?: number; // en secondes
  readonly dureeRafraichissement?: number; // en secondes
  readonly seSouvenir?: boolean;
}

// ============================================
// TYPES VÉRIFICATION EMAIL
// ============================================

/**
 * Requête de vérification d'email
 */
export interface VerificationEmailRequest {
  readonly email: string;
  readonly code: string;
}

/**
 * Requête de renvoi de code
 */
export interface RenvoiCodeRequest {
  readonly email: string;
  readonly type: TypeOTP;
}

// ============================================
// TYPES POUR CHANGEMENT D'EMAIL
// ============================================

/**
 * Requête de changement d'email
 */
export interface ChangementEmailRequest {
  readonly nouvelEmail: string;
  readonly motDePasse: string;
}

/**
 * Confirmation de changement d'email
 */
export interface ConfirmationChangementEmailRequest {
  readonly nouvelEmail: string;
  readonly code: string;
}

// ============================================
// TYPES AUDIT & SÉCURITÉ
// ============================================

/**
 * Événement d'authentification
 */
export interface EvenementAuth {
  readonly type: EvenementAuthType;
  readonly utilisateurId: string;
  readonly email: string;
  readonly infoConnexion: InfoConnexion;
  readonly reussi: boolean;
  readonly raisonEchec?: string;
  readonly dateCreation: Date;
}

/**
 * Types d'événements d'authentification
 */
export type EvenementAuthType =
  | 'INSCRIPTION'
  | 'CONNEXION'
  | 'DECONNEXION'
  | 'VERIFICATION_EMAIL'
  | 'REINITIALISATION_MDP'
  | 'CHANGEMENT_MDP'
  | 'CHANGEMENT_EMAIL'
  | 'GENERATION_OTP'
  | 'VERIFICATION_OTP';

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si la réponse est un succès
 */
export function estAuthSuccess(
  response: AuthResponse | AuthError
): response is AuthResponse {
  return response.success === true;
}

/**
 * Vérifie si la réponse est une erreur
 */
export function estAuthError(
  response: AuthResponse | AuthError
): response is AuthError {
  return response.success === false;
}

/**
 * Vérifie si un OTP est valide
 */
export function estOTPValide(otp: Pick<PrismaOTP, 'statut' | 'expiresAt'>): boolean {
  if (otp.statut !== 'EN_ATTENTE') return false;
  if (new Date() > otp.expiresAt) return false;
  return true;
}

/**
 * Vérifie si un OTP est expiré
 */
export function estOTPExpire(otp: Pick<PrismaOTP, 'expiresAt'>): boolean {
  return new Date() > otp.expiresAt;
}