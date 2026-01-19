// app/api/partners/route.ts - CORRIGÉ COMPLET
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';
import type { Prisma } from '@/lib/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const niveau = searchParams.get('niveau');
    const actif = searchParams.get('actif');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // ✅ Construction correcte des filtres avec le type Prisma
    const where: Prisma.PartenaireWhereInput = {
      afficherSurSite: true,
    };

    if (type) {
      where.typePartenaire = type;
    }

    if (niveau) {
      where.niveauPartenariat = niveau;
    }

    if (actif === 'true') {
      const maintenant = new Date();
      where.OR = [
        { dateDebut: null, dateFin: null },
        {
          AND: [
            { dateDebut: { lte: maintenant } },
            {
              OR: [
                { dateFin: { gte: maintenant } },
                { dateFin: null },
              ],
            },
          ],
        },
      ];
    }

    const [partenaires, total] = await Promise.all([
      prisma.partenaire.findMany({
        where,
        include: {
          utilisateur: {
            select: {
              id: true,
              prenom: true,
              nom: true,
              email: true,
              telephone: true,
              photoProfil: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { niveauPartenariat: 'desc' },
          { nomOrganisation: 'asc' },
        ],
      }),
      prisma.partenaire.count({ where }),
    ]);

    const formattedPartenaires = partenaires.map(partenaire => ({
      id: partenaire.id,
      nomOrganisation: partenaire.nomOrganisation,
      typePartenaire: partenaire.typePartenaire,
      niveauPartenariat: partenaire.niveauPartenariat,
      description: partenaire.description,
      logo: partenaire.logo,
      siteWeb: partenaire.siteWeb,
      dateDebut: partenaire.dateDebut,
      dateFin: partenaire.dateFin,
      personneContact: partenaire.personneContact,
      utilisateur: partenaire.utilisateur,
    }));

    return NextResponse.json(
      creerSuccessResponse({
        items: formattedPartenaires,
        total,
        page,
        limit,
      })
    );
  } catch (error) {
    console.error('Erreur récupération partenaires:', error);
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
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: session.sub },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (!['ADMIN', 'SUPER_ADMIN', 'PARTENAIRE'].includes(utilisateur.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Permission insuffisante', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    // Validation basique
    if (!body.nomOrganisation || !body.typePartenaire) {
      return NextResponse.json(
        creerErrorResponse('Nom d\'organisation et type de partenaire requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Vérifier doublon
    const existingPartenaire = await prisma.partenaire.findUnique({
      where: { utilisateurId: session.sub },
    });

    if (existingPartenaire) {
      return NextResponse.json(
        creerErrorResponse('Profil partenaire déjà existant', 'CONFLICT'),
        { status: 409 }
      );
    }

    // Créer le partenaire
    const partenaire = await prisma.partenaire.create({
      data: {
        utilisateurId: session.sub,
        nomOrganisation: body.nomOrganisation,
        typePartenaire: body.typePartenaire,
        niveauPartenariat: body.niveauPartenariat || null,
        description: body.description || null,
        logo: body.logo || null,
        siteWeb: body.siteWeb || null,
        personneContact: body.personneContact || null,
        emailContact: body.emailContact || null,
        telephoneContact: body.telephoneContact || null,
        dateDebut: body.dateDebut ? new Date(body.dateDebut) : null,
        dateFin: body.dateFin ? new Date(body.dateFin) : null,
        afficherSurSite: body.afficherSurSite ?? true,
      },
    });

    // Mettre à jour le type d'utilisateur
    if (utilisateur.typeUtilisateur !== 'PARTENAIRE') {
      await prisma.utilisateur.update({
        where: { id: session.sub },
        data: { typeUtilisateur: 'PARTENAIRE' },
      });
    }

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Partenaire',
        entiteId: partenaire.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({
        message: 'Partenaire créé avec succès',
        partenaireId: partenaire.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création partenaire:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}