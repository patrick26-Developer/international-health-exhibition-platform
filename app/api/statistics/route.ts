// app/api/statistics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';

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
    const editionId = searchParams.get('editionId');
    const periode = searchParams.get('periode') || 'mois';

    // Statistiques globales (admin seulement)
    if (isAdmin(session.typeUtilisateur)) {
      const [
        totalUtilisateurs,
        totalEditions,
        totalInscriptions,
        totalExposants,
        totalBenevoles,
        totalPartenaires,
        utilisateursEnAttente,
        utilisateursVerifies
      ] = await Promise.all([
        prisma.utilisateur.count(),
        prisma.edition.count(),
        prisma.inscription.count(),
        prisma.exposant.count(),
        prisma.benevole.count(),
        prisma.partenaire.count(),
        prisma.utilisateur.count({ where: { emailVerifie: false } }),
        prisma.utilisateur.count({ where: { emailVerifie: true } }),
      ]);

      // Statistiques des 30 derniers jours
      const date30jours = new Date();
      date30jours.setDate(date30jours.getDate() - 30);

      const [
        utilisateursActifs,
        nouvellesInscriptions,
        nouvellesEditions,
        nouvellesConnexions
      ] = await Promise.all([
        prisma.utilisateur.count({
          where: {
            derniereConnexion: {
              gte: date30jours
            }
          }
        }),
        prisma.inscription.count({
          where: {
            dateInscription: {
              gte: date30jours
            }
          }
        }),
        prisma.edition.count({
          where: {
            dateCreation: {
              gte: date30jours
            }
          }
        }),
        prisma.historiqueConnexion.count({
          where: {
            dateCreation: {
              gte: date30jours
            },
            reussi: true
          }
        })
      ]);

      return NextResponse.json(
        creerSuccessResponse({
          totalUtilisateurs,
          totalEditions,
          totalInscriptions,
          totalExposants,
          totalBenevoles,
          totalPartenaires,
          utilisateursEnAttente,
          utilisateursVerifies,
          utilisateursActifs,
          nouvellesInscriptions30jours: nouvellesInscriptions,
          nouvellesEditions30jours: nouvellesEditions,
          nouvellesConnexions30jours: nouvellesConnexions
        })
      );
    }

    // Statistiques pour utilisateur normal
    const utilisateurStats = await prisma.utilisateur.findUnique({
      where: { id: session.sub },
      select: {
        _count: {
          select: {
            inscriptions: true,
            exposants: true,
            benevoles: true
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
                dateDebut: true,
                dateFin: true
              }
            }
          }
        },
        exposants: {
          select: {
            id: true,
            nomOrganisation: true,
            statut: true,
            edition: {
              select: {
                nom: true
              }
            }
          }
        },
        benevoles: {
          select: {
            id: true,
            statut: true,
            edition: {
              select: {
                nom: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(
      creerSuccessResponse({
        totalInscriptions: utilisateurStats?._count.inscriptions || 0,
        totalExposants: utilisateurStats?._count.exposants || 0,
        totalBenevoles: utilisateurStats?._count.benevoles || 0,
        inscriptions: utilisateurStats?.inscriptions || [],
        exposants: utilisateurStats?.exposants || [],
        benevoles: utilisateurStats?.benevoles || []
      })
    );
  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}