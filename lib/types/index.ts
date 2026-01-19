// types/index.ts
/**
 * Export centralisé de TOUS les types du projet S.I.S.
 * Import organisé : import type { UtilisateurPublic, EditionPublique } from '@/lib/types'
 */

// ============================================
// TYPES UTILISATEUR
// ============================================
export type {
  UtilisateurComplet,
  UtilisateurPublic,
  ProfilUtilisateur,
  ReseauxSociaux,
  PreferencesUtilisateur,
  CreateUtilisateurDTO,
  UpdateProfilDTO,
  UpdatePreferencesDTO,
  InfoConnexion,
  TentativeConnexion,
  HistoriqueConnexionItem,
  SessionUtilisateur,
  SessionClient,
  JWTPayload,
  StatistiquesUtilisateur,
} from './user';

export {
  estUtilisateurActif,
  peutSeConnecter,
  estAdmin,
} from './user';

// ============================================
// TYPES AUTHENTIFICATION
// ============================================
export type {
  InscriptionRequest,
  ConnexionRequest,
  AuthResponse,
  AuthError,
  AuthErrorCode,
  OTPComplet,
  GenererOTPRequest,
  OTPMetadata,
  VerifierOTPRequest,
  VerifierOTPResponse,
  OTPEmailData,
  MotDePasseOublieRequest,
  ReinitialisationMDPRequest,
  ChangementMDPRequest,
  PolitiqueMotDePasse,
  SessionContext,
  SessionOptions,
  VerificationEmailRequest,
  RenvoiCodeRequest,
  ChangementEmailRequest,
  ConfirmationChangementEmailRequest,
  EvenementAuth,
  EvenementAuthType,
} from './auth';

export {
  estAuthSuccess,
  estAuthError,
  estOTPValide,
  estOTPExpire,
} from './auth';

// ============================================
// TYPES API
// ============================================
export type {
  APISuccessResponse,
  APIErrorResponse,
  APIResponse,
  ResponseMetadata,
  PaginationParams,
  PaginatedResponse,
  PaginationInfo,
  SearchParams,
  SearchResult,
  ValidationError,
  ValidationErrorCode,
  UploadedFile,
  UploadResponse,
  UploadConfig,
  HTTPMethod,
  HTTPStatus,
  RequestHeaders,
  RouteParams,
  QueryParams,
  APIContext,
} from './api';

export {
  estAPISuccess,
  estAPIError,
  creerSuccessResponse,
  creerErrorResponse,
  creerPaginatedResponse,
} from './api';

// ============================================
// TYPES ÉDITION
// ============================================
export type {
  EditionComplete,
  EditionAvecRelations,
  EditionPublique,
  EditionResume,
  CreateEditionDTO,
  UpdateEditionDTO,
  BilanEditionComplet,
  CreateBilanDTO,
  BilanPublic,
  StatistiquesEdition,
  CapacitesEdition,
  FiltresEdition,
  TriEdition,
} from './edition';

export {
  estEditionEnCours,
  estEditionTerminee,
  estEditionAVenir,
  inscriptionsOuvertes,
  capaciteAtteinte,
} from './edition';

// ============================================
// TYPES INSCRIPTION
// ============================================
export type {
  InscriptionComplete,
  InscriptionAvecRelations,
  InscriptionPublique,
  InscriptionBaseDTO,
  InscriptionVisiteurDTO,
  InscriptionExposantDTO,
  InscriptionBenevoleDTO,
  CreateInscriptionDTO,
  CentresInteret,
  TypeOrganisation,
  Disponibilites,
  JourDisponible,
  CreneauHoraire,
  NiveauFlexibilite,
  ValiderInscriptionDTO,
  RefuserInscriptionDTO,
  AnnulerInscriptionDTO,
  StatistiquesInscriptions,
  EvolutionMensuelle,
  FiltresInscription,
  TriInscription,
} from './inscription';

export {
  estInscriptionValidee,
  estInscriptionEnAttente,
  peutAnnulerInscription,
  estInscriptionVisiteur,
  estInscriptionExposant,
  estInscriptionBenevole,
} from './inscription';

// ============================================
// TYPES EXPOSANT
// ============================================
export type {
  ExposantComplet,
  ExposantAvecRelations,
  ExposantPublic,
  ExposantListe,
  CreateExposantDTO,
  UpdateExposantDTO,
  ApprouverExposantDTO,
  RefuserExposantDTO,
  InformationsStand,
  DemandeAttributionStand,
  StatistiquesExposants,
  ProfilSecteur,
  FiltresExposant,
  TriExposant,
  ExposantCatalogue,
  ContactsExposant,
  CategorieExposants,
} from './exposant';

export {
  estExposantApprouve,
  aStandAttribue,
} from './exposant';

// ============================================
// TYPES BÉNÉVOLE
// ============================================
export type {
  BenevoleComplet,
  BenevoleAvecRelations,
  BenevolePublic,
  CreateBenevoleDTO,
  UpdateBenevoleDTO,
  StatutBenevole,
  MissionBenevole,
  AssignerMissionDTO,
  PlanningBenevole,
  CompetenceBenevole,
  CategorieCompetence,
  NiveauExperience,
  EvaluationBenevole,
  EvaluerBenevoleDTO,
  StatistiquesBenevoles,
  RapportActiviteBenevole,
  FiltresBenevole,
  TriBenevole,
} from './benevole';

export {
  estBenevoleAccepte,
  aMissionsAssignees,
  estBenevoleDisponible,
} from './benevole';

// ============================================
// TYPES PARTENAIRE
// ============================================
export type {
  PartenaireComplet,
  PartenaireAvecRelations,
  PartenairePublic,
  TypePartenaire,
  NiveauPartenariat,
  CreatePartenaireDTO,
  UpdatePartenaireDTO,
  AvantagesPartenariat,
  PackagePartenariat,
  ContratPartenariat,
  StatutContrat,
  StatistiquesPartenaires,
  RapportActivitePartenaire,
  FiltresPartenaire,
  TriPartenaire,
  PartenaireCatalogue,
  GroupePartenaires,
} from './partenaire';

export {
  estPartenaireActif,
  partenaireExpireBientot,
} from './partenaire';

// ============================================
// TYPES AUTRES (Programmes, Médias, etc.)
// ============================================
export type {
  ProgrammeComplet,
  ProgrammePublic,
  CreateProgrammeDTO,
  Intervenant,
  MediaComplet,
  MediaPublic,
  UploadMediaDTO,
  GalerieMedia,
  NotificationComplete,
  CreateNotificationDTO,
  NotificationsNonLues,
  EmailEnAttente,
  TypeEmail,
  EnvoyerEmailDTO,
  TemplateEmail,
  TemplateEmailData,
  JournalAuditComplet,
  CreateAuditDTO,
  ModificationsAudit,
  RapportAudit,
  ConfigEmailComplete,
  ParametreSysteme,
  UpsertParametreDTO,
  ConfigurationApp,
  StatistiqueComplete,
  CreateStatistiqueDTO,
  TableauBordStatistiques,
  TendanceJournaliere,
  TendanceMensuelle,
} from './autres';

export {
  estNotificationLue,
  estEmailEnvoye,
  estEmailEchec,
} from './autres';

// ============================================
// TYPES PRISMA (ré-export pour facilité)
// ============================================
export type {
  TypeUtilisateur,
  StatutCompte,
  TypeOTP,
  StatutOTP,
  TypeInscription,
  StatutInscription,
  StatutEdition,
  TypeProgramme,
  TypeMedia,
  TypeNotification,
  ActionAudit,
  Utilisateur,
  Session,
  OTP,
  Edition,
  Inscription,
  Partenaire,
  Exposant,
  Benevole,
  ProgrammeEdition,
  Media,
  Notification,
  FileAttenteEmail,
  JournalAudit,
  ConfigEmail,
  Parametre,
  Statistique,
  BilanEdition,
} from '../generated/prisma/client';