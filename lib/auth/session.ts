// lib/auth/session.ts
import { cookies } from 'next/headers';
import type { JWTPayload, TypeUtilisateur } from '@/lib/types';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './jwt';

const ACCESS_TOKEN_COOKIE = 'sis_access_token';
const REFRESH_TOKEN_COOKIE = 'sis_refresh_token';

export async function createSession(user: {
  id: string;
  email: string;
  typeUtilisateur: TypeUtilisateur;
}): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    typeUtilisateur: user.typeUtilisateur,
  });

  const refreshToken = signRefreshToken({
    sub: user.id,
    email: user.email,
    typeUtilisateur: user.typeUtilisateur,
  });

  const cookieStore = await cookies();

  // Access token - courte durée, HTTP Only
  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
    path: '/',
  });

  // Refresh token - longue durée, HTTP Only
  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 jours
    path: '/',
  });

  return { accessToken, refreshToken };
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return null;
  }

  return verifyAccessToken(accessToken);
}

export async function refreshSession(): Promise<{
  accessToken: string;
  user: JWTPayload;
} | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return null;
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return null;
  }

  const newAccessToken = signAccessToken({
    sub: payload.sub,
    email: payload.email,
    typeUtilisateur: payload.typeUtilisateur,
  });

  cookieStore.set(ACCESS_TOKEN_COOKIE, newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60,
    path: '/',
  });

  return { accessToken: newAccessToken, user: payload };
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}