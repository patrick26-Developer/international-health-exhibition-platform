// app/proxy.ts
// middleware.ts - Protection des routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';

// Routes publiques
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/about',
  '/contact',
  '/editions',
];

// Routes API publiques
const PUBLIC_API_ROUTES = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/auth/verify-otp',
  '/api/editions',
  '/api/partners',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est publique
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isPublicAPIRoute = PUBLIC_API_ROUTES.some(route => pathname.startsWith(route));

  if (isPublicRoute || isPublicAPIRoute) {
    return NextResponse.next();
  }

  // Récupérer le token
  const token = request.cookies.get('sis_access_token')?.value;

  if (!token) {
    // Rediriger vers login si pas de token
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier le token
  const payload = verifyAccessToken(token);

  if (!payload) {
    // Token invalide ou expiré
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Token invalide', code: 'TOKEN_INVALID' },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier les permissions pour les routes admin
  if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/api/admin')) {
    const isAdmin = payload.typeUtilisateur === 'ADMIN' || payload.typeUtilisateur === 'SUPER_ADMIN';
    
    if (!isAdmin) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Accès interdit', code: 'FORBIDDEN' },
          { status: 403 }
        );
      }

      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Ajouter des headers de sécurité
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};