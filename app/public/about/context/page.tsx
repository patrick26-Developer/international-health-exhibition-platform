// app/public/about/context/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { FileText, AlertTriangle, Target, TrendingUp, Users, Globe, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pause, Play, BarChart3, Scale, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel Contexte
const contextHeroImages = [
  {
    id: 1,
    src: '/images/contexte/multisectoral-health-collaboration-meeting.png',
    alt: { 
      fr: 'Collaboration multisectorielle pour la santé', 
      en: 'Multisectoral health collaboration meeting' 
    },
    title: { 
      fr: 'Collaboration Multi-Acteurs', 
      en: 'Multi-Stakeholder Collaboration' 
    }
  },
  {
    id: 2,
    src: '/images/contexte/community-health-empowerment-workshop.png',
    alt: { 
      fr: 'Atelier d\'autonomisation pour la santé communautaire', 
      en: 'Community health empowerment workshop' 
    },
    title: { 
      fr: 'Autonomisation Communautaire', 
      en: 'Community Empowerment' 
    }
  },
  {
    id: 3,
    src: '/images/contexte/freepik__editorial-fashion-photography-meets-sweeping-natur__17793.png',
    alt: { 
      fr: 'Discussion stratégique sur la prévention santé', 
      en: 'Strategic discussion on health prevention' 
    },
    title: { 
      fr: 'Stratégie de Prévention', 
      en: 'Prevention Strategy' 
    }
  }
];

// Composant HeroCarousel pour la page Contexte
function ContextHeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % contextHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + contextHeroImages.length) % contextHeroImages.length);
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
            src={contextHeroImages[currentIndex].src}
            alt={contextHeroImages[currentIndex].alt[language]}
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
              <FileText className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {contextHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {contextHeroImages.map((_, index) => (
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

export default function ContextPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Contexte & Objectifs',
      subtitle: 'Face à la montée des maladies non transmissibles, le S.I.S. agit pour transformer la prévention en priorité stratégique',
      intro: 'Les systèmes de santé font face à une transition épidémiologique majeure, marquée par la progression rapide des maladies non transmissibles.',
      
      context: {
        title: 'Contexte Épidémiologique',
        points: [
          'Première cause de mortalité mondiale (70%+ des décès)',
          'Décès prématurés largement évitables',
          'Fardeau économique croissant pour États et entreprises',
          'Facteurs de risque largement évitables'
        ]
      },
      
      challenge: {
        title: 'Problématique des MNT',
        description: 'Malgré les constats, les réponses restent majoritairement curatives, coûteuses et insuffisantes, tandis que la prévention demeure sous-exploitée.',
        issues: [
          'Manque d\'outils accessibles de sensibilisation',
          'Mobilisation multisectorielle limitée',
          'Approches individuelles plutôt que systémiques',
          'Investissements insuffisants en prévention'
        ]
      },
      
      objectives: [
        {
          icon: Target,
          title: 'Objectifs Sanitaires',
          items: [
            'Réduire les facteurs de risque des MNT',
            'Promouvoir l\'activité physique et nutrition',
            'Renforcer la prévention primaire'
          ],
          image: '/images/contexte/freepik__editorial-fashion-photography-meets-sweeping-natur__17793.png',
          imageAlt: 'Discussion stratégique sur la prévention santé'
        },
        {
          icon: Users,
          title: 'Objectifs Sociaux',
          items: [
            'Sensibiliser et responsabiliser les populations',
            'Favoriser l\'adoption de modes de vie sains',
            'Réduire les inégalités de santé'
          ],
          image: '/images/contexte/community-health-empowerment-workshop.png',
          imageAlt: 'Atelier d\'autonomisation pour la santé communautaire'
        },
        {
          icon: TrendingUp,
          title: 'Objectifs Économiques',
          items: [
            'Présenter la prévention comme investissement',
            'Réduire les coûts des maladies évitables',
            'Engager les entreprises dans des démarches RSE'
          ],
          image: '/images/contexte/multisectoral-health-collaboration-meeting.png',
          imageAlt: 'Collaboration multisectorielle pour la santé'
        }
      ],
      
      keyFigures: [
        {
          icon: BarChart3,
          value: '70%+',
          label: language === 'fr' ? 'Décès liés aux MNT' : 'NCD-related deaths',
          description: language === 'fr' ? 'Première cause de mortalité mondiale' : 'Leading global cause of death'
        },
        {
          icon: Scale,
          value: '80%',
          label: language === 'fr' ? 'Facteurs évitables' : 'Preventable factors',
          description: language === 'fr' ? 'Réduction possible par la prévention' : 'Reducible through prevention'
        },
        {
          icon: Lightbulb,
          value: '5:1',
          label: language === 'fr' ? 'Retour sur investissement' : 'Return on investment',
          description: language === 'fr' ? 'Rentabilité de la prévention' : 'Prevention cost-effectiveness'
        }
      ],
      
      message: 'Le S.I.S. agit pour que la prévention ne soit plus une option, mais une priorité stratégique au service du développement durable.'
    },
    en: {
      title: 'Context & Objectives',
      subtitle: 'Facing the rise of non-communicable diseases, S.I.S. acts to transform prevention into a strategic priority',
      intro: 'Health systems are facing a major epidemiological transition, marked by the rapid increase of non-communicable diseases.',
      
      context: {
        title: 'Epidemiological Context',
        points: [
          'Leading cause of global mortality (70%+ of deaths)',
          'Largely preventable premature deaths',
          'Growing economic burden for states and companies',
          'Largely preventable risk factors'
        ]
      },
      
      challenge: {
        title: 'NCD Challenge',
        description: 'Despite evidence, responses remain largely curative, costly and insufficient, while prevention remains underutilized.',
        issues: [
          'Lack of accessible awareness tools',
          'Limited multisectoral mobilization',
          'Individual rather than systemic approaches',
          'Insufficient prevention investments'
        ]
      },
      
      objectives: [
        {
          icon: Target,
          title: 'Health Objectives',
          items: [
            'Reduce NCD risk factors',
            'Promote physical activity and nutrition',
            'Strengthen primary prevention'
          ],
          image: '/images/contexte/freepik__editorial-fashion-photography-meets-sweeping-natur__17793.png',
          imageAlt: 'Strategic discussion on health prevention'
        },
        {
          icon: Users,
          title: 'Social Objectives',
          items: [
            'Raise awareness and empower populations',
            'Encourage adoption of healthy lifestyles',
            'Reduce health inequalities'
          ],
          image: '/images/contexte/community-health-empowerment-workshop.png',
          imageAlt: 'Community health empowerment workshop'
        },
        {
          icon: TrendingUp,
          title: 'Economic Objectives',
          items: [
            'Present prevention as investment',
            'Reduce costs of preventable diseases',
            'Engage companies in CSR initiatives'
          ],
          image: '/images/contexte/multisectoral-health-collaboration-meeting.png',
          imageAlt: 'Multisectoral health collaboration meeting'
        }
      ],
      
      keyFigures: [
        {
          icon: BarChart3,
          value: '70%+',
          label: 'NCD-related deaths',
          description: 'Leading global cause of death'
        },
        {
          icon: Scale,
          value: '80%',
          label: 'Preventable factors',
          description: 'Reducible through prevention'
        },
        {
          icon: Lightbulb,
          value: '5:1',
          label: 'Return on investment',
          description: 'Prevention cost-effectiveness'
        }
      ],
      
      message: 'The S.I.S. acts so that prevention is no longer an option, but a strategic priority serving sustainable development.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec carrousel */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <ContextHeroCarousel language={language} />
        
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
                <FileText className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Analyse Stratégique' : 'Strategic Analysis'}
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

      {/* Section Chiffres Clés */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Chiffres Marquants' : 'Key Figures'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Des données qui illustrent l\'urgence d\'agir et le potentiel de la prévention'
                  : 'Data illustrating the urgency to act and the potential of prevention'
                }
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {t.keyFigures.map((figure, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <figure.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {figure.value}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {figure.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                      {figure.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Context et Challenge */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Context Épidémiologique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.context.title}
                </h2>
                <div className="space-y-4">
                  {t.context.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-base">{point}</span>
                    </div>
                  ))}
                </div>
                
                {/* Image infographie */}
                <div className="mt-8 rounded-xl overflow-hidden">
                  <div className="relative h-48 md:h-56 w-full">
                    <Image
                      src="/images/contexte/burden-from-non-communicable-diseases-by-sub-category-967x1024.jpg"
                      alt={language === 'fr' ? 'Infographie sur les MNT' : 'NCD infographic'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.challenge.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {t.challenge.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {t.challenge.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{issue}</span>
                    </div>
                  ))}
                </div>
                
                {/* Image "Prévention mieux que guérison" */}
                <div className="mt-8 rounded-xl overflow-hidden">
                  <div className="relative h-48 md:h-56 w-full">
                    <Image
                      src="/images/contexte/Prevention_is_Better_Than_Cure_Essay.avif"
                      alt={language === 'fr' ? 'Prévention mieux que guérison' : 'Prevention is better than cure'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white text-sm font-semibold drop-shadow-lg">
                        {language === 'fr' ? 'Prévention > Traitement' : 'Prevention > Treatment'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives avec images */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Objectifs Stratégiques' : 'Strategic Objectives'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Une approche multidimensionnelle pour transformer la prévention en levier de développement'
                  : 'A multidimensional approach to transform prevention into a development lever'
                }
              </p>
            </motion.div>
            
            <div className="space-y-8 md:space-y-12">
              {t.objectives.map((objective, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 md:gap-8 items-center`}
                >
                  {/* Image */}
                  <div className="lg:w-2/5 w-full">
                    <div className="relative rounded-2xl overflow-hidden group">
                      <div className="relative h-64 md:h-72 w-full">
                        <Image
                          src={objective.image}
                          alt={objective.imageAlt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="lg:w-3/5 w-full">
                    <div className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <objective.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {objective.title}
                        </h3>
                      </div>
                      
                      <ul className="space-y-3 md:space-y-4">
                        {objective.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Globe className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-6 md:mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              {t.message}
            </p>
            <p className="text-lg md:text-xl opacity-90 mb-10">
              {language === 'fr'
                ? 'Une approche inclusive, multisectorielle et orientée impact pour la santé durable.'
                : 'An inclusive, multisectoral and impact-oriented approach for sustainable health.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Rejoignez Notre Mission' : 'Join Our Mission'}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 md:mb-10 px-4">
              {language === 'fr'
                ? 'Contribuez à transformer le système de santé par la prévention.'
                : 'Help transform the health system through prevention.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/public/programs" className="flex items-center">
                  {language === 'fr' ? 'Découvrir les Programmes' : 'Discover Programs'}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
              >
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}