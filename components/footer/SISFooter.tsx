'use client';

import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Globe,
  Heart,
  ArrowUp,
  Send
} from 'lucide-react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { translations } from '@/lib/translations';
import { Logo } from '@/components/navbar/Logo';

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export function SISFooter() {
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerSections: FooterSection[] = [
    {
      title: language === 'fr' ? 'EXPLORER' : 'EXPLORE',
      links: [
        { text: t.vision, url: '/public/about/vision' },
        { text: t.programs, url: '/public/programs' },
        { text: t.sdg, url: '/public/sdg' },
        { text: t.editions, url: '/public/editions' },
        { text: t.partners, url: '/public/partners' }
      ]
    },
    {
      title: language === 'fr' ? 'PARTICIPER' : 'PARTICIPATE',
      links: [
        { text: t.visitors, url: '/public/register/visitors' },
        { text: t.exhibitors, url: '/public/register/exhibitors' },
        { text: t.volunteers, url: '/public/register/volunteers' },
        { text: language === 'fr' ? 'Partenariat' : 'Partnership', url: '/public/partners' },
        { text: language === 'fr' ? 'Sponsoring' : 'Sponsoring', url: '/public/partners/sponsors' }
      ]
    },
    {
      title: language === 'fr' ? 'RESSOURCES' : 'RESOURCES',
      links: [
        { text: t.media, url: '/public/media' },
        { text: language === 'fr' ? 'Actualités' : 'News', url: '/public/news' },
        { text: language === 'fr' ? 'Publications' : 'Publications', url: '/public/publications' },
        { text: language === 'fr' ? 'Recherche' : 'Research', url: '/public/research' },
        { text: language === 'fr' ? 'FAQ' : 'FAQ', url: '/public/faq' }
      ]
    },
    {
      title: language === 'fr' ? 'LÉGAL' : 'LEGAL',
      links: [
        { text: language === 'fr' ? 'Mentions légales' : 'Legal Notice', url: '/public/legal' },
        { text: language === 'fr' ? 'Confidentialité' : 'Privacy Policy', url: '/public/privacy' },
        { text: language === 'fr' ? 'CGU' : 'Terms', url: '/public/terms' },
        { text: language === 'fr' ? 'Accessibilité' : 'Accessibility', url: '/public/accessibility' },
        { text: language === 'fr' ? 'Cookies' : 'Cookies', url: '/public/cookies' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: language === 'fr' 
        ? 'Brazzaville, Congo' 
        : 'Brazzaville, Congo'
    },
    {
      icon: Phone,
      text: '+242 05 555 55 55'
    },
    {
      icon: Mail,
      text: 'contact@sis-international.org'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Youtube, url: '#', label: 'YouTube' }
  ];

  const currentYear = new Date().getFullYear();
  const siteTitle = language === 'fr' ? 'Salon International de la Santé' : 'International Health Fair';

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full border-t border-gray-100 dark:border-gray-800">
      <div className="w-full px-4 py-12 lg:px-6">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto">
          {/* Logo and Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-4 mb-4">
                <Logo size="md" className="h-14 w-14" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {language === 'fr' ? 'S.I.S.' : 'I.H.F.'}
                  </h2>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {language === 'fr' ? 'Prévention & Santé' : 'Prevention & Health'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {language === 'fr' 
                  ? 'Plateforme mondiale dédiée à la prévention et à la promotion de la santé pour un développement humain durable.'
                  : 'Global platform dedicated to health prevention and promotion for sustainable human development.'}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.url}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                        >
                          <span className="w-0 h-px bg-emerald-600 dark:bg-emerald-400 group-hover:w-3 transition-all duration-200" />
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section - Contact & Newsletter */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'CONTACT' : 'CONTACT'}
              </h4>
              <div className="space-y-3">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                      <item.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'NEWSLETTER' : 'NEWSLETTER'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {language === 'fr' 
                  ? 'Recevez nos actualités et invitations'
                  : 'Receive our news and invitations'}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={language === 'fr' ? 'Votre email' : 'Your email'}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'fr' ? 'Envoyer' : 'Send'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Copyright & Mission */}
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  © {currentYear} {siteTitle}. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <Heart className="h-4 w-4" />
                  <span>
                    {language === 'fr'
                      ? 'Engagé pour la santé mondiale'
                      : 'Committed to global health'}
                  </span>
                </div>
              </div>
              
              {/* Legal & Language */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="/public/legal" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {language === 'fr' ? 'Mentions légales' : 'Legal'}
                  </a>
                  <a href="/public/privacy" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {language === 'fr' ? 'Confidentialité' : 'Privacy'}
                  </a>
                  <a href="/public/terms" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {language === 'fr' ? 'CGU' : 'Terms'}
                  </a>
                </div>
                
                <button 
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language === 'fr' ? 'English' : 'Français'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Floating */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        aria-label={language === 'fr' ? 'Retour en haut' : 'Back to top'}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}