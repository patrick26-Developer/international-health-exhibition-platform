// app/api/exhibitors/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateUpdateExposant } from '@/lib/validation/exhibitor-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/exhibitors/[id]
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const exposant = await prisma.exposant.findUnique({
      where: { id: params.id },
      include: {
        utilisateur: {
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
            telephone: true,
          },
        },
        edition: {
          select: {
            id: true,
            nom: true,
            ville: true,
            dateDebut: true,
            dateFin: true,
          },
        },
      },
    });

    if (!exposant) {
      return NextResponse.json(
        creerErrorResponse('Exposant non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(creerSuccessResponse(exposant));
  } catch (error) {
    console.error('Erreur récupération exposant:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/exhibitors/[id]
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non authentifié', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation
    let exposantData;
    try {
      exposantData = validateUpdateExposant(body);
    } catch (error: any) {
      const errors: ValidationError[] = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      })) || [];
      
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Vérifier existence et permissions
    const existing = await prisma.exposant.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        creerErrorResponse('Exposant non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (existing.utilisateurId !== session.sub && !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Mise à jour
    const updated = await prisma.exposant.update({
      where: { id: params.id },
      data: {
        ...exposantData,
        dateModification: new Date(),
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
          },
        },
        edition: {
          select: {
            id: true,
            nom: true,
          },
        },
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'MODIFICATION',
        entite: 'Exposant',
        entiteId: updated.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(updated, 'Exposant mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour exposant:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/exhibitors/[id]
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const exposant = await prisma.exposant.findUnique({
      where: { id: params.id },
    });

    if (!exposant) {
      return NextResponse.json(
        creerErrorResponse('Exposant non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    await prisma.exposant.delete({
      where: { id: params.id },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Exposant',
        entiteId: params.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Exposant supprimé avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression exposant:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}