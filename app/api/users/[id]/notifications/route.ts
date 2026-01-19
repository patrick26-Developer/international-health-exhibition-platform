// app/api/users/[id]/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';
import type { TypeNotification } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/users/[id]/notifications
 * Récupérer les notifications d'un utilisateur spécifique (admin seulement)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Vérifier les permissions
    if (session.sub !== params.id && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id },
      select: { id: true }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const lue = searchParams.get('lue');
    const type = searchParams.get('type') as TypeNotification | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const orderBy = searchParams.get('orderBy') || 'dateCreation';
    const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
    
    const skip = (page - 1) * limit;

    const where: any = {
      utilisateurId: params.id
    };

    if (lue !== null) {
      where.lue = lue === 'true';
    }

    if (type) {
      where.type = type;
    }

    const [notifications, total, nonLues] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { [orderBy]: order },
        skip,
        take: limit,
        include: {
          utilisateur: {
            select: {
              id: true,
              prenom: true,
              nom: true,
              email: true
            }
          }
        }
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ 
        where: { ...where, lue: false }
      })
    ]);

    return NextResponse.json(
      creerSuccessResponse({
        items: notifications,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        nonLues
      })
    );
  } catch (error) {
    console.error('Erreur récupération notifications utilisateur:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/users/[id]/notifications
 * Créer une notification pour un utilisateur spécifique (admin seulement)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id },
      select: { id: true, email: true, prenom: true }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validation basique
    if (!body.titre || !body.message || !body.type) {
      return NextResponse.json(
        creerErrorResponse('Titre, message et type sont requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        utilisateurId: params.id,
        type: body.type,
        titre: body.titre,
        message: body.message,
        lien: body.lien
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true
          }
        }
      }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Notification',
        entiteId: notification.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(notification, 'Notification créée avec succès'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création notification:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]/notifications
 * Supprimer toutes les notifications d'un utilisateur (admin seulement)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id },
      select: { id: true }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Compter avant suppression pour le journal
    const countBefore = await prisma.notification.count({
      where: { utilisateurId: params.id }
    });

    // Supprimer toutes les notifications
    await prisma.notification.deleteMany({
      where: { utilisateurId: params.id }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Notification',
        entiteId: `batch-${params.id}`,
        modifications: {
          countBefore,
          countAfter: 0
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ 
        message: `${countBefore} notification(s) supprimée(s) avec succès`,
        count: countBefore 
      })
    );
  } catch (error) {
    console.error('Erreur suppression notifications:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}