import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SessionContext, UtilisateurPublic } from '@/lib/types';

interface AuthState {
  utilisateur: UtilisateurPublic | null;
  jeton: string | null;
  expiresAt: Date | null;
  estChargement: boolean;
}

interface AuthActions {
  setSession: (session: {
    utilisateur: UtilisateurPublic;
    jeton: string;
    expiresAt: Date;
  }) => void;
  clearSession: () => void;
  setChargement: (chargement: boolean) => void;
}

const initialState: AuthState = {
  utilisateur: null,
  jeton: null,
  expiresAt: null,
  estChargement: true,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSession: (session) => {
        set({
          utilisateur: session.utilisateur,
          jeton: session.jeton,
          expiresAt: session.expiresAt,
          estChargement: false,
        });
      },
      
      clearSession: () => {
        set(initialState);
      },
      
      setChargement: (chargement) => {
        set({ estChargement: chargement });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        utilisateur: state.utilisateur,
        jeton: state.jeton,
        expiresAt: state.expiresAt,
      }),
    }
  )
);

// Hook dérivé pour le contexte de session
export function useSessionContext(): SessionContext {
  const { utilisateur, jeton, expiresAt, estChargement } = useAuthStore();
  
  return {
    utilisateur,
    jeton,
    expiresAt,
    estConnecte: !!utilisateur && !!jeton,
    estChargement,
  };
}