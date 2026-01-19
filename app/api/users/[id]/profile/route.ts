// app/api/users/[id]/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { 
  validateName, 
  validatePhoneNumber, 
  validateBiography,
  validateAddress,
  validateURL,
} from '@/lib/utils/validators';
import { VALIDATION_ERROR_CODES } from '@/lib/utils/constants';
import type { UpdateProfilDTO, APIResponse, ProfilUtilisateur, ValidationError } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Vérifier les permissions
    if (session.sub !== params.id) {
      return NextResponse.json(
        creerErrorResponse('Accès interdit', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: params.id },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    const profil: ProfilUtilisateur = {
      id: utilisateur.id,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      telephone: utilisateur.telephone,
      pays: utilisateur.pays,
      ville: utilisateur.ville,
      adresse: utilisateur.adresse,
      codePostal: utilisateur.codePostal,
      langue: utilisateur.langue,
      photoProfil: utilisateur.photoProfil,
      biographie: utilisateur.biographie,
      siteWeb: utilisateur.siteWeb,
      organisation: utilisateur.organisation,
      poste: utilisateur.poste,
      reseauxSociaux: utilisateur.reseauxSociaux as Record<string, string> | null,
    };

    return NextResponse.json(creerSuccessResponse(profil));
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Vérifier les permissions
    if (session.sub !== params.id) {
      return NextResponse.json(
        creerErrorResponse('Accès interdit', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body: UpdateProfilDTO = await request.json();

    // Validation
    const errors: ValidationError[] = [];

    if (body.prenom !== undefined) {
      const error = validateName(body.prenom, 'prenom');
      if (error) errors.push(error);
    }

    if (body.nom !== undefined) {
      const error = validateName(body.nom, 'nom');
      if (error) errors.push(error);
    }

    if (body.telephone !== undefined) {
      const error = validatePhoneNumber(body.telephone);
      if (error) errors.push(error);
    }

    if (body.biographie !== undefined) {
      const error = validateBiography(body.biographie);
      if (error) errors.push(error);
    }

    if (body.adresse !== undefined) {
      const error = validateAddress(body.adresse);
      if (error) errors.push(error);
    }

    if (body.siteWeb !== undefined) {
      const error = validateURL(body.siteWeb, 'siteWeb');
      if (error) errors.push(error);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        creerErrorResponse('Validation échouée', 'VALIDATION_ERROR', errors),
        { status: 400 }
      );
    }

    // Mettre à jour le profil
    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: params.id },
      data: {
        prenom: body.prenom,
        nom: body.nom,
        telephone: body.telephone,
        pays: body.pays,
        ville: body.ville,
        adresse: body.adresse,
        codePostal: body.codePostal,
        langue: body.langue,
        photoProfil: body.photoProfil,
        biographie: body.biographie,
        siteWeb: body.siteWeb,
        organisation: body.organisation,
        poste: body.poste,
        reseauxSociaux: body.reseauxSociaux as any,
        dateModification: new Date(),
        derniereActivite: new Date(),
      },
    });

    // Journaliser la modification
    await prisma.journalAudit.create({
      data: {
        utilisateurId: params.id,
        action: 'MODIFICATION',
        entite: 'Utilisateur',
        entiteId: params.id,
        modifications: {
          avant: {},
          apres: body as any,
        },
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    const profil: ProfilUtilisateur = {
      id: updatedUtilisateur.id,
      prenom: updatedUtilisateur.prenom,
      nom: updatedUtilisateur.nom,
      telephone: updatedUtilisateur.telephone,
      pays: updatedUtilisateur.pays,
      ville: updatedUtilisateur.ville,
      adresse: updatedUtilisateur.adresse,
      codePostal: updatedUtilisateur.codePostal,
      langue: updatedUtilisateur.langue,
      photoProfil: updatedUtilisateur.photoProfil,
      biographie: updatedUtilisateur.biographie,
      siteWeb: updatedUtilisateur.siteWeb,
      organisation: updatedUtilisateur.organisation,
      poste: updatedUtilisateur.poste,
      reseauxSociaux: updatedUtilisateur.reseauxSociaux as Record<string, string> | null,
    };

    return NextResponse.json(
      creerSuccessResponse(profil, 'Profil mis à jour avec succès')
    );
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}