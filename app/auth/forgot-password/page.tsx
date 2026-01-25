// app/auth/forgot-password/page.tsx - CORRIGÉ
"use client";
import React, { useState } from 'react';
import { Mail, AlertCircle, Loader2, Globe, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Logo } from '../../../components/navbar/Logo';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  email: string;
  sendCode: string;
  backToLogin: string;
  successTitle: string;
  successMessage: string;
  resetPassword: string;
  requiredField: string;
  invalidEmail: string;
  sendingCode: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Mot de passe oublié',
    subtitle: 'Entrez votre email pour recevoir un code de réinitialisation',
    email: 'Adresse email',
    sendCode: 'Envoyer le code',
    backToLogin: 'Retour à la connexion',
    successTitle: 'Code envoyé !',
    successMessage: 'Un code de réinitialisation a été envoyé à votre adresse email.',
    resetPassword: 'Réinitialiser mon mot de passe',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Email invalide',
    sendingCode: 'Envoi en cours...'
  },
  en: {
    title: 'Forgot password',
    subtitle: 'Enter your email to receive a reset code',
    email: 'Email address',
    sendCode: 'Send code',
    backToLogin: 'Back to login',
    successTitle: 'Code sent!',
    successMessage: 'A reset code has been sent to your email address.',
    resetPassword: 'Reset my password',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email',
    sendingCode: 'Sending...'
  }
};

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [email, setEmail] = useState('');

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const validateForm = () => {
    if (!email) {
      setError(t.requiredField);
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t.invalidEmail);
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
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
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
              onClick={() => window.location.href = `/auth/reset-password?email=${encodeURIComponent(email)}`}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.resetPassword}
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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="exemple@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t.sendingCode}</span>
                  </>
                ) : (
                  t.sendCode
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <a
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToLogin}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}