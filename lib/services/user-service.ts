import { userApi } from '@/lib/api/user-api';
import type {
  ProfilUtilisateur,
  PreferencesUtilisateur,
  UpdateProfilDTO,
  UpdatePreferencesDTO,
  APIResponse,
} from '@/lib/types';

export const userService = {
  /**
   * Obtenir le profil utilisateur
   */
  async getProfil(userId: string): Promise<APIResponse<{
    profil: ProfilUtilisateur;
    preferences: PreferencesUtilisateur;
  }>> {
    return userApi.getProfil(userId);
  },

  /**
   * Mettre à jour le profil
   */
  async updateProfil(userId: string, data: UpdateProfilDTO): Promise<APIResponse<ProfilUtilisateur>> {
    return userApi.updateProfil(userId, data);
  },

  /**
   * Mettre à jour les préférences
   */
  async updatePreferences(userId: string, data: UpdatePreferencesDTO): Promise<APIResponse<PreferencesUtilisateur>> {
    return userApi.updatePreferences(userId, data);
  },

  /**
   * Changer le mot de passe
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<APIResponse<{ message: string }>> {
    return userApi.changePassword(userId, {
      ancienMotDePasse: oldPassword,
      nouveauMotDePasse: newPassword,
      confirmationMotDePasse: newPassword,
    });
  },

  /**
   * Supprimer le compte
   */
  async deleteAccount(userId: string): Promise<APIResponse<{ message: string }>> {
    return userApi.deleteAccount(userId);
  },

  /**
   * Obtenir l'historique de connexion
   */
  async getHistoriqueConnexion(userId: string, page: number = 1, limit: number = 20): Promise<APIResponse<{
    items: Array<{
      id: string;
      adresseIP: string | null;
      userAgent: string | null;
      reussi: boolean;
      dateCreation: Date;
    }>;
    total: number;
  }>> {
    return userApi.getHistoriqueConnexion(userId, { page, limit });
  },

  /**
   * Obtenir les statistiques utilisateur (admin seulement)
   */
  async getStatistiques(): Promise<APIResponse<{
    totalUtilisateurs: number;
    utilisateursActifs: number;
    utilisateursEnAttente: number;
    repartitionParType: Record<string, number>;
  }>> {
    return userApi.getStatistiques();
  },

  /**
   * Rechercher des utilisateurs (admin seulement)
   */
  async searchUsers(params: {
    query?: string;
    typeUtilisateur?: string;
    statutCompte?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<{
    items: Array<{
      id: string;
      email: string;
      prenom: string;
      nom: string;
      typeUtilisateur: string;
      statutCompte: string;
      emailVerifie: boolean;
      dateCreation: Date;
    }>;
    total: number;
    page: number;
    limit: number;
  }>> {
    return userApi.searchUsers(params);
  },
};