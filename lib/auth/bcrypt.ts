// lib/auth/bcrypt.ts

/**
 * Service de hachage et vérification des mots de passe
 * Utilise bcryptjs avec un salt de 12 rounds
 */

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hache un mot de passe
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error);
    throw new Error('Erreur de hachage du mot de passe');
  }
}

/**
 * Vérifie un mot de passe contre un hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return false;
  }
}

/**
 * Vérifie la force d'un mot de passe
 * Politique : min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 spécial
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }

  if (password.length > 128) {
    errors.push('Le mot de passe ne peut pas dépasser 128 caractères');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Vérifie si un mot de passe a été compromis (liste noire basique)
 */
export function isCommonPassword(password: string): boolean {
  const commonPasswords = [
    'password',
    '123456',
    '12345678',
    'qwerty',
    'abc123',
    'monkey',
    '1234567',
    'letmein',
    'trustno1',
    'dragon',
    'baseball',
    'iloveyou',
    'master',
    'sunshine',
    'ashley',
    'bailey',
    'passw0rd',
    'shadow',
    '123123',
    '654321',
  ];

  return commonPasswords.includes(password.toLowerCase());
}