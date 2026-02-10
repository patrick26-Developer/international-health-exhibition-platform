import { NextRequest, NextResponse } from 'next/server';
import { EditionService } from '@/lib/services/edition-service';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const statistics = await EditionService.getStatistics(id);

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