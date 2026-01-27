// app/public/sdg/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Award, Globe, Target, Users, Heart, Shield, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel SDG
const sdgHeroImages = [
  {
    id: 1,
    src: '/images/sdg/sdg-3-good-health-and-wellbeing.png',
    alt: { 
      fr: 'Objectif de Développement Durable 3 - Bonne santé et bien-être', 
      en: 'Sustainable Development Goal 3 - Good Health and Well-being' 
    },
    title: { 
      fr: 'ODD 3', 
      en: 'SDG 3' 
    }
  },
  {
    id: 2,
    src: '/images/sdg/sdg-global-health-alignment.png',
    alt: { 
      fr: 'Alignement global sur les objectifs de santé', 
      en: 'Global health goals alignment' 
    },
    title: { 
      fr: 'Alignement Mondial', 
      en: 'Global Alignment' 
    }
  },
  {
    id: 3,
    src: '/images/sdg/commitment-to-sustainable-health.png',
    alt: { 
      fr: 'Engagement pour la santé durable', 
      en: 'Commitment to sustainable health' 
    },
    title: { 
      fr: 'Santé Durable', 
      en: 'Sustainable Health' 
    }
  },
  {
    id: 4,
    src: '/images/sdg/strategic-health-partnerships.png',
    alt: { 
      fr: 'Partenariats stratégiques pour la santé', 
      en: 'Strategic health partnerships' 
    },
    title: { 
      fr: 'Partenariats', 
      en: 'Partnerships' 
    }
  }
];

// Composant HeroCarousel pour la page SDG
function SDGHeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % sdgHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + sdgHeroImages.length) % sdgHeroImages.length);
    resetTimer();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      resetTimer();
    }
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 z-10" />
      
      {/* Overlay supplémentaire pour le bas de l'image */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={sdgHeroImages[currentIndex].src}
            alt={sdgHeroImages[currentIndex].alt[language]}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            quality={90}
            sizes="100vw"
          />
          
          {/* Titre superposé subtil */}
          <div className="absolute bottom-32 left-10 z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-3"
            >
              <Award className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {sdgHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {sdgHeroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Bouton play/pause */}
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
      
      {/* Navigation manuelle */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

export default function SDGPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'ODD & OMS',
      subtitle: 'Alignement stratégique avec les Objectifs de Développement Durable et l\'Organisation Mondiale de la Santé',
      intro: 'Le Salon International de la Santé (S.I.S.) s\'inscrit pleinement dans les cadres internationaux de référence définis par l\'OMS et l\'Agenda 2030 des Nations Unies.',
      
      sections: [
        {
          icon: Target,
          title: 'ODD 3 - Bonne santé et bien-être',
          content: 'Notre contribution directe à la réduction de la mortalité prématurée liée aux maladies non transmissibles, la promotion de la santé mentale et le renforcement de la prévention.',
          points: [
            'Réduction des facteurs de risque des MNT',
            'Promotion de modes de vie sains',
            'Renforcement de l\'éducation à la santé'
          ],
          image: '/images/sdg/sdg-3-good-health-and-wellbeing.png',
          imageAlt: 'Objectif de Développement Durable 3 - Bonne santé et bien-être'
        },
        {
          icon: Globe,
          title: 'Alignement OMS',
          content: 'Conformité avec les principes fondateurs de la promotion de la santé portés par l\'Organisation Mondiale de la Santé.',
          points: [
            'Prévention primaire des maladies',
            'Approche multisectorielle',
            'Création d\'environnements favorables'
          ],
          image: '/images/sdg/who-health-promotion-framework.png',
          imageAlt: 'Cadre de promotion de la santé de l\'OMS'
        }
      ],
      
      contributions: [
        {
          number: '3',
          title: 'Bonne santé et bien-être',
          description: 'Contributions directes aux cibles de réduction des MNT',
          color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
        },
        {
          number: '4',
          title: 'Éducation de qualité',
          description: 'Programmes d\'éducation à la santé et formations',
          color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        },
        {
          number: '8',
          title: 'Travail décent',
          description: 'Promotion de la santé au travail et bien-être',
          color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
        },
        {
          number: '17',
          title: 'Partenariats',
          description: 'Coopération multi-acteurs pour la santé',
          color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
        }
      ],
      
      framework: [
        {
          icon: Users,
          title: 'Outil Opérationnel',
          description: 'Mise en œuvre des politiques de santé',
          image: '/images/sdg/strategic-health-partnerships.png'
        },
        {
          icon: Heart,
          title: 'Plateforme de Coopération',
          description: 'Dialogue multisectoriel et international',
          image: '/images/sdg/sdg-multi-goals-contribution.png'
        },
        {
          icon: Target,
          title: 'Levier d\'Impact',
          description: 'Impact sanitaire, social et économique durable',
          image: '/images/sdg/commitment-to-sustainable-health.png'
        }
      ],
      
      message: 'Le S.I.S. traduit les chartes, résolutions et objectifs internationaux en actions concrètes au service de la prévention et du bien-être des populations.'
    },
    en: {
      title: 'SDGs & WHO',
      subtitle: 'Strategic alignment with Sustainable Development Goals and World Health Organization',
      intro: 'The International Health Fair (S.I.S.) is fully aligned with international public health frameworks established by WHO and the United Nations 2030 Agenda.',
      
      sections: [
        {
          icon: Target,
          title: 'SDG 3 - Good Health and Well-being',
          content: 'Our direct contribution to reducing premature mortality from non-communicable diseases, promoting mental health, and strengthening prevention.',
          points: [
            'Reduction of NCD risk factors',
            'Promotion of healthy lifestyles',
            'Strengthening health education'
          ],
          image: '/images/sdg/sdg-3-good-health-and-wellbeing.png',
          imageAlt: 'Sustainable Development Goal 3 - Good Health and Well-being'
        },
        {
          icon: Globe,
          title: 'WHO Alignment',
          content: 'Compliance with the foundational principles of health promotion promoted by the World Health Organization.',
          points: [
            'Primary disease prevention',
            'Multisectoral approach',
            'Creating supportive environments'
          ],
          image: '/images/sdg/who-health-promotion-framework.png',
          imageAlt: 'WHO health promotion framework'
        }
      ],
      
      contributions: [
        {
          number: '3',
          title: 'Good Health and Well-being',
          description: 'Direct contributions to NCD reduction targets',
          color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
        },
        {
          number: '4',
          title: 'Quality Education',
          description: 'Health education programs and training',
          color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        },
        {
          number: '8',
          title: 'Decent Work',
          description: 'Promotion of workplace health and wellbeing',
          color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
        },
        {
          number: '17',
          title: 'Partnerships',
          description: 'Multi-stakeholder cooperation for health',
          color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
        }
      ],
      
      framework: [
        {
          icon: Users,
          title: 'Operational Tool',
          description: 'Implementation of health policies',
          image: '/images/sdg/strategic-health-partnerships.png'
        },
        {
          icon: Heart,
          title: 'Cooperation Platform',
          description: 'Multisectoral and international dialogue',
          image: '/images/sdg/sdg-multi-goals-contribution.png'
        },
        {
          icon: Target,
          title: 'Impact Lever',
          description: 'Sustainable health, social and economic impact',
          image: '/images/sdg/commitment-to-sustainable-health.png'
        }
      ],
      
      message: 'The S.I.S. translates international charters, resolutions, and global goals into concrete actions serving prevention and population well-being.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec carrousel */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <SDGHeroCarousel language={language} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-10"
            >
              <Link 
                href="/public" 
                className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-6 group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </Link>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-8">
                <Award className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Alignement International' : 'International Alignment'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {t.title}
              </h1>
              
              <p className="text-2xl md:text-3xl text-emerald-300 mb-8 font-semibold leading-snug drop-shadow-xl">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-white/95 leading-relaxed drop-shadow-lg">
                {t.intro}
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Défilement indicatif */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 z-20 hidden lg:block"
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Sections principales */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
              {t.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden group mb-6">
                    <div className="relative h-64 w-full">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <section.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      {section.content}
                    </p>
                    
                    <ul className="space-y-3">
                      {section.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ODD Contributions */}
            <div className="mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Contributions aux ODD' : 'SDG Contributions'}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  {language === 'fr' 
                    ? 'Notre action contribue directement à plusieurs Objectifs de Développement Durable'
                    : 'Our action directly contributes to several Sustainable Development Goals'
                  }
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {t.contributions.map((odd, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${odd.color} text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                          {odd.number}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {odd.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {odd.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cadre stratégique avec images */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 md:mb-12"
              >
                <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Cadre Stratégique' : 'Strategic Framework'}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  {t.message}
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {t.framework.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    {/* Image miniature */}
                    <div className="relative rounded-xl overflow-hidden group mb-4">
                      <div className="relative h-40 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    
                    <div className="inline-flex p-3 rounded-full bg-white dark:bg-gray-800 mb-4">
                      <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Globe className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              {language === 'fr' 
                ? 'Engagez-vous pour la Santé Durable' 
                : 'Commit to Sustainable Health'}
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 opacity-90 px-4">
              {language === 'fr'
                ? 'Rejoignez notre initiative alignée sur les priorités mondiales de santé publique.'
                : 'Join our initiative aligned with global public health priorities.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-emerald-700 hover:bg-white/90 text-sm md:text-base"
              >
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 text-sm md:text-base"
              >
                <Link href="/public/programs" className="flex items-center">
                  {language === 'fr' ? 'Voir les Programmes' : 'View Programs'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}