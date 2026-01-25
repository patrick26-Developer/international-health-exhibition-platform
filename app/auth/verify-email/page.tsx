// app/auth/verify-email/page.tsx - CORRIGÉ
'use client';

import React, { useState, useEffect } from 'react';
import { Mail, AlertCircle, Loader2, Globe, CheckCircle2, Hash, RefreshCw } from 'lucide-react';
import { Logo } from '../../../components/navbar/Logo';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  email: string;
  code: string;
  codePlaceholder: string;
  verify: string;
  resendCode: string;
  successTitle: string;
  successMessage: string;
  goToLogin: string;
  requiredField: string;
  invalidEmail: string;
  invalidCode: string;
  verifying: string;
  resending: string;
  codeSent: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Vérification email',
    subtitle: 'Entrez le code de vérification envoyé à votre adresse email',
    email: 'Adresse email',
    code: 'Code de vérification',
    codePlaceholder: 'Entrez le code à 6 chiffres',
    verify: 'Vérifier',
    resendCode: 'Renvoyer le code',
    successTitle: 'Email vérifié !',
    successMessage: 'Votre compte a été activé avec succès.',
    goToLogin: 'Se connecter',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Email invalide',
    invalidCode: 'Code invalide (6 chiffres)',
    verifying: 'Vérification...',
    resending: 'Envoi...',
    codeSent: 'Code renvoyé avec succès'
  },
  en: {
    title: 'Email verification',
    subtitle: 'Enter the verification code sent to your email address',
    email: 'Email address',
    code: 'Verification code',
    codePlaceholder: 'Enter the 6-digit code',
    verify: 'Verify',
    resendCode: 'Resend code',
    successTitle: 'Email verified!',
    successMessage: 'Your account has been successfully activated.',
    goToLogin: 'Sign in',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidCode: 'Invalid code (6 digits)',
    verifying: 'Verifying...',
    resending: 'Sending...',
    codeSent: 'Code sent successfully'
  }
};

interface FormData {
  email: string;
  code: string;
}

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    code: ''
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
    if (!formData.email) {
      setError(t.requiredField);
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t.invalidEmail);
      return false;
    }
    if (!formData.code) {
      setError(t.requiredField);
      return false;
    }
    if (formData.code.length !== 6 || !/^\d{6}$/.test(formData.code)) {
      setError(t.invalidCode);
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
      const response = await fetch('/api/auth/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          code: formData.code
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error?.message || 'Code invalide ou expiré');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!formData.email) {
      setError(t.requiredField);
      return;
    }

    setError('');
    setIsResending(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.toLowerCase() })
      });

      const data = await response.json();

      if (data.success) {
        setError('');
        alert(t.codeSent);
      } else {
        setError(data.error?.message || 'Erreur lors du renvoi du code');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsResending(false);
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
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="exemple@email.com"
                    disabled={isLoading || isResending}
                  />
                </div>
              </div>

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
                    disabled={isLoading || isResending}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isResending}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t.verifying}</span>
                  </>
                ) : (
                  t.verify
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">ou</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || isResending}
                className="w-full py-3 px-4 border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t.resending}</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    {t.resendCode}
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <a
              href="/auth/login"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              ← {t.goToLogin}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}