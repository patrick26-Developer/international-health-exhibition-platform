// hooks/use-statistics.ts
import { useState, useCallback } from 'react';
import { statisticsApi } from '@/lib/api/statistics-api';
import { useApi } from './use-api';
import type { 
  GlobalStats, 
  UserStats, 
  AdminStats,
  EditionStats,
  InscriptionTrendsResponse,
  AdminDashboard
} from '@/lib/api/statistics-api';
import type { PeriodeAdmin, PeriodeTendance } from '@/lib/types/statistics';

interface UseStatisticsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useStatistics(options: UseStatisticsOptions = {}) {
  const {
    autoRefresh = false,
    refreshInterval = 60000 // 1 minute
  } = options;

  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [editionStats, setEditionStats] = useState<Record<string, EditionStats>>({});
  const [inscriptionTrends, setInscriptionTrends] = useState<InscriptionTrendsResponse | null>(null);
  const [adminDashboard, setAdminDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  // Charger les statistiques globales
  const loadGlobalStats = useCallback(async () => {
    return callApi(async () => {
      const response = await statisticsApi.getGlobalStats();
      
      if (response.success) {
        setGlobalStats(response.data);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger les statistiques utilisateur
  const loadUserStats = useCallback(async () => {
    return callApi(async () => {
      const response = await statisticsApi.getUserStats();
      
      if (response.success) {
        setUserStats(response.data);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger les statistiques admin (admin seulement)
  const loadAdminStats = useCallback(async (params?: { periode?: PeriodeAdmin }) => {
    return callApi(async () => {
      const response = await statisticsApi.getAdminStats(params);
      
      if (response.success) {
        setAdminStats(response.data);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger les statistiques d'une édition
  const loadEditionStats = useCallback(async (editionId: string) => {
    return callApi(async () => {
      const response = await statisticsApi.getEditionStats(editionId);
      
      if (response.success) {
        setEditionStats(prev => ({
          ...prev,
          [editionId]: response.data
        }));
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger les tendances d'inscriptions
  const loadInscriptionTrends = useCallback(async (params?: {
    editionId?: string;
    type?: string;
    periode?: PeriodeTendance;
  }) => {
    return callApi(async () => {
      const response = await statisticsApi.getInscriptionTrends(params);
      
      if (response.success) {
        setInscriptionTrends(response.data);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger le tableau de bord admin
  const loadAdminDashboard = useCallback(async () => {
    return callApi(async () => {
      const response = await statisticsApi.getAdminDashboard();
      
      if (response.success) {
        setAdminDashboard(response.data);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Exporter les statistiques
  const exportStats = useCallback(async (
    format: 'csv' | 'json' | 'pdf',
    params?: {
      type?: string;
      periode?: string;
      editionId?: string;
    }
  ) => {
    return callApi(async () => {
      const response = await statisticsApi.exportStats(format, params);
      
      if (response.success) {
        // Télécharger le fichier
        const link = document.createElement('a');
        link.href = response.data.url;
        link.download = response.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Charger toutes les statistiques
  const loadAllStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled([
        loadGlobalStats(),
        loadUserStats(),
      ]);

      const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason);

      if (errors.length > 0) {
        setError(errors.map(err => err.message).join(', '));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  }, [loadGlobalStats, loadUserStats]);

  return {
    // État
    globalStats,
    userStats,
    adminStats,
    editionStats,
    inscriptionTrends,
    adminDashboard,
    loading,
    error,
    
    // Actions
    loadGlobalStats,
    loadUserStats,
    loadAdminStats,
    loadEditionStats,
    loadInscriptionTrends,
    loadAdminDashboard,
    loadAllStats,
    exportStats,
    
    // Getters
    getEditionStats: (editionId: string) => editionStats[editionId],
    
    // Helpers
    hasStats: !!globalStats || !!userStats || !!adminStats,
    isLoading: loading,
    hasError: error !== null,
    
    // Reset
    reset: () => {
      setGlobalStats(null);
      setUserStats(null);
      setAdminStats(null);
      setEditionStats({});
      setInscriptionTrends(null);
      setAdminDashboard(null);
      setError(null);
    },
  };
}