import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';
import { validateNumber } from '@/lib/utils/validators';
import type { ValidationError, CreateBilanDTO } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const edition = await prisma.edition.findUnique({
      where: { id },
      include: {
        bilan: true,
      },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (!edition.bilan) {
      return NextResponse.json(
        creerSuccessResponse(null)
      );
    }

    return NextResponse.json(
      creerSuccessResponse(edition.bilan)
    );
  } catch (error) {
    console.error('Erreur récupération bilan:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
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
    const body: CreateBilanDTO = await request.json();

    const errors: ValidationError[] = [];

    const nombreFields = {
      nombreVisiteurs: body.nombreVisiteurs,
      nombreExposants: body.nombreExposants,
      nombreBenevoles: body.nombreBenevoles,
      actionsSensibilisation: body.actionsSensibilisation,
      partenariatsActifs: body.partenariatsActifs,
      ...(body.satisfactionMoyenne !== undefined && { satisfactionMoyenne: body.satisfactionMoyenne }),
      ...(body.recommandation !== undefined && { recommandation: body.recommandation }),
    };

    Object.entries(nombreFields).forEach(([field, value]) => {
      if (value !== undefined) {
        const error = validateNumber(value, {
          min: 0,
          integer: true,
          fieldName: field,
        });
        if (error) errors.push(error);
      }
    });

    if (body.satisfactionMoyenne !== undefined) {
      const error = validateNumber(body.satisfactionMoyenne, {
        min: 1,
        max: 5,
        fieldName: 'satisfactionMoyenne',
      });
      if (error) errors.push(error);
    }

    if (body.recommandation !== undefined) {
      const error = validateNumber(body.recommandation, {
        min: 1,
        max: 10,
        integer: true,
        fieldName: 'recommandation',
      });
      if (error) errors.push(error);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    const edition = await prisma.edition.findUnique({
      where: { id },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const existingBilan = await prisma.bilanEdition.findUnique({
      where: { editionId: id },
    });

    let bilan;
    
    if (existingBilan) {
      bilan = await prisma.bilanEdition.update({
        where: { editionId: id },
        data: {
          nombreVisiteurs: body.nombreVisiteurs,
          nombreExposants: body.nombreExposants,
          nombreBenevoles: body.nombreBenevoles,
          actionsSensibilisation: body.actionsSensibilisation,
          partenariatsActifs: body.partenariatsActifs,
          retombeesSociales: body.retombeesSociales || null,
          retombeesSanitaires: body.retombeesSanitaires || null,
          satisfactionMoyenne: body.satisfactionMoyenne || null,
          recommandation: body.recommandation || null,
          datePublication: new Date(),
        },
      });
    } else {
      bilan = await prisma.bilanEdition.create({
        data: {
          editionId: id,
          nombreVisiteurs: body.nombreVisiteurs,
          nombreExposants: body.nombreExposants,
          nombreBenevoles: body.nombreBenevoles,
          actionsSensibilisation: body.actionsSensibilisation,
          partenariatsActifs: body.partenariatsActifs,
          retombeesSociales: body.retombeesSociales || null,
          retombeesSanitaires: body.retombeesSanitaires || null,
          satisfactionMoyenne: body.satisfactionMoyenne || null,
          recommandation: body.recommandation || null,
          datePublication: new Date(),
        },
      });
    }

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: existingBilan ? 'MODIFICATION' : 'CREATION',
        entite: 'BilanEdition',
        entiteId: bilan.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(bilan, 'Bilan enregistré avec succès'),
      { status: existingBilan ? 200 : 201 }
    );
  } catch (error) {
    console.error('Erreur création/mise à jour bilan:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}