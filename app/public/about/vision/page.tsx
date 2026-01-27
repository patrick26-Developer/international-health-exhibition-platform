'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Target, Globe, Heart, Users, ArrowRight, Shield, Award, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel Vision
const visionHeroImages = [
  {
    id: 1,
    src: '/images/vision/global-health-partnership-network (2).png',
    alt: { 
      fr: 'Réseau de partenariats pour la santé mondiale', 
      en: 'Global health partnership network' 
    },
    title: { 
      fr: 'Partenariats Mondiaux', 
      en: 'Global Partnerships' 
    }
  },
  {
    id: 2,
    src: '/images/vision/freepik__the-style-is-candid-image-photography-with-natural__80838.png',
    alt: { 
      fr: 'Personnes diverses engagées dans la santé communautaire', 
      en: 'Diverse people engaged in community health' 
    },
    title: { 
      fr: 'Engagement Communautaire', 
      en: 'Community Engagement' 
    }
  },
  {
    id: 3,
    src: '/images/vision/health-prevention-pyramid-infographic.png',
    alt: { 
      fr: 'Infographie de la pyramide de prévention santé', 
      en: 'Health prevention pyramid infographic' 
    },
    title: { 
      fr: 'Prévention Stratégique', 
      en: 'Strategic Prevention' 
    }
  },
  {
    id: 4,
    src: '/images/vision/inclusive-health-system-illustration.png',
    alt: { 
      fr: 'Illustration d\'un système de santé inclusif', 
      en: 'Inclusive health system illustration' 
    },
    title: { 
      fr: 'Système Inclusif', 
      en: 'Inclusive System' 
    }
  }
];

// Composant HeroCarousel pour la page Vision
function VisionHeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % visionHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + visionHeroImages.length) % visionHeroImages.length);
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
            src={visionHeroImages[currentIndex].src}
            alt={visionHeroImages[currentIndex].alt[language]}
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
              <Target className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {visionHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {visionHeroImages.map((_, index) => (
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

export default function VisionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Vision du S.I.S.',
      subtitle: 'Faire de la prévention et de la promotion de la santé un investissement stratégique durable',
      sections: [
        {
          title: 'Notre Ambition',
          content: 'Le Salon International de la Santé (S.I.S.) porte la vision d\'un monde où la santé n\'est plus seulement traitée lorsqu\'elle est menacée, mais préservée, renforcée et valorisée tout au long de la vie. Nous œuvrons pour des sociétés dans lesquelles les individus sont acteurs de leur santé, les communautés disposent de solutions accessibles et adaptées, et les institutions intègrent la prévention au cœur de leurs stratégies.',
          image: '/images/vision/freepik__the-style-is-candid-image-photography-with-natural__80838.png',
          imageAlt: 'Personnes diverses engagées dans la santé communautaire'
        },
        {
          title: 'Approche Stratégique',
          content: 'À travers une approche inclusive, multisectorielle et orientée impact, le S.I.S. contribue à la réduction durable des maladies non transmissibles et à l\'amélioration du bien-être des populations, en cohérence avec les priorités internationales de santé publique et les Objectifs de Développement Durable.',
          image: '/images/vision/health-prevention-pyramid-infographic.png',
          imageAlt: 'Infographie de la pyramide de prévention santé'
        },
        {
          title: 'Impact Durable',
          content: 'Notre action vise à transformer la prévention en priorité stratégique et collective, créant un impact mesurable sur la santé publique, le développement social et la performance économique.',
          image: '/images/vision/sustainable-development-goals-health.jpg',
          imageAlt: 'Objectifs de Développement Durable pour la santé'
        }
      ],
      pillars: [
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Engager tous les acteurs : citoyens, institutions, entreprises, ONG',
        },
        {
          icon: Globe,
          title: 'International',
          description: 'Vision globale, actions locales adaptées aux contextes',
        },
        {
          icon: Heart,
          title: 'Prévention',
          description: 'Agir en amont pour préserver la santé et le bien-être',
        },
        {
          icon: Shield,
          title: 'Durabilité',
          description: 'Impact mesurable et pérenne sur le long terme',
        }
      ]
    },
    en: {
      title: 'S.I.S. Vision',
      subtitle: 'To make health prevention and promotion a strategic and sustainable investment',
      sections: [
        {
          title: 'Our Ambition',
          content: 'The International Health Fair (S.I.S.) promotes a vision in which health is no longer addressed only through curative responses, but preserved, strengthened, and valued throughout the life course. We advocate for societies where individuals are active agents of their own health, communities have access to inclusive solutions, and institutions integrate prevention at the core of their strategies.',
          image: '/images/vision/freepik__the-style-is-candid-image-photography-with-natural__80838.png',
          imageAlt: 'Diverse people engaged in community health'
        },
        {
          title: 'Strategic Approach',
          content: 'Through an inclusive, multisectoral, and impact-driven approach, the S.I.S. contributes to the sustainable reduction of non-communicable diseases and to the long-term improvement of population well-being, in line with international public health priorities and the Sustainable Development Goals.',
          image: '/images/vision/health-prevention-pyramid-infographic.png',
          imageAlt: 'Health prevention pyramid infographic'
        },
        {
          title: 'Sustainable Impact',
          content: 'Our action aims to transform prevention into a strategic and collective priority, creating measurable impact on public health, social development, and economic performance.',
          image: '/images/vision/sustainable-development-goals-health.jpg',
          imageAlt: 'Sustainable Development Goals for health'
        }
      ],
      pillars: [
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Engage all stakeholders: citizens, institutions, companies, NGOs',
        },
        {
          icon: Globe,
          title: 'International',
          description: 'Global vision, locally adapted actions',
        },
        {
          icon: Heart,
          title: 'Prevention',
          description: 'Act upstream to preserve health and wellbeing',
        },
        {
          icon: Shield,
          title: 'Sustainability',
          description: 'Measurable and lasting long-term impact',
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec carrousel - RESTAURÉ */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <VisionHeroCarousel language={language} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-10"
            >
              <Link 
                href="/public/about" 
                className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-6 group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {language === 'fr' ? 'Retour au S.I.S.' : 'Back to S.I.S.'}
              </Link>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-8">
                <Target className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Vision Institutionnelle' : 'Institutional Vision'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {t.title}
              </h1>
              
              <p className="text-2xl md:text-3xl text-emerald-300 mb-8 font-semibold leading-snug drop-shadow-xl">
                {t.subtitle}
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

      {/* Content avec images - MODIFIÉ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-20">
              {t.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center`}
                >
                  {/* Image avec effet de zoom */}
                  <div className="lg:w-1/2 w-full">
                    <div className="relative rounded-2xl overflow-hidden hover:border-2 hover:border-emerald-500 transition-all duration-300">
                      <div className="relative h-64 md:h-80 lg:h-96">
                        <Image
                          src={section.image}
                          alt={section.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white/30">
                          <span className="text-white text-xs md:text-sm font-medium">
                            {language === 'fr' ? 'Notre Vision' : 'Our Vision'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:hidden">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                          {section.title}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="lg:w-1/2 w-full">
                    <div className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-2 hover:border-emerald-500 transition-all duration-300">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                        {section.title}
                      </h2>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pillars avec design simplifié - MODIFIÉ */}
            <div className="mt-20 md:mt-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-16"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                  {language === 'fr' ? 'Piliers Fondateurs' : 'Founding Pillars'}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                  {language === 'fr' 
                    ? 'Les quatre principes fondamentaux qui guident notre action et notre impact'
                    : 'The four fundamental principles that guide our action and impact'
                  }
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {t.pillars.map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-full p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-2 hover:border-emerald-500 transition-all duration-300">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 md:mb-6 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <pillar.icon className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                          {pillar.title}
                        </h4>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image réseaux mondiaux - MODIFIÉ */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 md:mt-20 rounded-2xl overflow-hidden hover:border-2 hover:border-emerald-500 transition-all duration-300"
            >
              <div className="relative h-48 md:h-64 lg:h-80 w-full">
                <Image
                  src="/images/vision/global-health-partnership-network (2).png"
                  alt={language === 'fr' ? 'Réseau mondial de partenariats santé' : 'Global health partnership network'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={false}
                />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <p className="text-white text-base md:text-lg lg:text-xl font-bold">
                    {language === 'fr'
                      ? 'Un réseau mondial dédié à la santé durable'
                      : 'A global network dedicated to sustainable health'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - MODIFIÉ */}
      <section className="py-12 md:py-20 bg-emerald-600 dark:bg-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              {language === 'fr' 
                ? 'Rejoignez Notre Vision' 
                : 'Join Our Vision'}
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 opacity-90 px-4">
              {language === 'fr'
                ? 'Contribuez à transformer la prévention en priorité stratégique pour la santé durable.'
                : 'Help transform prevention into a strategic priority for sustainable health.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-emerald-700 hover:bg-white/90 hover:border-2 hover:border-emerald-500 transition-all text-sm md:text-base"
              >
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              
              {/* Bouton corrigé pour le light mode */}
              <Button 
                size="lg" 
                variant="outline" 
                className="dark:text-white text-emerald-700 dark:border-white border-emerald-600 hover:border-2 hover:border-emerald-500 hover:dark:border-emerald-300 hover:text-emerald-700 hover:dark:text-emerald-300 transition-all text-sm md:text-base"
              >
                <Link href="/public/programs" className="flex items-center">
                  {language === 'fr' ? 'Découvrir les Programmes' : 'Discover Programs'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}