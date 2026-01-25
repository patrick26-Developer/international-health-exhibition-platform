// components/providers/auth-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { authService } from '@/lib/services/auth-service';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { addToast } = useToast();
  const {
    utilisateur,
    jeton,
    estChargement,
    clearSession,
    setChargement,
  } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      if (!jeton) {
        setIsLoading(false);
        return;
      }

      const response = await authService.verifierSession();
      
      if (!response.success) {
        clearSession();
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      clearSession();
    } finally {
      setIsLoading(false);
      setChargement(false);
    }
  };

  const logout = async () => {
    try {
      await authService.deconnexion();
      clearSession();
      addToast({
        type: 'success',
        message: 'Déconnexion réussie',
      });
      router.push('/auth/login');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      addToast({
        type: 'error',
        message: 'Erreur lors de la déconnexion',
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated: !!utilisateur && !!jeton,
    isLoading: estChargement || isLoading,
    checkAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}