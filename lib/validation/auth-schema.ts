// lib/validation/auth-schema.ts
/**
 * Schémas de validation Zod pour l'authentification
 * Utilisés pour valider les données d'entrée des API
 */

import { z } from 'zod';
import { 
  validateEmail, 
  validatePassword, 
  validatePhoneNumber, 
  validateName 
} from '@/lib/utils/validators';
import { 
  USER_TYPES, 
  VALIDATION_ERROR_CODES 
} from '@/lib/utils/constants';
import type { 
  InscriptionRequest,
  ConnexionRequest,
  VerificationEmailRequest,
  MotDePasseOublieRequest,
  ReinitialisationMDPRequest,
  ChangementMDPRequest,
  RenvoiCodeRequest
} from '@/lib/types';

// ============================================
// HELPERS ZOD
// ============================================

/**
 * Crée une validation Zod personnalisée pour l'email
 */
const emailValidation = z.string()
  .min(1, { message: 'L\'email est requis' })
  .max(254, { message: 'L\'email ne peut pas dépasser 254 caractères' })
  .email({ message: 'Format d\'email invalide' })
  .transform((val) => val.trim().toLowerCase())
  .refine(
    (email) => {
      const error = validateEmail(email);
      return error === null;
    },
    {
      message: 'Email invalide',
      path: ['email'],
    }
  );

/**
 * Crée une validation Zod personnalisée pour le mot de passe
 */
const passwordValidation = z.string()
  .min(1, { message: 'Le mot de passe est requis' })
  .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  .max(128, { message: 'Le mot de passe ne peut pas dépasser 128 caractères' })
  .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule' })
  .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule' })
  .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { 
    message: 'Le mot de passe doit contenir au moins un caractère spécial' 
  })
  .refine(
    (password) => {
      const errors = validatePassword(password);
      return errors.length === 0;
    },
    {
      message: 'Le mot de passe ne respecte pas les exigences de sécurité',
      path: ['password'],
    }
  );

/**
 * Crée une validation Zod personnalisée pour le téléphone
 */
const phoneValidation = z.string()
  .optional()
  .nullable()
  .transform((val) => val?.trim() || null)
  .refine(
    (phone) => {
      if (!phone) return true; // Optionnel
      const error = validatePhoneNumber(phone);
      return error === null;
    },
    {
      message: 'Format de numéro de téléphone invalide',
      path: ['telephone'],
    }
  );

/**
 * Crée une validation Zod personnalisée pour le prénom
 */
const firstNameValidation = z.string()
  .min(1, { message: 'Le prénom est requis' })
  .min(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
  .max(100, { message: 'Le prénom ne peut pas dépasser 100 caractères' })
  .transform((val) => val.trim())
  .refine(
    (firstName) => {
      const error = validateName(firstName, 'prenom');
      return error === null;
    },
    {
      message: 'Prénom invalide',
      path: ['prenom'],
    }
  );

/**
 * Crée une validation Zod personnalisée pour le nom
 */
const lastNameValidation = z.string()
  .min(1, { message: 'Le nom est requis' })
  .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  .max(100, { message: 'Le nom ne peut pas dépasser 100 caractères' })
  .transform((val) => val.trim())
  .refine(
    (lastName) => {
      const error = validateName(lastName, 'nom');
      return error === null;
    },
    {
      message: 'Nom invalide',
      path: ['nom'],
    }
  );

// ============================================
// SCHÉMAS PRINCIPAUX
// ============================================

/**
 * Schéma d'inscription
 */
export const inscriptionSchema = z.object({
  email: emailValidation,
  motDePasse: passwordValidation,
  confirmationMotDePasse: z.string()
    .min(1, { message: 'La confirmation du mot de passe est requise' }),
  prenom: firstNameValidation,
  nom: lastNameValidation,
  telephone: phoneValidation,
  pays: z.string()
    .optional()
    .nullable()
    .transform((val) => val?.trim() || null),
  ville: z.string()
    .optional()
    .nullable()
    .transform((val) => val?.trim() || null),
  accepteCGU: z.boolean()
    .refine((val) => val === true, {
      message: 'Vous devez accepter les conditions générales d\'utilisation',
      path: ['accepteCGU'],
    }),
  acceptePolitique: z.boolean()
    .refine((val) => val === true, {
      message: 'Vous devez accepter la politique de confidentialité',
      path: ['acceptePolitique'],
    }),
  typeUtilisateur: z.enum([
    USER_TYPES.VISITEUR,
    USER_TYPES.EXPOSANT,
    USER_TYPES.BENEVOLE,
    USER_TYPES.PARTENAIRE,
    USER_TYPES.MEDIA,
  ] as const)
  .default(USER_TYPES.VISITEUR),
})
.refine(
  (data) => data.motDePasse === data.confirmationMotDePasse,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationMotDePasse'],
  }
);

export type InscriptionSchema = z.infer<typeof inscriptionSchema>;

/**
 * Schéma de connexion
 */
export const connexionSchema = z.object({
  email: emailValidation,
  motDePasse: z.string()
    .min(1, { message: 'Le mot de passe est requis' }),
  seSouvenir: z.boolean()
    .optional()
    .default(false),
});

export type ConnexionSchema = z.infer<typeof connexionSchema>;

/**
 * Schéma de vérification d'email
 */
export const verificationEmailSchema = z.object({
  email: emailValidation,
  code: z.string()
    .length(6, { message: 'Le code doit contenir exactement 6 chiffres' })
    .regex(/^\d{6}$/, { message: 'Le code doit contenir uniquement des chiffres' }),
});

export type VerificationEmailSchema = z.infer<typeof verificationEmailSchema>;

/**
 * Schéma de mot de passe oublié
 */
export const motDePasseOublieSchema = z.object({
  email: emailValidation,
});

export type MotDePasseOublieSchema = z.infer<typeof motDePasseOublieSchema>;

/**
 * Schéma de réinitialisation de mot de passe
 */
export const reinitialisationMdpSchema = z.object({
  email: emailValidation,
  code: z.string()
    .length(6, { message: 'Le code doit contenir exactement 6 chiffres' })
    .regex(/^\d{6}$/, { message: 'Le code doit contenir uniquement des chiffres' }),
  nouveauMotDePasse: passwordValidation,
  confirmationMotDePasse: z.string()
    .min(1, { message: 'La confirmation du mot de passe est requise' }),
})
.refine(
  (data) => data.nouveauMotDePasse === data.confirmationMotDePasse,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationMotDePasse'],
  }
);

export type ReinitialisationMdpSchema = z.infer<typeof reinitialisationMdpSchema>;

/**
 * Schéma de changement de mot de passe (utilisateur connecté)
 */
export const changementMdpSchema = z.object({
  ancienMotDePasse: z.string()
    .min(1, { message: 'L\'ancien mot de passe est requis' }),
  nouveauMotDePasse: passwordValidation,
  confirmationMotDePasse: z.string()
    .min(1, { message: 'La confirmation du mot de passe est requise' }),
})
.refine(
  (data) => data.nouveauMotDePasse !== data.ancienMotDePasse,
  {
    message: 'Le nouveau mot de passe doit être différent de l\'ancien',
    path: ['nouveauMotDePasse'],
  }
)
.refine(
  (data) => data.nouveauMotDePasse === data.confirmationMotDePasse,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationMotDePasse'],
  }
);

export type ChangementMdpSchema = z.infer<typeof changementMdpSchema>;

/**
 * Schéma de renvoi de code
 */
export const renvoiCodeSchema = z.object({
  email: emailValidation,
  type: z.enum([
    'VERIFICATION_EMAIL',
    'REINITIALISATION_MDP',
    'CHANGEMENT_EMAIL',
    'SUPPRESSION_COMPTE',
  ] as const),
});

export type RenvoiCodeSchema = z.infer<typeof renvoiCodeSchema>;

/**
 * Schéma de changement d'email
 */
export const changementEmailSchema = z.object({
  nouvelEmail: emailValidation,
  motDePasse: z.string()
    .min(1, { message: 'Le mot de passe est requis' }),
});

export type ChangementEmailSchema = z.infer<typeof changementEmailSchema>;

/**
 * Schéma de confirmation de changement d'email
 */
export const confirmationChangementEmailSchema = z.object({
  nouvelEmail: emailValidation,
  code: z.string()
    .length(6, { message: 'Le code doit contenir exactement 6 chiffres' })
    .regex(/^\d{6}$/, { message: 'Le code doit contenir uniquement des chiffres' }),
});

export type ConfirmationChangementEmailSchema = z.infer<typeof confirmationChangementEmailSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

/**
 * Valide les données d'inscription
 */
export function validateInscription(
  data: unknown
): { success: true; data: InscriptionSchema } | { success: false; errors: z.ZodIssue[] } {
  const result = inscriptionSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { 
    success: false, 
    errors: result.error.issues 
  };
}

/**
 * Valide les données de connexion
 */
export function validateConnexion(
  data: unknown
): { success: true; data: ConnexionSchema } | { success: false; errors: z.ZodIssue[] } {
  const result = connexionSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { 
    success: false, 
    errors: result.error.issues 
  };
}

/**
 * Valide les données de vérification d'email
 */
export function validateVerificationEmail(
  data: unknown
): { success: true; data: VerificationEmailSchema } | { success: false; errors: z.ZodIssue[] } {
  const result = verificationEmailSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { 
    success: false, 
    errors: result.error.issues 
  };
}

/**
 * Valide les données de mot de passe oublié
 */
export function validateMotDePasseOublie(
  data: unknown
): { success: true; data: MotDePasseOublieSchema } | { success: false; errors: z.ZodIssue[] } {
  const result = motDePasseOublieSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { 
    success: false, 
    errors: result.error.issues 
  };
}

/**
 * Valide les données de réinitialisation de mot de passe
 */
export function validateReinitialisationMdp(
  data: unknown
): { success: true; data: ReinitialisationMdpSchema } | { success: false; errors: z.ZodIssue[] } {
  const result = reinitialisationMdpSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { 
    success: false, 
    errors: result.error.issues 
  };
}

/**
 * Convertit les erreurs Zod en ValidationError
 */
export function zodErrorsToValidationErrors(
  zodErrors: z.ZodIssue[]
): Array<{
  field: string;
  message: string;
  code: typeof VALIDATION_ERROR_CODES[keyof typeof VALIDATION_ERROR_CODES];
}> {
  return zodErrors.map((error) => {
    // Déterminer le code d'erreur en fonction du type Zod
    let code: typeof VALIDATION_ERROR_CODES[keyof typeof VALIDATION_ERROR_CODES];
    
    const errorCode = error.code as string;
    
    if (errorCode === 'too_small') {
      code = VALIDATION_ERROR_CODES.TOO_SHORT;
    } else if (errorCode === 'too_big') {
      code = VALIDATION_ERROR_CODES.TOO_LONG;
    } else if (
      errorCode === 'invalid_type' ||
      errorCode === 'invalid_string' ||
      errorCode === 'invalid_date' ||
      errorCode === 'invalid_enum_value' ||
      errorCode === 'invalid_literal'
    ) {
      code = VALIDATION_ERROR_CODES.INVALID_FORMAT;
    } else {
      code = VALIDATION_ERROR_CODES.INVALID_FORMAT;
    }
    
    // Extraire le nom du champ
    const field = error.path.join('.') || 'unknown';
    
    return {
      field,
      message: error.message,
      code,
    };
  });
}