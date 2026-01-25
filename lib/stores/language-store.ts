// ============================================
// 1. lib/stores/language-store.ts - VERSION CORRIGÉE
// ============================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type strict pour les langues supportées
export type Language = 'fr' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set((state) => ({ 
        language: state.language === 'fr' ? 'en' : 'fr' 
      })),
    }),
    {
      name: 'sis-language-storage',
    }
  )
);