// lib/validation/edition-schema.ts - CORRIGÉ (conforme au schéma Prisma)
import { z } from 'zod';

// ============================================
// SCHÉMA DE CRÉATION
// ============================================

export const createEditionSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  slug: z.string()
    .min(2, 'Le slug doit contenir au moins 2 caractères')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Format de slug invalide'),
  ville: z.string()
    .min(2, 'La ville doit contenir au moins 2 caractères')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  pays: z.string()
    .min(2, 'Le pays doit contenir au moins 2 caractères')
    .max(100, 'Le pays ne peut pas dépasser 100 caractères'),
  lieu: z.string().max(200, 'Le lieu ne peut pas dépasser 200 caractères').optional(),
  dateDebut: z.string().datetime('Date de début invalide'),
  dateFin: z.string().datetime('Date de fin invalide'),
  dateFinInscriptions: z.string().datetime('Date de fin d\'inscriptions invalide').optional(),
  description: z.string().max(2000, 'La description ne peut pas dépasser 2000 caractères').optional(),
  thematique: z.string().max(200, 'La thématique ne peut pas dépasser 200 caractères').optional(),
  
  // ✅ CORRIGÉ : Noms conformes au schéma Prisma
  capaciteEstimeeVisiteurs: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  capaciteEstimeeExposants: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  capaciteEstimeeBenevoles: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  
  siteWeb: z.string().url('URL invalide').optional(),
  emailContact: z.string().email('Email invalide').optional(),
  telephoneContact: z.string().max(20, 'Téléphone trop long').optional(),
  estPublique: z.boolean().optional(),
}).refine((data) => new Date(data.dateDebut) < new Date(data.dateFin), {
  message: 'La date de fin doit être après la date de début',
  path: ['dateFin'],
});

// ============================================
// SCHÉMA DE MISE À JOUR
// ============================================

export const updateEditionSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .optional(),
  slug: z.string()
    .min(2, 'Le slug doit contenir au moins 2 caractères')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Format de slug invalide')
    .optional(),
  ville: z.string()
    .min(2, 'La ville doit contenir au moins 2 caractères')
    .max(100, 'La ville ne peut pas dépasser 100 caractères')
    .optional(),
  pays: z.string()
    .min(2, 'Le pays doit contenir au moins 2 caractères')
    .max(100, 'Le pays ne peut pas dépasser 100 caractères')
    .optional(),
  lieu: z.string().max(200, 'Le lieu ne peut pas dépasser 200 caractères').optional(),
  dateDebut: z.string().datetime('Date de début invalide').optional(),
  dateFin: z.string().datetime('Date de fin invalide').optional(),
  dateFinInscriptions: z.string().datetime('Date de fin d\'inscriptions invalide').optional(),
  description: z.string().max(2000, 'La description ne peut pas dépasser 2000 caractères').optional(),
  thematique: z.string().max(200, 'La thématique ne peut pas dépasser 200 caractères').optional(),
  
  // ✅ CORRIGÉ : Noms conformes au schéma Prisma
  capaciteEstimeeVisiteurs: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  capaciteEstimeeExposants: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  capaciteEstimeeBenevoles: z.number().int().min(0, 'Doit être un nombre positif ou zéro').optional(),
  
  siteWeb: z.string().url('URL invalide').optional(),
  emailContact: z.string().email('Email invalide').optional(),
  telephoneContact: z.string().max(20, 'Téléphone trop long').optional(),
  estPublique: z.boolean().optional(),
  statut: z.enum([
    'BROUILLON',
    'INSCRIPTIONS_OUVERTES',
    'INSCRIPTIONS_FERMEES',
    'PLANIFIEE',
    'EN_COURS',
    'TERMINEE',
    'ANNULEE',
  ] as const).optional(),
}).refine(
  (data) => {
    if (data.dateDebut && data.dateFin) {
      return new Date(data.dateDebut) < new Date(data.dateFin);
    }
    return true;
  },
  {
    message: 'La date de fin doit être après la date de début',
    path: ['dateFin'],
  }
);

// ============================================
// TYPE INFERENCE
// ============================================

export type CreateEditionInput = z.infer<typeof createEditionSchema>;
export type UpdateEditionInput = z.infer<typeof updateEditionSchema>;

// ============================================
// FONCTIONS DE VALIDATION
// ============================================

/**
 * Valide les données de création d'édition
 * ✅ Retourne un objet conforme au schéma Prisma
 */
export function validateCreateEdition(data: unknown) {
  const parsed = createEditionSchema.parse(data);
  
  return {
    nom: parsed.nom,
    slug: parsed.slug,
    ville: parsed.ville,
    pays: parsed.pays,
    lieu: parsed.lieu,
    dateDebut: new Date(parsed.dateDebut),
    dateFin: new Date(parsed.dateFin),
    dateFinInscriptions: parsed.dateFinInscriptions ? new Date(parsed.dateFinInscriptions) : undefined,
    description: parsed.description,
    thematique: parsed.thematique,
    capaciteEstimeeVisiteurs: parsed.capaciteEstimeeVisiteurs,
    capaciteEstimeeExposants: parsed.capaciteEstimeeExposants,
    capaciteEstimeeBenevoles: parsed.capaciteEstimeeBenevoles,
    siteWeb: parsed.siteWeb,
    emailContact: parsed.emailContact,
    telephoneContact: parsed.telephoneContact,
    estPublique: parsed.estPublique,
  };
}

/**
 * Valide les données de mise à jour d'édition
 * ✅ Retourne un objet conforme au schéma Prisma
 */
export function validateUpdateEdition(data: unknown) {
  const parsed = updateEditionSchema.parse(data);
  
  const result: Record<string, unknown> = {};
  
  if (parsed.nom !== undefined) result.nom = parsed.nom;
  if (parsed.slug !== undefined) result.slug = parsed.slug;
  if (parsed.ville !== undefined) result.ville = parsed.ville;
  if (parsed.pays !== undefined) result.pays = parsed.pays;
  if (parsed.lieu !== undefined) result.lieu = parsed.lieu;
  if (parsed.dateDebut !== undefined) result.dateDebut = new Date(parsed.dateDebut);
  if (parsed.dateFin !== undefined) result.dateFin = new Date(parsed.dateFin);
  if (parsed.dateFinInscriptions !== undefined) result.dateFinInscriptions = new Date(parsed.dateFinInscriptions);
  if (parsed.description !== undefined) result.description = parsed.description;
  if (parsed.thematique !== undefined) result.thematique = parsed.thematique;
  if (parsed.capaciteEstimeeVisiteurs !== undefined) result.capaciteEstimeeVisiteurs = parsed.capaciteEstimeeVisiteurs;
  if (parsed.capaciteEstimeeExposants !== undefined) result.capaciteEstimeeExposants = parsed.capaciteEstimeeExposants;
  if (parsed.capaciteEstimeeBenevoles !== undefined) result.capaciteEstimeeBenevoles = parsed.capaciteEstimeeBenevoles;
  if (parsed.siteWeb !== undefined) result.siteWeb = parsed.siteWeb;
  if (parsed.emailContact !== undefined) result.emailContact = parsed.emailContact;
  if (parsed.telephoneContact !== undefined) result.telephoneContact = parsed.telephoneContact;
  if (parsed.estPublique !== undefined) result.estPublique = parsed.estPublique;
  if (parsed.statut !== undefined) result.statut = parsed.statut;
  
  return result;
}