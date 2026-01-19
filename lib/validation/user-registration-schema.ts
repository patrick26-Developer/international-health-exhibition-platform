// lib/validation/user-registration-schema.ts - CORRIGÉ COMPLET
import { z } from 'zod';
import { LANGUAGES, LIMITS } from '@/lib/utils/constants';

// ============================================
// SCHÉMA D'INSCRIPTION (CRÉATION DE COMPTE)
// ============================================

export const registrationSchema = z.object({
  email: z.string()
    .min(1, 'L\'email est requis')
    .max(LIMITS.USER.EMAIL_MAX_LENGTH, `L'email ne peut pas dépasser ${LIMITS.USER.EMAIL_MAX_LENGTH} caractères`)
    .email('Format d\'email invalide')
    .transform(val => val.trim().toLowerCase()),

  motDePasse: z.string()
    .min(LIMITS.PASSWORD.MIN_LENGTH, `Le mot de passe doit contenir au moins ${LIMITS.PASSWORD.MIN_LENGTH} caractères`)
    .max(LIMITS.PASSWORD.MAX_LENGTH, `Le mot de passe ne peut pas dépasser ${LIMITS.PASSWORD.MAX_LENGTH} caractères`)
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),

  confirmationMotDePasse: z.string()
    .min(1, 'La confirmation du mot de passe est requise'),

  prenom: z.string()
    .min(1, 'Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le prénom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim()),

  nom: z.string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le nom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim()),

  telephone: z.string()
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),

  pays: z.string()
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),

  ville: z.string()
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),

  accepteCGU: z.boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions générales d\'utilisation'),

  acceptePolitique: z.boolean()
    .refine(val => val === true, 'Vous devez accepter la politique de confidentialité'),

  accepteNewsletter: z.boolean()
    .default(false)
    .optional(),
}).refine(
  data => data.motDePasse === data.confirmationMotDePasse,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationMotDePasse'],
  }
);

export type RegistrationInput = z.infer<typeof registrationSchema>;

// ============================================
// SCHÉMA DE MISE À JOUR DU PROFIL
// ============================================

export const updateProfilSchema = z.object({
  prenom: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le prénom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim())
    .optional(),

  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le nom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim())
    .optional(),

  telephone: z.string()
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  pays: z.string()
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  ville: z.string()
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  adresse: z.string()
    .max(LIMITS.USER.ADDRESS_MAX_LENGTH, `L'adresse ne peut pas dépasser ${LIMITS.USER.ADDRESS_MAX_LENGTH} caractères`)
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  codePostal: z.string()
    .nullable()
    .transform(val => val?.trim() || null)
    .refine(
      code => !code || /^\d{5}$/.test(code) || /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(code),
      'Code postal invalide (format attendu: 12345 ou A1A 1A1)'
    )
    .optional(),

  langue: z.enum([LANGUAGES.FR, LANGUAGES.EN] as const)
    .optional(),

  photoProfil: z.string()
    .url('URL de photo invalide')
    .nullable()
    .transform(val => val || null)
    .optional(),

  biographie: z.string()
    .max(LIMITS.USER.BIO_MAX_LENGTH, `La biographie ne peut pas dépasser ${LIMITS.USER.BIO_MAX_LENGTH} caractères`)
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  siteWeb: z.string()
    .url('URL de site web invalide')
    .nullable()
    .transform(val => val || null)
    .optional(),

  organisation: z.string()
    .max(200, 'Le nom de l\'organisation ne peut pas dépasser 200 caractères')
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  poste: z.string()
    .max(100, 'Le poste ne peut pas dépasser 100 caractères')
    .nullable()
    .transform(val => val?.trim() || null)
    .optional(),

  reseauxSociaux: z.record(z.string(), z.string().url())
    .nullable()
    .transform(val => val || null)
    .optional(),
}).refine(
  data => Object.keys(data).length > 0,
  'Au moins un champ doit être fourni pour la mise à jour'
);

export type UpdateProfilInput = z.infer<typeof updateProfilSchema>;

// ============================================
// SCHÉMA DE MISE À JOUR DES PRÉFÉRENCES
// ============================================

export const updatePreferencesSchema = z.object({
  accepteNewsletter: z.boolean().optional(),
  accepteNotifications: z.boolean().optional(),
  notificationsSMS: z.boolean().optional(),
}).refine(
  data => Object.keys(data).length > 0,
  'Au moins une préférence doit être fournie pour la mise à jour'
);

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;

// ============================================
// SCHÉMA DE CRÉATION D'UTILISATEUR (ADMIN)
// ============================================

export const createUserSchema = z.object({
  email: z.string()
    .min(1, 'L\'email est requis')
    .max(LIMITS.USER.EMAIL_MAX_LENGTH, `L'email ne peut pas dépasser ${LIMITS.USER.EMAIL_MAX_LENGTH} caractères`)
    .email('Format d\'email invalide')
    .transform(val => val.trim().toLowerCase()),

  motDePasse: z.string()
    .min(LIMITS.PASSWORD.MIN_LENGTH, `Le mot de passe doit contenir au moins ${LIMITS.PASSWORD.MIN_LENGTH} caractères`)
    .max(LIMITS.PASSWORD.MAX_LENGTH, `Le mot de passe ne peut pas dépasser ${LIMITS.PASSWORD.MAX_LENGTH} caractères`)
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),

  prenom: z.string()
    .min(1, 'Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le prénom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim()),

  nom: z.string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(LIMITS.USER.NAME_MAX_LENGTH, `Le nom ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`)
    .transform(val => val.trim()),

  typeUtilisateur: z.enum([
    'SUPER_ADMIN',
    'ADMIN',
    'PARTENAIRE',
    'EXPOSANT',
    'BENEVOLE',
    'VISITEUR',
    'MEDIA',
  ] as const).default('VISITEUR'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

export function validateRegistration(data: unknown) {
  const result = registrationSchema.safeParse(data);
  
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  
  return { 
    success: false as const, 
    errors: result.error.issues 
  };
}

export function validateUpdateProfil(data: unknown) {
  const result = updateProfilSchema.safeParse(data);
  
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  
  return { 
    success: false as const, 
    errors: result.error.issues 
  };
}

export function validateUpdatePreferences(data: unknown) {
  const result = updatePreferencesSchema.safeParse(data);
  
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  
  return { 
    success: false as const, 
    errors: result.error.issues 
  };
}

export function validateCreateUser(data: unknown) {
  const result = createUserSchema.safeParse(data);
  
  if (result.success) {
    return { success: true as const, data: result.data };
  }
  
  return { 
    success: false as const, 
    errors: result.error.issues 
  };
}