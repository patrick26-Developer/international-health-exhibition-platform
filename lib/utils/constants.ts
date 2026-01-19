// utils/constants.ts

/**
 * Constantes de l'application
 * Toutes les valeurs fixes, URLs, délais, etc.
 */

// URLs de l'application
export const APP_URLS = {
  FRONTEND: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  BACKEND_API: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  PUBLIC_ASSETS: '/public',
  UPLOADS: '/uploads',
} as const;

// Durées et délais (en millisecondes)
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  
  // Configurations spécifiques
  SESSION_DURATION: parseInt(process.env.SESSION_DURATION_MINUTES || '15') * 60 * 1000,
  SESSION_REFRESH_DURATION: parseInt(process.env.SESSION_REFRESH_DURATION_DAYS || '7') * 24 * 60 * 60 * 1000,
  OTP_EXPIRATION: parseInt(process.env.OTP_EXPIRATION_MINUTES || '10') * 60 * 1000,
  
  // Rate limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX || '100'),
} as const;

// Limites et contraintes
export const LIMITS = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
  FILE: {
    MAX_SIZE_BYTES: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] as const,
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'] as const,
  },
  USER: {
    EMAIL_MAX_LENGTH: 254,
    NAME_MAX_LENGTH: 100,
    PHONE_MAX_LENGTH: 20,
    BIO_MAX_LENGTH: 2000,
    ADDRESS_MAX_LENGTH: 500,
  },
} as const;

// Types d'utilisateurs autorisés
export const USER_TYPES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  PARTENAIRE: 'PARTENAIRE',
  EXPOSANT: 'EXPOSANT',
  BENEVOLE: 'BENEVOLE',
  VISITEUR: 'VISITEUR',
  MEDIA: 'MEDIA',
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

// Statuts de compte
export const ACCOUNT_STATUSES = {
  ACTIF: 'ACTIF',
  INACTIF: 'INACTIF',
  SUSPENDU: 'SUSPENDU',
  EN_ATTENTE_VERIFICATION: 'EN_ATTENTE_VERIFICATION',
  SUPPRIME: 'SUPPRIME',
} as const;

export type AccountStatus = typeof ACCOUNT_STATUSES[keyof typeof ACCOUNT_STATUSES];

// Codes d'erreur standardisés
export const ERROR_CODES = {
  // Authentification
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  ACCOUNT_NOT_VERIFIED: 'ACCOUNT_NOT_VERIFIED',
  ACCOUNT_BLOCKED: 'ACCOUNT_BLOCKED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  TOO_SHORT: 'TOO_SHORT',
  TOO_LONG: 'TOO_LONG',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',
  
  // Ressources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  LIMIT_REACHED: 'LIMIT_REACHED',
  
  // Système
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// Cookies
export const COOKIES = {
  ACCESS_TOKEN: 'sis_access_token',
  REFRESH_TOKEN: 'sis_refresh_token',
  USER_PREFERENCES: 'sis_user_prefs',
  SESSION_ID: 'sis_session_id',
} as const;

// Headers HTTP
export const HTTP_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  X_REQUEST_ID: 'X-Request-ID',
  X_API_KEY: 'X-API-Key',
  X_FORWARDED_FOR: 'X-Forwarded-For',
  USER_AGENT: 'User-Agent',
} as const;

// Formats
export const FORMATS = {
  DATE: 'dd/MM/yyyy',
  DATETIME: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
  PHONE: 'fr-FR',
  CURRENCY: 'fr-FR',
} as const;

// Langues supportées
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

// Routes protégées par type d'utilisateur
export const PROTECTED_ROUTES: Record<UserType, readonly string[]> = {
  SUPER_ADMIN: ['/dashboard/admin', '/dashboard/settings', '/api/admin'],
  ADMIN: ['/dashboard/admin', '/api/admin'],
  PARTENAIRE: ['/dashboard/partner', '/api/partner'],
  EXPOSANT: ['/dashboard/exhibitor', '/api/exhibitor'],
  BENEVOLE: ['/dashboard/volunteer', '/api/volunteer'],
  VISITEUR: ['/dashboard/visitor'],
  MEDIA: ['/dashboard/media', '/api/media'],
} as const;

// Configuration des environnements
export const ENVIRONMENT = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const;

export const VALIDATION_ERROR_CODES = {
  REQUIRED: 'REQUIRED',
  INVALID_FORMAT: 'INVALID_FORMAT',
  TOO_SHORT: 'TOO_SHORT',
  TOO_LONG: 'TOO_LONG',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_URL: 'INVALID_URL',
  INVALID_DATE: 'INVALID_DATE',
  MIN_VALUE: 'MIN_VALUE',
  MAX_VALUE: 'MAX_VALUE',
  PATTERN_MISMATCH: 'PATTERN_MISMATCH',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  NOT_FOUND: 'NOT_FOUND',
} as const;

// Codes d'erreur d'API (séparés)
export const API_ERROR_CODES = {
  // Authentification
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  ACCOUNT_NOT_VERIFIED: 'ACCOUNT_NOT_VERIFIED',
  ACCOUNT_BLOCKED: 'ACCOUNT_BLOCKED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  
  // Système
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMITED: 'RATE_LIMITED',
  CONFLICT: 'CONFLICT',
  LIMIT_REACHED: 'LIMIT_REACHED',
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];