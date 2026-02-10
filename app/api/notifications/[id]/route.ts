import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const notification = await prisma.notification.findUnique({
      where: { id }
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

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const notification = await prisma.notification.findUnique({
      where: { id }
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
      where: { id },
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

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const notification = await prisma.notification.findUnique({
      where: { id }
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
      where: { id }
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