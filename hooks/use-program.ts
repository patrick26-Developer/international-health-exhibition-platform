// hooks/use-program.ts - CORRIGÉ
import { useState, useCallback } from 'react';
import { programService } from '@/lib/services/program-service';
import { useApi } from './use-api';
import type {
  ProgrammeComplet,
  ProgrammePublic,
  CreateProgrammeDTO,
  PaginatedResponse,
} from '@/lib/types';

interface UseProgramOptions {
  editionId?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export function useProgram() {
  const [programme, setProgramme] = useState<ProgrammeComplet | null>(null);
  const [programmes, setProgrammes] = useState<ProgrammePublic[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<ProgrammePublic>['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  /**
   * Charger tous les programmes
   */
  const loadProgrammes = useCallback(async (options: UseProgramOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await programService.getProgrammes(options);
      
      if (response.success) {
        // ✅ Correction : Conversion de readonly[] à []
        setProgrammes([...response.data.items]);
        setPagination(response.data.pagination);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des programmes';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Charger un programme spécifique
   */
  const loadProgramme = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await programService.getProgramme(id);
      
      if (response.success) {
        setProgramme(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du programme';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Créer un nouveau programme
   */
  const createProgramme = useCallback(async (data: CreateProgrammeDTO) => {
    return callApi(() => programService.createProgramme(data));
  }, [callApi]);

  /**
   * Mettre à jour un programme
   */
  const updateProgramme = useCallback(async (id: string, data: Partial<CreateProgrammeDTO>) => {
    return callApi(() => programService.updateProgramme(id, data));
  }, [callApi]);

  /**
   * Supprimer un programme
   */
  const deleteProgramme = useCallback(async (id: string) => {
    return callApi(() => programService.deleteProgramme(id));
  }, [callApi]);

  /**
   * Charger les programmes d'une édition
   */
  const loadEditionProgrammes = useCallback(async (editionId: string, options?: {
    type?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await programService.getProgrammesByEdition(editionId, options);
      
      if (response.success) {
        // ✅ Correction : Conversion de readonly[] à []
        setProgrammes([...response.data.items]);
        setPagination(response.data.pagination);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des programmes';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Rechercher des programmes
   */
  const searchProgrammes = useCallback(async (query: string, options?: {
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await programService.searchProgrammes(query, options);
      
      if (response.success) {
        // ✅ Correction : Conversion de readonly[] à []
        setProgrammes([...response.data.items]);
        setPagination(response.data.pagination);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la recherche';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // État
    programme,
    programmes,
    pagination,
    loading,
    error,
    
    // Actions
    loadProgrammes,
    loadProgramme,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    loadEditionProgrammes,
    searchProgrammes,
    
    // Helpers
    hasProgrammes: programmes.length > 0,
    hasError: error !== null,
    reset: () => {
      setProgramme(null);
      setProgrammes([]);
      setPagination(null);
      setError(null);
    },
  };
}