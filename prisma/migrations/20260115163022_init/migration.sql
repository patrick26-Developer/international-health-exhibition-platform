-- CreateEnum
CREATE TYPE "TypeUtilisateur" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'PARTENAIRE', 'EXPOSANT', 'BENEVOLE', 'VISITEUR', 'MEDIA');

-- CreateEnum
CREATE TYPE "StatutCompte" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU', 'EN_ATTENTE_VERIFICATION', 'SUPPRIME');

-- CreateEnum
CREATE TYPE "StatutEdition" AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "TypeProgramme" AS ENUM ('SPORT_SANTE', 'NUTRITION', 'BIEN_ETRE', 'PREVENTION_MNT', 'SANTE_MENTALE');

-- CreateEnum
CREATE TYPE "TypeMedia" AS ENUM ('PHOTO', 'VIDEO', 'DOCUMENT', 'COMMUNIQUE_PRESSE', 'INFOGRAPHIE', 'RAPPORT');

-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('INFO', 'SUCCES', 'AVERTISSEMENT', 'ERREUR', 'ACTION_REQUISE');

-- CreateEnum
CREATE TYPE "TypeOTP" AS ENUM ('VERIFICATION_EMAIL', 'REINITIALISATION_MDP', 'CHANGEMENT_EMAIL', 'SUPPRESSION_COMPTE');

-- CreateEnum
CREATE TYPE "StatutOTP" AS ENUM ('EN_ATTENTE', 'VERIFIE', 'EXPIRE', 'ANNULE');

-- CreateEnum
CREATE TYPE "ActionAudit" AS ENUM ('CREATION', 'MODIFICATION', 'SUPPRESSION', 'CONNEXION', 'DECONNEXION', 'INSCRIPTION', 'VERIFICATION_EMAIL', 'REINITIALISATION_MDP', 'CHANGEMENT_EMAIL', 'CHANGEMENT_MDP', 'APPROBATION', 'REJET', 'PUBLICATION');

-- CreateEnum
CREATE TYPE "TypeInscription" AS ENUM ('VISITEUR', 'EXPOSANT', 'BENEVOLE');

-- CreateEnum
CREATE TYPE "StatutInscription" AS ENUM ('EN_ATTENTE', 'VALIDEE', 'REFUSEE', 'ANNULEE');

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT,
    "pays" TEXT,
    "ville" TEXT,
    "adresse" TEXT,
    "codePostal" TEXT,
    "langue" TEXT NOT NULL DEFAULT 'fr',
    "typeUtilisateur" "TypeUtilisateur" NOT NULL DEFAULT 'VISITEUR',
    "statutCompte" "StatutCompte" NOT NULL DEFAULT 'EN_ATTENTE_VERIFICATION',
    "emailVerifie" BOOLEAN NOT NULL DEFAULT false,
    "dateVerificationEmail" TIMESTAMP(3),
    "derniereConnexion" TIMESTAMP(3),
    "adresseIPConnexion" TEXT,
    "tentativesEchouees" INTEGER NOT NULL DEFAULT 0,
    "compteBloqueLe" TIMESTAMP(3),
    "raisonBlocage" TEXT,
    "photoProfil" TEXT,
    "biographie" TEXT,
    "siteWeb" TEXT,
    "organisation" TEXT,
    "poste" TEXT,
    "reseauxSociaux" JSONB,
    "accepteNewsletter" BOOLEAN NOT NULL DEFAULT true,
    "accepteNotifications" BOOLEAN NOT NULL DEFAULT true,
    "notificationsSMS" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "dateSuppression" TIMESTAMP(3),
    "derniereActivite" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "type" "TypeOTP" NOT NULL,
    "code" TEXT NOT NULL,
    "destinataire" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "tentatives" INTEGER NOT NULL DEFAULT 0,
    "statut" "StatutOTP" NOT NULL DEFAULT 'EN_ATTENTE',
    "metadata" JSONB,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUtilisation" TIMESTAMP(3),

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "jeton" TEXT NOT NULL,
    "jetonRafraichi" TEXT,
    "adresseIP" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "dernierAcces" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estActive" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historique_connexions" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "adresseIP" TEXT,
    "userAgent" TEXT,
    "reussi" BOOLEAN NOT NULL DEFAULT true,
    "raisonEchec" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historique_connexions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historique_mdp" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "hashMDP" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historique_mdp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activites_utilisateurs" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,
    "adresseIP" TEXT,
    "userAgent" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activites_utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journaux_audit" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT,
    "action" "ActionAudit" NOT NULL,
    "entite" TEXT NOT NULL,
    "entiteId" TEXT,
    "modifications" JSONB,
    "adresseIP" TEXT,
    "userAgent" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journaux_audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_attente_email" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "destinataire" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "contenuHTML" TEXT NOT NULL,
    "contenuText" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "tentatives" INTEGER NOT NULL DEFAULT 0,
    "erreur" TEXT,
    "messageId" TEXT,
    "otpId" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnvoi" TIMESTAMP(3),
    "prochainEssai" TIMESTAMP(3),

    CONSTRAINT "file_attente_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editions" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "lieu" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "thematique" TEXT,
    "statut" "StatutEdition" NOT NULL DEFAULT 'PLANIFIEE',
    "maxVisiteurs" INTEGER,
    "maxExposants" INTEGER,
    "maxBenevoles" INTEGER,
    "siteWeb" TEXT,
    "emailContact" TEXT,
    "telephoneContact" TEXT,
    "estPublique" BOOLEAN NOT NULL DEFAULT true,
    "estArchivee" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bilans_editions" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "nombreVisiteurs" INTEGER NOT NULL,
    "nombreExposants" INTEGER NOT NULL,
    "nombreBenevoles" INTEGER NOT NULL,
    "actionsSensibilisation" INTEGER NOT NULL,
    "partenariatsActifs" INTEGER NOT NULL,
    "retombeesSociales" TEXT,
    "retombeesSanitaires" TEXT,
    "satisfactionMoyenne" DOUBLE PRECISION,
    "recommandation" INTEGER,
    "datePublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bilans_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscriptions" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "typeInscription" "TypeInscription" NOT NULL,
    "statut" "StatutInscription" NOT NULL DEFAULT 'EN_ATTENTE',
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateValidation" TIMESTAMP(3),
    "commentaire" TEXT,
    "centresInteret" JSONB,
    "nomOrganisation" TEXT,
    "secteurActivite" TEXT,
    "competences" TEXT,
    "disponibilites" JSONB,

    CONSTRAINT "inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exposants" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "nomOrganisation" TEXT NOT NULL,
    "typeOrganisation" TEXT NOT NULL,
    "secteurActivite" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "emplacementStand" TEXT,
    "numeroStand" TEXT,
    "siteWeb" TEXT,
    "personneContact" TEXT,
    "emailContact" TEXT,
    "telephoneContact" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "estPaye" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exposants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benevoles" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "competences" TEXT,
    "disponibilites" JSONB,
    "tachesPreferees" TEXT,
    "missionsAssignees" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CANDIDAT',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "benevoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partenaires" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "nomOrganisation" TEXT NOT NULL,
    "typePartenaire" TEXT NOT NULL,
    "niveauPartenariat" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "siteWeb" TEXT,
    "personneContact" TEXT,
    "emailContact" TEXT,
    "telephoneContact" TEXT,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "afficherSurSite" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partenaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programmes_editions" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "type" "TypeProgramme" NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT,
    "intervenants" JSONB,
    "maxParticipants" INTEGER,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programmes_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "typeMedia" "TypeMedia" NOT NULL,
    "url" TEXT NOT NULL,
    "miniature" TEXT,
    "editionId" TEXT,
    "auteurId" TEXT NOT NULL,
    "estPublic" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "lue" BOOLEAN NOT NULL DEFAULT false,
    "lien" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLecture" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configs_email" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'nodemailer',
    "host" TEXT,
    "port" INTEGER,
    "secure" BOOLEAN DEFAULT false,
    "auth" JSONB,
    "senderEmail" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "estActif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configs_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametres" (
    "id" TEXT NOT NULL,
    "cle" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "description" TEXT,
    "estPublic" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parametres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistiques" (
    "id" TEXT NOT NULL,
    "editionId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombreVisiteurs" INTEGER NOT NULL DEFAULT 0,
    "nombreInscriptions" INTEGER NOT NULL DEFAULT 0,
    "inscriptionsExposants" INTEGER NOT NULL DEFAULT 0,
    "inscriptionsBenevoles" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "statistiques_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_telephone_key" ON "utilisateurs"("telephone");

-- CreateIndex
CREATE INDEX "utilisateurs_email_idx" ON "utilisateurs"("email");

-- CreateIndex
CREATE INDEX "utilisateurs_telephone_idx" ON "utilisateurs"("telephone");

-- CreateIndex
CREATE INDEX "utilisateurs_typeUtilisateur_idx" ON "utilisateurs"("typeUtilisateur");

-- CreateIndex
CREATE INDEX "utilisateurs_statutCompte_idx" ON "utilisateurs"("statutCompte");

-- CreateIndex
CREATE INDEX "utilisateurs_emailVerifie_idx" ON "utilisateurs"("emailVerifie");

-- CreateIndex
CREATE INDEX "otps_utilisateurId_idx" ON "otps"("utilisateurId");

-- CreateIndex
CREATE INDEX "otps_code_idx" ON "otps"("code");

-- CreateIndex
CREATE INDEX "otps_destinataire_idx" ON "otps"("destinataire");

-- CreateIndex
CREATE INDEX "otps_type_idx" ON "otps"("type");

-- CreateIndex
CREATE INDEX "otps_expiresAt_idx" ON "otps"("expiresAt");

-- CreateIndex
CREATE INDEX "otps_statut_idx" ON "otps"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_jeton_key" ON "sessions"("jeton");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_jetonRafraichi_key" ON "sessions"("jetonRafraichi");

-- CreateIndex
CREATE INDEX "sessions_utilisateurId_idx" ON "sessions"("utilisateurId");

-- CreateIndex
CREATE INDEX "sessions_jeton_idx" ON "sessions"("jeton");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "historique_connexions_utilisateurId_idx" ON "historique_connexions"("utilisateurId");

-- CreateIndex
CREATE INDEX "historique_connexions_reussi_idx" ON "historique_connexions"("reussi");

-- CreateIndex
CREATE INDEX "historique_connexions_dateCreation_idx" ON "historique_connexions"("dateCreation");

-- CreateIndex
CREATE INDEX "historique_mdp_utilisateurId_idx" ON "historique_mdp"("utilisateurId");

-- CreateIndex
CREATE INDEX "activites_utilisateurs_utilisateurId_idx" ON "activites_utilisateurs"("utilisateurId");

-- CreateIndex
CREATE INDEX "activites_utilisateurs_action_idx" ON "activites_utilisateurs"("action");

-- CreateIndex
CREATE INDEX "journaux_audit_utilisateurId_idx" ON "journaux_audit"("utilisateurId");

-- CreateIndex
CREATE INDEX "journaux_audit_action_idx" ON "journaux_audit"("action");

-- CreateIndex
CREATE INDEX "journaux_audit_entite_idx" ON "journaux_audit"("entite");

-- CreateIndex
CREATE INDEX "journaux_audit_dateCreation_idx" ON "journaux_audit"("dateCreation");

-- CreateIndex
CREATE INDEX "file_attente_email_destinataire_idx" ON "file_attente_email"("destinataire");

-- CreateIndex
CREATE INDEX "file_attente_email_statut_idx" ON "file_attente_email"("statut");

-- CreateIndex
CREATE INDEX "file_attente_email_type_idx" ON "file_attente_email"("type");

-- CreateIndex
CREATE INDEX "file_attente_email_dateCreation_idx" ON "file_attente_email"("dateCreation");

-- CreateIndex
CREATE UNIQUE INDEX "editions_slug_key" ON "editions"("slug");

-- CreateIndex
CREATE INDEX "editions_slug_idx" ON "editions"("slug");

-- CreateIndex
CREATE INDEX "editions_statut_idx" ON "editions"("statut");

-- CreateIndex
CREATE INDEX "editions_dateDebut_idx" ON "editions"("dateDebut");

-- CreateIndex
CREATE UNIQUE INDEX "bilans_editions_editionId_key" ON "bilans_editions"("editionId");

-- CreateIndex
CREATE INDEX "inscriptions_utilisateurId_idx" ON "inscriptions"("utilisateurId");

-- CreateIndex
CREATE INDEX "inscriptions_editionId_idx" ON "inscriptions"("editionId");

-- CreateIndex
CREATE INDEX "inscriptions_statut_idx" ON "inscriptions"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "inscriptions_utilisateurId_editionId_typeInscription_key" ON "inscriptions"("utilisateurId", "editionId", "typeInscription");

-- CreateIndex
CREATE INDEX "exposants_utilisateurId_idx" ON "exposants"("utilisateurId");

-- CreateIndex
CREATE INDEX "exposants_editionId_idx" ON "exposants"("editionId");

-- CreateIndex
CREATE UNIQUE INDEX "exposants_utilisateurId_editionId_key" ON "exposants"("utilisateurId", "editionId");

-- CreateIndex
CREATE INDEX "benevoles_utilisateurId_idx" ON "benevoles"("utilisateurId");

-- CreateIndex
CREATE INDEX "benevoles_editionId_idx" ON "benevoles"("editionId");

-- CreateIndex
CREATE UNIQUE INDEX "benevoles_utilisateurId_editionId_key" ON "benevoles"("utilisateurId", "editionId");

-- CreateIndex
CREATE UNIQUE INDEX "partenaires_utilisateurId_key" ON "partenaires"("utilisateurId");

-- CreateIndex
CREATE INDEX "partenaires_utilisateurId_idx" ON "partenaires"("utilisateurId");

-- CreateIndex
CREATE INDEX "programmes_editions_editionId_idx" ON "programmes_editions"("editionId");

-- CreateIndex
CREATE INDEX "programmes_editions_type_idx" ON "programmes_editions"("type");

-- CreateIndex
CREATE INDEX "medias_auteurId_idx" ON "medias"("auteurId");

-- CreateIndex
CREATE INDEX "medias_editionId_idx" ON "medias"("editionId");

-- CreateIndex
CREATE INDEX "notifications_utilisateurId_idx" ON "notifications"("utilisateurId");

-- CreateIndex
CREATE INDEX "notifications_lue_idx" ON "notifications"("lue");

-- CreateIndex
CREATE UNIQUE INDEX "parametres_cle_key" ON "parametres"("cle");

-- CreateIndex
CREATE INDEX "parametres_cle_idx" ON "parametres"("cle");

-- CreateIndex
CREATE INDEX "statistiques_editionId_idx" ON "statistiques"("editionId");

-- CreateIndex
CREATE INDEX "statistiques_date_idx" ON "statistiques"("date");

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historique_connexions" ADD CONSTRAINT "historique_connexions_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historique_mdp" ADD CONSTRAINT "historique_mdp_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_utilisateurs" ADD CONSTRAINT "activites_utilisateurs_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journaux_audit" ADD CONSTRAINT "journaux_audit_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bilans_editions" ADD CONSTRAINT "bilans_editions_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscriptions" ADD CONSTRAINT "inscriptions_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscriptions" ADD CONSTRAINT "inscriptions_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exposants" ADD CONSTRAINT "exposants_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exposants" ADD CONSTRAINT "exposants_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benevoles" ADD CONSTRAINT "benevoles_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benevoles" ADD CONSTRAINT "benevoles_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partenaires" ADD CONSTRAINT "partenaires_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programmes_editions" ADD CONSTRAINT "programmes_editions_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistiques" ADD CONSTRAINT "statistiques_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
