import { z } from 'zod';
import { TypeMedia } from '@/lib/generated/prisma/client';

// Types de fichiers autorisés avec taille max
const ALLOWED_MIME_TYPES: Record<TypeMedia, readonly string[]> = {
  PHOTO: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel'],
  COMMUNIQUE_PRESSE: ['application/pdf'],
  INFOGRAPHIE: ['image/svg+xml', 'application/pdf'],
  RAPPORT: ['application/pdf', 'application/vnd.ms-word'],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Schema pour upload via FormData
export const uploadMediaSchema = z.object({
  titre: z.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  description: z.string()
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .optional(),
  
  typeMedia: z.nativeEnum(TypeMedia),
  
  editionId: z.string()
    .cuid('ID édition invalide')
    .optional()
    .nullable(),
  
  estPublic: z.boolean()
    .optional()
    .default(true),
}).strict();

// Schema pour création depuis URL
export const createMediaSchema = z.object({
  titre: z.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  description: z.string()
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .optional(),
  
  typeMedia: z.nativeEnum(TypeMedia),
  
  url: z.string()
    .url('URL invalide'),
  
  miniature: z.string()
    .url('URL de miniature invalide')
    .optional(),
  
  editionId: z.string()
    .cuid('ID édition invalide')
    .optional()
    .nullable(),
  
  auteurId: z.string()
    .cuid('ID auteur invalide'),
  
  estPublic: z.boolean()
    .optional()
    .default(true),
}).strict();

// Schema pour mise à jour
export const updateMediaSchema = z.object({
  titre: z.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères')
    .optional(),
  
  description: z.string()
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .optional(),
  
  typeMedia: z.nativeEnum(TypeMedia)
    .optional(),
  
  miniature: z.string()
    .url('URL de miniature invalide')
    .optional(),
  
  estPublic: z.boolean()
    .optional(),
}).strict();

// Types
export type UploadMediaInput = z.infer<typeof uploadMediaSchema>;
export type CreateMediaInput = z.infer<typeof createMediaSchema>;
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;

// Fonctions de validation
export function validateUploadMedia(data: unknown) {
  return uploadMediaSchema.safeParse(data);
}

export function validateCreateMedia(data: unknown) {
  return createMediaSchema.safeParse(data);
}

export function validateUpdateMedia(data: unknown) {
  return updateMediaSchema.safeParse(data);
}

// Validation de fichier avec type safe
export function validateMediaFile(file: File, typeMedia: TypeMedia): {
  success: boolean;
  error?: string;
} {
  // Taille
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `Le fichier est trop volumineux (max: ${MAX_FILE_SIZE / 1024 / 1024}MB)`,
    };
  }
  
  // Type MIME
  const allowedTypes = ALLOWED_MIME_TYPES[typeMedia];
  if (!allowedTypes.includes(file.type as any)) {
    return {
      success: false,
      error: `Type de fichier non autorisé pour ${typeMedia}. Types autorisés: ${allowedTypes.join(', ')}`,
    };
  }
  
  return { success: true };
}