// app/api/programs/[id]/route.ts - CORRECTION AVEC Prisma.NullableJsonNullValueInput
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { safeValidateUpdateProgramme } from '@/lib/validation/program-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import { Prisma } from '@/lib/generated/prisma/client';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/programs/[id]
 * Récupérer un programme spécifique
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const programme = await prisma.programmeEdition.findUnique({
      where: { id: params.id },
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

/**
 * PUT /api/programs/[id]
 * Mettre à jour un programme (admin seulement)
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

    if (!isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validation
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

    // Vérifier que le programme existe
    const programmeExistant = await prisma.programmeEdition.findUnique({
      where: { id: params.id },
    });

    if (!programmeExistant) {
      return NextResponse.json(
        creerErrorResponse('Programme non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour
    const dataToUpdate: Prisma.ProgrammeEditionUpdateInput = {};
    
    if (updateData.type !== undefined) dataToUpdate.type = updateData.type;
    if (updateData.titre !== undefined) dataToUpdate.titre = updateData.titre;
    if (updateData.description !== undefined) dataToUpdate.description = updateData.description;
    if (updateData.dateDebut !== undefined) dataToUpdate.dateDebut = new Date(updateData.dateDebut);
    if (updateData.dateFin !== undefined) dataToUpdate.dateFin = new Date(updateData.dateFin);
    if (updateData.lieu !== undefined) dataToUpdate.lieu = updateData.lieu;
    
    // ✅ CORRECTION : Utilisation de Prisma.DbNull ou Prisma.JsonNull
    if (updateData.intervenants !== undefined) {
      dataToUpdate.intervenants = updateData.intervenants 
        ? (updateData.intervenants as unknown as Prisma.InputJsonValue)
        : Prisma.JsonNull; // ou Prisma.DbNull selon votre configuration
    }
    
    if (updateData.maxParticipants !== undefined) dataToUpdate.maxParticipants = updateData.maxParticipants;
    
    dataToUpdate.dateModification = new Date();

    // Mettre à jour le programme
    const programme = await prisma.programmeEdition.update({
      where: { id: params.id },
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

    // Journalisation
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

/**
 * DELETE /api/programs/[id]
 * Supprimer un programme (admin seulement)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const programme = await prisma.programmeEdition.findUnique({
      where: { id: params.id },
    });

    if (!programme) {
      return NextResponse.json(
        creerErrorResponse('Programme non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Supprimer le programme
    await prisma.programmeEdition.delete({
      where: { id: params.id },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'ProgrammeEdition',
        entiteId: params.id,
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