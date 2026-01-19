import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin, isSuperAdmin } from '@/lib/utils/helpers';
import { hashPassword } from '@/lib/auth/bcrypt';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/admin/users/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id },
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

    // Vérifier les permissions (un admin normal ne peut pas voir un super admin)
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

// PATCH /api/admin/users/[id]
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();

    // Récupérer l'utilisateur existant
    const existingUser = await prisma.utilisateur.findUnique({
      where: { id: params.id },
      select: { typeUtilisateur: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Vérifier les permissions
    if (existingUser.typeUtilisateur === 'SUPER_ADMIN' && !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {
      dateModification: new Date()
    };

    // Champs autorisés pour la mise à jour
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

    // Si on vérifie l'email, mettre à jour la date de vérification
    if (body.emailVerifie === true) {
      updateData.dateVerificationEmail = new Date();
    }

    // Si on désactive le compte, supprimer les sessions
    if (body.statutCompte === 'INACTIF' || body.statutCompte === 'SUSPENDU') {
      await prisma.session.deleteMany({
        where: { utilisateurId: params.id }
      });
    }

    const updatedUser = await prisma.utilisateur.update({
      where: { id: params.id },
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

    // Journalisation
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

// DELETE /api/admin/users/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id }
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    // Ne pas supprimer les super admins
    if (utilisateur.typeUtilisateur === 'SUPER_ADMIN') {
      return NextResponse.json(
        creerErrorResponse('Impossible de supprimer un super administrateur', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Soft delete (mettre à jour le statut)
    await prisma.utilisateur.update({
      where: { id: params.id },
      data: {
        statutCompte: 'SUPPRIME',
        dateSuppression: new Date(),
        dateModification: new Date()
      }
    });

    // Supprimer les sessions actives
    await prisma.session.deleteMany({
      where: { utilisateurId: params.id }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'SUPPRESSION',
        entite: 'Utilisateur',
        entiteId: params.id,
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