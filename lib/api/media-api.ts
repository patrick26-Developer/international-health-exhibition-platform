import { apiClient } from './api-client';
import type { TypeMedia } from '@/lib/generated/prisma/client';
import type { APIResponse } from '@/lib/types';

// Interface pour les médias (version publique)
export interface Media {
  id: string;
  titre: string;
  description: string | null;
  typeMedia: TypeMedia;
  url: string;
  miniature: string | null;
  estPublic: boolean;
  dateCreation: Date;
  dateModification: Date;
  auteur: {
    id: string;
    prenom: string;
    nom: string;
    email: string;
  };
  edition?: {
    id: string;
    nom: string;
    slug: string;
  };
}

// Interface pour la réponse paginée
export interface PaginatedMediaResponse {
  items: Media[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Interface pour les statistiques
export interface MediaStats {
  stats: Array<{
    typeMedia: TypeMedia;
    count: number;
  }>;
  total: number;
}

export const mediaApi = {
  /**
   * Récupérer tous les médias
   */
  getMedias: (options?: {
    editionId?: string;
    typeMedia?: TypeMedia;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedMediaResponse>> => {
    const params = new URLSearchParams();
    if (options?.editionId) params.append('editionId', options.editionId);
    if (options?.typeMedia) params.append('typeMedia', options.typeMedia);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());

    const url = `/media${params.toString() ? `?${params.toString()}` : ''}`;
    return apiClient.get<PaginatedMediaResponse>(url);
  },

  /**
   * Récupérer un média par ID
   */
  getMedia: (id: string): Promise<APIResponse<Media>> => {
    return apiClient.get<Media>(`/media/${id}`);
  },

  /**
   * Upload un média via FormData
   */
  uploadMedia: (data: FormData): Promise<APIResponse<Media>> => {
    return apiClient.post<Media>('/media/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },

  /**
   * Créer un média depuis URL
   */
  createMedia: (data: {
    titre: string;
    description?: string;
    typeMedia: TypeMedia;
    url: string;
    miniature?: string;
    editionId?: string;
    auteurId: string;
    estPublic?: boolean;
  }): Promise<APIResponse<Media>> => {
    return apiClient.post<Media>('/media', data);
  },

  /**
   * Mettre à jour un média
   */
  updateMedia: (id: string, data: {
    titre?: string;
    description?: string;
    typeMedia?: TypeMedia;
    miniature?: string;
    estPublic?: boolean;
  }): Promise<APIResponse<Media>> => {
    return apiClient.put<Media>(`/media/${id}`, data);
  },

  /**
   * Supprimer un média
   */
  deleteMedia: (id: string): Promise<APIResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/media/${id}`);
  },

  /**
   * Récupérer les statistiques médias
   */
  getMediaStats: (editionId?: string): Promise<APIResponse<MediaStats>> => {
    const params = new URLSearchParams();
    if (editionId) params.append('editionId', editionId);

    const url = `/media/stats${params.toString() ? `?${params.toString()}` : ''}`;
    return apiClient.get<MediaStats>(url);
  },
};