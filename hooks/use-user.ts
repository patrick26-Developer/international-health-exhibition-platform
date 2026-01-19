// hooks/use-toast.ts - CORRIGÉ
import { useUIStore } from '@/lib/stores/ui-store';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  type: ToastType;
  message: string;
  duration?: number;
}

export function useToast() {
  const addToast = useUIStore((state) => state.addToast);
  const removeToast = useUIStore((state) => state.removeToast);
  const clearToasts = useUIStore((state) => state.clearToasts);

  const toast = (message: string, options?: { type?: ToastType; duration?: number }) => {
    const { type = 'info', duration = 5000 } = options || {};
    addToast({ type, message, duration });
  };

  const success = (message: string, duration?: number) => {
    addToast({ type: 'success', message, duration });
  };

  const error = (message: string, duration?: number) => {
    addToast({ type: 'error', message, duration });
  };

  const warning = (message: string, duration?: number) => {
    addToast({ type: 'warning', message, duration });
  };

  const info = (message: string, duration?: number) => {
    addToast({ type: 'info', message, duration });
  };

  return {
    addToast, // Maintenant exporté
    toast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearToasts,
  };
}