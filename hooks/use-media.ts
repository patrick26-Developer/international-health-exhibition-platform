import { useState, useCallback } from 'react';
import { mediaApi } from '@/lib/api/media-api';
import { useApi } from './use-api';
import type { Media, PaginatedMediaResponse } from '@/lib/api/media-api';

interface UseMediaOptions {
  editionId?: string;
  typeMedia?: string;
  page?: number;
  limit?: number;
}

export function useMedia() {
  const [media, setMedia] = useState<Media | null>(null);
  const [medias, setMedias] = useState<Media[]>([]);
  const [pagination, setPagination] = useState<PaginatedMediaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  const loadMedias = useCallback(async (options: UseMediaOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mediaApi.getMedias({
        ...options,
        typeMedia: options.typeMedia as any
      });
      
      if (response.success) {
        setMedias(response.data.items || []);
        setPagination(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des médias';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMedia = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mediaApi.getMedia(id);
      
      if (response.success) {
        setMedia(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du média';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadMedia = useCallback(async (data: FormData) => {
    return callApi(() => mediaApi.uploadMedia(data));
  }, [callApi]);

  const updateMedia = useCallback(async (id: string, data: any) => {
    return callApi(() => mediaApi.updateMedia(id, data));
  }, [callApi]);

  const deleteMedia = useCallback(async (id: string) => {
    return callApi(() => mediaApi.deleteMedia(id));
  }, [callApi]);

  return {
    // État
    media,
    medias,
    pagination,
    loading,
    error,
    
    // Actions
    loadMedias,
    loadMedia,
    uploadMedia,
    updateMedia,
    deleteMedia,
    
    // Helpers
    hasMedias: medias.length > 0,
    hasError: error !== null,
    reset: () => {
      setMedia(null);
      setMedias([]);
      setPagination(null);
      setError(null);
    },
  };
}