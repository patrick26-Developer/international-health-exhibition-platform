// components/navbar/SISNavbar.tsx
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
  Mail
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
    // CONTACT ajouté dans le menu principal
    { 
      label: t.contact, 
      href: '/public/contact',
      icon: Mail
    }
  ];

  const renderDesktopMenu = () => (
    <nav 
      className="hidden lg:flex items-center justify-center flex-1 gap-0 mx-8"
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
                "inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all duration-150 whitespace-nowrap",
                "text-foreground/90 hover:text-foreground hover:bg-accent",
                "border-x border-border/50 first:border-l-0 last:border-r-0",
                activeDropdown === item.label && "text-foreground bg-accent"
              )}
              style={{ minWidth: 'fit-content' }}
            >
              {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
              <span className="font-medium">{item.label}</span>
            </a>
          ) : (
            <button 
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all duration-150 whitespace-nowrap",
                "text-foreground/90 hover:text-foreground hover:bg-accent",
                "border-x border-border/50",
                activeDropdown === item.label && "text-foreground bg-accent"
              )}
              style={{ minWidth: 'fit-content' }}
            >
              {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
              <span className="font-medium">{item.label}</span>
              <ChevronDown className={cn(
                "h-3 w-3 text-muted-foreground transition-transform duration-150",
                activeDropdown === item.label && "rotate-180"
              )} />
            </button>
          )}
          
          {item.children && activeDropdown === item.label && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 w-72 bg-popover border border-border shadow-lg z-50"
            >
              <div className="py-1.5">
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-accent transition-colors duration-100"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                  >
                    {child.icon && (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-muted">
                        <child.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="block text-[13px] font-medium text-foreground">
                        {child.label}
                      </span>
                      {child.description && (
                        <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
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
          className="lg:hidden border-t border-border bg-popover absolute top-full left-0 right-0 z-40"
        >
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border/50 last:border-0">
                {item.href ? (
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-accent rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
                    {item.label}
                  </a>
                ) : (
                  <>
                    <div className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground/90">
                      {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
                      {item.label}
                    </div>
                    {item.children && (
                      <div className="ml-6 space-y-0.5 border-l border-border pl-4 pb-1.5">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
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
            <div className="pt-3 mt-3 border-t border-border/50 space-y-2">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/90 bg-accent hover:bg-accent/80 rounded transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language === 'fr' ? 'EN' : 'FR'}
                </button>
                
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/90 bg-accent hover:bg-accent/80 rounded transition-colors"
                >
                  {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {theme === 'light' ? (language === 'fr' ? 'Sombre' : 'Dark') : (language === 'fr' ? 'Clair' : 'Light')}
                </button>
              </div>
              
              <a
                href="/register"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-foreground/90 border border-border hover:bg-accent rounded transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5" />
                {t.register}
              </a>
              
              <a
                href="/login"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                {t.login}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-150 bg-background border-b border-border"
    )}>
      <div className="w-full px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center">
              <Logo size="md" className="h-12 w-12" />
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="flex-1 flex justify-center">
            {renderDesktopMenu()}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              
              <div className="relative group">
                <button 
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors flex items-center gap-1"
                  aria-label="Change theme"
                >
                  {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-36 bg-popover border border-border shadow-lg z-50">
                  {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
                    <button 
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
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
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors flex items-center gap-1"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              
              <div className="h-5 w-px bg-border" />
              
              <a
                href="/register"
                className="px-3 py-1.5 text-sm font-medium text-foreground/90 hover:text-foreground hover:bg-accent rounded border border-border transition-colors"
              >
                {t.register}
              </a>
              
              <a
                href="/login"
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded transition-colors"
              >
                {t.login}
              </a>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 border-t border-border bg-popover shadow-sm"
          >
            <div className="w-full px-4 py-2">
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
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