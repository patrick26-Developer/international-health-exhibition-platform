import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProfilUtilisateur, PreferencesUtilisateur } from '@/lib/types';

interface UserState {
  profil: ProfilUtilisateur | null;
  preferences: PreferencesUtilisateur | null;
  estChargement: boolean;
  erreur: string | null;
}

interface UserActions {
  setProfil: (profil: ProfilUtilisateur) => void;
  setPreferences: (preferences: PreferencesUtilisateur) => void;
  updateProfil: (updates: Partial<ProfilUtilisateur>) => void;
  updatePreferences: (updates: Partial<PreferencesUtilisateur>) => void;
  clearUserData: () => void;
  setChargement: (chargement: boolean) => void;
  setErreur: (erreur: string | null) => void;
}

const initialState: UserState = {
  profil: null,
  preferences: null,
  estChargement: false,
  erreur: null,
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setProfil: (profil) => {
        set({ profil, erreur: null });
      },
      
      setPreferences: (preferences) => {
        set({ preferences, erreur: null });
      },
      
      updateProfil: (updates) => {
        set((state) => ({
          profil: state.profil ? { ...state.profil, ...updates } : null,
          erreur: null,
        }));
      },
      
      updatePreferences: (updates) => {
        set((state) => ({
          preferences: state.preferences ? { ...state.preferences, ...updates } : null,
          erreur: null,
        }));
      },
      
      clearUserData: () => {
        set({
          profil: null,
          preferences: null,
          erreur: null,
        });
      },
      
      setChargement: (chargement) => {
        set({ estChargement: chargement });
      },
      
      setErreur: (erreur) => {
        set({ erreur });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        profil: state.profil,
        preferences: state.preferences,
      }),
    }
  )
);