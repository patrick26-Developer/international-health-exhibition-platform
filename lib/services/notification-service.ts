// lib/services/statistics-service.ts
// lib/services/notification-service.ts
import prisma from '@/lib/prisma';
import type { 
  CreateNotificationInput,
  NotificationFiltersInput,
  TypeNotification 
} from '@/lib/validation/notification-schema';
import { sendEmail } from './email-service';

export class NotificationService {
  /**
   * Récupérer les notifications d'un utilisateur
   */
  static async getNotifications(
    utilisateurId: string,
    filters?: NotificationFiltersInput
  ) {
    const {
      type,
      lue,
      dateMin,
      dateMax,
      page = 1,
      limit = 20
    } = filters || {};

    const skip = (page - 1) * limit;

    const where: any = { utilisateurId };

    if (type) where.type = type;
    if (lue !== undefined) where.lue = lue;
    if (dateMin || dateMax) {
      where.dateCreation = {};
      if (dateMin) where.dateCreation.gte = new Date(dateMin);
      if (dateMax) where.dateCreation.lte = new Date(dateMax);
    }

    const [notifications, total, nonLues] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { dateCreation: 'desc' },
        skip,
        take: limit
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          utilisateurId,
          lue: false
        }
      })
    ]);

    return {
      notifications,
      total,
      nonLues,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Créer une notification
   */
  static async createNotification(data: CreateNotificationInput) {
    const notification = await prisma.notification.create({
      data: {
        utilisateurId: data.utilisateurId,
        type: data.type,
        titre: data.titre,
        message: data.message,
        lien: data.lien || null
      }
    });

    // Vérifier les préférences de l'utilisateur
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: data.utilisateurId },
      select: {
        email: true,
        prenom: true,
        accepteNotifications: true,
        notificationsSMS: true
      }
    });

    // Envoyer par email si l'utilisateur a activé les notifications
    if (utilisateur?.accepteNotifications && data.type === 'ACTION_REQUISE') {
      await sendEmail({
        destinataire: utilisateur.email,
        sujet: data.titre,
        contenuHTML: this.buildNotificationEmail(data, utilisateur.prenom),
        contenuText: data.message,
        type: 'NOTIFICATION'
      });
    }

    return notification;
  }

  /**
   * Marquer une notification comme lue
   */
  static async markAsRead(notificationId: string, utilisateurId: string) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        utilisateurId
      }
    });

    if (!notification) {
      throw new Error('Notification non trouvée');
    }

    return await prisma.notification.update({
      where: { id: notificationId },
      data: {
        lue: true,
        dateLecture: new Date()
      }
    });
  }

  /**
   * Marquer toutes les notifications comme lues
   */
  static async markAllAsRead(utilisateurId: string) {
    return await prisma.notification.updateMany({
      where: {
        utilisateurId,
        lue: false
      },
      data: {
        lue: true,
        dateLecture: new Date()
      }
    });
  }

  /**
   * Supprimer une notification
   */
  static async deleteNotification(notificationId: string, utilisateurId: string) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        utilisateurId
      }
    });

    if (!notification) {
      throw new Error('Notification non trouvée');
    }

    return await prisma.notification.delete({
      where: { id: notificationId }
    });
  }

  /**
   * Obtenir le nombre de notifications non lues
   */
  static async getUnreadCount(utilisateurId: string): Promise<number> {
    return await prisma.notification.count({
      where: {
        utilisateurId,
        lue: false
      }
    });
  }

  /**
   * Nettoyer les anciennes notifications (> 90 jours)
   */
  static async cleanOldNotifications() {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 90);

    const result = await prisma.notification.deleteMany({
      where: {
        lue: true,
        dateLecture: {
          lt: dateLimit
        }
      }
    });

    return result.count;
  }

  /**
   * Créer une notification pour plusieurs utilisateurs
   */
  static async createBulkNotifications(
    utilisateurIds: string[],
    data: Omit<CreateNotificationInput, 'utilisateurId'>
  ) {
    const notifications = await prisma.notification.createMany({
      data: utilisateurIds.map(utilisateurId => ({
        utilisateurId,
        type: data.type,
        titre: data.titre,
        message: data.message,
        lien: data.lien || null
      }))
    });

    return notifications.count;
  }

  /**
   * Construire le HTML pour l'email de notification
   */
  private static buildNotificationEmail(
    data: CreateNotificationInput,
    prenomUtilisateur: string
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">${data.titre}</h2>
          
          <p>Bonjour ${prenomUtilisateur},</p>
          
          <p>${data.message}</p>
          
          ${data.lien ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.lien}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Voir les détails
            </a>
          </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            Cet email a été envoyé par le Salon International de la Santé (S.I.S.)<br>
            © ${new Date().getFullYear()} Tous droits réservés.
          </p>
        </div>
      </body>
      </html>
    `;
  }
}