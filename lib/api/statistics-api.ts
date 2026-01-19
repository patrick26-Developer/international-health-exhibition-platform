// lib/api/statistics-api.ts
import { apiClient } from './api-client';
import type { 
  APIResponse,
  PaginatedResponse,
  ValidationError 
} from '@/lib/types';

// Interface pour les statistiques globales
export interface GlobalStats {
  totalUtilisateurs: number;
  totalEditions: number;
  totalInscriptions: number;
  totalExposants: number;
  totalBenevoles: number;
  totalPartenaires: number;
  utilisateursEnAttente: number;
  utilisateursVerifies: number;
  utilisateursActifs: number;
  nouvellesInscriptions30jours: number;
  nouvellesEditions30jours: number;
  nouvellesConnexions30jours: number;
}

// Interface pour les statistiques utilisateur
export interface UserStats {
  totalInscriptions: number;
  totalExposants: number;
  totalBenevoles: number;
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
      dateFin: Date;
    };
  }>;
  exposants: Array<{
    id: string;
    nomOrganisation: string;
    statut: string;
    edition: {
      nom: string;
    };
  }>;
  benevoles: Array<{
    id: string;
    statut: string;
    edition: {
      nom: string;
    };
  }>;
}

// Interface pour les statistiques admin
export interface AdminStats {
  // Totaux
  totalUtilisateurs: number;
  totalEditions: number;
  totalInscriptions: number;
  totalExposants: number;
  totalBenevoles: number;
  totalPartenaires: number;
  
  // Répartitions
  utilisateursParType: Record<string, number>;
  inscriptionsParType: Record<string, number>;
  editionsParStatut: Record<string, number>;
  
  // Tendances
  connexionsJournalieres: Array<{
    date: string;
    count: number;
  }>;
  inscriptionsJournalieres: Array<{
    date: string;
    count: number;
  }>;
  
  // Période
  periode: {
    debut: Date;
    fin: Date;
  };
}

// Interface pour les statistiques d'édition
export interface EditionStats {
  edition: {
    id: string;
    nom: string;
    ville: string;
    pays: string;
    dateDebut: Date;
    dateFin: Date;
  };
  inscriptions: {
    total: number;
    visiteurs: number;
    exposants: number;
    benevoles: number;
  };
  statistiques: {
    satisfactionMoyenne: number | null;
    recommandation: number | null;
    actionsSensibilisation: number;
    partenariatsActifs: number;
  };
}

// Interface pour les tendances d'inscriptions
export interface InscriptionTrend {
  date: string; // Format YYYY-MM-DD
  total: number;
  visiteurs: number;
  exposants: number;
  benevoles: number;
}

export interface InscriptionTrendsResponse {
  tendances: InscriptionTrend[];
  moyennes: {
    quotidienne: number;
    hebdomadaire: number;
    mensuelle: number;
  };
}

// Interface pour le tableau de bord admin
export interface AdminDashboard {
  metriques: {
    utilisateurs: number;
    editions: number;
    inscriptions: number;
    revenus: number;
  };
  alertes: Array<{
    type: 'info' | 'warning' | 'error';
    titre: string;
    message: string;
    date: Date;
  }>;
  activiteRecent: Array<{
    type: string;
    utilisateur: string;
    date: Date;
    details: string;
  }>;
}

// Interface pour l'export des statistiques
export interface ExportStatsResponse {
  url: string;
  filename: string;
  expiresAt: Date;
}

export const statisticsApi = {
  /**
   * Récupérer les statistiques globales
   */
  getGlobalStats: (): Promise<APIResponse<GlobalStats>> => {
    return apiClient.get('/statistics/global');
  },

  /**
   * Récupérer les statistiques utilisateur
   */
  getUserStats: (): Promise<APIResponse<UserStats>> => {
    return apiClient.get('/statistics/user');
  },

  /**
   * Récupérer les statistiques admin (admin seulement)
   */
  getAdminStats: (params?: {
    periode?: '7jours' | '30jours' | '90jours' | 'annee';
  }): Promise<APIResponse<AdminStats>> => {
    return apiClient.get('/admin/statistics', { params });
  },

  /**
   * Récupérer les statistiques d'une édition spécifique
   */
  getEditionStats: (editionId: string): Promise<APIResponse<EditionStats>> => {
    return apiClient.get(`/statistics/editions/${editionId}`);
  },

  /**
   * Récupérer les tendances d'inscriptions
   */
  getInscriptionTrends: (params?: {
    editionId?: string;
    type?: string;
    periode?: 'jour' | 'semaine' | 'mois' | 'annee';
  }): Promise<APIResponse<InscriptionTrendsResponse>> => {
    return apiClient.get('/statistics/inscriptions/trends', { params });
  },

  /**
   * Récupérer le tableau de bord admin
   */
  getAdminDashboard: (): Promise<APIResponse<AdminDashboard>> => {
    return apiClient.get('/admin/statistics/dashboard');
  },

  /**
   * Exporter les statistiques dans un format spécifique
   */
  exportStats: (
    format: 'csv' | 'json' | 'pdf' = 'csv',
    params?: {
      type?: string;
      periode?: string;
      editionId?: string;
    }
  ): Promise<APIResponse<ExportStatsResponse>> => {
    return apiClient.get(`/statistics/export?format=${format}`, { params });
  },

  /**
   * Récupérer les statistiques de performance
   */
  getPerformanceStats: (params?: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<APIResponse<{
    tempsReponseMoyen: number;
    tauxErreur: number;
    utilisateursConcurrents: number;
    requetesParHeure: number;
  }>> => {
    return apiClient.get('/statistics/performance', { params });
  },

  /**
   * Récupérer les statistiques d'engagement
   */
  getEngagementStats: (): Promise<APIResponse<{
    tauxRetention: number;
    tempsSessionMoyen: number;
    pagesParSession: number;
    tauxConversion: number;
  }>> => {
    return apiClient.get('/statistics/engagement');
  },
};