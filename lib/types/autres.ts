// types/autres.ts
/**
 * Types strictement typés pour Programmes, Médias, Notifications, Emails, Audit, Config
 * Cohérent avec le schéma Prisma
 */

import type {
  TypeProgramme,
  TypeMedia,
  TypeNotification,
  ActionAudit,
  ProgrammeEdition as PrismaProgrammeEdition,
  Media as PrismaMedia,
  Notification as PrismaNotification,
  FileAttenteEmail as PrismaFileAttenteEmail,
  JournalAudit as PrismaJournalAudit,
  ConfigEmail as PrismaConfigEmail,
  Parametre as PrismaParametre,
  Statistique as PrismaStatistique,
} from '../generated/prisma/client';

// ============================================
// TYPES PROGRAMME
// ============================================

/**
 * Programme complet
 */
export type ProgrammeComplet = PrismaProgrammeEdition;

/**
 * Programme public
 */
export interface ProgrammePublic {
  readonly id: string;
  readonly type: TypeProgramme;
  readonly titre: string;
  readonly description: string | null;
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly lieu: string | null;
  readonly maxParticipants: number | null;
}

/**
 * Données pour créer un programme
 */
export interface CreateProgrammeDTO {
  readonly editionId: string;
  readonly type: TypeProgramme;
  readonly titre: string;
  readonly description?: string;
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly lieu?: string;
  readonly intervenants?: readonly Intervenant[];
  readonly maxParticipants?: number;
}

/**
 * Intervenant
 */
export interface Intervenant {
  readonly nom: string;
  readonly prenom: string;
  readonly fonction: string;
  readonly organisation?: string;
  readonly biographie?: string;
  readonly photo?: string;
}

// ============================================
// TYPES MEDIA
// ============================================

/**
 * Media complet
 */
export type MediaComplet = PrismaMedia;

/**
 * Media public
 */
export interface MediaPublic {
  readonly id: string;
  readonly titre: string;
  readonly typeMedia: TypeMedia;
  readonly url: string;
  readonly miniature: string | null;
  readonly description: string | null;
}

/**
 * Données pour uploader un média
 */
export interface UploadMediaDTO {
  readonly titre: string;
  readonly description?: string;
  readonly typeMedia: TypeMedia;
  readonly fichier: File;
  readonly editionId?: string;
  readonly auteurId: string;
}

/**
 * Galerie média
 */
export interface GalerieMedia {
  readonly editionId: string;
  readonly photos: readonly MediaPublic[];
  readonly videos: readonly MediaPublic[];
  readonly documents: readonly MediaPublic[];
  readonly total: number;
}

// ============================================
// TYPES NOTIFICATION
// ============================================

/**
 * Notification complète
 */
export type NotificationComplete = PrismaNotification;

/**
 * Données pour créer une notification
 */
export interface CreateNotificationDTO {
  readonly utilisateurId: string;
  readonly type: TypeNotification;
  readonly titre: string;
  readonly message: string;
  readonly lien?: string;
}

/**
 * Notifications non lues
 */
export interface NotificationsNonLues {
  readonly total: number;
  readonly parType: Record<TypeNotification, number>;
  readonly notifications: readonly NotificationComplete[];
}

// ============================================
// TYPES EMAIL
// ============================================

/**
 * Email en file d'attente
 */
export type EmailEnAttente = PrismaFileAttenteEmail;

/**
 * Types d'email
 */
export type TypeEmail =
  | 'VERIFICATION'
  | 'RESET_PASSWORD'
  | 'WELCOME'
  | 'INSCRIPTION_CONFIRMEE'
  | 'INSCRIPTION_REFUSEE'
  | 'NOTIFICATION'
  | 'NEWSLETTER';

/**
 * Données pour envoyer un email
 */
export interface EnvoyerEmailDTO {
  readonly destinataire: string;
  readonly type: TypeEmail;
  readonly sujet: string;
  readonly contenuHTML: string;
  readonly contenuText?: string;
  readonly otpId?: string;
}

/**
 * Template d'email
 */
export interface TemplateEmail {
  readonly type: TypeEmail;
  readonly sujet: string;
  readonly genererHTML: (data: TemplateEmailData) => string;
  readonly genererText: (data: TemplateEmailData) => string;
}

/**
 * Données pour template email
 */
export interface TemplateEmailData {
  readonly destinataire: string;
  readonly prenomUtilisateur?: string;
  readonly [key: string]: string | number | boolean | Date | undefined;
}

// ============================================
// TYPES AUDIT
// ============================================

/**
 * Journal d'audit complet
 */
export type JournalAuditComplet = PrismaJournalAudit;

/**
 * Données pour créer une entrée d'audit
 */
export interface CreateAuditDTO {
  readonly utilisateurId?: string;
  readonly action: ActionAudit;
  readonly entite: string;
  readonly entiteId?: string;
  readonly modifications?: ModificationsAudit;
  readonly adresseIP?: string;
  readonly userAgent?: string;
}

/**
 * Modifications pour audit
 */
export interface ModificationsAudit {
  readonly avant?: Record<string, unknown>;
  readonly apres?: Record<string, unknown>;
}

/**
 * Rapport d'audit
 */
export interface RapportAudit {
  readonly periode: {
    readonly debut: Date;
    readonly fin: Date;
  };
  readonly actions: readonly JournalAuditComplet[];
  readonly statistiques: {
    readonly total: number;
    readonly parAction: Record<ActionAudit, number>;
    readonly parEntite: Record<string, number>;
    readonly parUtilisateur: Record<string, number>;
  };
}

// ============================================
// TYPES CONFIGURATION
// ============================================

/**
 * Configuration email complète
 */
export type ConfigEmailComplete = PrismaConfigEmail;

/**
 * Paramètre système
 */
export type ParametreSysteme = PrismaParametre;

/**
 * Données pour créer/modifier un paramètre
 */
export interface UpsertParametreDTO {
  readonly cle: string;
  readonly valeur: string;
  readonly description?: string;
  readonly estPublic?: boolean;
}

/**
 * Configuration application
 */
export interface ConfigurationApp {
  readonly nom: string;
  readonly description: string;
  readonly version: string;
  readonly maintenance: boolean;
  readonly parametres: Record<string, string>;
}

// ============================================
// TYPES STATISTIQUES
// ============================================

/**
 * Statistique complète
 */
export type StatistiqueComplete = PrismaStatistique;

/**
 * Données pour créer une statistique
 */
export interface CreateStatistiqueDTO {
  readonly editionId?: string;
  readonly nombreVisiteurs?: number;
  readonly nombreInscriptions?: number;
  readonly inscriptionsExposants?: number;
  readonly inscriptionsBenevoles?: number;
}

/**
 * Tableau de bord statistiques
 */
export interface TableauBordStatistiques {
  readonly periode: {
    readonly debut: Date;
    readonly fin: Date;
  };
  readonly metriques: {
    readonly totalUtilisateurs: number;
    readonly totalInscriptions: number;
    readonly totalEditions: number;
    readonly utilisateursActifs: number;
  };
  readonly tendances: {
    readonly inscriptionsParJour: readonly TendanceJournaliere[];
    readonly utilisateursParMois: readonly TendanceMensuelle[];
  };
}

/**
 * Tendance journalière
 */
export interface TendanceJournaliere {
  readonly date: string; // YYYY-MM-DD
  readonly valeur: number;
}

/**
 * Tendance mensuelle
 */
export interface TendanceMensuelle {
  readonly mois: string; // YYYY-MM
  readonly valeur: number;
}

// ============================================
// TYPES GUARDS
// ============================================

/**
 * Vérifie si une notification est lue
 */
export function estNotificationLue(
  notification: Pick<PrismaNotification, 'lue'>
): boolean {
  return notification.lue === true;
}

/**
 * Vérifie si un email a été envoyé
 */
export function estEmailEnvoye(
  email: Pick<PrismaFileAttenteEmail, 'statut'>
): boolean {
  return email.statut === 'ENVOYE';
}

/**
 * Vérifie si un email a échoué
 */
export function estEmailEchec(
  email: Pick<PrismaFileAttenteEmail, 'statut'>
): boolean {
  return email.statut === 'ECHEC';
}