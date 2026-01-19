// lib/api/program-api.ts
import { apiClient } from './api-client';
import type {
  ProgrammeComplet,
  ProgrammePublic,
  CreateProgrammeDTO,
  APIResponse,
  PaginatedResponse,
} from '@/lib/types';

export const programApi = {
  /**
   * Récupérer tous les programmes
   */
  getProgrammes: (params?: {
    editionId?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> => {
    return apiClient.get('/programs', { params });
  },

  /**
   * Récupérer un programme par ID
   */
  getProgramme: (id: string): Promise<APIResponse<ProgrammeComplet>> => {
    return apiClient.get(`/programs/${id}`);
  },

  /**
   * Créer un nouveau programme
   */
  createProgramme: (data: CreateProgrammeDTO): Promise<APIResponse<ProgrammeComplet>> => {
    return apiClient.post('/programs', data);
  },

  /**
   * Mettre à jour un programme
   */
  updateProgramme: (
    id: string,
    data: Partial<CreateProgrammeDTO>
  ): Promise<APIResponse<ProgrammeComplet>> => {
    return apiClient.put(`/programs/${id}`, data);
  },

  /**
   * Supprimer un programme
   */
  deleteProgramme: (id: string): Promise<APIResponse<{ message: string }>> => {
    return apiClient.delete(`/programs/${id}`);
  },

  /**
   * Récupérer les programmes d'une édition
   */
  getProgrammesByEdition: (
    editionId: string,
    params?: {
      type?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> => {
    return apiClient.get(`/editions/${editionId}/programs`, { params });
  },

  /**
   * Rechercher des programmes
   */
  searchProgrammes: (
    query: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<APIResponse<PaginatedResponse<ProgrammePublic>>> => {
    return apiClient.get('/programs/search', { params: { q: query, ...params } });
  },
};