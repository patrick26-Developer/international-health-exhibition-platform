import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateUpdateEdition } from '@/lib/validation/edition-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    const edition = await prisma.edition.findUnique({
      where: { id },
      include: {
        inscriptions: {
          select: {
            id: true,
            typeInscription: true,
            statut: true,
          },
        },
        programmes: {
          select: {
            id: true,
            type: true,
            titre: true,
            dateDebut: true,
            dateFin: true,
          },
        },
        exposants: {
          where: { statut: 'APPROUVE' },
          select: {
            id: true,
            nomOrganisation: true,
            secteurActivite: true,
          },
        },
        benevoles: {
          where: { statut: 'ACCEPTE' },
          select: {
            id: true,
          },
        },
        bilan: true,
      },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(creerSuccessResponse(edition));
  } catch (error) {
    console.error('Erreur récupération édition:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non authentifié', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    if (!isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès refusé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    let editionData;
    try {
      editionData = validateUpdateEdition(body);
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

    const editionExistante = await prisma.edition.findUnique({
      where: { id },
    });

    if (!editionExistante) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (editionData.slug && editionData.slug !== editionExistante.slug) {
      const slugExistant = await prisma.edition.findUnique({
        where: { slug: editionData.slug as string },
      });

      if (slugExistant) {
        return NextResponse.json(
          creerErrorResponse('Ce slug est déjà utilisé', 'CONFLICT'),
          { status: 409 }
        );
      }
    }

    const edition = await prisma.edition.update({
      where: { id },
      data: editionData,
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'MODIFICATION',
        entite: 'Edition',
        entiteId: edition.id,
        modifications: {
          avant: editionExistante,
          apres: edition,
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(creerSuccessResponse(edition));
  } catch (error) {
    console.error('Erreur modification édition:', error);
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
        creerErrorResponse('Non authentifié', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    if (!isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès refusé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const edition = await prisma.edition.findUnique({
      where: { id },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    await prisma.edition.delete({
      where: { id },
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Edition',
        entiteId: id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Édition supprimée avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression édition:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}