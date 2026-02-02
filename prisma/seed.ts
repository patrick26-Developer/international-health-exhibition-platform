// prisma/seed.ts
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';



async function main() {
  console.log('Début du seed de la base de données...');

  // Nettoyer les données existantes
  console.log('Nettoyage des données existantes...');
  await prisma.inscription.deleteMany();
  await prisma.benevole.deleteMany();
  await prisma.exposant.deleteMany();
  await prisma.partenaire.deleteMany();
  await prisma.media.deleteMany();
  await prisma.programmeEdition.deleteMany();
  await prisma.bilanEdition.deleteMany();
  await prisma.statistique.deleteMany();
  await prisma.edition.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.activiteUtilisateur.deleteMany();
  await prisma.journalAudit.deleteMany();
  await prisma.historiqueMDP.deleteMany();
  await prisma.historiqueConnexion.deleteMany();
  await prisma.oTP.deleteMany();
  await prisma.session.deleteMany();
  await prisma.fileAttenteEmail.deleteMany();
  await prisma.utilisateur.deleteMany();

  // Hash du mot de passe par défaut : "Password123!"
  const defaultPassword = await bcrypt.hash('Password123!', 12);

  // ============================================
  // 1. CRÉER LES UTILISATEURS
  // ============================================
  console.log('Création des utilisateurs...');

  // SUPER ADMIN
  const superAdmin = await prisma.utilisateur.create({
    data: {
      email: 'superadmin@sis.cg',
      motDePasse: defaultPassword,
      prenom: 'Super',
      nom: 'Administrateur',
      telephone: '+242061234567',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'SUPER_ADMIN',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Salon International de la Santé',
      poste: 'Super Administrateur',
    },
  });
  console.log('Super Admin créé:', superAdmin.email);

  // ADMIN
  const admin = await prisma.utilisateur.create({
    data: {
      email: 'admin@sis.cg',
      motDePasse: defaultPassword,
      prenom: 'Jean',
      nom: 'Mbemba',
      telephone: '+242061234568',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'ADMIN',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Salon International de la Santé',
      poste: 'Administrateur',
    },
  });
  console.log('Admin créé:', admin.email);

  // VISITEURS
  const visiteur1 = await prisma.utilisateur.create({
    data: {
      email: 'visiteur1@example.com',
      motDePasse: defaultPassword,
      prenom: 'Marie',
      nom: 'Nkounkou',
      telephone: '+242061234569',
      pays: 'Congo',
      ville: 'Pointe-Noire',
      typeUtilisateur: 'VISITEUR',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
    },
  });
  console.log('Visiteur 1 créé:', visiteur1.email);

  const visiteur2 = await prisma.utilisateur.create({
    data: {
      email: 'visiteur2@example.com',
      motDePasse: defaultPassword,
      prenom: 'Paul',
      nom: 'Makaya',
      telephone: '+242061234570',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'VISITEUR',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
    },
  });
  console.log('Visiteur 2 créé:', visiteur2.email);

  const visiteur3 = await prisma.utilisateur.create({
    data: {
      email: 'visiteur3@example.com',
      motDePasse: defaultPassword,
      prenom: 'Sylvie',
      nom: 'Okandze',
      telephone: '+242061234580',
      pays: 'Congo',
      ville: 'Dolisie',
      typeUtilisateur: 'VISITEUR',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
    },
  });
  console.log('Visiteur 3 créé:', visiteur3.email);

  // EXPOSANTS
  const exposant1 = await prisma.utilisateur.create({
    data: {
      email: 'exposant@pharma-congo.cg',
      motDePasse: defaultPassword,
      prenom: 'André',
      nom: 'Sassou',
      telephone: '+242061234571',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'EXPOSANT',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Pharma Congo',
      poste: 'Directeur Commercial',
    },
  });
  console.log('Exposant 1 créé:', exposant1.email);

  const exposant2 = await prisma.utilisateur.create({
    data: {
      email: 'exposant@medicongo.cg',
      motDePasse: defaultPassword,
      prenom: 'Christelle',
      nom: 'Moukietou',
      telephone: '+242061234581',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'EXPOSANT',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Médicongo SARL',
      poste: 'Responsable Marketing',
    },
  });
  console.log('Exposant 2 créé:', exposant2.email);

  // BENEVOLES
  const benevole1 = await prisma.utilisateur.create({
    data: {
      email: 'benevole1@example.com',
      motDePasse: defaultPassword,
      prenom: 'Grace',
      nom: 'Mouanda',
      telephone: '+242061234572',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'BENEVOLE',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
    },
  });
  console.log('Bénévole 1 créé:', benevole1.email);

  const benevole2 = await prisma.utilisateur.create({
    data: {
      email: 'benevole2@example.com',
      motDePasse: defaultPassword,
      prenom: 'David',
      nom: 'Loukabou',
      telephone: '+242061234582',
      pays: 'Congo',
      ville: 'Pointe-Noire',
      typeUtilisateur: 'BENEVOLE',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
    },
  });
  console.log('Bénévole 2 créé:', benevole2.email);

  // PARTENAIRES
  const partenaire1 = await prisma.utilisateur.create({
    data: {
      email: 'partenaire@oms-congo.org',
      motDePasse: defaultPassword,
      prenom: 'Docteur',
      nom: 'Ngouabi',
      telephone: '+242061234573',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'PARTENAIRE',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'OMS Congo',
      poste: 'Coordinateur',
    },
  });
  console.log('Partenaire 1 créé:', partenaire1.email);

  const partenaire2 = await prisma.utilisateur.create({
    data: {
      email: 'partenaire@unicef-congo.org',
      motDePasse: defaultPassword,
      prenom: 'Fatima',
      nom: 'Diallo',
      telephone: '+242061234583',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'PARTENAIRE',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'UNICEF Congo',
      poste: 'Représentante',
    },
  });
  console.log('Partenaire 2 créé:', partenaire2.email);

  // MEDIA
  const media1 = await prisma.utilisateur.create({
    data: {
      email: 'journaliste@tele-congo.cg',
      motDePasse: defaultPassword,
      prenom: 'Sophie',
      nom: 'Kouka',
      telephone: '+242061234574',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'MEDIA',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Télé Congo',
      poste: 'Journaliste Santé',
    },
  });
  console.log('Média 1 créé:', media1.email);

  const media2 = await prisma.utilisateur.create({
    data: {
      email: 'reporter@radio-congo.cg',
      motDePasse: defaultPassword,
      prenom: 'Bertin',
      nom: 'Massamba',
      telephone: '+242061234584',
      pays: 'Congo',
      ville: 'Brazzaville',
      typeUtilisateur: 'MEDIA',
      statutCompte: 'ACTIF',
      emailVerifie: true,
      dateVerificationEmail: new Date(),
      langue: 'fr',
      organisation: 'Radio Congo',
      poste: 'Reporter',
    },
  });
  console.log('Média 2 créé:', media2.email);

  console.log('Total: 13 utilisateurs créés');

  // ============================================
  // 2. CRÉER LES PROFILS PARTENAIRES
  // ============================================
  console.log('Création des profils partenaires...');
  
  await prisma.partenaire.create({
    data: {
      utilisateurId: partenaire1.id,
      nomOrganisation: 'Organisation Mondiale de la Santé - Bureau Congo',
      typePartenaire: 'INSTITUTION',
      niveauPartenariat: 'PLATINE',
      description: 'Organisation internationale spécialisée dans le domaine de la santé publique',
      siteWeb: 'https://www.afro.who.int/countries/congo',
      personneContact: 'Dr. Ngouabi',
      emailContact: 'contact@oms-congo.org',
      telephoneContact: '+242061234573',
      dateDebut: new Date('2024-01-01'),
      dateFin: new Date('2027-12-31'),
      afficherSurSite: true,
    },
  });

  await prisma.partenaire.create({
    data: {
      utilisateurId: partenaire2.id,
      nomOrganisation: 'UNICEF Congo',
      typePartenaire: 'INSTITUTION',
      niveauPartenariat: 'OR',
      description: 'Fonds des Nations Unies pour l\'enfance',
      siteWeb: 'https://www.unicef.org/congo',
      personneContact: 'Fatima Diallo',
      emailContact: 'congo@unicef.org',
      telephoneContact: '+242061234583',
      dateDebut: new Date('2024-06-01'),
      dateFin: new Date('2026-12-31'),
      afficherSurSite: true,
    },
  });

  console.log('2 profils partenaires créés');

  // ============================================
  // 3. CRÉER LES ÉDITIONS
  // ============================================
  console.log('Création des éditions...');

  const edition2024 = await prisma.edition.create({
    data: {
      nom: 'Salon International de la Santé 2024',
      slug: 'sis-2024',
      ville: 'Brazzaville',
      pays: 'Congo',
      lieu: 'Palais des Congrès',
      dateDebut: new Date('2024-06-10'),
      dateFin: new Date('2024-06-13'),
      dateFinInscriptions: new Date('2024-05-25'),
      description: 'La 4ème édition du Salon International de la Santé s\'est tenue du 10 au 13 juin 2024 au Palais des Congrès de Brazzaville.',
      thematique: 'Santé Communautaire et Couverture Universelle',
      statut: 'TERMINEE',
      capaciteEstimeeVisiteurs: 4000,
      capaciteEstimeeExposants: 80,
      capaciteEstimeeBenevoles: 40,
      siteWeb: 'https://sis-congo.cg',
      emailContact: 'info@sis-congo.cg',
      telephoneContact: '+242222123456',
      estPublique: true,
      estArchivee: true,
    },
  });
  console.log('Édition 2024 créée (TERMINEE)');

  const edition2025 = await prisma.edition.create({
    data: {
      nom: 'Salon International de la Santé 2025',
      slug: 'sis-2025',
      ville: 'Brazzaville',
      pays: 'Congo',
      lieu: 'Palais des Congrès',
      dateDebut: new Date('2025-06-15'),
      dateFin: new Date('2025-06-18'),
      dateFinInscriptions: new Date('2025-06-01'),
      description: 'La 5ème édition du Salon International de la Santé se tiendra du 15 au 18 juin 2025 au Palais des Congrès de Brazzaville.',
      thematique: 'Santé pour tous : Innovation et Prévention',
      statut: 'TERMINEE',
      capaciteEstimeeVisiteurs: 5000,
      capaciteEstimeeExposants: 100,
      capaciteEstimeeBenevoles: 50,
      siteWeb: 'https://sis-congo.cg',
      emailContact: 'info@sis-congo.cg',
      telephoneContact: '+242222123456',
      estPublique: true,
      estArchivee: false,
    },
  });
  console.log('Édition 2025 créée (TERMINEE)');

  const edition2026 = await prisma.edition.create({
    data: {
      nom: 'Salon International de la Santé 2026',
      slug: 'sis-2026',
      ville: 'Brazzaville',
      pays: 'Congo',
      lieu: 'Palais des Congrès',
      dateDebut: new Date('2026-06-20'),
      dateFin: new Date('2026-06-23'),
      dateFinInscriptions: new Date('2026-06-05'),
      description: 'La 6ème édition du Salon International de la Santé se tiendra du 20 au 23 juin 2026 au Palais des Congrès de Brazzaville.',
      thematique: 'Maladies Non Transmissibles : Prévention et Prise en Charge',
      statut: 'INSCRIPTIONS_OUVERTES',
      capaciteEstimeeVisiteurs: 6000,
      capaciteEstimeeExposants: 120,
      capaciteEstimeeBenevoles: 60,
      siteWeb: 'https://sis-congo.cg',
      emailContact: 'info@sis-congo.cg',
      telephoneContact: '+242222123456',
      estPublique: true,
      estArchivee: false,
    },
  });
  console.log('Édition 2026 créée (INSCRIPTIONS_OUVERTES)');

  console.log('3 éditions créées');

  // ============================================
  // 4. CRÉER LES INSCRIPTIONS
  // ============================================
  console.log('Création des inscriptions...');

  // Inscriptions visiteurs pour édition 2026
  await prisma.inscription.create({
    data: {
      utilisateurId: visiteur1.id,
      editionId: edition2026.id,
      typeInscription: 'VISITEUR',
      statut: 'VALIDEE',
      dateInscription: new Date('2026-01-15'),
      dateValidation: new Date('2026-01-16'),
      centresInteret: ['Nutrition', 'Prévention', 'Sport Santé'],
    },
  });

  await prisma.inscription.create({
    data: {
      utilisateurId: visiteur2.id,
      editionId: edition2026.id,
      typeInscription: 'VISITEUR',
      statut: 'EN_ATTENTE',
      dateInscription: new Date('2026-01-20'),
      centresInteret: ['Bien-être', 'Santé mentale'],
    },
  });

  await prisma.inscription.create({
    data: {
      utilisateurId: visiteur3.id,
      editionId: edition2026.id,
      typeInscription: 'VISITEUR',
      statut: 'VALIDEE',
      dateInscription: new Date('2026-01-25'),
      dateValidation: new Date('2026-01-26'),
      centresInteret: ['Prévention MNT', 'Nutrition'],
    },
  });

  // Inscriptions exposants pour édition 2026
  await prisma.inscription.create({
    data: {
      utilisateurId: exposant1.id,
      editionId: edition2026.id,
      typeInscription: 'EXPOSANT',
      statut: 'VALIDEE',
      dateInscription: new Date('2026-01-10'),
      dateValidation: new Date('2026-01-12'),
      nomOrganisation: 'Pharma Congo',
      secteurActivite: 'Pharmacie et Médicaments',
    },
  });

  await prisma.inscription.create({
    data: {
      utilisateurId: exposant2.id,
      editionId: edition2026.id,
      typeInscription: 'EXPOSANT',
      statut: 'EN_ATTENTE',
      dateInscription: new Date('2026-01-22'),
      nomOrganisation: 'Médicongo SARL',
      secteurActivite: 'Distribution Médicale',
    },
  });

  // Inscriptions bénévoles pour édition 2026
  await prisma.inscription.create({
    data: {
      utilisateurId: benevole1.id,
      editionId: edition2026.id,
      typeInscription: 'BENEVOLE',
      statut: 'VALIDEE',
      dateInscription: new Date('2026-01-18'),
      dateValidation: new Date('2026-01-19'),
      competences: 'Premiers secours, Animation, Traduction FR/EN',
      disponibilites: {
        'lundi': ['matin', 'apres-midi'],
        'mardi': ['matin', 'apres-midi'],
        'mercredi': ['matin'],
        'jeudi': ['apres-midi', 'soir'],
        'vendredi': ['matin', 'apres-midi', 'soir'],
      },
    },
  });

  await prisma.inscription.create({
    data: {
      utilisateurId: benevole2.id,
      editionId: edition2026.id,
      typeInscription: 'BENEVOLE',
      statut: 'EN_ATTENTE',
      dateInscription: new Date('2026-01-28'),
      competences: 'Accueil, Communication',
      disponibilites: {
        'lundi': ['apres-midi', 'soir'],
        'mardi': ['soir'],
        'jeudi': ['matin', 'apres-midi'],
      },
    },
  });

  console.log('7 inscriptions créées');

  // ============================================
  // 5. CRÉER LES PROFILS EXPOSANT ET BÉNÉVOLE
  // ============================================
  console.log('Création des profils exposants et bénévoles...');

  await prisma.exposant.create({
    data: {
      utilisateurId: exposant1.id,
      editionId: edition2026.id,
      nomOrganisation: 'Pharma Congo SARL',
      typeOrganisation: 'Entreprise',
      secteurActivite: 'Pharmacie et Distribution Médicale',
      description: 'Leader de la distribution pharmaceutique au Congo avec plus de 20 ans d\'expérience',
      siteWeb: 'https://pharma-congo.cg',
      personneContact: 'André Sassou',
      emailContact: 'contact@pharma-congo.cg',
      telephoneContact: '+242061234571',
      statut: 'APPROUVE',
      emplacementStand: 'Hall A',
      numeroStand: 'A-12',
    },
  });

  await prisma.exposant.create({
    data: {
      utilisateurId: exposant2.id,
      editionId: edition2026.id,
      nomOrganisation: 'Médicongo SARL',
      typeOrganisation: 'Entreprise',
      secteurActivite: 'Distribution de Matériel Médical',
      description: 'Spécialiste en équipements médicaux et matériel hospitalier',
      siteWeb: 'https://medicongo.cg',
      personneContact: 'Christelle Moukietou',
      emailContact: 'contact@medicongo.cg',
      telephoneContact: '+242061234581',
      statut: 'EN_ATTENTE',
    },
  });

  await prisma.benevole.create({
    data: {
      utilisateurId: benevole1.id,
      editionId: edition2026.id,
      competences: 'Premiers secours (PSC1), Animation de groupe, Traduction FR/EN, Accueil du public',
      disponibilites: {
        'lundi': ['matin', 'apres-midi'],
        'mardi': ['matin', 'apres-midi'],
        'mercredi': ['matin'],
        'jeudi': ['apres-midi', 'soir'],
        'vendredi': ['matin', 'apres-midi', 'soir'],
      },
      tachesPreferees: 'Accueil visiteurs, Animation stands, Traduction',
      experience: 'Bénévole dans plusieurs événements culturels et sanitaires depuis 3 ans',
      motivation: 'Contribuer à la sensibilisation sur les questions de santé publique au Congo',
      missionsAssignees: 'Stand d\'accueil principal, Orientation visiteurs',
      statut: 'ACCEPTE',
    },
  });

  await prisma.benevole.create({
    data: {
      utilisateurId: benevole2.id,
      editionId: edition2026.id,
      competences: 'Accueil du public, Communication, Gestion de foule',
      disponibilites: {
        'lundi': ['apres-midi', 'soir'],
        'mardi': ['soir'],
        'jeudi': ['matin', 'apres-midi'],
      },
      tachesPreferees: 'Accueil, Information',
      experience: 'Première expérience en tant que bénévole',
      motivation: 'Découvrir le monde associatif et contribuer à la santé publique',
      statut: 'CANDIDAT',
    },
  });

  console.log('2 exposants et 2 bénévoles créés');

  // ============================================
  // 6. CRÉER LES PROGRAMMES
  // ============================================
  console.log('Création des programmes...');

  await prisma.programmeEdition.createMany({
    data: [
      {
        editionId: edition2026.id,
        type: 'PREVENTION_MNT',
        titre: 'Conférence : Prévention du Diabète',
        description: 'Conférence sur les stratégies de prévention et de dépistage du diabète',
        dateDebut: new Date('2026-06-20T09:00:00'),
        dateFin: new Date('2026-06-20T11:00:00'),
        lieu: 'Salle de Conférence A',
        intervenants: [
          { nom: 'Dr. Bongo', fonction: 'Endocrinologue', organisation: 'CHU Brazzaville' },
          { nom: 'Dr. Makosso', fonction: 'Nutritionniste', organisation: 'Ministère de la Santé' },
        ],
        maxParticipants: 200,
      },
      {
        editionId: edition2026.id,
        type: 'SPORT_SANTE',
        titre: 'Atelier : Sport et Santé Cardiovasculaire',
        description: 'Atelier pratique sur l\'importance de l\'activité physique pour la santé cardiovasculaire',
        dateDebut: new Date('2026-06-20T14:00:00'),
        dateFin: new Date('2026-06-20T16:00:00'),
        lieu: 'Espace Activités',
        intervenants: [
          { nom: 'Coach Mbemba', fonction: 'Coach Sportif', organisation: 'Association Sport Santé' },
        ],
        maxParticipants: 50,
      },
      {
        editionId: edition2026.id,
        type: 'NUTRITION',
        titre: 'Table Ronde : Nutrition et Prévention des MNT',
        description: 'Discussion avec des experts sur le rôle de la nutrition dans la prévention des maladies non transmissibles',
        dateDebut: new Date('2026-06-21T10:00:00'),
        dateFin: new Date('2026-06-21T12:00:00'),
        lieu: 'Salle de Conférence B',
        intervenants: [
          { nom: 'Dr. Nzila', fonction: 'Nutritionniste', organisation: 'Ministère de la Santé' },
          { nom: 'Chef Okemba', fonction: 'Chef Cuisinier', organisation: 'École Hôtelière' },
          { nom: 'Pr. Moukoko', fonction: 'Cardiologue', organisation: 'CHU Brazzaville' },
        ],
        maxParticipants: 150,
      },
      {
        editionId: edition2026.id,
        type: 'BIEN_ETRE',
        titre: 'Atelier : Yoga et Relaxation',
        description: 'Séance pratique de yoga et techniques de relaxation pour le bien-être quotidien',
        dateDebut: new Date('2026-06-21T14:00:00'),
        dateFin: new Date('2026-06-21T15:30:00'),
        lieu: 'Espace Bien-être',
        intervenants: [
          { nom: 'Mme Nzoussi', fonction: 'Professeure de Yoga', organisation: 'Centre Zen' },
        ],
        maxParticipants: 30,
      },
      {
        editionId: edition2026.id,
        type: 'SANTE_MENTALE',
        titre: 'Conférence : Santé Mentale et Stigmatisation',
        description: 'Sensibilisation sur l\'importance de la santé mentale et la lutte contre la stigmatisation',
        dateDebut: new Date('2026-06-22T09:00:00'),
        dateFin: new Date('2026-06-22T11:00:00'),
        lieu: 'Salle de Conférence A',
        intervenants: [
          { nom: 'Dr. Ondongo', fonction: 'Psychiatre', organisation: 'CHU Brazzaville' },
          { nom: 'Mme Mpassi', fonction: 'Psychologue', organisation: 'Association Espoir' },
        ],
        maxParticipants: 100,
      },
    ],
  });

  console.log('5 programmes créés');

  // ============================================
  // 7. CRÉER LES BILANS ÉDITIONS
  // ============================================
  console.log('Création des bilans...');

  await prisma.bilanEdition.create({
    data: {
      editionId: edition2024.id,
      nombreVisiteurs: 3842,
      nombreExposants: 76,
      nombreBenevoles: 38,
      actionsSensibilisation: 18,
      partenariatsActifs: 10,
      retombeesSociales: 'Forte mobilisation du public autour des thématiques de santé communautaire. Plus de 1500 personnes sensibilisées.',
      retombeesSanitaires: '400 dépistages gratuits effectués. Distribution de 2000 dépliants de sensibilisation.',
      satisfactionMoyenne: 4.3,
      recommandation: 87,
    },
  });

  await prisma.bilanEdition.create({
    data: {
      editionId: edition2025.id,
      nombreVisiteurs: 4523,
      nombreExposants: 87,
      nombreBenevoles: 45,
      actionsSensibilisation: 24,
      partenariatsActifs: 12,
      retombeesSociales: 'Fort engagement du public sur les thématiques de prévention. Plus de 2000 personnes sensibilisées aux dépistages.',
      retombeesSanitaires: '500 dépistages gratuits effectués (diabète, hypertension, VIH). 80% des participants ont reçu des conseils personnalisés.',
      satisfactionMoyenne: 4.6,
      recommandation: 92,
    },
  });

  console.log('2 bilans créés');

  // ============================================
  // 8. CRÉER DES NOTIFICATIONS
  // ============================================
  console.log('Création des notifications...');

  await prisma.notification.createMany({
    data: [
      {
        utilisateurId: visiteur1.id,
        type: 'SUCCES',
        titre: 'Inscription validée',
        message: 'Votre inscription au Salon International de la Santé 2026 a été validée avec succès !',
        lue: false,
      },
      {
        utilisateurId: visiteur2.id,
        type: 'INFO',
        titre: 'Inscription en attente',
        message: 'Votre inscription est en cours de traitement. Vous recevrez une confirmation prochainement.',
        lue: false,
      },
      {
        utilisateurId: exposant1.id,
        type: 'SUCCES',
        titre: 'Attribution de stand',
        message: 'Votre stand a été attribué : Hall A, Stand A-12. Vous recevrez bientôt plus d\'informations.',
        lue: false,
      },
      {
        utilisateurId: exposant2.id,
        type: 'AVERTISSEMENT',
        titre: 'Documents manquants',
        message: 'Merci de compléter votre dossier d\'inscription avec les documents requis.',
        lue: false,
      },
      {
        utilisateurId: benevole1.id,
        type: 'ACTION_REQUISE',
        titre: 'Réunion de formation',
        message: 'Une réunion de formation pour les bénévoles aura lieu le 10 juin 2026. Merci de confirmer votre présence.',
        lue: false,
      },
      {
        utilisateurId: benevole2.id,
        type: 'INFO',
        titre: 'Candidature reçue',
        message: 'Votre candidature en tant que bénévole a bien été reçue. Nous reviendrons vers vous prochainement.',
        lue: false,
      },
    ],
  });

  console.log('6 notifications créées');

  // ============================================
  // 9. CRÉER DES STATISTIQUES
  // ============================================
  console.log('Création des statistiques...');

  await prisma.statistique.createMany({
    data: [
      {
        editionId: edition2026.id,
        date: new Date('2026-01-31'),
        nombreVisiteurs: 0,
        nombreInscriptions: 7,
        inscriptionsExposants: 2,
        inscriptionsBenevoles: 2,
      },
      {
        editionId: edition2026.id,
        date: new Date('2026-02-28'),
        nombreVisiteurs: 0,
        nombreInscriptions: 12,
        inscriptionsExposants: 4,
        inscriptionsBenevoles: 3,
      },
    ],
  });

  console.log('2 statistiques créées');

  // ============================================
  // 10. CRÉER LA CONFIGURATION EMAIL
  // ============================================
  console.log('Création de la configuration email...');

  await prisma.configEmail.create({
    data: {
      provider: 'nodemailer',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@sis-congo.cg',
        pass: 'votre-mot-de-passe-app',
      },
      senderEmail: 'noreply@sis-congo.cg',
      senderName: 'Salon International de la Santé',
      estActif: true,
    },
  });

  console.log('Configuration email créée');

  // ============================================
  // 11. CRÉER LES PARAMÈTRES SYSTÈME
  // ============================================
  console.log('Création des paramètres système...');

  await prisma.parametre.createMany({
    data: [
      {
        cle: 'site_nom',
        valeur: 'Salon International de la Santé',
        description: 'Nom du site web',
        estPublic: true,
      },
      {
        cle: 'site_url',
        valeur: 'https://sis-congo.cg',
        description: 'URL du site web',
        estPublic: true,
      },
      {
        cle: 'email_contact',
        valeur: 'info@sis-congo.cg',
        description: 'Email de contact général',
        estPublic: true,
      },
      {
        cle: 'telephone_contact',
        valeur: '+242222123456',
        description: 'Téléphone de contact',
        estPublic: true,
      },
      {
        cle: 'otp_expiration_minutes',
        valeur: '10',
        description: 'Durée de validité des codes OTP en minutes',
        estPublic: false,
      },
      {
        cle: 'max_login_attempts',
        valeur: '5',
        description: 'Nombre maximum de tentatives de connexion',
        estPublic: false,
      },
      {
        cle: 'session_expiration_hours',
        valeur: '24',
        description: 'Durée de validité d\'une session en heures',
        estPublic: false,
      },
    ],
  });

  console.log(' 7 paramètres système créés');

  console.log('');
  console.log(' Seed terminé avec succès !');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' COMPTES CRÉÉS (mot de passe : Password123!)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(' ADMINISTRATEURS:');
  console.log('   SUPER_ADMIN : superadmin@sis.cg');
  console.log('   ADMIN       : admin@sis.cg');
  console.log('');
  console.log(' VISITEURS:');
  console.log('   visiteur1@example.com (Inscription VALIDEE)');
  console.log('   visiteur2@example.com (Inscription EN_ATTENTE)');
  console.log('   visiteur3@example.com (Inscription VALIDEE)');
  console.log('');
  console.log(' EXPOSANTS:');
  console.log('   exposant@pharma-congo.cg (Stand APPROUVE: A-12)');
  console.log('   exposant@medicongo.cg (EN_ATTENTE)');
  console.log('');
  console.log(' BÉNÉVOLES:');
  console.log('   benevole1@example.com (ACCEPTE)');
  console.log('   benevole2@example.com (CANDIDAT)');
  console.log('');
  console.log('🤝 PARTENAIRES:');
  console.log('   partenaire@oms-congo.org (OMS - PLATINE)');
  console.log('   partenaire@unicef-congo.org (UNICEF - OR)');
  console.log('');
  console.log(' MÉDIAS:');
  console.log('   journaliste@tele-congo.cg (Télé Congo)');
  console.log('   reporter@radio-congo.cg (Radio Congo)');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' RÉSUMÉ DES DONNÉES:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   ✅ 13 Utilisateurs');
  console.log('   ✅ 3 Éditions (2024, 2025, 2026)');
  console.log('   ✅ 7 Inscriptions');
  console.log('   ✅ 2 Exposants');
  console.log('   ✅ 2 Bénévoles');
  console.log('   ✅ 2 Partenaires');
  console.log('   ✅ 5 Programmes');
  console.log('   ✅ 2 Bilans');
  console.log('   ✅ 6 Notifications');
  console.log('   ✅ 2 Statistiques');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });