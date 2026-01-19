// app/api/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateCreateNotification } from '@/lib/validation/notification-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError, TypeNotification } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const lue = searchParams.get('lue');
    const type = searchParams.get('type') as TypeNotification | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));
    
    const skip = (page - 1) * limit;

    const where: any = {
      utilisateurId: session.sub
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
        orderBy: { dateCreation: 'desc' },
        skip,
        take: limit
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
    console.error('Erreur récupération notifications:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validateCreateNotification(body);
    
    if (!validation.success) {
      const errors: ValidationError[] = validation.error?.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      })) || [];

      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const validatedData = validation.data!;

    // Seuls les admins peuvent créer des notifications pour d'autres utilisateurs
    if (validatedData.utilisateurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé à créer des notifications pour cet utilisateur', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        utilisateurId: validatedData.utilisateurId,
        type: validatedData.type,
        titre: validatedData.titre,
        message: validatedData.message,
        lien: validatedData.lien
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