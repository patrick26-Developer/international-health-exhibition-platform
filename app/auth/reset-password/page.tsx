// app/auth/reset-password/page.tsx - CORRIGÉ
'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, Loader2, Globe, CheckCircle2, Hash } from 'lucide-react';
import { Logo } from '../../../components/navbar/Logo';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  code: string;
  codePlaceholder: string;
  password: string;
  confirmPassword: string;
  resetPassword: string;
  successTitle: string;
  successMessage: string;
  goToLogin: string;
  passwordRequirements: string;
  requiredField: string;
  passwordMismatch: string;
  invalidCode: string;
  resetting: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Réinitialiser le mot de passe',
    subtitle: 'Entrez le code reçu par email et votre nouveau mot de passe',
    code: 'Code de vérification',
    codePlaceholder: 'Entrez le code à 6 chiffres',
    password: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    resetPassword: 'Réinitialiser',
    successTitle: 'Mot de passe réinitialisé !',
    successMessage: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
    goToLogin: 'Se connecter',
    passwordRequirements: 'Au moins 8 caractères, une majuscule, une minuscule et un chiffre',
    requiredField: 'Ce champ est requis',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    invalidCode: 'Code invalide',
    resetting: 'Réinitialisation...'
  },
  en: {
    title: 'Reset password',
    subtitle: 'Enter the code received by email and your new password',
    code: 'Verification code',
    codePlaceholder: 'Enter the 6-digit code',
    password: 'New password',
    confirmPassword: 'Confirm password',
    resetPassword: 'Reset',
    successTitle: 'Password reset!',
    successMessage: 'You can now log in with your new password.',
    goToLogin: 'Sign in',
    passwordRequirements: 'At least 8 characters, one uppercase, one lowercase and one number',
    requiredField: 'This field is required',
    passwordMismatch: 'Passwords do not match',
    invalidCode: 'Invalid code',
    resetting: 'Resetting...'
  }
};

interface FormData {
  code: string;
  email: string;
  nouveauMotDePasse: string;
  confirmationMotDePasse: string;
}

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [formData, setFormData] = useState<FormData>({
    code: '',
    email: '',
    nouveauMotDePasse: '',
    confirmationMotDePasse: ''
  });

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
  }, []);

  const validateForm = () => {
    const { code, nouveauMotDePasse, confirmationMotDePasse } = formData;

    if (!code || !nouveauMotDePasse || !confirmationMotDePasse) {
      setError(t.requiredField);
      return false;
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError(t.invalidCode);
      return false;
    }

    if (nouveauMotDePasse !== confirmationMotDePasse) {
      setError(t.passwordMismatch);
      return false;
    }

    if (nouveauMotDePasse.length < 8 || !/[A-Z]/.test(nouveauMotDePasse) || !/[a-z]/.test(nouveauMotDePasse) || !/[0-9]/.test(nouveauMotDePasse)) {
      setError(t.passwordRequirements);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          code: formData.code,
          nouveauMotDePasse: formData.nouveauMotDePasse,
          confirmationMotDePasse: formData.confirmationMotDePasse
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error?.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t.successTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t.successMessage}
            </p>
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.goToLogin}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <Globe className="h-4 w-4" />
          {language.toUpperCase()}
        </button>
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" className="h-16 w-16" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.code}
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.nouveauMotDePasse}
                    onChange={(e) => setFormData({ ...formData, nouveauMotDePasse: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmationMotDePasse}
                    onChange={(e) => setFormData({ ...formData, confirmationMotDePasse: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.passwordRequirements}
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t.resetting}</span>
                  </>
                ) : (
                  t.resetPassword
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}