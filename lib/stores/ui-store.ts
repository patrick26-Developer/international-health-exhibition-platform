// lib/stores/ui-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface UIStore {
  theme: Theme;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toasts: Toast[];
  
  // Theme
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Sidebar
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Toasts
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarOpen: false,
      mobileMenuOpen: false,
      toasts: [],
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      
      // Sidebar actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      // Toast actions
      addToast: (toast) => set((state) => {
        const id = Math.random().toString(36).substring(2, 15);
        const newToast: Toast = { ...toast, id };
        
        // Auto-remove après durée spécifiée
        if (toast.duration !== 0) {
          setTimeout(() => {
            set((state) => ({
              toasts: state.toasts.filter(t => t.id !== id)
            }));
          }, toast.duration || 5000);
        }
        
        return {
          toasts: [...state.toasts, newToast]
        };
      }),
      
      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      })),
      
      clearToasts: () => set({ toasts: [] }),
    }),
    {
      name: 'sis-ui-storage',
      // Ne pas persister les toasts
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        mobileMenuOpen: state.mobileMenuOpen,
      }),
    }
  )
);