// app/api/admin/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { AdminService } from '@/lib/services/admin-service';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin } from '@/lib/utils/helpers';

/**
 * GET /api/admin/dashboard
 * Tableau de bord admin avec statistiques globales
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès réservé aux administrateurs', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const dashboard = await AdminService.getDashboard();

    return NextResponse.json(
      creerSuccessResponse(dashboard)
    );
  } catch (error) {
    console.error('Erreur récupération dashboard admin:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}