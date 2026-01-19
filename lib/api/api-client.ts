// lib/api/api-client.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { APIResponse, APIErrorResponse, ValidationError } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Ajouter le token d'authentification si disponible
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Ajouter des headers communs
        if (config.headers) {
          config.headers['X-Request-ID'] = this.generateRequestId();
          config.headers['Accept-Language'] = 'fr';
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<APIResponse<unknown>>) => {
        return response;
      },
      (error) => {
        // Gestion des erreurs HTTP
        if (error.response) {
          const { status, data } = error.response;
          
          // Erreur 401 - Non autorisé
          if (status === 401) {
            this.clearTokens();
            window.location.href = '/auth/login';
          }
          
          // Erreur 429 - Rate limiting
          if (status === 429) {
            console.warn('Rate limit atteint');
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', token);
  }

  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ method: 'GET', url, ...config });
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ method: 'PATCH', url, data, ...config });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>({ method: 'DELETE', url, ...config });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.client.request<APIResponse<T>>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as APIErrorResponse;
        return errorData;
      }

      return {
        success: false,
        error: 'Erreur réseau ou serveur',
        code: 'INTERNAL_ERROR',
      };
    }
  }

  // Upload de fichiers
  async uploadFile<T>(
    url: string,
    file: File,
    fieldName: string = 'file'
  ): Promise<APIResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    return this.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Set tokens
  setTokens(accessToken: string, refreshToken?: string): void {
    this.setAccessToken(accessToken);
    if (refreshToken && typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
}

export const apiClient = new ApiClient();