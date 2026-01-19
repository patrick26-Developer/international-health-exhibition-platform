// lib/api/notification-api.ts
import { apiClient } from './api-client';
import type { 
  TypeNotification,
  APIResponse,
  PaginatedResponse,
  ValidationError 
} from '@/lib/types';

// Interface pour une notification
export interface Notification {
  id: string;
  utilisateurId: string;
  type: TypeNotification;
  titre: string;
  message: string;
  lue: boolean;
  lien: string | null;
  dateCreation: Date;
  dateLecture: Date | null;
  utilisateur?: {
    id: string;
    prenom: string;
    nom: string;
    email: string;
  };
}

// Interface pour la réponse paginée
export interface PaginatedNotifications {
  items: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  nonLues: number;
}

// Interface pour créer une notification
export interface CreateNotificationRequest {
  utilisateurId?: string; // Optionnel, par défaut l'utilisateur connecté
  type: TypeNotification;
  titre: string;
  message: string;
  lien?: string;
}

// Interface pour mettre à jour une notification
export interface UpdateNotificationRequest {
  lue?: boolean;
}

export const notificationApi = {
  /**
   * Récupérer les notifications de l'utilisateur connecté
   */
  getNotifications: (params?: {
    lue?: boolean;
    type?: TypeNotification;
    page?: number;
    limit?: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<APIResponse<PaginatedNotifications>> => {
    return apiClient.get('/notifications', { params });
  },

  /**
   * Récupérer une notification spécifique
   */
  getNotification: (id: string): Promise<APIResponse<Notification>> => {
    return apiClient.get(`/notifications/${id}`);
  },

  /**
   * Créer une nouvelle notification
   */
  createNotification: (
    data: CreateNotificationRequest
  ): Promise<APIResponse<Notification>> => {
    return apiClient.post('/notifications', data);
  },

  /**
   * Marquer une notification comme lue
   */
  markAsRead: (id: string): Promise<APIResponse<Notification>> => {
    return apiClient.patch(`/notifications/${id}/read`, {});
  },

  /**
   * Marquer toutes les notifications comme lues
   */
  markAllAsRead: (): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/notifications/read-all', {});
  },

  /**
   * Supprimer une notification
   */
  deleteNotification: (id: string): Promise<APIResponse<{ message: string }>> => {
    return apiClient.delete(`/notifications/${id}`);
  },

  /**
   * Récupérer le nombre de notifications non lues
   */
  getUnreadCount: (): Promise<APIResponse<{ count: number }>> => {
    return apiClient.get('/notifications/unread/count');
  },

  /**
   * Récupérer les notifications d'un utilisateur spécifique (admin seulement)
   */
  getUserNotifications: (
    userId: string,
    params?: {
      lue?: boolean;
      type?: TypeNotification;
      page?: number;
      limit?: number;
    }
  ): Promise<APIResponse<PaginatedNotifications>> => {
    return apiClient.get(`/users/${userId}/notifications`, { params });
  },

  /**
   * Créer une notification pour un utilisateur spécifique (admin seulement)
   */
  createUserNotification: (
    userId: string,
    data: Omit<CreateNotificationRequest, 'utilisateurId'>
  ): Promise<APIResponse<Notification>> => {
    return apiClient.post(`/users/${userId}/notifications`, data);
  },

  /**
   * Supprimer toutes les notifications d'un utilisateur (admin seulement)
   */
  deleteAllUserNotifications: (
    userId: string
  ): Promise<APIResponse<{ message: string; count: number }>> => {
    return apiClient.delete(`/users/${userId}/notifications`);
  },

  /**
   * Récupérer les dernières notifications (pour widget/notification bell)
   */
  getRecentNotifications: (
    limit: number = 5
  ): Promise<APIResponse<Notification[]>> => {
    return apiClient.get('/notifications/recent', { params: { limit } });
  },
};

export type { TypeNotification };