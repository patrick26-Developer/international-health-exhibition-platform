// lib/validation/volunteer-profile-schema.ts - CORRIGÉ COMPLET
import { z } from 'zod';

// ============================================
// SCHÉMA DISPONIBILITÉS
// ============================================

const disponibilitesSchema = z.object({
  jours: z.array(z.enum(['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'] as const)),
  creneaux: z.array(z.enum(['MATIN', 'APRES_MIDI', 'SOIR', 'JOURNEE_COMPLETE'] as const)),
  flexibilite: z.enum(['FAIBLE', 'MOYENNE', 'ELEVEE'] as const),
});

// ============================================
// SCHÉMA DE CRÉATION
// ============================================

export const createVolunteerProfileSchema = z.object({
  utilisateurId: z.string().cuid('ID utilisateur invalide'),
  editionId: z.string().cuid('ID édition invalide'),
  competences: z.string()
    .max(1000, 'Les compétences ne peuvent pas dépasser 1000 caractères')
    .optional(),
  disponibilites: disponibilitesSchema.optional(),
  tachesPreferees: z.string()
    .max(500, 'Les tâches préférées ne peuvent pas dépasser 500 caractères')
    .optional(),
  experience: z.string()
    .max(1000, 'L\'expérience ne peut pas dépasser 1000 caractères')
    .optional(),
  motivation: z.string()
    .max(1000, 'La motivation ne peut pas dépasser 1000 caractères')
    .optional(),
});

// ============================================
// SCHÉMA DE MISE À JOUR
// ============================================

export const updateVolunteerProfileSchema = z.object({
  competences: z.string()
    .max(1000, 'Les compétences ne peuvent pas dépasser 1000 caractères')
    .optional(),
  disponibilites: disponibilitesSchema.optional(),
  tachesPreferees: z.string()
    .max(500, 'Les tâches préférées ne peuvent pas dépasser 500 caractères')
    .optional(),
  experience: z.string()
    .max(1000, 'L\'expérience ne peut pas dépasser 1000 caractères')
    .optional(),
  motivation: z.string()
    .max(1000, 'La motivation ne peut pas dépasser 1000 caractères')
    .optional(),
  missionsAssignees: z.string()
    .max(2000, 'Les missions assignées ne peuvent pas dépasser 2000 caractères')
    .optional(),
  statut: z.enum(['CANDIDAT', 'ACCEPTE', 'REFUSE', 'ACTIF', 'TERMINE'] as const)
    .optional(),
})
.refine(
  (data) => {
    const fields = Object.keys(data);
    return fields.some((field) => data[field as keyof typeof data] !== undefined);
  },
  {
    message: 'Au moins un champ doit être fourni pour la mise à jour',
    path: ['_global'],
  }
);

// ============================================
// TYPE INFERENCE
// ============================================

export type CreateVolunteerProfileInput = z.infer<typeof createVolunteerProfileSchema>;
export type UpdateVolunteerProfileInput = z.infer<typeof updateVolunteerProfileSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

/**
 * Valide les données de création de bénévole (version throw)
 */
export function validateCreateVolunteerProfile(data: unknown): CreateVolunteerProfileInput {
  return createVolunteerProfileSchema.parse(data);
}

/**
 * ✅ AJOUTÉ : Valide les données de création de bénévole (version safe)
 */
export function safeValidateCreateBenevole(data: unknown): {
  success: boolean;
  data?: CreateVolunteerProfileInput;
  errors?: z.ZodIssue[];
} {
  const result = createVolunteerProfileSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error.issues };
}

/**
 * Valide les données de mise à jour de bénévole (version throw)
 */
export function validateUpdateVolunteerProfile(data: unknown): UpdateVolunteerProfileInput {
  return updateVolunteerProfileSchema.parse(data);
}

/**
 * Valide les données de mise à jour de bénévole (version safe)
 */
export function safeValidateUpdateBenevole(data: unknown): {
  success: boolean;
  data?: UpdateVolunteerProfileInput;
  errors?: z.ZodIssue[];
} {
  const result = updateVolunteerProfileSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error.issues };
}