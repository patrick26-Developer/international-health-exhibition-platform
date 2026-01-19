// hooks/use-auth.ts - CORRIGÉ COMPLET
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { authService } from '@/lib/services/auth-service';
import { estAPISuccess } from '@/lib/types';
import type {
  InscriptionRequest,
  ConnexionRequest,
  MotDePasseOublieRequest,
  ReinitialisationMDPRequest,
  VerificationEmailRequest,
} from '@/lib/types';

export function useAuth() {
  const router = useRouter();
  const {
    utilisateur,
    jeton,
    expiresAt,
    estChargement,
    setSession,
    clearSession,
    setChargement,
  } = useAuthStore();

  // Vérifier la session au montage
  useEffect(() => {
    const checkSession = async () => {
      setChargement(true);
      
      try {
        const response = await authService.verifierSession();
        
        if (estAPISuccess(response)) {
          setSession({
            utilisateur: response.data.utilisateur,
            jeton: response.data.jeton,
            expiresAt: new Date(response.data.expiresAt),
          });
        } else {
          clearSession();
        }
      } catch (error) {
        console.error('Erreur vérification session:', error);
        clearSession();
      } finally {
        setChargement(false);
      }
    };

    if (!utilisateur && !estChargement) {
      checkSession();
    }
  }, [utilisateur, estChargement, setSession, clearSession, setChargement]);

  // Inscription
  const inscription = async (data: InscriptionRequest) => {
    setChargement(true);
    
    try {
      const response = await authService.inscription(data);
      
      if (estAPISuccess(response)) {
        return { success: true, data: response.data };
      }
      
      return {
        success: false,
        error: response.error,
        details: response.details,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de l\'inscription',
      };
    } finally {
      setChargement(false);
    }
  };

  // Connexion
  const connexion = async (data: ConnexionRequest) => {
    setChargement(true);
    
    try {
      const response = await authService.connexion(data);
      
      if (estAPISuccess(response)) {
        setSession({
          utilisateur: response.data.utilisateur,
          jeton: response.data.jeton,
          expiresAt: new Date(response.data.expiresAt),
        });
        
        router.push('/dashboard');
        return { success: true };
      }
      
      return {
        success: false,
        error: response.error,
        code: response.code,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion',
      };
    } finally {
      setChargement(false);
    }
  };

  // Déconnexion
  const deconnexion = async () => {
    setChargement(true);
    
    try {
      await authService.deconnexion();
      clearSession();
      router.push('/');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    } finally {
      setChargement(false);
    }
  };

  // Mot de passe oublié
  const motDePasseOublie = async (data: MotDePasseOublieRequest) => {
    setChargement(true);
    
    try {
      const response = await authService.motDePasseOublie(data);
      
      if (estAPISuccess(response)) {
        return { success: true, message: response.data.message };
      }
      
      return {
        success: false,
        error: response.error,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la demande',
      };
    } finally {
      setChargement(false);
    }
  };

  // Réinitialiser mot de passe
  const reinitialisationMDP = async (data: ReinitialisationMDPRequest) => {
    setChargement(true);
    
    try {
      const response = await authService.reinitialisationMDP(data);
      
      if (estAPISuccess(response)) {
        return { success: true, message: response.data.message };
      }
      
      return {
        success: false,
        error: response.error,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la réinitialisation',
      };
    } finally {
      setChargement(false);
    }
  };

  // Vérifier email
  const verificationEmail = async (data: VerificationEmailRequest) => {
    setChargement(true);
    
    try {
      const response = await authService.verificationEmail(data);
      
      if (estAPISuccess(response)) {
        return { success: true, message: response.data.message };
      }
      
      return {
        success: false,
        error: response.error,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la vérification',
      };
    } finally {
      setChargement(false);
    }
  };

  return {
    // État
    utilisateur,
    jeton,
    expiresAt,
    estConnecte: !!utilisateur && !!jeton,
    estChargement,
    
    // Actions
    inscription,
    connexion,
    deconnexion,
    motDePasseOublie,
    reinitialisationMDP,
    verificationEmail,
  };
}