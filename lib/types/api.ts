// lib/types/api.ts - CORRIGÉ COMPLET
import { z } from 'zod';

// ============================================
// TYPES DE RÉPONSE GÉNÉRIQUES
// ============================================

export interface APISuccessResponse<T> {
  readonly success: true;
  readonly data: T;
  readonly message?: string;
  readonly metadata?: ResponseMetadata;
}

export interface APIErrorResponse {
  readonly success: false;
  readonly error: string;
  readonly code: string;
  readonly details?: ValidationError[];
  readonly metadata?: ResponseMetadata;
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export interface ResponseMetadata {
  readonly timestamp: string;
  readonly requestId?: string;
  readonly version?: string;
}

// ============================================
// TYPES PAGINATION
// ============================================

export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: string;
  readonly order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly pagination: PaginationInfo;
}

export interface PaginationInfo {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ============================================
// TYPES RECHERCHE
// ============================================

export interface SearchParams {
  readonly query?: string;
  readonly filters?: Record<string, unknown>;
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly order?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly facets?: Record<string, unknown>;
}

// ============================================
// TYPES VALIDATION
// ============================================

export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: ValidationErrorCode;
}

export type ValidationErrorCode =
  | 'REQUIRED'
  | 'INVALID_FORMAT'
  | 'TOO_SHORT'
  | 'TOO_LONG'
  | 'INVALID_EMAIL'
  | 'INVALID_PHONE'
  | 'INVALID_URL'
  | 'INVALID_DATE'
  | 'MIN_VALUE'
  | 'MAX_VALUE'
  | 'PATTERN_MISMATCH'
  | 'ALREADY_EXISTS'
  | 'NOT_FOUND';

// ============================================
// CODES D'ERREUR API
// ============================================

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
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // OTP
  OTP_INVALID: 'OTP_INVALID',
  OTP_EXPIRED: 'OTP_EXPIRED',
  OTP_MAX_ATTEMPTS: 'OTP_MAX_ATTEMPTS',
  
  // Système
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMITED: 'RATE_LIMITED',
  CONFLICT: 'CONFLICT',
  LIMIT_REACHED: 'LIMIT_REACHED',
  NOT_FOUND: 'NOT_FOUND',
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

// ============================================
// TYPES UPLOAD
// ============================================

export interface UploadedFile {
  readonly id: string;
  readonly url: string;
  readonly filename: string;
  readonly mimetype: string;
  readonly size: number;
  readonly uploadedAt: Date;
}

export interface UploadResponse {
  readonly file: UploadedFile;
  readonly message: string;
}

export interface UploadConfig {
  readonly maxSize: number;
  readonly allowedTypes: readonly string[];
  readonly destination: string;
}

// ============================================
// TYPES HTTP
// ============================================

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HTTPStatus = 
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // Conflict
  | 422 // Unprocessable Entity
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 503; // Service Unavailable

export interface RequestHeaders {
  readonly 'Content-Type'?: string;
  readonly 'Authorization'?: string;
  readonly 'X-Request-ID'?: string;
  readonly 'User-Agent'?: string;
  readonly 'Accept-Language'?: string;
}

// ============================================
// TYPES POUR LES ROUTES API
// ============================================

export interface RouteParams {
  readonly [key: string]: string;
}

export interface QueryParams {
  readonly [key: string]: string | string[] | undefined;
}

export interface APIContext {
  readonly params: RouteParams;
  readonly searchParams: QueryParams;
  readonly headers: RequestHeaders;
  readonly method: HTTPMethod;
}

// ============================================
// TYPES GUARDS
// ============================================

export function estAPISuccess<T>(
  response: APIResponse<T>
): response is APISuccessResponse<T> {
  return response.success === true;
}

export function estAPIError<T>(
  response: APIResponse<T>
): response is APIErrorResponse {
  return response.success === false;
}

// ============================================
// HELPERS
// ============================================

export function creerSuccessResponse<T>(
  data: T,
  message?: string
): APISuccessResponse<T> {
  return {
    success: true,
    data,
    message,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

export function creerErrorResponse(
  error: string,
  code: ApiErrorCode,
  details?: ValidationError[]
): APIErrorResponse {
  return {
    success: false,
    error,
    code,
    details,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

export function creerPaginatedResponse<T>(
  items: readonly T[],
  total: number,
  params: PaginationParams
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / params.limit);
  
  return {
    items,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}