// app/api/partners/[id]/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin, estPartenaireActif } from '@/lib/utils/helpers';
import type { UpdatePartenaireDTO, ValidationError } from '@/lib/types';
import { validateURL } from '@/lib/utils/validators';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/partners/[id]
 * Récupère un partenaire spécifique
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const partenaire = await prisma.partenaire.findUnique({
      where: { id: params.id },
      include: {
        utilisateur: {
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
            telephone: true,
            photoProfil: true,
          },
        },
      },
    });

    if (!partenaire) {
      return NextResponse.json(
        creerErrorResponse('Partenaire non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier si le partenaire est actif
    const actif = estPartenaireActif(partenaire);

    return NextResponse.json(
      creerSuccessResponse({
        ...partenaire,
        actif,
      })
    );
  } catch (error) {
    console.error('Erreur récupération partenaire:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/partners/[id]
 * Met à jour un partenaire (admin ou propriétaire)
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

    const body: UpdatePartenaireDTO = await request.json();

    // Récupérer le partenaire
    const partenaire = await prisma.partenaire.findUnique({
      where: { id: params.id },
      include: {
        utilisateur: true,
      },
    });

    if (!partenaire) {
      return NextResponse.json(
        creerErrorResponse('Partenaire non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier les permissions
    const isOwner = partenaire.utilisateurId === session.sub;
    const userIsAdmin = isAdmin(session.typeUtilisateur);

    if (!isOwner && !userIsAdmin) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Validation
    const errors: ValidationError[] = [];

    if (body.siteWeb !== undefined) {
      const error = validateURL(body.siteWeb, 'siteWeb');
      if (error) errors.push(error);
    }

    if (body.logo !== undefined && body.logo !== null) {
      const error = validateURL(body.logo, 'logo');
      if (error) errors.push(error);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Mise à jour
    const updatedPartenaire = await prisma.partenaire.update({
      where: { id: params.id },
      data: {
        nomOrganisation: body.nomOrganisation,
        typePartenaire: body.typePartenaire,
        niveauPartenariat: body.niveauPartenariat,
        description: body.description,
        logo: body.logo,
        siteWeb: body.siteWeb,
        personneContact: body.personneContact,
        emailContact: body.emailContact,
        telephoneContact: body.telephoneContact,
        dateDebut: body.dateDebut ? new Date(body.dateDebut) : undefined,
        dateFin: body.dateFin ? new Date(body.dateFin) : undefined,
        afficherSurSite: body.afficherSurSite,
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
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'MODIFICATION',
        entite: 'Partenaire',
        entiteId: partenaire.id,
        modifications: {
          avant: partenaire,
          apres: updatedPartenaire,
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(updatedPartenaire, 'Partenaire mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour partenaire:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          creerErrorResponse('Un partenaire avec ces informations existe déjà', 'CONFLICT'),
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/partners/[id]
 * Supprime un partenaire (admin seulement)
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

    const partenaire = await prisma.partenaire.findUnique({
      where: { id: params.id },
    });

    if (!partenaire) {
      return NextResponse.json(
        creerErrorResponse('Partenaire non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Supprimer le partenaire
    await prisma.partenaire.delete({
      where: { id: params.id },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Partenaire',
        entiteId: params.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Partenaire supprimé avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression partenaire:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}