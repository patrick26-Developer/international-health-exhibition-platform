// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non connecté', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Supprimer la session de la base de données
    await prisma.session.deleteMany({
      where: {
        utilisateurId: session.sub,
        estActive: true,
      },
    });

    // Supprimer les cookies
    const cookieStore = await cookies();
    cookieStore.delete('sis_access_token');
    cookieStore.delete('sis_refresh_token');

    // Journaliser la déconnexion
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'DECONNEXION',
        entite: 'Utilisateur',
        entiteId: session.sub,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json(
      creerSuccessResponse({ message: 'Déconnexion réussie' })
    );
  } catch (error) {
    console.error('Erreur déconnexion:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}