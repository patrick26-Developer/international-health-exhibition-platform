// app/auth/register/media/page.tsx
'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Loader2, Globe, User, Camera, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/navbar/Logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

type Language = 'fr' | 'en';

interface Translation {
  title: string;
  subtitle: string;
  personalInfo: string;
  mediaInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  mediaOrganization: string;
  mediaType: string;
  position: string;
  pressCard: string;
  specialization: string;
  portfolio: string;
  website: string;
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
  television: string;
  radio: string;
  print: string;
  online: string;
  agency: string;
  freelance: string;
  journalist: string;
  photographer: string;
  videographer: string;
  editor: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Inscription Média',
    subtitle: 'Accédez au Salon International de la Santé en tant que professionnel des médias',
    personalInfo: 'Informations personnelles',
    mediaInfo: 'Informations média',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    country: 'Pays',
    city: 'Ville',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    mediaOrganization: 'Organisation média',
    mediaType: 'Type de média',
    position: 'Poste',
    pressCard: 'Carte de presse',
    specialization: 'Spécialisation',
    portfolio: 'Portfolio / Références',
    website: 'Site web',
    newsletter: 'Recevoir la newsletter',
    terms: 'J\'accepte les conditions',
    register: 'S\'inscrire comme média',
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
    television: 'Télévision',
    radio: 'Radio',
    print: 'Presse écrite',
    online: 'En ligne',
    agency: 'Agence',
    freelance: 'Indépendant',
    journalist: 'Journaliste',
    photographer: 'Photographe',
    videographer: 'Vidéaste',
    editor: 'Rédacteur',
  },
  en: {
    title: 'Media Registration',
    subtitle: 'Access the International Health Fair as a media professional',
    personalInfo: 'Personal information',
    mediaInfo: 'Media information',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    password: 'Password',
    confirmPassword: 'Confirm password',
    mediaOrganization: 'Media organization',
    mediaType: 'Media type',
    position: 'Position',
    pressCard: 'Press card',
    specialization: 'Specialization',
    portfolio: 'Portfolio / References',
    website: 'Website',
    newsletter: 'Receive newsletter',
    terms: 'I accept the terms',
    register: 'Register as media',
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
    television: 'Television',
    radio: 'Radio',
    print: 'Print media',
    online: 'Online',
    agency: 'Agency',
    freelance: 'Freelance',
    journalist: 'Journalist',
    photographer: 'Photographer',
    videographer: 'Videographer',
    editor: 'Editor',
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
  organisation: string;
  typeMedia: string;
  poste: string;
  cartePresse: string;
  specialisation: string;
  portfolio: string;
  siteWeb: string;
  accepteNewsletter: boolean;
  accepteConditions: boolean;
}

export default function MediaRegisterPage() {
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
    organisation: '',
    typeMedia: 'online',
    poste: 'journalist',
    cartePresse: '',
    specialisation: '',
    portfolio: '',
    siteWeb: '',
    accepteNewsletter: false,
    accepteConditions: false
  });

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const validateForm = () => {
    const { prenom, nom, email, telephone, ville, motDePasse, confirmMotDePasse, organisation, accepteConditions } = formData;

    if (!prenom || !nom || !email || !telephone || !ville || !motDePasse || !confirmMotDePasse || !organisation) {
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
          organisation: formData.organisation,
          poste: formData.poste,
          accepteNewsletter: formData.accepteNewsletter,
          typeUtilisateur: 'MEDIA'
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
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
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.verifyEmail}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
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
                  <User className="h-5 w-5 text-indigo-600" />
                  {t.personalInfo}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">{t.firstName}</Label>
                    <Input
                      id="prenom"
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nom">{t.lastName}</Label>
                    <Input
                      id="nom"
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="exemple@email.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">{t.phone}</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ville">{t.city}</Label>
                    <Input
                      id="ville"
                      type="text"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motDePasse">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="motDePasse"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.motDePasse}
                        onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmMotDePasse">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Input
                        id="confirmMotDePasse"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmMotDePasse}
                        onChange={(e) => setFormData({ ...formData, confirmMotDePasse: e.target.value })}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

              {/* Section Informations Média */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-indigo-600" />
                  {t.mediaInfo}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organisation">{t.mediaOrganization}</Label>
                    <Input
                      id="organisation"
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="typeMedia">{t.mediaType}</Label>
                    <Select
                      value={formData.typeMedia}
                      onValueChange={(value) => setFormData({ ...formData, typeMedia: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="typeMedia" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="television">{t.television}</SelectItem>
                        <SelectItem value="radio">{t.radio}</SelectItem>
                        <SelectItem value="print">{t.print}</SelectItem>
                        <SelectItem value="online">{t.online}</SelectItem>
                        <SelectItem value="agency">{t.agency}</SelectItem>
                        <SelectItem value="freelance">{t.freelance}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="poste">{t.position}</Label>
                    <Select
                      value={formData.poste}
                      onValueChange={(value) => setFormData({ ...formData, poste: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="poste" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="journalist">{t.journalist}</SelectItem>
                        <SelectItem value="photographer">{t.photographer}</SelectItem>
                        <SelectItem value="videographer">{t.videographer}</SelectItem>
                        <SelectItem value="editor">{t.editor}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cartePresse">{t.pressCard}</Label>
                    <Input
                      id="cartePresse"
                      type="text"
                      value={formData.cartePresse}
                      onChange={(e) => setFormData({ ...formData, cartePresse: e.target.value })}
                      placeholder="N° carte de presse"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialisation">{t.specialization}</Label>
                    <Input
                      id="specialisation"
                      type="text"
                      value={formData.specialisation}
                      onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
                      placeholder="Ex: Santé, Société..."
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteWeb">{t.website}</Label>
                    <Input
                      id="siteWeb"
                      type="url"
                      value={formData.siteWeb}
                      onChange={(e) => setFormData({ ...formData, siteWeb: e.target.value })}
                      placeholder="https://..."
                      disabled={isLoading}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="portfolio">{t.portfolio}</Label>
                    <Textarea
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      rows={4}
                      placeholder="Liens vers vos articles, reportages, photos..."
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.accepteNewsletter}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, accepteNewsletter: checked as boolean })
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="newsletter"
                    className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    {t.newsletter}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.accepteConditions}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, accepteConditions: checked as boolean })
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    {t.terms}
                  </Label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <Link
                  href="/auth/login"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
                >
                  {t.login}
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/public"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors"
            >
              ← {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}