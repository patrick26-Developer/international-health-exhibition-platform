// app/auth/login/page.tsx - CORRIGÉ
'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Globe } from 'lucide-react';
import { Logo } from '../../../components/navbar/Logo';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  rememberMe: string;
  forgotPassword: string;
  login: string;
  noAccount: string;
  register: string;
  or: string;
  backToHome: string;
  invalidCredentials: string;
  requiredField: string;
  invalidEmail: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Connexion',
    subtitle: 'Accédez à votre espace personnel',
    email: 'Adresse email',
    password: 'Mot de passe',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    login: 'Se connecter',
    noAccount: "Vous n'avez pas de compte ?",
    register: "S'inscrire",
    or: 'OU',
    backToHome: "Retour à l'accueil",
    invalidCredentials: 'Email ou mot de passe incorrect',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Email invalide'
  },
  en: {
    title: 'Login',
    subtitle: 'Access your personal space',
    email: 'Email address',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    login: 'Sign in',
    noAccount: "Don't have an account?",
    register: 'Sign up',
    or: 'OR',
    backToHome: 'Back to home',
    invalidCredentials: 'Invalid email or password',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email'
  }
};

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('fr');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    remember: false
  });

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError(t.requiredField);
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t.invalidEmail);
      return false;
    }
    if (!formData.password) {
      setError(t.requiredField);
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
      const response = await fetch('/api/auth/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          motDePasse: formData.password,
          seSouvenir: formData.remember
        })
      });

      const data = await response.json();

      if (data.success) {
        const userType = data.data.utilisateur.typeUtilisateur;
        const redirectMap: Record<string, string> = {
          'SUPER_ADMIN': '/dashboard/admin',
          'ADMIN': '/dashboard/admin',
          'EXPOSANT': '/dashboard/exhibitor',
          'BENEVOLE': '/dashboard/volunteer',
          'PARTENAIRE': '/dashboard/partner',
          'VISITEUR': '/dashboard/visitor'
        };
        
        window.location.href = redirectMap[userType] || '/dashboard/visitor';
      } else {
        setError(data.error?.message || t.invalidCredentials);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.rememberMe}
                  </span>
                </label>
                <a
                  href="/auth/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                >
                  {t.forgotPassword}
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  t.login
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  {t.or}
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t.noAccount}{' '}
              <a
                href="/auth/register"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
              >
                {t.register}
              </a>
            </p>
          </div>

          <div className="text-center mt-6">
            <a
              href="/public"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              ← {t.backToHome}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}