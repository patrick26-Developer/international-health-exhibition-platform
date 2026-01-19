// hooks/use-toast.ts - CORRIGÉ FINAL
import { useUIStore } from '@/lib/stores/ui-store';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  type: ToastType;
  message: string;
  duration?: number;
}

export function useToast() {
  const addToastInternal = useUIStore((state) => state.addToast);
  const removeToast = useUIStore((state) => state.removeToast);
  const clearToasts = useUIStore((state) => state.clearToasts);

  /**
   * Fonction addToast exposée pour use-api.ts et autres hooks
   */
  const addToast = (toast: ToastData) => {
    addToastInternal(toast);
  };

  const toast = (message: string, options?: { type?: ToastType; duration?: number }) => {
    const { type = 'info', duration = 5000 } = options || {};
    addToastInternal({ type, message, duration });
  };

  const success = (message: string, duration?: number) => {
    addToastInternal({ type: 'success', message, duration });
  };

  const error = (message: string, duration?: number) => {
    addToastInternal({ type: 'error', message, duration });
  };

  const warning = (message: string, duration?: number) => {
    addToastInternal({ type: 'warning', message, duration });
  };

  const info = (message: string, duration?: number) => {
    addToastInternal({ type: 'info', message, duration });
  };

  return {
    addToast,
    toast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearToasts,
  };
}