// lib/utils/validators.ts - CORRIGÉ COMPLET
import { LIMITS, VALIDATION_ERROR_CODES } from './constants';
import type { ValidationError } from '@/lib/types';

// ============================================
// HELPER POUR CRÉER DES ERREURS DE VALIDATION
// ============================================

const createValidationError = (
  field: string,
  message: string,
  code: keyof typeof VALIDATION_ERROR_CODES
): ValidationError => ({
  field,
  message,
  code: VALIDATION_ERROR_CODES[code],
});

// ============================================
// VALIDATION EMAIL
// ============================================

export function validateEmail(email: string): ValidationError | null {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return createValidationError(
      'email',
      'L\'email est requis',
      'REQUIRED'
    );
  }
  
  if (trimmedEmail.length > LIMITS.USER.EMAIL_MAX_LENGTH) {
    return createValidationError(
      'email',
      `L'email ne peut pas dépasser ${LIMITS.USER.EMAIL_MAX_LENGTH} caractères`,
      'TOO_LONG'
    );
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return createValidationError(
      'email',
      'Format d\'email invalide',
      'INVALID_EMAIL'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION MOT DE PASSE
// ============================================

export function validatePassword(password: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!password) {
    errors.push(createValidationError(
      'password',
      'Le mot de passe est requis',
      'REQUIRED'
    ));
    return errors;
  }
  
  if (password.length < LIMITS.PASSWORD.MIN_LENGTH) {
    errors.push(createValidationError(
      'password',
      `Le mot de passe doit contenir au moins ${LIMITS.PASSWORD.MIN_LENGTH} caractères`,
      'TOO_SHORT'
    ));
  }
  
  if (password.length > LIMITS.PASSWORD.MAX_LENGTH) {
    errors.push(createValidationError(
      'password',
      `Le mot de passe ne peut pas dépasser ${LIMITS.PASSWORD.MAX_LENGTH} caractères`,
      'TOO_LONG'
    ));
  }
  
  if (LIMITS.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push(createValidationError(
      'password',
      'Le mot de passe doit contenir au moins une majuscule',
      'PATTERN_MISMATCH'
    ));
  }
  
  if (LIMITS.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push(createValidationError(
      'password',
      'Le mot de passe doit contenir au moins une minuscule',
      'PATTERN_MISMATCH'
    ));
  }
  
  if (LIMITS.PASSWORD.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push(createValidationError(
      'password',
      'Le mot de passe doit contenir au moins un chiffre',
      'PATTERN_MISMATCH'
    ));
  }
  
  if (LIMITS.PASSWORD.REQUIRE_SPECIAL && !new RegExp(`[${LIMITS.PASSWORD.SPECIAL_CHARS}]`).test(password)) {
    errors.push(createValidationError(
      'password',
      `Le mot de passe doit contenir au moins un caractère spécial (${LIMITS.PASSWORD.SPECIAL_CHARS})`,
      'PATTERN_MISMATCH'
    ));
  }
  
  return errors;
}

// ============================================
// VALIDATION TÉLÉPHONE
// ============================================

export function validatePhoneNumber(phone: string | null | undefined): ValidationError | null {
  if (!phone || phone.trim() === '') {
    return null; // Optionnel
  }
  
  const trimmedPhone = phone.trim();
  
  if (trimmedPhone.length > LIMITS.USER.PHONE_MAX_LENGTH) {
    return createValidationError(
      'telephone',
      `Le numéro de téléphone ne peut pas dépasser ${LIMITS.USER.PHONE_MAX_LENGTH} caractères`,
      'TOO_LONG'
    );
  }
  
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  
  if (!phoneRegex.test(trimmedPhone)) {
    return createValidationError(
      'telephone',
      'Format de numéro de téléphone invalide',
      'INVALID_PHONE'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION NOM
// ============================================

export function validateName(
  name: string,
  fieldName: 'prenom' | 'nom'
): ValidationError | null {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return createValidationError(
      fieldName,
      fieldName === 'prenom' ? 'Le prénom est requis' : 'Le nom est requis',
      'REQUIRED'
    );
  }
  
  if (trimmedName.length < 2) {
    return createValidationError(
      fieldName,
      `Le ${fieldName} doit contenir au moins 2 caractères`,
      'TOO_SHORT'
    );
  }
  
  if (trimmedName.length > LIMITS.USER.NAME_MAX_LENGTH) {
    return createValidationError(
      fieldName,
      `Le ${fieldName} ne peut pas dépasser ${LIMITS.USER.NAME_MAX_LENGTH} caractères`,
      'TOO_LONG'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION BIOGRAPHIE
// ============================================

export function validateBiography(bio: string | null | undefined): ValidationError | null {
  if (!bio || bio.trim() === '') {
    return null;
  }
  
  if (bio.length > LIMITS.USER.BIO_MAX_LENGTH) {
    return createValidationError(
      'biographie',
      `La biographie ne peut pas dépasser ${LIMITS.USER.BIO_MAX_LENGTH} caractères`,
      'TOO_LONG'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION ADRESSE
// ============================================

export function validateAddress(address: string | null | undefined): ValidationError | null {
  if (!address || address.trim() === '') {
    return null;
  }
  
  if (address.length > LIMITS.USER.ADDRESS_MAX_LENGTH) {
    return createValidationError(
      'adresse',
      `L'adresse ne peut pas dépasser ${LIMITS.USER.ADDRESS_MAX_LENGTH} caractères`,
      'TOO_LONG'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION URL
// ============================================

export function validateURL(
  url: string | null | undefined,
  fieldName: string = 'url'
): ValidationError | null {
  if (!url || url.trim() === '') {
    return null;
  }
  
  try {
    new URL(url);
    return null;
  } catch {
    return createValidationError(
      fieldName,
      'URL invalide',
      'INVALID_URL'
    );
  }
}

// ============================================
// VALIDATION FICHIER
// ============================================

export function validateFile(
  file: File,
  options?: {
    maxSize?: number;
    allowedTypes?: readonly string[];
  }
): ValidationError | null {
  const maxSize = options?.maxSize || LIMITS.FILE.MAX_SIZE_BYTES;
  const allowedTypes = options?.allowedTypes || [
    ...LIMITS.FILE.ALLOWED_IMAGE_TYPES,
    ...LIMITS.FILE.ALLOWED_DOCUMENT_TYPES,
    ...LIMITS.FILE.ALLOWED_VIDEO_TYPES,
  ];
  
  if (file.size > maxSize) {
    return createValidationError(
      'file',
      `Le fichier est trop volumineux (max: ${(maxSize / 1024 / 1024).toFixed(2)} MB)`,
      'TOO_LONG'
    );
  }
  
  if (!allowedTypes.includes(file.type)) {
    return createValidationError(
      'file',
      `Type de fichier non autorisé. Types autorisés: ${allowedTypes.join(', ')}`,
      'INVALID_FORMAT'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION DATE
// ============================================

export function validateDate(
  date: string | Date | null | undefined,
  options?: {
    minDate?: Date;
    maxDate?: Date;
    required?: boolean;
  }
): ValidationError | null {
  if (!date && options?.required) {
    return createValidationError(
      'date',
      'La date est requise',
      'REQUIRED'
    );
  }
  
  if (!date) {
    return null;
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return createValidationError(
      'date',
      'Date invalide',
      'INVALID_DATE'
    );
  }
  
  if (options?.minDate && dateObj < options.minDate) {
    return createValidationError(
      'date',
      `La date ne peut pas être avant ${options.minDate.toLocaleDateString('fr-FR')}`,
      'INVALID_DATE'
    );
  }
  
  if (options?.maxDate && dateObj > options.maxDate) {
    return createValidationError(
      'date',
      `La date ne peut pas être après ${options.maxDate.toLocaleDateString('fr-FR')}`,
      'INVALID_DATE'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION OTP
// ============================================

export function validateOTP(code: string): ValidationError | null {
  const trimmedCode = code.trim();
  
  if (!trimmedCode) {
    return createValidationError(
      'code',
      'Le code est requis',
      'REQUIRED'
    );
  }
  
  const otpRegex = /^\d{6}$/;
  if (!otpRegex.test(trimmedCode)) {
    return createValidationError(
      'code',
      'Le code doit contenir exactement 6 chiffres',
      'INVALID_FORMAT'
    );
  }
  
  return null;
}

// ============================================
// VALIDATION JSON
// ============================================

export function validateJSON(
  json: string | object | null | undefined,
  fieldName: string = 'json'
): ValidationError | null {
  if (!json) {
    return null;
  }
  
  try {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    
    if (typeof parsed !== 'object' || parsed === null) {
      return createValidationError(
        fieldName,
        'JSON invalide',
        'INVALID_FORMAT'
      );
    }
    
    return null;
  } catch {
    return createValidationError(
      fieldName,
      'JSON invalide',
      'INVALID_FORMAT'
    );
  }
}

// ============================================
// VALIDATION NOMBRE
// ============================================

export function validateNumber(
  number: number | string | null | undefined,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
    required?: boolean;
    fieldName?: string;
  }
): ValidationError | null {
  const fieldName = options.fieldName || 'nombre';
  
  if ((number === null || number === undefined || number === '') && options.required) {
    return createValidationError(
      fieldName,
      `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} est requis`,
      'REQUIRED'
    );
  }
  
  if (number === null || number === undefined || number === '') {
    return null;
  }
  
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) {
    return createValidationError(
      fieldName,
      `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} doit être un nombre valide`,
      'INVALID_FORMAT'
    );
  }
  
  if (options.integer && !Number.isInteger(num)) {
    return createValidationError(
      fieldName,
      `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} doit être un nombre entier`,
      'INVALID_FORMAT'
    );
  }
  
  if (options.min !== undefined && num < options.min) {
    return createValidationError(
      fieldName,
      `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} doit être au moins ${options.min}`,
      'MIN_VALUE'
    );
  }
  
  if (options.max !== undefined && num > options.max) {
    return createValidationError(
      fieldName,
      `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} ne peut pas dépasser ${options.max}`,
      'MAX_VALUE'
    );
  }
  
  return null;
}