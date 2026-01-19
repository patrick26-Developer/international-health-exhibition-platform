// lib/validation/notification-schema.ts
// lib/validation/notification-schema.ts
import { z } from 'zod';

// ============================================
// ENUMS & TYPES
// ============================================

export const TypeNotificationEnum = z.enum([
  'INFO',
  'SUCCES',
  'AVERTISSEMENT',
  'ERREUR',
  'ACTION_REQUISE',
] as const);

export type TypeNotification = z.infer<typeof TypeNotificationEnum>;

// ============================================
// SCHÉMAS DE VALIDATION
// ============================================

/**
 * Schéma pour créer une notification
 */
export const createNotificationSchema = z.object({
  utilisateurId: z.string()
    .cuid('ID utilisateur invalide'),
  
  type: TypeNotificationEnum,
  
  titre: z.string()
    .min(1, 'Le titre est requis')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  message: z.string()
    .min(1, 'Le message est requis')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
  
  lien: z.string()
    .url('URL invalide')
    .optional()
    .nullable(),
}).strict();

/**
 * Schéma pour marquer comme lue
 */
export const markAsReadSchema = z.object({
  notificationId: z.string()
    .cuid('ID notification invalide'),
}).strict();

/**
 * Schéma pour marquer plusieurs comme lues
 */
export const markMultipleAsReadSchema = z.object({
  notificationIds: z.array(z.string().cuid('ID notification invalide'))
    .min(1, 'Au moins une notification doit être fournie')
    .max(100, 'Maximum 100 notifications à la fois'),
}).strict();

/**
 * Schéma pour filtres de recherche
 */
export const notificationFiltersSchema = z.object({
  type: TypeNotificationEnum.optional(),
  
  lue: z.boolean().optional(),
  
  dateMin: z.string()
    .datetime('Date invalide')
    .optional(),
  
  dateMax: z.string()
    .datetime('Date invalide')
    .optional(),
  
  page: z.number()
    .int('La page doit être un nombre entier')
    .min(1, 'La page doit être au moins 1')
    .optional()
    .default(1),
  
  limit: z.number()
    .int('La limite doit être un nombre entier')
    .min(1, 'La limite doit être au moins 1')
    .max(100, 'La limite ne peut pas dépasser 100')
    .optional()
    .default(20),
}).strict();

/**
 * Schéma pour envoi de notification par email
 */
export const sendNotificationEmailSchema = z.object({
  utilisateurId: z.string()
    .cuid('ID utilisateur invalide'),
  
  type: TypeNotificationEnum,
  
  titre: z.string()
    .min(1, 'Le titre est requis')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  message: z.string()
    .min(1, 'Le message est requis')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
  
  lien: z.string()
    .url('URL invalide')
    .optional(),
  
  envoyerEmail: z.boolean()
    .default(false),
  
  envoyerSMS: z.boolean()
    .default(false),
}).strict();

// ============================================
// TYPE INFERENCE
// ============================================

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type MarkAsReadInput = z.infer<typeof markAsReadSchema>;
export type MarkMultipleAsReadInput = z.infer<typeof markMultipleAsReadSchema>;
export type NotificationFiltersInput = z.infer<typeof notificationFiltersSchema>;
export type SendNotificationEmailInput = z.infer<typeof sendNotificationEmailSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

export function validateCreateNotification(data: unknown) {
  return createNotificationSchema.safeParse(data);
}

export function validateMarkAsRead(data: unknown) {
  return markAsReadSchema.safeParse(data);
}

export function validateMarkMultipleAsRead(data: unknown) {
  return markMultipleAsReadSchema.safeParse(data);
}

export function validateNotificationFilters(data: unknown) {
  return notificationFiltersSchema.safeParse(data);
}

export function validateSendNotificationEmail(data: unknown) {
  return sendNotificationEmailSchema.safeParse(data);
}

// ============================================
// HELPERS
// ============================================

/**
 * Obtenir l'icône pour un type de notification
 */
export function getNotificationIcon(type: TypeNotification): string {
  const icons: Record<TypeNotification, string> = {
    INFO: '📢',
    SUCCES: '✅',
    AVERTISSEMENT: '⚠️',
    ERREUR: '❌',
    ACTION_REQUISE: '🔔',
  };
  
  return icons[type] || '📢';
}

/**
 * Obtenir la couleur pour un type de notification
 */
export function getNotificationColor(type: TypeNotification): string {
  const colors: Record<TypeNotification, string> = {
    INFO: 'blue',
    SUCCES: 'green',
    AVERTISSEMENT: 'yellow',
    ERREUR: 'red',
    ACTION_REQUISE: 'purple',
  };
  
  return colors[type] || 'blue';
}

/**
 * Obtenir la priorité d'une notification
 */
export function getNotificationPriority(type: TypeNotification): number {
  const priorities: Record<TypeNotification, number> = {
    ERREUR: 4,
    ACTION_REQUISE: 3,
    AVERTISSEMENT: 2,
    SUCCES: 1,
    INFO: 0,
  };
  
  return priorities[type] || 0;
}