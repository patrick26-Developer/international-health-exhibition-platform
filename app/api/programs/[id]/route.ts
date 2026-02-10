import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { safeValidateUpdateProgramme } from '@/lib/validation/program-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import { Prisma } from '@/lib/generated/prisma/client';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const programme = await prisma.programmeEdition.findUnique({
      where: { id },
      include: {
        edition: {
          select: {
            id: true,
            nom: true,
            ville: true,
            pays: true,
            dateDebut: true,
            dateFin: true,
          },
        },
      },
    });

    if (!programme) {
      return NextResponse.json(
        creerErrorResponse('Programme non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(creerSuccessResponse(programme));
  } catch (error) {
    console.error('Erreur récupération programme:', error);
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
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const validation = safeValidateUpdateProgramme(body);
    
    if (!validation.success) {
      const errors: ValidationError[] = validation.errors!.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: 'INVALID_FORMAT',
      }));
      
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const updateData = validation.data!;

    const programmeExistant = await prisma.programmeEdition.findUnique({
      where: { id },
    });

    if (!programmeExistant) {
      return NextResponse.json(
        creerErrorResponse('Programme non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const dataToUpdate: Prisma.ProgrammeEditionUpdateInput = {};
    
    if (updateData.type !== undefined) dataToUpdate.type = updateData.type;
    if (updateData.titre !== undefined) dataToUpdate.titre = updateData.titre;
    if (updateData.description !== undefined) dataToUpdate.description = updateData.description;
    if (updateData.dateDebut !== undefined) dataToUpdate.dateDebut = new Date(updateData.dateDebut);
    if (updateData.dateFin !== undefined) dataToUpdate.dateFin = new Date(updateData.dateFin);
    if (updateData.lieu !== undefined) dataToUpdate.lieu = updateData.lieu;
    
    if (updateData.intervenants !== undefined) {
      dataToUpdate.intervenants = updateData.intervenants 
        ? (updateData.intervenants as unknown as Prisma.InputJsonValue)
        : Prisma.JsonNull;
    }
    
    if (updateData.maxParticipants !== undefined) dataToUpdate.maxParticipants = updateData.maxParticipants;
    
    dataToUpdate.dateModification = new Date();

    const programme = await prisma.programmeEdition.update({
      where: { id },
      data: dataToUpdate,
      include: {
        edition: {
          select: {
            id: true,
            nom: true,
            ville: true,
          },
        },
      },
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'MODIFICATION',
        entite: 'ProgrammeEdition',
        entiteId: programme.id,
        modifications: {
          avant: programmeExistant,
          apres: programme,
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(programme, 'Programme mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour programme:', error);
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
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const programme = await prisma.programmeEdition.findUnique({
      where: { id },
    });

    if (!programme) {
      return NextResponse.json(
        creerErrorResponse('Programme non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    await prisma.programmeEdition.delete({
      where: { id },
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'ProgrammeEdition',
        entiteId: id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Programme supprimé avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression programme:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}