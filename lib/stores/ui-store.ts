import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  language: 'fr' | 'en';
  toastQueue: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
}

interface UIActions {
  setTheme: (theme: UIState['theme']) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setLanguage: (language: UIState['language']) => void;
  addToast: (toast: Omit<UIState['toastQueue'][0], 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const initialState: UIState = {
  theme: 'system',
  sidebarOpen: true,
  mobileMenuOpen: false,
  language: 'fr',
  toastQueue: [],
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setTheme: (theme) => {
        set({ theme });
      },
      
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        }));
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
      },
      
      setLanguage: (language) => {
        set({ language });
      },
      
      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toastQueue: [...state.toastQueue, { ...toast, id }],
        }));
      },
      
      removeToast: (id) => {
        set((state) => ({
          toastQueue: state.toastQueue.filter((toast) => toast.id !== id),
        }));
      },
      
      clearToasts: () => {
        set({ toastQueue: [] });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);