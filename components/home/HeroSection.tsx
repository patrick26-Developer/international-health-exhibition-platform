// components/sections/hero.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Salon International de la Santé',
      subtitle: 'Plateforme Mondiale de Prévention et de Promotion de la Santé',
      description: 'Un événement d\'envergure internationale dédié à la lutte contre les maladies non transmissibles, l\'amélioration durable du bien-être des populations et l\'atteinte des Objectifs de Développement Durable des Nations Unies.',
      ctaPrimary: 'Découvrir le Programme 2024',
      ctaSecondary: 'Voir la Vidéo de Présentation'
    },
    en: {
      title: 'International Health Fair',
      subtitle: 'Global Platform for Health Prevention and Promotion',
      description: 'A major international event dedicated to fighting non-communicable diseases, sustainably improving population wellbeing, and achieving the United Nations Sustainable Development Goals.',
      ctaPrimary: 'Discover the 2024 Program',
      ctaSecondary: 'Watch the Presentation Video'
    }
  };

  const t = content[language];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-gray-50/[0.02]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-100/30 dark:bg-emerald-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 mb-8">
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {language === 'fr' ? '7e Édition - 2024' : '7th Edition - 2024'}
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-gray-900 dark:text-white">{t.title}</span>
            <span className="block text-emerald-600 dark:text-emerald-400 mt-2">
              {t.subtitle}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              {t.ctaSecondary}
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: language === 'fr' ? 'Pays Participants' : 'Participating Countries' },
              { value: '200+', label: language === 'fr' ? 'Experts Internationaux' : 'International Experts' },
              { value: '10K+', label: language === 'fr' ? 'Participants' : 'Participants' },
              { value: '100+', label: language === 'fr' ? 'Sessions Scientifiques' : 'Scientific Sessions' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}