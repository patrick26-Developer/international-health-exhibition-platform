// components/footer/SISFooter.tsx
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
  Shield,
  Award,
  Users,
  Calendar,
  FileText,
  Handshake, 
  Target,
  Activity,
  Heart
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

  const footerSections: FooterSection[] = [
    {
      title: language === 'fr' ? 'EXPLORER' : 'EXPLORE',
      links: [
        { text: t.vision, url: '/about/vision' },
        { text: t.programs, url: '/programs' },
        { text: t.sdg, url: '/sdg' },
        { text: t.editions, url: '/editions' },
        { text: t.partners, url: '/partners' }
      ]
    },
    {
      title: language === 'fr' ? 'PARTICIPER' : 'PARTICIPATE',
      links: [
        { text: t.visitors, url: '/register/visitors' },
        { text: t.exhibitors, url: '/register/exhibitors' },
        { text: t.volunteers, url: '/register/volunteers' },
        { text: language === 'fr' ? 'Partenariat' : 'Partnership', url: '/partners' },
        { text: language === 'fr' ? 'Sponsoring' : 'Sponsoring', url: '/sponsors' }
      ]
    },
    {
      title: language === 'fr' ? 'RESSOURCES' : 'RESOURCES',
      links: [
        { text: t.media, url: '/media' },
        { text: language === 'fr' ? 'Actualités' : 'News', url: '/news' },
        { text: language === 'fr' ? 'Publications' : 'Publications', url: '/publications' },
        { text: language === 'fr' ? 'Recherche' : 'Research', url: '/research' },
        { text: language === 'fr' ? 'FAQ' : 'FAQ', url: '/faq' }
      ]
    },
    {
      title: language === 'fr' ? 'LÉGAL' : 'LEGAL',
      links: [
        { text: language === 'fr' ? 'Mentions légales' : 'Legal Notice', url: '/legal' },
        { text: language === 'fr' ? 'Confidentialité' : 'Privacy Policy', url: '/privacy' },
        { text: language === 'fr' ? 'CGU' : 'Terms', url: '/terms' },
        { text: language === 'fr' ? 'Accessibilité' : 'Accessibility', url: '/accessibility' },
        { text: language === 'fr' ? 'Cookies' : 'Cookies', url: '/cookies' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: language === 'fr' 
        ? 'Siège international - Paris, France' 
        : 'International Headquarters - Paris, France'
    },
    {
      icon: Phone,
      text: '+33 1 23 45 67 89'
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
    <footer className="bg-card border-t border-border w-full">
      <div className="w-full px-4 py-10 lg:px-6">
        {/* Top Section - Logo and Language */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Logo size="md" className="h-16 w-16" />
            <div>
              <h2 className="text-xl font-bold text-card-foreground tracking-tight">
                {siteTitle.toUpperCase()}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'fr' 
                  ? 'Plateforme mondiale pour la santé et la prévention' 
                  : 'Global platform for health and prevention'}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <button 
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-card-foreground/90 bg-accent hover:bg-accent/80 rounded border border-border transition-colors"
            >
              <Globe className="h-4 w-4" />
              {language === 'fr' ? 'ENGLISH VERSION' : 'VERSION FRANÇAISE'}
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-card-foreground uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-card-foreground transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact and Social */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">
                {language === 'fr' ? 'CONTACT' : 'CONTACT'}
              </h4>
              <div className="space-y-2">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">
                {language === 'fr' ? 'SUIVEZ-NOUS' : 'FOLLOW US'}
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="flex h-8 w-8 items-center justify-center rounded bg-muted text-muted-foreground hover:bg-accent hover:text-card-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:w-80">
              <h4 className="text-sm font-semibold text-card-foreground mb-3">
                {language === 'fr' ? 'NEWSLETTER' : 'NEWSLETTER'}
              </h4>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder={language === 'fr' ? 'Votre email' : 'Your email'}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded transition-colors"
                >
                  {language === 'fr' ? "S'abonner" : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} {siteTitle}
            </div>
            
            {/* Legal links */}
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/legal" className="text-muted-foreground hover:text-card-foreground">
                {language === 'fr' ? 'Mentions légales' : 'Legal'}
              </a>
              <a href="/privacy" className="text-muted-foreground hover:text-card-foreground">
                {language === 'fr' ? 'Confidentialité' : 'Privacy'}
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-card-foreground">
                {language === 'fr' ? 'CGU' : 'Terms'}
              </a>
            </div>
            
            {/* ID simple */}
            <div className="text-xs text-muted-foreground">
              SIRET: 123 456 789 00012
            </div>
          </div>
          
          {/* Mission statement */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>
                {language === 'fr'
                  ? 'Engagé pour la santé mondiale depuis 2023'
                  : 'Committed to global health since 2023'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}