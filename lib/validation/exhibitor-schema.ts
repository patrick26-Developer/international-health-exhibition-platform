import { z } from 'zod';
import type { CreateExposantDTO, UpdateExposantDTO } from '@/lib/types';

export const createExposantSchema = z.object({
  utilisateurId: z.string().cuid('ID utilisateur invalide'),
  editionId: z.string().cuid('ID édition invalide'),
  nomOrganisation: z.string()
    .min(2, 'Le nom de l\'organisation doit contenir au moins 2 caractères')
    .max(200, 'Le nom de l\'organisation ne peut pas dépasser 200 caractères'),
  typeOrganisation: z.string()
    .min(2, 'Le type d\'organisation doit contenir au moins 2 caractères')
    .max(50, 'Le type d\'organisation ne peut pas dépasser 50 caractères'),
  secteurActivite: z.string()
    .min(2, 'Le secteur d\'activité doit contenir au moins 2 caractères')
    .max(100, 'Le secteur d\'activité ne peut pas dépasser 100 caractères'),
  description: z.string().max(2000, 'La description ne peut pas dépasser 2000 caractères').optional(),
  logo: z.string().url('URL invalide').optional(),
  siteWeb: z.string().url('URL invalide').optional(),
  personneContact: z.string().max(100, 'Nom trop long').optional(),
  emailContact: z.string().email('Email invalide').optional(),
  telephoneContact: z.string().max(20, 'Téléphone trop long').optional(),
});

export const updateExposantSchema = z.object({
  nomOrganisation: z.string()
    .min(2, 'Le nom de l\'organisation doit contenir au moins 2 caractères')
    .max(200, 'Le nom de l\'organisation ne peut pas dépasser 200 caractères')
    .optional(),
  typeOrganisation: z.string()
    .min(2, 'Le type d\'organisation doit contenir au moins 2 caractères')
    .max(50, 'Le type d\'organisation ne peut pas dépasser 50 caractères')
    .optional(),
  secteurActivite: z.string()
    .min(2, 'Le secteur d\'activité doit contenir au moins 2 caractères')
    .max(100, 'Le secteur d\'activité ne peut pas dépasser 100 caractères')
    .optional(),
  description: z.string().max(2000, 'La description ne peut pas dépasser 2000 caractères').optional(),
  logo: z.string().url('URL invalide').optional(),
  siteWeb: z.string().url('URL invalide').optional(),
  personneContact: z.string().max(100, 'Nom trop long').optional(),
  emailContact: z.string().email('Email invalide').optional(),
  telephoneContact: z.string().max(20, 'Téléphone trop long').optional(),
  emplacementStand: z.string().max(50, 'Emplacement trop long').optional(),
  numeroStand: z.string().max(20, 'Numéro trop long').optional(),
});

// Type inference
export type CreateExposantInput = z.infer<typeof createExposantSchema>;
export type UpdateExposantInput = z.infer<typeof updateExposantSchema>;

// Validation functions
export function validateCreateExposant(data: unknown): CreateExposantDTO {
  return createExposantSchema.parse(data) as CreateExposantDTO;
}

export function validateUpdateExposant(data: unknown): UpdateExposantDTO {
  return updateExposantSchema.parse(data) as UpdateExposantDTO;
}