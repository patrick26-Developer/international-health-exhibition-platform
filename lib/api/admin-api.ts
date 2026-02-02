// lib/api/admin-api.ts
import { apiClient } from './api-client';
import type { APIResponse, PaginatedResponse } from '@/lib/types';

// ============================================
// TYPES DE RÉPONSES ADMIN
// ============================================

export interface AdminUser {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  typeUtilisateur: string;
  statutCompte: string;
  emailVerifie: boolean;
  dateCreation: Date;
  derniereConnexion?: Date;
  _count?: {
    inscriptions: number;
    exposants: number;
    benevoles: number;
  };
}

export interface AdminUserDetail extends AdminUser {
  pays?: string;
  ville?: string;
  adresse?: string;
  codePostal?: string;
  langue: string;
  photoProfil?: string;
  biographie?: string;
  siteWeb?: string;
  organisation?: string;
  poste?: string;
  reseauxSociaux?: Record<string, string>;
  accepteNewsletter: boolean;
  accepteNotifications: boolean;
  notificationsSMS: boolean;
  dateModification: Date;
  adresseIPConnexion?: string;
  inscriptions: Array<{
    id: string;
    typeInscription: string;
    statut: string;
    dateInscription: Date;
    edition: {
      id: string;
      nom: string;
      ville: string;
      dateDebut: Date;
    };
  }>;
  historiqueConnexions: Array<{
    id: string;
    adresseIP?: string;
    reussi: boolean;
    dateCreation: Date;
  }>;
}

export interface CreateUserRequest {
  email: string;
  prenom: string;
  nom: string;
  motDePasse?: string;
  typeUtilisateur?: string;
  statutCompte?: string;
  emailVerifie?: boolean;
  telephone?: string;
  pays?: string;
  ville?: string;
  langue?: string;
}

export interface UpdateUserRequest {
  typeUtilisateur?: string;
  statutCompte?: string;
  emailVerifie?: boolean;
  prenom?: string;
  nom?: string;
  telephone?: string;
  pays?: string;
  ville?: string;
  langue?: string;
  organisation?: string;
  poste?: string;
}

export interface AdminEdition {
  id: string;
  nom: string;
  slug: string;
  ville: string;
  pays: string;
  dateDebut: Date;
  dateFin: Date;
  statut: string;
  estPublique: boolean;
  dateCreation: Date;
  _count?: {
    inscriptions: number;
    exposants: number;
    benevoles: number;
    programmes: number;
    medias: number;
  };
}

export interface AdminInscription {
  id: string;
  typeInscription: string;
  statut: string;
  dateInscription: Date;
  dateValidation?: Date;
  commentaire?: string;
  utilisateur: {
    id: string;
    email: string;
    prenom: string;
    nom: string;
    telephone?: string;
  };
  edition: {
    id: string;
    nom: string;
    ville: string;
    dateDebut: Date;
    dateFin: Date;
  };
}

export interface AdminDashboardData {
  utilisateurs: {
    total: number;
    actifs: number;
    enAttente: number;
    parType: Record<string, number>;
  };
  editions: {
    total: number;
    enCours: number;
    planifiees: number;
    terminees: number;
  };
  inscriptions: {
    total: number;
    enAttente: number;
    validees: number;
    parType: Record<string, number>;
  };
  alertes: Array<{
    type: 'warning' | 'error' | 'info';
    titre: string;
    message: string;
    date: Date;
  }>;
}

export interface AdminStatistics {
  utilisateurs: {
    total: number;
    actifs: number;
    enAttente: number;
    parType: Record<string, number>;
  };
  editions: {
    total: number;
    enCours: number;
    planifiees: number;
    terminees: number;
  };
  inscriptions: {
    total: number;
    enAttente: number;
    validees: number;
    parType: Record<string, number>;
  };
  connexionsJournalieres: Array<{
    date: string;
    count: number;
  }>;
  inscriptionsJournalieres: Array<{
    date: string;
    count: number;
  }>;
  periode: {
    debut: Date;
    fin: Date;
  };
}

// ============================================
// API CLIENT ADMIN
// ============================================

export const adminApi = {
  // ============================================
  // GESTION UTILISATEURS
  // ============================================

  /**
   * Récupérer la liste des utilisateurs (admin)
   */
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    typeUtilisateur?: string;
    statutCompte?: string;
    emailVerifie?: boolean;
  }): Promise<APIResponse<PaginatedResponse<AdminUser>>> {
    return apiClient.get<PaginatedResponse<AdminUser>>('/admin/users', { params });
  },

  /**
   * Récupérer un utilisateur spécifique (admin)
   */
  async getUser(userId: string): Promise<APIResponse<AdminUserDetail>> {
    return apiClient.get<AdminUserDetail>(`/admin/users/${userId}`);
  },

  /**
   * Créer un utilisateur (admin)
   */
  async createUser(data: CreateUserRequest): Promise<APIResponse<AdminUser>> {
    return apiClient.post<AdminUser>('/admin/users', data);
  },

  /**
   * Mettre à jour un utilisateur (admin)
   */
  async updateUser(userId: string, data: UpdateUserRequest): Promise<APIResponse<AdminUser>> {
    return apiClient.patch<AdminUser>(`/admin/users/${userId}`, data);
  },

  /**
   * Supprimer un utilisateur (admin)
   */
  async deleteUser(userId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.delete(`/admin/users/${userId}`);
  },

  /**
   * Réinitialiser le mot de passe d'un utilisateur (admin)
   */
  async resetUserPassword(userId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.post(`/admin/users/${userId}/reset-password`, {});
  },

  /**
   * Bloquer/Débloquer un utilisateur (admin)
   */
  async toggleUserBlock(userId: string, raison?: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.post(`/admin/users/${userId}/toggle-block`, { raison });
  },

  /**
   * Vérifier l'email d'un utilisateur manuellement (admin)
   */
  async verifyUserEmail(userId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.post(`/admin/users/${userId}/verify-email`, {});
  },

  // ============================================
  // GESTION ÉDITIONS
  // ============================================

  /**
   * Récupérer la liste des éditions (admin)
   */
  async getEditions(params?: {
    page?: number;
    limit?: number;
    search?: string;
    statut?: string;
    pays?: string;
    ville?: string;
    annee?: string;
  }): Promise<APIResponse<PaginatedResponse<AdminEdition>>> {
    return apiClient.get<PaginatedResponse<AdminEdition>>('/admin/editions', { params });
  },

  /**
   * Créer une édition (admin)
   */
  async createEdition(data: {
    nom: string;
    slug: string;
    ville: string;
    pays: string;
    lieu?: string;
    dateDebut: string;
    dateFin: string;
    dateFinInscriptions?: string;
    description?: string;
    thematique?: string;
    capaciteEstimeeVisiteurs?: number;
    capaciteEstimeeExposants?: number;
    capaciteEstimeeBenevoles?: number;
    siteWeb?: string;
    emailContact?: string;
    telephoneContact?: string;
    estPublique?: boolean;
  }): Promise<APIResponse<AdminEdition>> {
    return apiClient.post<AdminEdition>('/admin/editions', data);
  },

  /**
   * Mettre à jour une édition (admin)
   */
  async updateEdition(editionId: string, data: Partial<{
    nom: string;
    slug: string;
    ville: string;
    pays: string;
    statut: string;
    estPublique: boolean;
  }>): Promise<APIResponse<AdminEdition>> {
    return apiClient.patch<AdminEdition>(`/editions/${editionId}`, data);
  },

  /**
   * Supprimer une édition (admin)
   */
  async deleteEdition(editionId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.delete(`/editions/${editionId}`);
  },

  /**
   * Archiver une édition (admin)
   */
  async archiveEdition(editionId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.post(`/admin/editions/${editionId}/archive`, {});
  },

  /**
   * Publier/Dépublier une édition (admin)
   */
  async toggleEditionPublish(editionId: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.post(`/admin/editions/${editionId}/toggle-publish`, {});
  },

  // ============================================
  // GESTION INSCRIPTIONS
  // ============================================

  /**
   * Récupérer la liste des inscriptions (admin)
   */
  async getInscriptions(params?: {
    page?: number;
    limit?: number;
    editionId?: string;
    typeInscription?: string;
    statut?: string;
    search?: string;
  }): Promise<APIResponse<PaginatedResponse<AdminInscription>>> {
    return apiClient.get<PaginatedResponse<AdminInscription>>('/admin/inscriptions', { params });
  },

  /**
   * Valider une inscription (admin)
   */
  async approveInscription(inscriptionId: string, commentaire?: string): Promise<APIResponse<AdminInscription>> {
    return apiClient.post<AdminInscription>(`/admin/inscriptions/${inscriptionId}/approve`, { commentaire });
  },

  /**
   * Refuser une inscription (admin)
   */
  async rejectInscription(inscriptionId: string, motif: string): Promise<APIResponse<AdminInscription>> {
    return apiClient.post<AdminInscription>(`/admin/inscriptions/${inscriptionId}/reject`, { motif });
  },

  /**
   * Annuler une inscription (admin)
   */
  async cancelInscription(inscriptionId: string, raison: string): Promise<APIResponse<AdminInscription>> {
    return apiClient.post<AdminInscription>(`/admin/inscriptions/${inscriptionId}/cancel`, { raison });
  },

  /**
   * Valider plusieurs inscriptions en masse (admin)
   */
  async bulkApproveInscriptions(inscriptionIds: string[]): Promise<APIResponse<{ count: number; message: string }>> {
    return apiClient.post('/admin/inscriptions/bulk-approve', { inscriptionIds });
  },

  /**
   * Refuser plusieurs inscriptions en masse (admin)
   */
  async bulkRejectInscriptions(inscriptionIds: string[], motif: string): Promise<APIResponse<{ count: number; message: string }>> {
    return apiClient.post('/admin/inscriptions/bulk-reject', { inscriptionIds, motif });
  },

  // ============================================
  // DASHBOARD & STATISTIQUES
  // ============================================

  /**
   * Récupérer les données du dashboard admin
   */
  async getDashboard(): Promise<APIResponse<AdminDashboardData>> {
    return apiClient.get<AdminDashboardData>('/admin/dashboard');
  },

  /**
   * Récupérer les statistiques admin
   */
  async getStatistics(params?: {
    periode?: string;
  }): Promise<APIResponse<AdminStatistics>> {
    return apiClient.get<AdminStatistics>('/admin/statistics', { params });
  },

  /**
   * Exporter les données utilisateurs (admin)
   */
  async exportUsers(format: 'csv' | 'xlsx' | 'json'): Promise<APIResponse<{ url: string; filename: string }>> {
    return apiClient.get('/admin/users/export', { params: { format } });
  },

  /**
   * Exporter les données d'inscriptions (admin)
   */
  async exportInscriptions(format: 'csv' | 'xlsx' | 'json', editionId?: string): Promise<APIResponse<{ url: string; filename: string }>> {
    return apiClient.get('/admin/inscriptions/export', { 
      params: { format, editionId } 
    });
  },

  /**
   * Exporter les données d'éditions (admin)
   */
  async exportEditions(format: 'csv' | 'xlsx' | 'json'): Promise<APIResponse<{ url: string; filename: string }>> {
    return apiClient.get('/admin/editions/export', { params: { format } });
  },

  // ============================================
  // NOTIFICATIONS & COMMUNICATIONS
  // ============================================

  /**
   * Envoyer une notification à tous les utilisateurs (admin)
   */
  async sendBulkNotification(data: {
    titre: string;
    message: string;
    type: string;
    lien?: string;
    cible?: {
      typeUtilisateur?: string[];
      editionId?: string;
    };
  }): Promise<APIResponse<{ count: number; message: string }>> {
    return apiClient.post('/admin/notifications/bulk', data);
  },

  /**
   * Envoyer un email en masse (admin)
   */
  async sendBulkEmail(data: {
    sujet: string;
    contenu: string;
    destinataires: 'all' | 'active' | 'pending' | string[];
  }): Promise<APIResponse<{ count: number; message: string }>> {
    return apiClient.post('/admin/emails/bulk', data);
  },

  // ============================================
  // LOGS & AUDIT
  // ============================================

  /**
   * Récupérer les logs d'audit (admin)
   */
  async getAuditLogs(params?: {
    page?: number;
    limit?: number;
    utilisateurId?: string;
    action?: string;
    entite?: string;
    dateDebut?: string;
    dateFin?: string;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    utilisateurId?: string;
    action: string;
    entite: string;
    entiteId?: string;
    modifications?: any;
    adresseIP?: string;
    dateCreation: Date;
  }>>> {
    return apiClient.get('/admin/audit-logs', { params });
  },

  /**
   * Récupérer les logs de connexion (admin)
   */
  async getConnectionLogs(params?: {
    page?: number;
    limit?: number;
    utilisateurId?: string;
    reussi?: boolean;
    dateDebut?: string;
    dateFin?: string;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    utilisateurId: string;
    adresseIP?: string;
    userAgent?: string;
    reussi: boolean;
    raisonEchec?: string;
    dateCreation: Date;
  }>>> {
    return apiClient.get('/admin/connection-logs', { params });
  },

  // ============================================
  // CONFIGURATION SYSTÈME
  // ============================================

  /**
   * Récupérer les paramètres système (admin)
   */
  async getSystemSettings(): Promise<APIResponse<Record<string, any>>> {
    return apiClient.get('/admin/settings');
  },

  /**
   * Mettre à jour les paramètres système (admin)
   */
  async updateSystemSettings(settings: Record<string, any>): Promise<APIResponse<{ message: string }>> {
    return apiClient.post('/admin/settings', settings);
  },

  /**
   * Nettoyer les données obsolètes (admin)
   */
  async cleanupData(type: 'sessions' | 'otps' | 'logs' | 'all'): Promise<APIResponse<{ message: string; count: number }>> {
    return apiClient.post('/admin/cleanup', { type });
  },

  /**
   * Sauvegarder la base de données (admin)
   */
  async backupDatabase(): Promise<APIResponse<{ url: string; filename: string; size: number }>> {
    return apiClient.post('/admin/backup', {});
  },
};