// app/auth/register/volunteer/page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Globe, User, Phone, Heart, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/navbar/Logo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  personalInfo: string;
  volunteerInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  skills: string;
  availability: string;
  preferredTasks: string;
  experience: string;
  motivation: string;
  newsletter: string;
  terms: string;
  register: string;
  hasAccount: string;
  login: string;
  backToHome: string;
  successTitle: string;
  successMessage: string;
  verifyEmail: string;
  passwordRequirements: string;
  requiredField: string;
  invalidEmail: string;
  passwordMismatch: string;
  mustAcceptTerms: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  morning: string;
  afternoon: string;
  evening: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Inscription Bénévole',
    subtitle: 'Rejoignez l\'équipe de bénévoles du Salon International de la Santé',
    personalInfo: 'Informations personnelles',
    volunteerInfo: 'Informations bénévolat',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    country: 'Pays',
    city: 'Ville',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    skills: 'Compétences',
    availability: 'Disponibilités',
    preferredTasks: 'Tâches préférées',
    experience: 'Expérience de bénévolat',
    motivation: 'Motivation',
    newsletter: 'Recevoir la newsletter',
    terms: 'J\'accepte les conditions',
    register: 'S\'inscrire comme bénévole',
    hasAccount: 'Vous avez déjà un compte ?',
    login: 'Se connecter',
    backToHome: 'Retour à l\'accueil',
    successTitle: 'Inscription réussie !',
    successMessage: 'Un code de vérification a été envoyé à votre email.',
    verifyEmail: 'Vérifier mon email',
    passwordRequirements: 'Au moins 8 caractères, une majuscule, une minuscule et un chiffre',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Email invalide',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    mustAcceptTerms: 'Vous devez accepter les conditions',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
    morning: 'Matin',
    afternoon: 'Après-midi',
    evening: 'Soir',
  },
  en: {
    title: 'Volunteer Registration',
    subtitle: 'Join the volunteer team of the International Health Fair',
    personalInfo: 'Personal information',
    volunteerInfo: 'Volunteer information',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    password: 'Password',
    confirmPassword: 'Confirm password',
    skills: 'Skills',
    availability: 'Availability',
    preferredTasks: 'Preferred tasks',
    experience: 'Volunteer experience',
    motivation: 'Motivation',
    newsletter: 'Receive newsletter',
    terms: 'I accept the terms',
    register: 'Register as volunteer',
    hasAccount: 'Already have an account?',
    login: 'Sign in',
    backToHome: 'Back to home',
    successTitle: 'Registration successful!',
    successMessage: 'A verification code has been sent to your email.',
    verifyEmail: 'Verify my email',
    passwordRequirements: 'At least 8 characters, one uppercase, one lowercase and one number',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email',
    passwordMismatch: 'Passwords do not match',
    mustAcceptTerms: 'You must accept the terms',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
  }
};

interface Availability {
  [key: string]: string[];
}

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  pays: string;
  ville: string;
  motDePasse: string;
  confirmMotDePasse: string;
  competences: string;
  disponibilites: Availability;
  tachesPreferees: string;
  experience: string;
  motivation: string;
  accepteNewsletter: boolean;
  accepteConditions: boolean;
}

export default function VolunteerRegisterPage() {
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
    competences: '',
    disponibilites: {},
    tachesPreferees: '',
    experience: '',
    motivation: '',
    accepteNewsletter: false,
    accepteConditions: false
  });

  const t = TRANSLATIONS[language];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const periods = ['morning', 'afternoon', 'evening'];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleAvailabilityChange = (day: string, period: string) => {
    setFormData(prev => {
      const newDisponibilites = { ...prev.disponibilites };
      if (!newDisponibilites[day]) {
        newDisponibilites[day] = [];
      }
      
      const index = newDisponibilites[day].indexOf(period);
      if (index > -1) {
        newDisponibilites[day] = newDisponibilites[day].filter(p => p !== period);
        if (newDisponibilites[day].length === 0) {
          delete newDisponibilites[day];
        }
      } else {
        newDisponibilites[day] = [...newDisponibilites[day], period];
      }
      
      return { ...prev, disponibilites: newDisponibilites };
    });
  };

  const validateForm = () => {
    const { prenom, nom, email, telephone, ville, motDePasse, confirmMotDePasse, motivation, accepteConditions } = formData;

    if (!prenom || !nom || !email || !telephone || !ville || !motDePasse || !confirmMotDePasse || !motivation) {
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
          accepteNewsletter: formData.accepteNewsletter,
          typeUtilisateur: 'BENEVOLE'
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
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
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.verifyEmail}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
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
        <div className="w-full max-w-4xl">
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section Informations Personnelles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  {t.personalInfo}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.firstName}
                    </label>
                    <Input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.lastName}
                    </label>
                    <Input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.email}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="exemple@email.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.phone}
                    </label>
                    <Input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.city}
                    </label>
                    <Input
                      type="text"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.password}
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.motDePasse}
                        onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmMotDePasse}
                        onChange={(e) => setFormData({ ...formData, confirmMotDePasse: e.target.value })}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t.passwordRequirements}
                </p>
              </div>

              {/* Section Informations Bénévolat */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  {t.volunteerInfo}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.skills}
                    </label>
                    <Input
                      type="text"
                      value={formData.competences}
                      onChange={(e) => setFormData({ ...formData, competences: e.target.value })}
                      placeholder="Ex: Premiers secours, animation, traduction..."
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {t.availability}
                    </label>
                    <div className="space-y-2">
                      {days.map(day => (
                        <div key={day} className="flex items-center gap-4">
                          <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t[day as keyof Translation]}
                          </div>
                          <div className="flex gap-2">
                            {periods.map(period => (
                              <label key={period} className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.disponibilites[day]?.includes(period) || false}
                                  onChange={() => handleAvailabilityChange(day, period)}
                                  className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                                  disabled={isLoading}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {t[period as keyof Translation]}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.preferredTasks}
                    </label>
                    <Input
                      type="text"
                      value={formData.tachesPreferees}
                      onChange={(e) => setFormData({ ...formData, tachesPreferees: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.experience}
                    </label>
                    <Textarea
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.motivation}
                    </label>
                    <Textarea
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accepteNewsletter}
                    onChange={(e) => setFormData({ ...formData, accepteNewsletter: e.target.checked })}
                    className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded"
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
                    className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded"
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
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.hasAccount}{' '}
                <a
                  href="/auth/login"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                >
                  {t.login}
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <a
              href="/public"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
            >
              ← {t.backToHome}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}