// app/api/inscriptions/route.ts - CORRIGÉ COMPLET (PARTIE 1/2)
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { 
  creerSuccessResponse, 
  creerErrorResponse, 
  creerPaginatedResponse,
} from '@/lib/types';
import { 
  safeValidateCreateInscription,
  isVisiteurInscription,
  isExposantInscription,
  isBenevoleInscription,
} from '@/lib/validation/event-registration-schema';
import { isAdmin } from '@/lib/utils/helpers';
import type { ValidationError } from '@/lib/types';
import type { Prisma } from '@/lib/generated/prisma/client';

/**
 * GET /api/inscriptions
 * Liste les inscriptions aux événements avec filtres et pagination
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const editionId = searchParams.get('editionId');
    const typeInscription = searchParams.get('typeInscription');
    const statut = searchParams.get('statut');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;

    // ✅ Construction correcte des filtres avec le type Prisma
    const where: Prisma.InscriptionWhereInput = {};

    if (editionId) {
      where.editionId = editionId;
    }

    if (typeInscription && ['VISITEUR', 'EXPOSANT', 'BENEVOLE'].includes(typeInscription)) {
      where.typeInscription = typeInscription as 'VISITEUR' | 'EXPOSANT' | 'BENEVOLE';
    }

    if (statut && ['EN_ATTENTE', 'VALIDEE', 'REFUSEE', 'ANNULEE'].includes(statut)) {
      where.statut = statut as 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE' | 'ANNULEE';
    }

    if (search) {
      where.OR = [
        { utilisateur: { email: { contains: search, mode: 'insensitive' } } },
        { utilisateur: { prenom: { contains: search, mode: 'insensitive' } } },
        { utilisateur: { nom: { contains: search, mode: 'insensitive' } } },
        { nomOrganisation: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Permissions : utilisateur voit ses inscriptions, admin voit tout
    if (!isAdmin(session.typeUtilisateur)) {
      where.utilisateurId = session.sub;
    }

    const [inscriptions, total] = await Promise.all([
      prisma.inscription.findMany({
        where,
        skip,
        take: limit,
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
          edition: {
            select: {
              id: true,
              nom: true,
              dateDebut: true,
              dateFin: true,
              ville: true,
              pays: true,
              statut: true,
            },
          },
        },
        orderBy: { dateInscription: 'desc' },
      }),
      prisma.inscription.count({ where }),
    ]);

    return NextResponse.json(
      creerSuccessResponse(
        creerPaginatedResponse(inscriptions, total, { page, limit })
      )
    );

  } catch (error) {
    console.error('❌ Erreur récupération inscriptions:', error);
    
    return NextResponse.json(
      creerErrorResponse(
        'Erreur lors de la récupération des inscriptions',
        'INTERNAL_ERROR'
      ),
      { status: 500 }
    );
  }
}

/**
 * POST /api/inscriptions
 * Crée une nouvelle inscription à un événement
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Authentification requise', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await request.json();

    // ✅ Validation avec la fonction safe
    const validation = safeValidateCreateInscription(body);

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

    const inscriptionData = validation.data!;

    // Vérification de sécurité
    if (
      inscriptionData.utilisateurId !== session.sub && 
      !isAdmin(session.typeUtilisateur)
    ) {
      return NextResponse.json(
        creerErrorResponse(
          'Vous ne pouvez créer des inscriptions que pour vous-même',
          'FORBIDDEN'
        ),
        { status: 403 }
      );
    }

    // Vérification édition
    const edition = await prisma.edition.findUnique({
      where: { id: inscriptionData.editionId },
      select: {
        id: true,
        nom: true,
        dateDebut: true,
        dateFin: true,
        statut: true,
        dateFinInscriptions: true,
      },
    });

    if (!edition) {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (edition.statut !== 'INSCRIPTIONS_OUVERTES' && edition.statut !== 'PLANIFIEE') {
      return NextResponse.json(
        creerErrorResponse(
          'Les inscriptions pour cette édition sont fermées',
          'CONFLICT'
        ),
        { status: 400 }
      );
    }

    if (edition.dateFinInscriptions && new Date() > edition.dateFinInscriptions) {
      return NextResponse.json(
        creerErrorResponse(
          'La date limite d\'inscription est dépassée',
          'CONFLICT'
        ),
        { status: 400 }
      );
    }

    // Vérification doublon
    const existingInscription = await prisma.inscription.findUnique({
      where: {
        utilisateurId_editionId_typeInscription: {
          utilisateurId: inscriptionData.utilisateurId,
          editionId: inscriptionData.editionId,
          typeInscription: inscriptionData.typeInscription,
        },
      },
    });

    if (existingInscription) {
      return NextResponse.json(
        creerErrorResponse(
          `Vous êtes déjà inscrit en tant que ${inscriptionData.typeInscription.toLowerCase()} pour cette édition`,
          'CONFLICT'
        ),
        { status: 409 }
      );
    }

    // ✅ Préparation des données conforme au schéma Prisma
    const dataToCreate: Prisma.InscriptionCreateInput = {
      utilisateur: {
        connect: { id: inscriptionData.utilisateurId }
      },
      edition: {
        connect: { id: inscriptionData.editionId }
      },
      typeInscription: inscriptionData.typeInscription,
      statut: 'EN_ATTENTE',
    };

    // ✅ Ajout des champs spécifiques selon le type avec conversion en JSON
    if (isVisiteurInscription(inscriptionData)) {
      if (inscriptionData.centresInteret) {
        dataToCreate.centresInteret = inscriptionData.centresInteret as Prisma.InputJsonValue;
      }
    } 
    else if (isExposantInscription(inscriptionData)) {
      dataToCreate.nomOrganisation = inscriptionData.nomOrganisation;
      dataToCreate.secteurActivite = inscriptionData.secteurActivite;
    } 
    else if (isBenevoleInscription(inscriptionData)) {
      dataToCreate.competences = inscriptionData.competences || null;
      if (inscriptionData.disponibilites) {
        dataToCreate.disponibilites = inscriptionData.disponibilites as Prisma.InputJsonValue;
      }
    }

    // Création de l'inscription
    const inscription = await prisma.inscription.create({
      data: dataToCreate,
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
            dateDebut: true,
            dateFin: true,
            ville: true,
            pays: true,
          },
        },
      },
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Inscription',
        entiteId: inscription.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({
        message: 'Inscription créée avec succès',
        inscription,
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Erreur création inscription:', error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          creerErrorResponse(
            'Vous êtes déjà inscrit pour cette édition',
            'CONFLICT'
          ),
          { status: 409 }
        );
      }
      
      if (prismaError.code === 'P2003') {
        return NextResponse.json(
          creerErrorResponse(
            'Utilisateur ou édition introuvable',
            'NOT_FOUND'
          ),
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      creerErrorResponse(
        'Une erreur est survenue lors de la création de l\'inscription',
        'INTERNAL_ERROR'
      ),
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}