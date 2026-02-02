// app/auth/register/partner/page.tsx
'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Loader2, Globe, User, Handshake, CheckCircle2 } from 'lucide-react';
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
  partnershipInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  partnerType: string;
  partnershipLevel: string;
  description: string;
  website: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
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
  sponsor: string;
  institution: string;
  patron: string;
  media: string;
  technical: string;
  platinum: string;
  gold: string;
  silver: string;
  bronze: string;
  institutional: string;
}

const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    title: 'Inscription Partenaire',
    subtitle: 'Devenez partenaire du Salon International de la Santé',
    personalInfo: 'Informations personnelles',
    partnershipInfo: 'Informations partenariat',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email personnel',
    phone: 'Téléphone',
    country: 'Pays',
    city: 'Ville',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    organizationName: 'Nom de l\'organisation',
    partnerType: 'Type de partenaire',
    partnershipLevel: 'Niveau de partenariat',
    description: 'Description du partenariat',
    website: 'Site web',
    contactPerson: 'Personne de contact',
    contactEmail: 'Email de contact',
    contactPhone: 'Téléphone de contact',
    newsletter: 'Recevoir la newsletter',
    terms: 'J\'accepte les conditions',
    register: 'S\'inscrire comme partenaire',
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
    sponsor: 'Sponsor',
    institution: 'Institution',
    patron: 'Mécène',
    media: 'Média',
    technical: 'Technique',
    platinum: 'Platine',
    gold: 'Or',
    silver: 'Argent',
    bronze: 'Bronze',
    institutional: 'Institutionnel',
  },
  en: {
    title: 'Partner Registration',
    subtitle: 'Become a partner of the International Health Fair',
    personalInfo: 'Personal information',
    partnershipInfo: 'Partnership information',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Personal email',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    password: 'Password',
    confirmPassword: 'Confirm password',
    organizationName: 'Organization name',
    partnerType: 'Partner type',
    partnershipLevel: 'Partnership level',
    description: 'Partnership description',
    website: 'Website',
    contactPerson: 'Contact person',
    contactEmail: 'Contact email',
    contactPhone: 'Contact phone',
    newsletter: 'Receive newsletter',
    terms: 'I accept the terms',
    register: 'Register as partner',
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
    sponsor: 'Sponsor',
    institution: 'Institution',
    patron: 'Patron',
    media: 'Media',
    technical: 'Technical',
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
    institutional: 'Institutional',
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
  nomOrganisation: string;
  typePartenaire: string;
  niveauPartenariat: string;
  description: string;
  siteWeb: string;
  personneContact: string;
  emailContact: string;
  telephoneContact: string;
  accepteNewsletter: boolean;
  accepteConditions: boolean;
}

export default function PartnerRegisterPage() {
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
    nomOrganisation: '',
    typePartenaire: 'SPONSOR',
    niveauPartenariat: 'OR',
    description: '',
    siteWeb: '',
    personneContact: '',
    emailContact: '',
    telephoneContact: '',
    accepteNewsletter: false,
    accepteConditions: false
  });

  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const validateForm = () => {
    const { prenom, nom, email, telephone, ville, motDePasse, confirmMotDePasse, nomOrganisation, accepteConditions } = formData;

    if (!prenom || !nom || !email || !telephone || !ville || !motDePasse || !confirmMotDePasse || !nomOrganisation) {
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
          typeUtilisateur: 'PARTENAIRE'
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-amber-600 dark:text-amber-400" />
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
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.verifyEmail}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950">
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
                  <User className="h-5 w-5 text-amber-600" />
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

              {/* Section Informations Partenariat */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-amber-600" />
                  {t.partnershipInfo}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomOrganisation">{t.organizationName}</Label>
                    <Input
                      id="nomOrganisation"
                      type="text"
                      value={formData.nomOrganisation}
                      onChange={(e) => setFormData({ ...formData, nomOrganisation: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="typePartenaire">{t.partnerType}</Label>
                    <Select
                      value={formData.typePartenaire}
                      onValueChange={(value) => setFormData({ ...formData, typePartenaire: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="typePartenaire" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SPONSOR">{t.sponsor}</SelectItem>
                        <SelectItem value="INSTITUTION">{t.institution}</SelectItem>
                        <SelectItem value="MECENE">{t.patron}</SelectItem>
                        <SelectItem value="MEDIA">{t.media}</SelectItem>
                        <SelectItem value="TECHNIQUE">{t.technical}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niveauPartenariat">{t.partnershipLevel}</Label>
                    <Select
                      value={formData.niveauPartenariat}
                      onValueChange={(value) => setFormData({ ...formData, niveauPartenariat: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="niveauPartenariat" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLATINE">{t.platinum}</SelectItem>
                        <SelectItem value="OR">{t.gold}</SelectItem>
                        <SelectItem value="ARGENT">{t.silver}</SelectItem>
                        <SelectItem value="BRONZE">{t.bronze}</SelectItem>
                        <SelectItem value="INSTITUTIONNEL">{t.institutional}</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personneContact">{t.contactPerson}</Label>
                    <Input
                      id="personneContact"
                      type="text"
                      value={formData.personneContact}
                      onChange={(e) => setFormData({ ...formData, personneContact: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailContact">{t.contactEmail}</Label>
                    <Input
                      id="emailContact"
                      type="email"
                      value={formData.emailContact}
                      onChange={(e) => setFormData({ ...formData, emailContact: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephoneContact">{t.contactPhone}</Label>
                    <Input
                      id="telephoneContact"
                      type="tel"
                      value={formData.telephoneContact}
                      onChange={(e) => setFormData({ ...formData, telephoneContact: e.target.value })}
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
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium"
                >
                  {t.login}
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/public"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              ← {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}