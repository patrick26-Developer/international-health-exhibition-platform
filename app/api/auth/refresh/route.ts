// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { signAccessToken, verifyRefreshToken } from '@/lib/auth/jwt';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('sis_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        creerErrorResponse('Token de rafraîchissement manquant', 'TOKEN_INVALID'),
        { status: 401 }
      );
    }

    // Vérifier le refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        creerErrorResponse('Token de rafraîchissement invalide', 'TOKEN_INVALID'),
        { status: 401 }
      );
    }

    // Vérifier si l'utilisateur existe et est actif
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: payload.sub },
    });

    if (!utilisateur) {
      return NextResponse.json(
        creerErrorResponse('Utilisateur non trouvé', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (utilisateur.statutCompte !== 'ACTIF' || !utilisateur.emailVerifie) {
      return NextResponse.json(
        creerErrorResponse('Compte non activé ou suspendu', 'ACCOUNT_BLOCKED'),
        { status: 403 }
      );
    }

    // Créer un nouvel access token
    const newAccessToken = signAccessToken({
      sub: utilisateur.id,
      email: utilisateur.email,
      typeUtilisateur: utilisateur.typeUtilisateur,
    });

    // Mettre à jour le cookie
    cookieStore.set('sis_access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    return NextResponse.json(
      creerSuccessResponse({
        accessToken: newAccessToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      })
    );
  } catch (error) {
    console.error('Erreur rafraîchissement token:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}