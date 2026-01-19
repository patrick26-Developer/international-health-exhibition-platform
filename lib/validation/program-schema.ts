// lib/validation/program-schema.ts
import { z } from 'zod';
import { TypeProgramme } from '@/lib/generated/prisma/client';
import type { CreateProgrammeDTO, Intervenant } from '@/lib/types';

// Schéma pour un intervenant
const intervenantSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  prenom: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(100, 'Le prénom ne peut pas dépasser 100 caractères'),
  fonction: z.string()
    .min(2, 'La fonction doit contenir au moins 2 caractères')
    .max(100, 'La fonction ne peut pas dépasser 100 caractères'),
  organisation: z.string()
    .max(200, 'L\'organisation ne peut pas dépasser 200 caractères')
    .optional(),
  biographie: z.string()
    .max(2000, 'La biographie ne peut pas dépasser 2000 caractères')
    .optional(),
  photo: z.string()
    .url('URL de photo invalide')
    .optional(),
});

// Schéma de création de programme
export const createProgrammeSchema = z.object({
  editionId: z.string().cuid('ID édition invalide'),
  type: z.nativeEnum(TypeProgramme),
  titre: z.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  description: z.string()
    .max(5000, 'La description ne peut pas dépasser 5000 caractères')
    .optional(),
  dateDebut: z.string().datetime('Date de début invalide'),
  dateFin: z.string().datetime('Date de fin invalide'),
  lieu: z.string()
    .max(200, 'Le lieu ne peut pas dépasser 200 caractères')
    .optional(),
  intervenants: z.array(intervenantSchema).optional(),
  maxParticipants: z.number()
    .int('Doit être un nombre entier')
    .min(1, 'Doit être au moins 1')
    .max(1000, 'Ne peut pas dépasser 1000 participants')
    .optional(),
}).refine((data) => new Date(data.dateDebut) < new Date(data.dateFin), {
  message: 'La date de fin doit être après la date de début',
  path: ['dateFin'],
});

// Schéma de mise à jour de programme
export const updateProgrammeSchema = z.object({
  type: z.nativeEnum(TypeProgramme).optional(),
  titre: z.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères')
    .optional(),
  description: z.string()
    .max(5000, 'La description ne peut pas dépasser 5000 caractères')
    .optional(),
  dateDebut: z.string().datetime('Date de début invalide').optional(),
  dateFin: z.string().datetime('Date de fin invalide').optional(),
  lieu: z.string()
    .max(200, 'Le lieu ne peut pas dépasser 200 caractères')
    .optional(),
  intervenants: z.array(intervenantSchema).optional(),
  maxParticipants: z.number()
    .int('Doit être un nombre entier')
    .min(1, 'Doit être au moins 1')
    .max(1000, 'Ne peut pas dépasser 1000 participants')
    .optional(),
}).refine((data) => {
  if (data.dateDebut && data.dateFin) {
    return new Date(data.dateDebut) < new Date(data.dateFin);
  }
  return true;
}, {
  message: 'La date de fin doit être après la date de début',
  path: ['dateFin'],
});

// Type inference
export type CreateProgrammeInput = z.infer<typeof createProgrammeSchema>;
export type UpdateProgrammeInput = z.infer<typeof updateProgrammeSchema>;

// Fonctions de validation
export function validateCreateProgramme(data: unknown): CreateProgrammeDTO {
  const parsed = createProgrammeSchema.parse(data);
  
  return {
    editionId: parsed.editionId,
    type: parsed.type,
    titre: parsed.titre,
    description: parsed.description,
    dateDebut: new Date(parsed.dateDebut),
    dateFin: new Date(parsed.dateFin),
    lieu: parsed.lieu,
    intervenants: parsed.intervenants,
    maxParticipants: parsed.maxParticipants,
  };
}

export function safeValidateCreateProgramme(data: unknown): {
  success: boolean;
  data?: CreateProgrammeDTO;
  errors?: z.ZodIssue[];
} {
  const result = createProgrammeSchema.safeParse(data);
  
  if (result.success) {
    return { 
      success: true, 
      data: {
        editionId: result.data.editionId,
        type: result.data.type,
        titre: result.data.titre,
        description: result.data.description,
        dateDebut: new Date(result.data.dateDebut),
        dateFin: new Date(result.data.dateFin),
        lieu: result.data.lieu,
        intervenants: result.data.intervenants,
        maxParticipants: result.data.maxParticipants,
      }
    };
  }
  
  return { success: false, errors: result.error.issues };
}

export function safeValidateUpdateProgramme(data: unknown): {
  success: boolean;
  data?: UpdateProgrammeInput;
  errors?: z.ZodIssue[];
} {
  const result = updateProgrammeSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error.issues };
}