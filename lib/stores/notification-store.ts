import { create } from 'zustand';
import type { NotificationComplete, TypeNotification } from '@/lib/types';

interface NotificationState {
  notifications: NotificationComplete[];
  notificationsNonLues: number;
  estChargement: boolean;
  erreur: string | null;
}

interface NotificationActions {
  setNotifications: (notifications: NotificationComplete[]) => void;
  addNotification: (notification: NotificationComplete) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearNotifications: () => void;
  setChargement: (chargement: boolean) => void;
  setErreur: (erreur: string | null) => void;
}

const initialState: NotificationState = {
  notifications: [],
  notificationsNonLues: 0,
  estChargement: false,
  erreur: null,
};

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  (set, get) => ({
    ...initialState,
    
    setNotifications: (notifications) => {
      const nonLues = notifications.filter((n) => !n.lue).length;
      set({ 
        notifications, 
        notificationsNonLues: nonLues,
        erreur: null,
      });
    },
    
    addNotification: (notification) => {
      set((state) => {
        const updatedNotifications = [notification, ...state.notifications];
        const nonLues = updatedNotifications.filter((n) => !n.lue).length;
        
        return {
          notifications: updatedNotifications,
          notificationsNonLues: nonLues,
          erreur: null,
        };
      });
    },
    
    markAsRead: (notificationId) => {
      set((state) => {
        const updatedNotifications = state.notifications.map((n) =>
          n.id === notificationId ? { ...n, lue: true, dateLecture: new Date() } : n
        );
        const nonLues = updatedNotifications.filter((n) => !n.lue).length;
        
        return {
          notifications: updatedNotifications,
          notificationsNonLues: nonLues,
        };
      });
    },
    
    markAllAsRead: () => {
      set((state) => {
        const updatedNotifications = state.notifications.map((n) => ({
          ...n,
          lue: true,
          dateLecture: new Date(),
        }));
        
        return {
          notifications: updatedNotifications,
          notificationsNonLues: 0,
        };
      });
    },
    
    removeNotification: (notificationId) => {
      set((state) => {
        const updatedNotifications = state.notifications.filter((n) => n.id !== notificationId);
        const nonLues = updatedNotifications.filter((n) => !n.lue).length;
        
        return {
          notifications: updatedNotifications,
          notificationsNonLues: nonLues,
        };
      });
    },
    
    clearNotifications: () => {
      set(initialState);
    },
    
    setChargement: (chargement) => {
      set({ estChargement: chargement });
    },
    
    setErreur: (erreur) => {
      set({ erreur });
    },
  })
);