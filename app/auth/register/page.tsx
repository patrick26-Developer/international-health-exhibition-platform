// app/auth/register/page.tsx - CORRIGÉ
'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Globe, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Logo } from '../../../components/navbar/Logo';
import { Input } from '@/components/ui/input';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  newsletter: string;
  terms: string;
  register: string;
  hasAccount: string;
  login: string;
  or: string;
  backToHome: string;
  successTitle: string;
  successMessage: string;
  verifyEmail: string;
  passwordRequirements: string;
  requiredField: string;
  invalidEmail: string;
  passwordMismatch: string;
  mustAcceptTerms: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Créer un compte',
    subtitle: 'Rejoignez le Salon International de la Santé',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Adresse email',
    phone: 'Téléphone',
    country: 'Pays',
    city: 'Ville',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    newsletter: "J'accepte de recevoir la newsletter",
    terms: "J'accepte les conditions d'utilisation",
    register: "S'inscrire",
    hasAccount: 'Vous avez déjà un compte ?',
    login: 'Se connecter',
    or: 'OU',
    backToHome: "Retour à l'accueil",
    successTitle: 'Inscription réussie !',
    successMessage: 'Un code de vérification a été envoyé à votre adresse email.',
    verifyEmail: 'Vérifier mon email',
    passwordRequirements: 'Au moins 8 caractères, une majuscule, une minuscule et un chiffre',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Email invalide',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    mustAcceptTerms: 'Vous devez accepter les conditions d\'utilisation'
  },
  en: {
    title: 'Create an account',
    subtitle: 'Join the International Health Fair',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email address',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    password: 'Password',
    confirmPassword: 'Confirm password',
    newsletter: 'I agree to receive the newsletter',
    terms: 'I accept the terms and conditions',
    register: 'Sign up',
    hasAccount: 'Already have an account?',
    login: 'Sign in',
    or: 'OR',
    backToHome: 'Back to home',
    successTitle: 'Registration successful!',
    successMessage: 'A verification code has been sent to your email address.',
    verifyEmail: 'Verify my email',
    passwordRequirements: 'At least 8 characters, one uppercase, one lowercase and one number',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email',
    passwordMismatch: 'Passwords do not match',
    mustAcceptTerms: 'You must accept the terms and conditions'
  }
};

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  pays: string;
  ville: string;
  motDePasse: string;
  confirmMotDePasse: string;
  accepteNewsletter: boolean;
  accepteConditions: boolean;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    pays: 'Congo',
    ville: '',
    motDePasse: '',
    confirmMotDePasse: '',
    accepteNewsletter: false,
    accepteConditions: false
  });

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const validateForm = () => {
    const { prenom, nom, email, telephone, ville, motDePasse, confirmMotDePasse, accepteConditions } = formData;

    if (!prenom || !nom || !email || !telephone || !ville || !motDePasse || !confirmMotDePasse) {
      setError(t.requiredField);
      return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t.invalidEmail);
      return false;
    }

    if (motDePasse !== confirmMotDePasse) {
      setError(t.passwordMismatch);
      return false;
    }

    if (motDePasse.length < 8 || !/[A-Z]/.test(motDePasse) || !/[a-z]/.test(motDePasse) || !/[0-9]/.test(motDePasse)) {
      setError(t.passwordRequirements);
      return false;
    }

    if (!accepteConditions) {
      setError(t.mustAcceptTerms);
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email.toLowerCase(),
          telephone: formData.telephone,
          pays: formData.pays,
          ville: formData.ville,
          motDePasse: formData.motDePasse,
          accepteNewsletter: formData.accepteNewsletter
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
              onClick={() => window.location.href = '/auth/verify-email'}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.verifyEmail}
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
        <div className="w-full max-w-2xl">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.firstName}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.lastName}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="exemple@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.phone}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.city}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.motDePasse}
                      onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmMotDePasse}
                      onChange={(e) => setFormData({ ...formData, confirmMotDePasse: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.passwordRequirements}
              </p>

              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accepteNewsletter}
                    onChange={(e) => setFormData({ ...formData, accepteNewsletter: e.target.checked })}
                    className="w-4 h-4 mt-1 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.newsletter}
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accepteConditions}
                    onChange={(e) => setFormData({ ...formData, accepteConditions: e.target.checked })}
                    className="w-4 h-4 mt-1 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.terms}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Inscription...</span>
                  </>
                ) : (
                  t.register
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
              {t.hasAccount}{' '}
              <a
                href="/auth/login"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
              >
                {t.login}
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