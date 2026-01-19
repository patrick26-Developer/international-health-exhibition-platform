// lib/validation/index.ts
/**
 * Export centralisé de tous les schémas de validation
 */

// Auth
export {
  inscriptionSchema,
  connexionSchema,
  verificationEmailSchema,
  motDePasseOublieSchema,
  reinitialisationMdpSchema,
  changementMdpSchema,
  renvoiCodeSchema,
  changementEmailSchema,
  confirmationChangementEmailSchema,
  
  // Types
  type InscriptionSchema,
  type ConnexionSchema,
  type VerificationEmailSchema,
  type MotDePasseOublieSchema,
  type ReinitialisationMdpSchema,
  type ChangementMdpSchema,
  type RenvoiCodeSchema,
  type ChangementEmailSchema,
  type ConfirmationChangementEmailSchema,
  
  // Fonctions de validation
  validateInscription,
  validateConnexion,
  validateVerificationEmail,
  validateMotDePasseOublie,
  validateReinitialisationMdp,
  zodErrorsToValidationErrors,
} from './auth-schema';

// User
export {
  updateProfilSchema,
  updatePreferencesSchema,
  createUserSchema,
  
  // Fonctions de validation
  validateUpdateProfil,
  validateUpdatePreferences,
} from './user-registration-schema';

// Types utilitaires
export type {
  ZodValidationResult,
  ValidationSuccess,
  ValidationFailure,
} from './types';