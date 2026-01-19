// lib/validation/types.ts
/**
 * Types pour le système de validation
 */

import { z } from 'zod';
import { VALIDATION_ERROR_CODES } from '@/lib/utils/constants';

// ============================================
// TYPES GÉNÉRIQUES
// ============================================

/**
 * Résultat de validation générique
 */
export type ValidationSuccess<T> = {
  readonly success: true;
  readonly data: T;
};

export type ValidationFailure = {
  readonly success: false;
  readonly errors: z.ZodIssue[];
};

export type ZodValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Erreur de validation formatée
 */
export interface FormattedValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: typeof VALIDATION_ERROR_CODES[keyof typeof VALIDATION_ERROR_CODES];
}

// ============================================
// TYPES POUR LES SCHÉMAS
// ============================================

/**
 * Options de validation pour les champs optionnels
 */
export interface ValidationOptions {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly customMessage?: string;
}

/**
 * Configuration pour un schéma de validation
 */
export interface SchemaConfig<T> {
  readonly schema: z.ZodSchema<T>;
  readonly validate: (data: unknown) => ZodValidationResult<T>;
  readonly formatErrors: (errors: z.ZodIssue[]) => FormattedValidationError[];
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard pour ValidationSuccess
 */
export function isValidationSuccess<T>(
  result: ZodValidationResult<T>
): result is ValidationSuccess<T> {
  return result.success === true;
}

/**
 * Type guard pour ValidationFailure
 */
export function isValidationFailure<T>(
  result: ZodValidationResult<T>
): result is ValidationFailure {
  return result.success === false;
}

/**
 * Type guard pour ZodError
 */
export function isZodError(error: unknown): error is z.ZodError {
  return error instanceof z.ZodError;
}