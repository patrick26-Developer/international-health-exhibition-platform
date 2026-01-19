import jwt from 'jsonwebtoken';
import type { JWTPayload } from '@/lib/types';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets must be defined in environment variables');
}

/**
 * Génère un access token
 */
export function signAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'sis-api',
    audience: 'sis-client',
  } as jwt.SignOptions);
}

/**
 * Génère un refresh token
 */
export function signRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: 'sis-api',
    audience: 'sis-client',
  } as jwt.SignOptions);
}

/**
 * Vérifie et décode un access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'sis-api',
      audience: 'sis-client',
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expiré');
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log('Token invalide');
    }
    return null;
  }
}

/**
 * Vérifie et décode un refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'sis-api',
      audience: 'sis-client',
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Refresh token expiré');
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log('Refresh token invalide');
    }
    return null;
  }
}

/**
 * Extrait le token du header Authorization
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}