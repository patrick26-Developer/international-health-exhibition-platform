// app/api/admin/statistics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const periode = searchParams.get('periode') || '30jours';

    // Calculer les dates selon la période
    const now = new Date();
    let startDate = new Date();
    
    switch (periode) {
      case '7jours':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30jours':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90jours':
        startDate.setDate(now.getDate() - 90);
        break;
      case 'annee':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Statistiques globales
    const [
      totalUtilisateurs,
      totalEditions,
      totalInscriptions,
      totalExposants,
      totalBenevoles,
      totalPartenaires,
      utilisateursParType,
      inscriptionsParType,
      editionsParStatut,
      connexionsJournalieres,
      inscriptionsJournalieres
    ] = await Promise.all([
      // Totaux
      prisma.utilisateur.count(),
      prisma.edition.count(),
      prisma.inscription.count(),
      prisma.exposant.count(),
      prisma.benevole.count(),
      prisma.partenaire.count(),
      
      // Répartition par type
      prisma.utilisateur.groupBy({
        by: ['typeUtilisateur'],
        _count: { id: true }
      }),
      
      // Inscriptions par type
      prisma.inscription.groupBy({
        by: ['typeInscription'],
        _count: { id: true }
      }),
      
      // Éditions par statut
      prisma.edition.groupBy({
        by: ['statut'],
        _count: { id: true }
      }),
      
      // Connexions journalières (derniers 30 jours)
      prisma.$queryRaw`
        SELECT DATE("dateCreation") as date, COUNT(*) as count
        FROM "historique_connexions"
        WHERE "dateCreation" >= ${startDate} AND "reussi" = true
        GROUP BY DATE("dateCreation")
        ORDER BY date DESC
        LIMIT 30
      `,
      
      // Inscriptions journalières (derniers 30 jours)
      prisma.$queryRaw`
        SELECT DATE("dateInscription") as date, COUNT(*) as count
        FROM "inscriptions"
        WHERE "dateInscription" >= ${startDate}
        GROUP BY DATE("dateInscription")
        ORDER BY date DESC
        LIMIT 30
      `
    ]);

    // Formater les données
    const utilisateursParTypeFormatted: Record<string, number> = {};
    utilisateursParType.forEach(item => {
      utilisateursParTypeFormatted[item.typeUtilisateur] = item._count.id;
    });

    const inscriptionsParTypeFormatted: Record<string, number> = {};
    inscriptionsParType.forEach(item => {
      inscriptionsParTypeFormatted[item.typeInscription] = item._count.id;
    });

    const editionsParStatutFormatted: Record<string, number> = {};
    editionsParStatut.forEach(item => {
      editionsParStatutFormatted[item.statut] = item._count.id;
    });

    return NextResponse.json(
      creerSuccessResponse({
        // Totaux
        totalUtilisateurs,
        totalEditions,
        totalInscriptions,
        totalExposants,
        totalBenevoles,
        totalPartenaires,
        
        // Répartitions
        utilisateursParType: utilisateursParTypeFormatted,
        inscriptionsParType: inscriptionsParTypeFormatted,
        editionsParStatut: editionsParStatutFormatted,
        
        // Tendances
        connexionsJournalieres,
        inscriptionsJournalieres,
        
        // Période
        periode: {
          debut: startDate,
          fin: now
        }
      })
    );
  } catch (error) {
    console.error('Erreur récupération statistiques admin:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}