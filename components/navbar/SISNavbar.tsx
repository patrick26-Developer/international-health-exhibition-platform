'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  User,
  Target,
  FileText,
  Activity,
  Apple,
  Brain,
  Heart,
  Users,
  Handshake,
  Sparkles,
  X,
  Search,
  Calendar,
  Award,
  Home,
  LucideIcon,
  Camera,
  Video,
  Newspaper,
  UserPlus,
  Mail,
  ArrowUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/lib/stores/language-store';
import { useUIStore, Theme } from '@/lib/stores/ui-store';
import { translations } from '@/lib/translations';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface NavChild {
  label: string;
  icon?: LucideIcon;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
  icon?: LucideIcon;
}

export function SISNavbar() {
  const { language, setLanguage } = useLanguageStore();
  const { theme, setTheme, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navItems: NavItem[] = [
    { 
      label: t.home, 
      href: '/public',
      icon: Home
    },
    { 
      label: t.about, 
      icon: Target,
      children: [
        { 
          label: t.vision, 
          icon: Target, 
          href: '/public/about/vision',
          description: language === 'fr' ? 'Notre mission et valeurs' : 'Our mission and values'
        },
        { 
          label: t.context, 
          icon: FileText, 
          href: '/public/about/context',
          description: language === 'fr' ? 'Contexte et objectifs' : 'Context and objectives'
        }
      ]
    },
    { 
      label: t.programs, 
      icon: Activity,
      children: [
        { 
          label: t.sportHealth, 
          icon: Activity, 
          href: '/public/programs/sport-health',
          description: language === 'fr' ? 'Sport et santé' : 'Sport and health'
        },
        { 
          label: t.nutrition, 
          icon: Apple, 
          href: '/public/programs/nutrition',
          description: language === 'fr' ? 'Nutrition préventive' : 'Preventive nutrition'
        },
        { 
          label: t.wellbeing, 
          icon: Brain, 
          href: '/public/programs/wellbeing',
          description: language === 'fr' ? 'Bien-être global' : 'Global wellbeing'
        },
        { 
          label: t.prevention, 
          icon: Heart, 
          href: '/public/programs/prevention',
          description: language === 'fr' ? 'Prévention MNT' : 'NCD prevention'
        }
      ]
    },
    { 
      label: t.sdg, 
      href: '/public/sdg',
      icon: Award
    },
    { 
      label: t.editions, 
      href: '/public/editions',
      icon: Calendar
    },
    { 
      label: t.partners, 
      icon: Handshake,
      children: [
        { 
          label: t.institutional, 
          icon: Users, 
          href: '/public/partners/institutional',
          description: language === 'fr' ? 'Partenaires institutionnels' : 'Institutional partners'
        },
        { 
          label: t.sponsors, 
          icon: Handshake, 
          href: '/public/partners/sponsors',
          description: language === 'fr' ? 'Sponsors privés' : 'Private sponsors'
        },
        { 
          label: t.philanthropy, 
          icon: Sparkles, 
          href: '/public/partners/philanthropy',
          description: language === 'fr' ? 'Mécénat santé' : 'Health philanthropy'
        }
      ]
    },
    { 
      label: t.media, 
      icon: Camera,
      children: [
        { 
          label: t.photos, 
          icon: Camera, 
          href: '/public/media/photos',
          description: language === 'fr' ? 'Galerie photos' : 'Photo gallery'
        },
        { 
          label: t.videos, 
          icon: Video, 
          href: '/public/media/videos',
          description: language === 'fr' ? 'Vidéos éditions' : 'Edition videos'
        },
        { 
          label: t.press, 
          icon: Newspaper, 
          href: '/public/media/press',
          description: language === 'fr' ? 'Revue de presse' : 'Press review'
        }
      ]
    },
    { 
      label: t.contact, 
      href: '/public/contact',
      icon: Mail
    }
  ];

  const renderDesktopMenu = () => (
    <nav 
      className="hidden lg:flex items-center justify-center flex-1 gap-0"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {navItems.map((item) => (
        <div 
          key={item.label}
          className="relative"
          onMouseEnter={() => item.children && setActiveDropdown(item.label)}
        >
          {item.href ? (
            <a 
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                "text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                "hover:bg-gray-50/80 dark:hover:bg-gray-800/30",
                activeDropdown === item.label && "text-emerald-700 dark:text-emerald-400 bg-gray-50/50 dark:bg-gray-800/20"
              )}
              style={{ minWidth: 'fit-content' }}
            >
              {item.icon && <item.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />}
              <span className="font-medium">{item.label}</span>
            </a>
          ) : (
            <button 
              className={cn(
                "inline-flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                "text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                "hover:bg-gray-50/80 dark:hover:bg-gray-800/30",
                activeDropdown === item.label && "text-emerald-700 dark:text-emerald-400 bg-gray-50/50 dark:bg-gray-800/20"
              )}
              style={{ minWidth: 'fit-content' }}
            >
              {item.icon && <item.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />}
              <span className="font-medium">{item.label}</span>
              <ChevronDown className={cn(
                "h-3 w-3 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                activeDropdown === item.label && "rotate-180"
              )} />
            </button>
          )}
          
          {item.children && activeDropdown === item.label && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-72 bg-white dark:bg-gray-900 shadow-xl rounded-lg z-50"
            >
              <div className="py-2">
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    className="flex items-start gap-2.5 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                  >
                    {child.icon && (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                        <child.icon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="block text-[13px] font-medium text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {child.label}
                      </span>
                      {child.description && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
                          {child.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );

  const renderMobileMenu = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-gray-900 absolute top-full left-0 right-0 z-40 shadow-xl"
        >
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-1">
            {/* Mobile navigation items */}
            {navItems.map((item) => (
              <div key={item.label} className="last:border-b-0">
                {item.href ? (
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />}
                    {item.label}
                  </a>
                ) : (
                  <>
                    <div className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.icon && <item.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />}
                      {item.label}
                    </div>
                    {item.children && (
                      <div className="ml-6 space-y-1 pl-4 pb-1.5">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.icon && <child.icon className="h-3 w-3" />}
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            
            {/* Mobile actions */}
            <div className="pt-3 mt-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language === 'fr' ? 'EN' : 'FR'}
                </button>
                
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {theme === 'light' ? (language === 'fr' ? 'Sombre' : 'Dark') : (language === 'fr' ? 'Clair' : 'Light')}
                </button>
              </div>
              
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                {language === 'fr' ? 'Haut de page' : 'Back to top'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      scrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
        : "bg-white/90 dark:bg-gray-900/90"
    )}>
      {/* Première ligne : Logo + Inscription/Connexion */}
      <div className="w-full px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Nom */}
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollToTop}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label={language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            >
              <Logo size="md" className="h-12 w-12" />
            </button>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {language === 'fr' ? 'SALON INTERNATIONAL DE LA SANTÉ' : 'INTERNATIONAL HEALTH FAIR'}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400">
                {language === 'fr' ? 'Prévention & Promotion Santé' : 'Prevention & Health Promotion'}
              </div>
            </div>
          </div>

          {/* Boutons Inscription/Connexion */}
          <div className="flex items-center gap-2">
            <a
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
            >
              {t.login}
            </a>
            
            <a
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg transition-colors"
            >
              {t.register}
            </a>
          </div>
        </div>
      </div>

      {/* Deuxième ligne : Navigation principale */}
      <div className="w-full px-4 lg:px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="flex h-12 items-center justify-between">
          {/* Navigation desktop */}
          <div className="flex-1 flex justify-center">
            {renderDesktopMenu()}
          </div>

          {/* Actions à droite (recherche, thème, langue) */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            
            <div className="relative group">
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors flex items-center gap-1"
                aria-label="Change theme"
              >
                {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-36 bg-white dark:bg-gray-900 shadow-xl rounded-lg z-50">
                {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
                  <button 
                    key={themeOption}
                    onClick={() => setTheme(themeOption)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {themeOption === 'light' && <Sun className="h-3.5 w-3.5" />}
                    {themeOption === 'dark' && <Moon className="h-3.5 w-3.5" />}
                    {themeOption === 'system' && <Monitor className="h-3.5 w-3.5" />}
                    <span>{t.theme[themeOption]}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg transition-colors flex items-center gap-1"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 rounded-lg ml-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="w-full px-4 py-2">
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </header>
  );
}