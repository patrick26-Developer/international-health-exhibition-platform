import { authApi } from '@/lib/api/auth-api';
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

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async inscription(data: InscriptionRequest): Promise<APIResponse<AuthResponse>> {
    return authApi.inscription(data);
  },

  /**
   * Connexion
   */
  async connexion(data: ConnexionRequest): Promise<APIResponse<AuthResponse>> {
    return authApi.connexion(data);
  },

  /**
   * Déconnexion
   */
  async deconnexion(): Promise<APIResponse<{ message: string }>> {
    return authApi.deconnexion();
  },

  /**
   * Vérifier la session actuelle
   */
  async verifierSession(): Promise<APIResponse<AuthResponse>> {
    return authApi.verifierSession();
  },

  /**
   * Rafraîchir la session
   */
  async rafraichirSession(): Promise<APIResponse<AuthResponse>> {
    return authApi.rafraichirSession();
  },

  /**
   * Mot de passe oublié
   */
  async motDePasseOublie(data: MotDePasseOublieRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.motDePasseOublie(data);
  },

  /**
   * Réinitialisation du mot de passe
   */
  async reinitialisationMDP(data: ReinitialisationMDPRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.reinitialisationMDP(data);
  },

  /**
   * Vérification d'email
   */
  async verificationEmail(data: VerificationEmailRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.verificationEmail(data);
  },

  /**
   * Renvoi de code
   */
  async renvoiCode(data: RenvoiCodeRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.renvoiCode(data);
  },

  /**
   * Changement d'email
   */
  async changementEmail(data: ChangementEmailRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.changementEmail(data);
  },

  /**
   * Confirmation changement d'email
   */
  async confirmationChangementEmail(data: ConfirmationChangementEmailRequest): Promise<APIResponse<{ message: string }>> {
    return authApi.confirmationChangementEmail(data);
  },

  /**
   * Vérifier un OTP
   */
  async verifierOTP(email: string, code: string, type: string): Promise<APIResponse<{ message: string; nextStep?: string }>> {
    return authApi.verifierOTP({ email, code, type });
  },
};