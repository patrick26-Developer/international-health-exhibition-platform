import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin, isSuperAdmin } from '@/lib/utils/helpers';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        telephone: true,
        pays: true,
        ville: true,
        adresse: true,
        codePostal: true,
        langue: true,
        typeUtilisateur: true,
        statutCompte: true,
        emailVerifie: true,
        dateVerificationEmail: true,
        photoProfil: true,
        biographie: true,
        siteWeb: true,
        organisation: true,
        poste: true,
        reseauxSociaux: true,
        accepteNewsletter: true,
        accepteNotifications: true,
        notificationsSMS: true,
        dateCreation: true,
        dateModification: true,
        derniereConnexion: true,
        adresseIPConnexion: true,
        _count: {
          select: {
            inscriptions: true,
            exposants: true,
            benevoles: true,
            sessions: true,
            historiqueConnexions: true
          }
        },
        inscriptions: {
          select: {
            id: true,
            typeInscription: true,
            statut: true,
            dateInscription: true,
            edition: {
              select: {
                id: true,
                nom: true,
                ville: true,
                dateDebut: true
              }
            }
          },
          take: 10,
          orderBy: { dateInscription: 'desc' }
        },
        historiqueConnexions: {
          select: {
            id: true,
            adresseIP: true,
            reussi: true,
            dateCreation: true
          },
          take: 10,
          orderBy: { dateCreation: 'desc' }
        }
      }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (utilisateur.typeUtilisateur === 'SUPER_ADMIN' && !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    return NextResponse.json(
      creerSuccessResponse(utilisateur)
    );
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const existingUser = await prisma.utilisateur.findUnique({
      where: { id },
      select: { typeUtilisateur: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (existingUser.typeUtilisateur === 'SUPER_ADMIN' && !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const updateData: any = {
      dateModification: new Date()
    };

    const allowedFields = [
      'typeUtilisateur',
      'statutCompte',
      'emailVerifie',
      'prenom',
      'nom',
      'telephone',
      'pays',
      'ville',
      'langue',
      'organisation',
      'poste'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    if (body.emailVerifie === true) {
      updateData.dateVerificationEmail = new Date();
    }

    if (body.statutCompte === 'INACTIF' || body.statutCompte === 'SUSPENDU') {
      await prisma.session.deleteMany({
        where: { utilisateurId: id }
      });
    }

    const updatedUser = await prisma.utilisateur.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        typeUtilisateur: true,
        statutCompte: true,
        emailVerifie: true
      }
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'MODIFICATION',
        entite: 'Utilisateur',
        entiteId: updatedUser.id,
        modifications: {
          avant: existingUser,
          apres: updatedUser
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse(updatedUser, 'Utilisateur mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour utilisateur:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    
    if (!session || !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (utilisateur.typeUtilisateur === 'SUPER_ADMIN') {
      return NextResponse.json(
        creerErrorResponse('Impossible de supprimer un super administrateur', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    await prisma.utilisateur.update({
      where: { id },
      data: {
        statutCompte: 'SUPPRIME',
        dateSuppression: new Date(),
        dateModification: new Date()
      }
    });

    await prisma.session.deleteMany({
      where: { utilisateurId: id }
    });

    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Utilisateur',
        entiteId: id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Utilisateur supprimé avec succès' })
    );
  } catch (error) {
    console.error('Erreur suppression utilisateur:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}