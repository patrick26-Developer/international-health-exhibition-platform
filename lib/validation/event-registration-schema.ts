// lib/validation/event-registration-schema.ts - CORRIGÉ COMPLET
import { z } from 'zod';

// ============================================
// SCHÉMAS DE BASE
// ============================================

const baseInscriptionSchema = z.object({
  utilisateurId: z.string().cuid('ID utilisateur invalide'),
  editionId: z.string().cuid('ID édition invalide'),
});

// ============================================
// SCHÉMA VISITEUR
// ============================================

const visiteurSchema = baseInscriptionSchema.extend({
  typeInscription: z.literal('VISITEUR'),
  centresInteret: z.object({
    sportSante: z.boolean().optional(),
    nutrition: z.boolean().optional(),
    bienEtre: z.boolean().optional(),
    preventionMNT: z.boolean().optional(),
    santeMentale: z.boolean().optional(),
    autres: z.array(z.string().max(50)).optional(),
  }).optional(),
}).strict();

// ============================================
// SCHÉMA EXPOSANT
// ============================================

const exposantSchema = baseInscriptionSchema.extend({
  typeInscription: z.literal('EXPOSANT'),
  nomOrganisation: z.string()
    .min(2, 'Le nom de l\'organisation doit contenir au moins 2 caractères')
    .max(200, 'Le nom de l\'organisation ne peut pas dépasser 200 caractères'),
  secteurActivite: z.string()
    .min(2, 'Le secteur d\'activité doit contenir au moins 2 caractères')
    .max(100, 'Le secteur d\'activité ne peut pas dépasser 100 caractères'),
  typeOrganisation: z.enum(['ENTREPRISE', 'ONG', 'INSTITUTION', 'ASSOCIATION', 'STARTUP'] as const),
  description: z.string().max(2000, 'La description ne peut pas dépasser 2000 caractères').optional(),
  logo: z.string().url('URL invalide').optional(),
  siteWeb: z.string().url('URL invalide').optional(),
  personneContact: z.string().max(100, 'Nom trop long').optional(),
  emailContact: z.string().email('Email invalide').optional(),
  telephoneContact: z.string().max(20, 'Téléphone trop long').optional(),
}).strict();

// ============================================
// SCHÉMA BÉNÉVOLE
// ============================================

const benevoleSchema = baseInscriptionSchema.extend({
  typeInscription: z.literal('BENEVOLE'),
  competences: z.string().max(1000, 'Les compétences ne peuvent pas dépasser 1000 caractères').optional(),
  disponibilites: z.object({
    jours: z.array(z.enum(['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'] as const)),
    creneaux: z.array(z.enum(['MATIN', 'APRES_MIDI', 'SOIR', 'JOURNEE_COMPLETE'] as const)),
    flexibilite: z.enum(['FAIBLE', 'MOYENNE', 'ELEVEE'] as const),
  }).optional(),
  tachesPreferees: z.string().max(500, 'Les tâches préférées ne peuvent pas dépasser 500 caractères').optional(),
  experience: z.string().max(1000, 'L\'expérience ne peut pas dépasser 1000 caractères').optional(),
  motivation: z.string().max(1000, 'La motivation ne peut pas dépasser 1000 caractères').optional(),
}).strict();

// ============================================
// SCHÉMA UNION
// ============================================

export const createInscriptionSchema = z.discriminatedUnion('typeInscription', [
  visiteurSchema,
  exposantSchema,
  benevoleSchema,
]);

// ============================================
// TYPE INFERENCE
// ============================================

export type CreateInscriptionInput = z.infer<typeof createInscriptionSchema>;
export type CreateVisiteurInput = z.infer<typeof visiteurSchema>;
export type CreateExposantInput = z.infer<typeof exposantSchema>;
export type CreateBenevoleInput = z.infer<typeof benevoleSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

/**
 * Valide les données d'inscription (version safe)
 */
export function safeValidateCreateInscription(data: unknown): {
  success: boolean;
  data?: CreateInscriptionInput;
  errors?: z.ZodIssue[];
} {
  const result = createInscriptionSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error.issues };
}

/**
 * Valide les données d'inscription (version throw)
 */
export function validateCreateInscription(data: unknown): CreateInscriptionInput {
  return createInscriptionSchema.parse(data);
}

// ============================================
// TYPE GUARDS
// ============================================

export function isVisiteurInscription(
  data: CreateInscriptionInput
): data is CreateVisiteurInput {
  return data.typeInscription === 'VISITEUR';
}

export function isExposantInscription(
  data: CreateInscriptionInput
): data is CreateExposantInput {
  return data.typeInscription === 'EXPOSANT';
}

export function isBenevoleInscription(
  data: CreateInscriptionInput
): data is CreateBenevoleInput {
  return data.typeInscription === 'BENEVOLE';
}