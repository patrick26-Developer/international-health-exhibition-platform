// app/api/editions/[id]/statistics/route.ts
// app/api/editions/[id]/statistics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { EditionService } from '@/lib/services/edition-service';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/editions/[id]/statistics
 * Statistiques détaillées d'une édition
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const statistics = await EditionService.getStatistics(params.id);

    return NextResponse.json(
      creerSuccessResponse(statistics)
    );
  } catch (error) {
    console.error('Erreur récupération statistiques édition:', error);
    
    if (error instanceof Error && error.message === 'Édition non trouvée') {
      return NextResponse.json(
        creerErrorResponse('Édition non trouvée', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}