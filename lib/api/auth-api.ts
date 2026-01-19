// lib/api/auth-api.ts
import { apiClient } from './api-client';
import type {
  AuthResponse,
  InscriptionRequest,
  ConnexionRequest,
  MotDePasseOublieRequest,
  ReinitialisationMDPRequest,
  VerificationEmailRequest,
  RenvoiCodeRequest,
  ChangementEmailRequest,
  ConfirmationChangementEmailRequest,
  APIResponse,
} from '@/lib/types';

export const authApi = {
  /**
   * Inscription
   */
  inscription: (data: InscriptionRequest): Promise<APIResponse<AuthResponse>> => {
    return apiClient.post('/auth/register', data);
  },

  /**
   * Connexion
   */
  connexion: (data: ConnexionRequest): Promise<APIResponse<AuthResponse>> => {
    return apiClient.post('/auth/login', data);
  },

  /**
   * Déconnexion
   */
  deconnexion: (): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/logout');
  },

  /**
   * Vérifier la session
   */
  verifierSession: (): Promise<APIResponse<AuthResponse>> => {
    return apiClient.get('/auth/session');
  },

  /**
   * Rafraîchir la session
   */
  rafraichirSession: (): Promise<APIResponse<AuthResponse>> => {
    return apiClient.post('/auth/refresh');
  },

  /**
   * Mot de passe oublié
   */
  motDePasseOublie: (data: MotDePasseOublieRequest): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/forgot-password', data);
  },

  /**
   * Réinitialisation du mot de passe
   */
  reinitialisationMDP: (
    data: ReinitialisationMDPRequest
  ): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/reset-password', data);
  },

  /**
   * Vérification d'email
   */
  verificationEmail: (data: VerificationEmailRequest): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/verify-email', data);
  },

  /**
   * Renvoi de code
   */
  renvoiCode: (data: RenvoiCodeRequest): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/resend-code', data);
  },

  /**
   * Changement d'email
   */
  changementEmail: (data: ChangementEmailRequest): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/change-email', data);
  },

  /**
   * Confirmation changement d'email
   */
  confirmationChangementEmail: (
    data: ConfirmationChangementEmailRequest
  ): Promise<APIResponse<{ message: string }>> => {
    return apiClient.post('/auth/confirm-email-change', data);
  },

  /**
   * Vérification OTP
   */
  verifierOTP: (data: {
    email: string;
    code: string;
    type: string;
  }): Promise<APIResponse<{ message: string; nextStep?: string }>> => {
    return apiClient.post('/auth/verify-otp', data);
  },
};