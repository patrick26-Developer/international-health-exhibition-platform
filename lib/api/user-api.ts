// lib/api/user-api.ts
import { apiClient } from './api-client';
import type {
  UtilisateurPublic,
  ProfilUtilisateur,
  PreferencesUtilisateur,
  UpdateProfilDTO,
  UpdatePreferencesDTO,
  APIResponse,
} from '@/lib/types';

export const userApi = {
  /**
   * Obtenir le profil utilisateur
   */
  getProfil: (userId: string): Promise<APIResponse<{
    profil: ProfilUtilisateur;
    preferences: PreferencesUtilisateur;
  }>> => {
    return apiClient.get(`/users/${userId}/profile`);
  },

  /**
   * Mettre à jour le profil
   */
  updateProfil: (
    userId: string,
    data: UpdateProfilDTO
  ): Promise<APIResponse<ProfilUtilisateur>> => {
    return apiClient.put(`/users/${userId}/profile`, data);
  },

  /**
   * Mettre à jour les préférences
   */
  updatePreferences: (
    userId: string,
    data: UpdatePreferencesDTO
  ): Promise<APIResponse<PreferencesUtilisateur>> => {
    return apiClient.patch(`/users/${userId}/preferences`, data);
  },

  /**
   * Changer le mot de passe
   */
  changePassword: (
    userId: string,
    data: {
      ancienMotDePasse: string;
      nouveauMotDePasse: string;
      confirmationMotDePasse: string;
    }
  ): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post(`/users/${userId}/change-password`, data);
  },

  /**
   * Supprimer le compte
   */
  deleteAccount: (userId: string): Promise<APIResponse<{ message: string }>> => {
    return apiClient.delete(`/users/${userId}`);
  },

  /**
   * Obtenir l'historique de connexion
   */
  getHistoriqueConnexion: (
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<APIResponse<{
    items: Array<{
      id: string;
      adresseIP: string | null;
      userAgent: string | null;
      reussi: boolean;
      dateCreation: Date;
    }>;
    total: number;
  }>> => {
    return apiClient.get(`/users/${userId}/history`, { params });
  },

  /**
   * Obtenir les statistiques utilisateur (admin seulement)
   */
  getStatistiques: (): Promise<APIResponse<{
    totalUtilisateurs: number;
    utilisateursActifs: number;
    utilisateursEnAttente: number;
    repartitionParType: Record<string, number>;
  }>> => {
    return apiClient.get('/users/statistics');
  },

  /**
   * Rechercher des utilisateurs (admin seulement)
   */
  searchUsers: (params: {
    query?: string;
    typeUtilisateur?: string;
    statutCompte?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<{
    items: UtilisateurPublic[];
    total: number;
    page: number;
    limit: number;
  }>> => {
    return apiClient.get('/users/search', { params });
  },
};