// app/api/notifications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/notifications/notifications/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const notification = await prisma.notification.findUnique({
      where: { id: params.id }
    });

    if (!notification) {
      return NextResponse.json(
        creerErrorResponse('Notification non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (notification.utilisateurId !== session.sub) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    return NextResponse.json(
      creerSuccessResponse(notification)
    );
  } catch (error) {
    console.error('Erreur récupération notification:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// PATCH /api/notifications/notifications/[id] (marquer comme lue)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const notification = await prisma.notification.findUnique({
      where: { id: params.id }
    });

    if (!notification) {
      return NextResponse.json(
        creerErrorResponse('Notification non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (notification.utilisateurId !== session.sub) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: params.id },
      data: {
        lue: true,
        dateLecture: new Date()
      }
    });

    return NextResponse.json(
      creerSuccessResponse(updatedNotification, 'Notification marquée comme lue')
    );
  } catch (error) {
    console.error('Erreur mise à jour notification:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// DELETE /api/notifications/notifications/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const notification = await prisma.notification.findUnique({
      where: { id: params.id }
    });

    if (!notification) {
      return NextResponse.json(
        creerErrorResponse('Notification non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (notification.utilisateurId !== session.sub) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    await prisma.notification.delete({
      where: { id: params.id }
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Notification supprimée avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression notification:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}