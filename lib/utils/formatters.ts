// utils/formatters.ts

/**
 * Formateurs pour les dates, nombres, textes, etc.
 * Toutes les fonctions de formatage centralisées
 */

import { FORMATS } from './constants';
import type { Language } from './constants';

/**
 * Formatte une date selon la locale
 */
export function formatDate(
  date: Date | string | null | undefined,
  options?: {
    format?: string;
    locale?: Language;
    includeTime?: boolean;
  }
): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const locale = options?.locale || 'fr';
  const format = options?.format || (options?.includeTime ? FORMATS.DATETIME : FORMATS.DATE);
  
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: options?.includeTime ? '2-digit' : undefined,
    minute: options?.includeTime ? '2-digit' : undefined,
    hour12: false,
  }).format(dateObj);
}

/**
 * Formatte un numéro de téléphone
 */
export function formatPhoneNumber(
  phone: string | null | undefined,
  countryCode: string = '+33'
): string {
  if (!phone) return '';
  
  // Nettoyer le numéro
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 9) {
    // Format français: 01 23 45 67 89
    return cleaned.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  } else if (cleaned.length === 10) {
    // Format international: +33 1 23 45 67 89
    return `${countryCode} ${cleaned.substring(1).replace(/(\d{2})/g, '$1 ').trim()}`;
  }
  
  return phone;
}

/**
 * Formatte une devise
 */
export function formatCurrency(
  amount: number,
  options?: {
    currency?: string;
    locale?: Language;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const locale = options?.locale || 'fr';
  const currency = options?.currency || 'EUR';
  
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(amount);
}

/**
 * Tronque un texte avec ellipse
 */
export function truncateText(
  text: string,
  maxLength: number,
  options?: {
    ellipsis?: string;
    preserveWords?: boolean;
  }
): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  const ellipsis = options?.ellipsis || '...';
  const maxTextLength = maxLength - ellipsis.length;
  
  if (options?.preserveWords) {
    // Tronquer à la fin du dernier mot complet
    const truncated = text.substring(0, maxTextLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + ellipsis;
    }
  }
  
  return text.substring(0, maxTextLength) + ellipsis;
}

/**
 * Formate un nom complet (prénom + nom)
 */
export function formatFullName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  options?: {
    lastNameFirst?: boolean;
    capitalize?: boolean;
  }
): string {
  if (!firstName && !lastName) return '';
  
  const formatName = (name: string): string => {
    if (!name) return '';
    if (options?.capitalize) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return name;
  };
  
  const formattedFirstName = formatName(firstName || '');
  const formattedLastName = formatName(lastName || '');
  
  if (options?.lastNameFirst) {
    return `${formattedLastName} ${formattedFirstName}`.trim();
  }
  
  return `${formattedFirstName} ${formattedLastName}`.trim();
}

/**
 * Formate les initiales d'une personne
 */
export function formatInitials(
  firstName: string | null | undefined,
  lastName: string | null | undefined
): string {
  const firstInitial = firstName?.[0]?.toUpperCase() || '';
  const lastInitial = lastName?.[0]?.toUpperCase() || '';
  
  return `${firstInitial}${lastInitial}`;
}

/**
 * Formate une durée en texte lisible
 */
export function formatDuration(
  milliseconds: number,
  options?: {
    verbose?: boolean;
    includeSeconds?: boolean;
  }
): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  if (options?.verbose) {
    const parts: string[] = [];
    
    if (days > 0) parts.push(`${days} jour${days > 1 ? 's' : ''}`);
    if (remainingHours > 0) parts.push(`${remainingHours} heure${remainingHours > 1 ? 's' : ''}`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
    if (options.includeSeconds && remainingSeconds > 0) {
      parts.push(`${remainingSeconds} seconde${remainingSeconds > 1 ? 's' : ''}`);
    }
    
    return parts.join(' ') || '0 minute';
  }
  
  // Format court: HH:MM:SS ou HH:MM
  const timeParts: string[] = [];
  
  if (hours > 0 || days > 0) {
    const totalHours = days * 24 + hours;
    timeParts.push(totalHours.toString().padStart(2, '0'));
  }
  
  timeParts.push(remainingMinutes.toString().padStart(2, '0'));
  
  if (options?.includeSeconds) {
    timeParts.push(remainingSeconds.toString().padStart(2, '0'));
  }
  
  return timeParts.join(':');
}

/**
 * Formate un nombre avec séparateurs de milliers
 */
export function formatNumber(
  number: number,
  options?: {
    locale?: Language;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const locale = options?.locale || 'fr';
  
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(number);
}

/**
 * Formate un pourcentage
 */
export function formatPercentage(
  value: number,
  options?: {
    locale?: Language;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const formatted = formatNumber(value * 100, options);
  return `${formatted}%`;
}

/**
 * Formate une taille de fichier
 */
export function formatFileSize(
  bytes: number,
  options?: {
    decimalPlaces?: number;
    useBinary?: boolean;
  }
): string {
  if (bytes === 0) return '0 Bytes';
  
  const decimalPlaces = options?.decimalPlaces ?? 2;
  const k = options?.useBinary ? 1024 : 1000;
  const sizes = options?.useBinary
    ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPlaces))} ${sizes[i]}`;
}

/**
 * Masque une adresse email (ex: t****@domain.com)
 */
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  
  if (!localPart || !domain) {
    return email;
  }
  
  if (localPart.length <= 2) {
    return `${'*'.repeat(localPart.length)}@${domain}`;
  }
  
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const middleChars = '*'.repeat(localPart.length - 2);
  
  return `${firstChar}${middleChars}${lastChar}@${domain}`;
}

/**
 * Masque un numéro de téléphone
 */
export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length <= 4) {
    return phone;
  }
  
  const visibleDigits = 2;
  const maskedDigits = cleaned.length - visibleDigits;
  
  return `${'*'.repeat(maskedDigits)}${cleaned.substring(maskedDigits)}`;
}