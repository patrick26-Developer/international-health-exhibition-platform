// lib/utils/helpers.ts - CORRIGÉ COMPLET
import { USER_TYPES, ACCOUNT_STATUSES } from './constants';
import type { 
  TypeUtilisateur,
  StatutCompte,
} from '@/lib/types';

// ============================================
// FONCTIONS DE VÉRIFICATION DES RÔLES
// ============================================

/**
 * Vérifie si un utilisateur est SUPER_ADMIN
 */
export function isSuperAdmin(typeUtilisateur: TypeUtilisateur): boolean {
  return typeUtilisateur === USER_TYPES.SUPER_ADMIN;
}

/**
 * Vérifie si un utilisateur a un rôle d'administrateur (SUPER_ADMIN ou ADMIN)
 */
export function isAdmin(typeUtilisateur: TypeUtilisateur): boolean {
  return typeUtilisateur === USER_TYPES.SUPER_ADMIN || typeUtilisateur === USER_TYPES.ADMIN;
}

/**
 * Vérifie si un partenaire est actif
 */
export function estPartenaireActif(partenaire: {
  dateDebut: Date | null;
  dateFin: Date | null;
  afficherSurSite: boolean;
}): boolean {
  const maintenant = new Date();
  const debut = partenaire.dateDebut ? new Date(partenaire.dateDebut) : null;
  const fin = partenaire.dateFin ? new Date(partenaire.dateFin) : null;

  if (!debut) return false;
  if (maintenant < debut) return false;
  if (fin && maintenant > fin) return false;
  
  return partenaire.afficherSurSite === true;
}

/**
 * Vérifie si un utilisateur peut accéder à une route
 */
export function canAccessRoute(
  userType: TypeUtilisateur,
  routePath: string
): boolean {
  const publicRoutes: readonly string[] = ['/', '/auth', '/public', '/api/public'];
  
  if (publicRoutes.some(publicRoute => routePath.startsWith(publicRoute))) {
    return true;
  }
  
  const protectedRoutesMap: Record<TypeUtilisateur, readonly string[]> = {
    [USER_TYPES.SUPER_ADMIN]: ['/dashboard', '/api'] as const,
    [USER_TYPES.ADMIN]: ['/dashboard/admin', '/api/admin'] as const,
    [USER_TYPES.PARTENAIRE]: ['/dashboard/partner', '/api/partner'] as const,
    [USER_TYPES.EXPOSANT]: ['/dashboard/exhibitor', '/api/exhibitor'] as const,
    [USER_TYPES.BENEVOLE]: ['/dashboard/volunteer', '/api/volunteer'] as const,
    [USER_TYPES.VISITEUR]: ['/dashboard/visitor'] as const,
    [USER_TYPES.MEDIA]: ['/dashboard/media', '/api/media'] as const,
  };
  
  const allowedRoutes = protectedRoutesMap[userType] || [];
  return allowedRoutes.some(allowedRoute => routePath.startsWith(allowedRoute));
}

// ============================================
// FONCTIONS DE VÉRIFICATION DU COMPTE
// ============================================

/**
 * Vérifie si un compte est actif
 */
export function isAccountActive(statutCompte: StatutCompte): boolean {
  return statutCompte === ACCOUNT_STATUSES.ACTIF;
}

/**
 * Vérifie si un compte est vérifié
 */
export function isAccountVerified(
  emailVerifie: boolean,
  statutCompte: StatutCompte
): boolean {
  return emailVerifie && statutCompte !== ACCOUNT_STATUSES.EN_ATTENTE_VERIFICATION;
}

// ============================================
// UTILITAIRES GÉNÉRIQUES
// ============================================

/**
 * Génère un identifiant unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Retarde l'exécution
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Supprime les propriétés undefined d'un objet
 */
export function removeUndefined<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  
  return result;
}

/**
 * Fusionne deux objets en profondeur
 */
export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U
): T & U {
  const result: Record<string, unknown> = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        result[key] = deepMerge(
          (targetValue as Record<string, unknown>) || {},
          sourceValue as Record<string, unknown>
        );
      } else {
        result[key] = sourceValue;
      }
    }
  }
  
  return result as T & U;
}

/**
 * Clone un objet en profondeur
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned: Record<string, unknown> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
    }
  }
  
  return cloned as T;
}

/**
 * Débounce une fonction
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
      timeout = undefined;
    }, wait);
  };
}

/**
 * Formate une erreur en objet standardisé
 */
export function formatError(error: unknown): {
  message: string;
  code: string;
  details?: unknown;
} {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'INTERNAL_ERROR',
      details: error.stack,
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'INTERNAL_ERROR',
    };
  }
  
  return {
    message: 'Une erreur inconnue est survenue',
    code: 'INTERNAL_ERROR',
    details: error,
  };
}

/**
 * Vérifie si une valeur est vide
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  }
  
  return false;
}

/**
 * Génère un slug à partir d'un texte
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

/**
 * Formate les bytes en taille lisible
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'] as const;
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}