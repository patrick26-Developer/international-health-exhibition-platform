// lib/services/program-service.ts
import { apiClient } from '@/lib/api/api-client';
import type {
  ProgrammeComplet,
  ProgrammePublic,
  CreateProgrammeDTO,
  APIResponse,
  PaginatedResponse,
} from '@/lib/types';

export const programService = {
  /**
   * Récupérer tous les programmes
   */
  async getProgrammes(params?: {
    editionId?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> {
    return apiClient.get('/programs', { params });
  },

  /**
   * Récupérer un programme par ID
   */
  async getProgramme(id: string): Promise<APIResponse<ProgrammeComplet>> {
    return apiClient.get(`/programs/${id}`);
  },

  /**
   * Créer un nouveau programme
   */
  async createProgramme(data: CreateProgrammeDTO): Promise<APIResponse<ProgrammeComplet>> {
    return apiClient.post('/programs', data);
  },

  /**
   * Mettre à jour un programme
   */
  async updateProgramme(
    id: string,
    data: Partial<CreateProgrammeDTO>
  ): Promise<APIResponse<ProgrammeComplet>> {
    return apiClient.put(`/programs/${id}`, data);
  },

  /**
   * Supprimer un programme
   */
  async deleteProgramme(id: string): Promise<APIResponse<{ message: string }>> {
    return apiClient.delete(`/programs/${id}`);
  },

  /**
   * Récupérer les programmes d'une édition
   */
  async getProgrammesByEdition(
    editionId: string,
    params?: {
      type?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> {
    return apiClient.get(`/editions/${editionId}/programs`, { params });
  },

  /**
   * Récupérer les programmes par type
   */
  async getProgrammesByType(
    type: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> {
    return apiClient.get('/programs', { params: { type, ...params } });
  },

  /**
   * Rechercher des programmes
   */
  async searchProgrammes(query: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> {
    return apiClient.get('/programs/search', { params: { q: query, ...params } });
  },
};