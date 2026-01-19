// hooks/use-api.ts
import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api/api-client';
import type { APIResponse, ValidationError } from '@/lib/types';
import { useToast } from './use-toast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string, code?: string) => void;
  showToast?: boolean;
}

export function useApi<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { addToast } = useToast();

  const callApi = useCallback(
    async (
      apiCall: () => Promise<APIResponse<T>>,
      options: UseApiOptions<T> = {}
    ) => {
      const { onSuccess, onError, showToast = true } = options;

      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();

        if (response.success) {
          setData(response.data);
          
          if (onSuccess) {
            onSuccess(response.data);
          }

          if (showToast && response.message) {
            addToast({
              type: 'success',
              message: response.message,
            });
          }

          return { success: true, data: response.data };
        } else {
          setError(response.error);
          
          if (onError) {
            onError(response.error, response.code);
          }

          // Afficher les erreurs de validation
          if (response.code === 'VALIDATION_ERROR' && response.details) {
            const validationErrors = response.details as ValidationError[];
            validationErrors.forEach(err => {
              addToast({
                type: 'error',
                message: `${err.field}: ${err.message}`,
              });
            });
          } else if (showToast) {
            addToast({
              type: 'error',
              message: response.error,
            });
          }

          return { success: false, error: response.error, code: response.code };
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
        setError(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }

        if (showToast) {
          addToast({
            type: 'error',
            message: errorMessage,
          });
        }

        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const get = useCallback(
    async (url: string, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.get<T>(url), options);
    },
    [callApi]
  );

  const post = useCallback(
    async (url: string, data: unknown, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.post<T>(url, data), options);
    },
    [callApi]
  );

  const put = useCallback(
    async (url: string, data: unknown, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.put<T>(url, data), options);
    },
    [callApi]
  );

  const patch = useCallback(
    async (url: string, data: unknown, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.patch<T>(url, data), options);
    },
    [callApi]
  );

  const del = useCallback(
    async (url: string, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.delete<T>(url), options);
    },
    [callApi]
  );

  const upload = useCallback(
    async (url: string, file: File, fieldName?: string, options?: UseApiOptions<T>) => {
      return callApi(() => apiClient.uploadFile<T>(url, file, fieldName), options);
    },
    [callApi]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    // État
    loading,
    error,
    data,
    
    // Actions
    callApi,
    get,
    post,
    put,
    patch,
    del,
    upload,
    reset,
    
    // Helpers
    hasError: error !== null,
    hasData: data !== null,
  };
}