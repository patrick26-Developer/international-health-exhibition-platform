// hooks/use-notification.ts
import { useState, useCallback, useEffect } from 'react';
import { notificationApi } from '@/lib/api/notification-api';
import { useApi } from './use-api';
import type { 
  Notification, 
  PaginatedNotifications,
  TypeNotification 
} from '@/lib/api/notification-api';

interface UseNotificationsOptions {
  lue?: boolean;
  type?: TypeNotification;
  page?: number;
  limit?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const {
    lue,
    type,
    page = 1,
    limit = 20,
    autoRefresh = false,
    refreshInterval = 30000 // 30 secondes
  } = options;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState<PaginatedNotifications | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { callApi } = useApi();

  // Charger les notifications
  const loadNotifications = useCallback(async (overrideOptions?: Partial<UseNotificationsOptions>) => {
    const mergedOptions = { ...options, ...overrideOptions };
    
    return callApi(async () => {
      const response = await notificationApi.getNotifications({
        lue: mergedOptions.lue,
        type: mergedOptions.type,
        page: mergedOptions.page,
        limit: mergedOptions.limit
      });

      if (response.success) {
        setNotifications(response.data.items);
        setPagination(response.data);
        return response;
      }
      return response;
    });
  }, [callApi, options]);

  // Charger le nombre de notifications non lues
  const loadUnreadCount = useCallback(async () => {
    return callApi(async () => {
      const response = await notificationApi.getUnreadCount();
      
      if (response.success) {
        setUnreadCount(response.data.count);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Marquer une notification comme lue
  const markAsRead = useCallback(async (notificationId: string) => {
    return callApi(async () => {
      const response = await notificationApi.markAsRead(notificationId);
      
      if (response.success) {
        // Mettre à jour l'état local
        setNotifications(prev => prev.map(notif => 
          notif.id === notificationId ? response.data : notif
        ));
        
        // Actualiser le compteur
        await loadUnreadCount();
        return response;
      }
      return response;
    });
  }, [callApi, loadUnreadCount]);

  // Marquer toutes comme lues
  const markAllAsRead = useCallback(async () => {
    return callApi(async () => {
      const response = await notificationApi.markAllAsRead();
      
      if (response.success) {
        // Mettre à jour l'état local
        setNotifications(prev => prev.map(notif => ({
          ...notif,
          lue: true,
          dateLecture: new Date()
        })));
        
        // Réinitialiser le compteur
        setUnreadCount(0);
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Supprimer une notification
  const deleteNotification = useCallback(async (notificationId: string) => {
    return callApi(async () => {
      const response = await notificationApi.deleteNotification(notificationId);
      
      if (response.success) {
        // Supprimer de l'état local
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
        
        // Actualiser le compteur si nécessaire
        const deletedNotif = notifications.find(n => n.id === notificationId);
        if (deletedNotif && !deletedNotif.lue) {
          await loadUnreadCount();
        }
        return response;
      }
      return response;
    });
  }, [callApi, notifications, loadUnreadCount]);

  // Créer une notification (admin seulement)
  const createNotification = useCallback(async (
    data: {
      utilisateurId?: string;
      type: TypeNotification;
      titre: string;
      message: string;
      lien?: string;
    }
  ) => {
    return callApi(async () => {
      const response = await notificationApi.createNotification(data);
      
      if (response.success) {
        // Si c'est pour l'utilisateur courant, ajouter à la liste
        if (!data.utilisateurId || data.utilisateurId === 'current') {
          setNotifications(prev => [response.data, ...prev]);
          if (!response.data.lue) {
            setUnreadCount(prev => prev + 1);
          }
        }
        return response;
      }
      return response;
    });
  }, [callApi]);

  // Rechargement automatique
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadNotifications();
      loadUnreadCount();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadNotifications, loadUnreadCount]);

  // Chargement initial
  useEffect(() => {
    loadNotifications();
    loadUnreadCount();
  }, [loadNotifications, loadUnreadCount]);

  return {
    // État
    notifications,
    pagination,
    loading,
    error,
    unreadCount,
    
    // Actions
    loadNotifications,
    loadUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    
    // Helpers
    hasNotifications: notifications.length > 0,
    hasUnreadNotifications: unreadCount > 0,
    isLoading: loading,
    
    // Navigation
    goToPage: (newPage: number) => loadNotifications({ ...options, page: newPage }),
    changeLimit: (newLimit: number) => loadNotifications({ ...options, limit: newLimit, page: 1 }),
    
    // Filtrage
    filterByType: (newType?: TypeNotification) => loadNotifications({ ...options, type: newType, page: 1 }),
    filterByReadStatus: (isRead?: boolean) => loadNotifications({ ...options, lue: isRead, page: 1 }),
    
    // Reset
    reset: () => {
      setNotifications([]);
      setPagination(null);
      setError(null);
      setUnreadCount(0);
    },
  };
}