// app/public/programs/prevention/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Heart, Target, Users, Shield, AlertTriangle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel Prévention (tes images exactes)
const preventionHeroImages = [
  {
    id: 1,
    src: '/images/Prevention/health-screening-community.png',
    alt: { 
      fr: 'Dépistage santé dans un centre communautaire', 
      en: 'Health screening in community center' 
    },
    title: { 
      fr: 'Dépistage Communautaire', 
      en: 'Community Screening' 
    }
  },
  {
    id: 2,
    src: '/images/Prevention/heart-health-education.png',
    alt: { 
      fr: 'Atelier d\'éducation sur la santé cardiaque', 
      en: 'Heart health education workshop' 
    },
    title: { 
      fr: 'Éducation Cardiaque', 
      en: 'Heart Health Education' 
    }
  },
  {
    id: 3,
    src: '/images/Prevention/diabetes-prevention-nutrition.png',
    alt: { 
      fr: 'Atelier de nutrition pour la prévention du diabète', 
      en: 'Diabetes prevention nutrition workshop' 
    },
    title: { 
      fr: 'Prévention Diabète', 
      en: 'Diabetes Prevention' 
    }
  },
  {
    id: 4,
    src: '/images/Prevention/smoking-cessation-campaign.png',
    alt: { 
      fr: 'Campagne de sensibilisation pour l\'arrêt du tabac', 
      en: 'Smoking cessation awareness campaign' 
    },
    title: { 
      fr: 'Arrêt du Tabac', 
      en: 'Smoking Cessation' 
    }
  },
  {
    id: 5,
    src: '/images/Prevention/freepik__the-style-is-candid-image-photography-with-natural__71160.png',
    alt: { 
      fr: 'Activité physique en groupe pour la santé', 
      en: 'Group physical activity for health' 
    },
    title: { 
      fr: 'Activité Physique', 
      en: 'Physical Activity' 
    }
  }
];

// Composant HeroCarousel pour Prévention
function HeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % preventionHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + preventionHeroImages.length) % preventionHeroImages.length);
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
      {/* Overlay léger avec notre vert émeraude */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-800/40 to-emerald-700/20 z-10" />
      
      {/* Overlay supplémentaire pour le bas */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={preventionHeroImages[currentIndex].src}
            alt={preventionHeroImages[currentIndex].alt[language]}
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
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-3"
            >
              <Heart className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {preventionHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {preventionHeroImages.map((_, index) => (
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

export default function PreventionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Prévention des MNT',
      subtitle: 'Socle transversal des actions du S.I.S. pour réduire durablement les facteurs de risque évitables',
      intro: 'Le programme Prévention constitue le fondement de toutes nos actions, ciblant prioritairement les principales maladies non transmissibles.',
      
      focus: [
        'Maladies cardiovasculaires',
        'Diabète',
        'Cancers liés aux modes de vie',
        'Maladies respiratoires chroniques'
      ],
      
      objectives: [
        'Réduire les facteurs de risque évitables',
        'Promouvoir l\'éducation à la santé',
        'Mobiliser les communautés',
        'Adopter des comportements protecteurs'
      ],
      
      approaches: [
        {
          icon: Target,
          title: 'Prévention Primordiale',
          description: 'Intervention avant l\'apparition des facteurs de risque'
        },
        {
          icon: Shield,
          title: 'Prévention Primaire',
          description: 'Réduction des facteurs de risque existants'
        },
        {
          icon: Users,
          title: 'Prévention Populationnelle',
          description: 'Approche collective et communautaire'
        },
        {
          icon: Heart,
          title: 'Prévention Personnalisée',
          description: 'Adaptation aux profils individuels'
        }
      ],
      
      strategies: [
        {
          title: language === 'fr' ? 'Réduction Tabac/Alcool' : 'Tobacco/Alcohol Reduction',
          points: [
            language === 'fr' ? 'Programmes de sevrage' : 'Cessation programs',
            language === 'fr' ? 'Sensibilisation précoce' : 'Early awareness',
            language === 'fr' ? 'Environnements sans tabac' : 'Smoke-free environments'
          ]
        },
        {
          title: language === 'fr' ? 'Alimentation Saine' : 'Healthy Eating',
          points: [
            language === 'fr' ? 'Réduction sel/sucre' : 'Salt/sugar reduction',
            language === 'fr' ? 'Accès aux fruits/légumes' : 'Fruit/vegetable access',
            language === 'fr' ? 'Éducation nutritionnelle' : 'Nutrition education'
          ]
        },
        {
          title: language === 'fr' ? 'Activité Physique' : 'Physical Activity',
          points: [
            language === 'fr' ? 'Environnements actifs' : 'Active environments',
            language === 'fr' ? 'Programmes communautaires' : 'Community programs',
            language === 'fr' ? 'Intégration quotidienne' : 'Daily integration'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'NCD Prevention',
      subtitle: 'Transversal foundation of S.I.S. actions to sustainably reduce avoidable risk factors',
      intro: 'The Prevention program constitutes the foundation of all our actions, primarily targeting main non-communicable diseases.',
      
      focus: [
        'Cardiovascular diseases',
        'Diabetes',
        'Lifestyle-related cancers',
        'Chronic respiratory diseases'
      ],
      
      objectives: [
        'Reduce avoidable risk factors',
        'Promote health education',
        'Mobilize communities',
        'Adopt protective behaviors'
      ],
      
      approaches: [
        {
          icon: Target,
          title: 'Primordial Prevention',
          description: 'Intervention before risk factors appear'
        },
        {
          icon: Shield,
          title: 'Primary Prevention',
          description: 'Reduction of existing risk factors'
        },
        {
          icon: Users,
          title: 'Population Prevention',
          description: 'Collective and community approach'
        },
        {
          icon: Heart,
          title: 'Personalized Prevention',
          description: 'Adaptation to individual profiles'
        }
      ],
      
      strategies: [
        {
          title: 'Tobacco/Alcohol Reduction',
          points: [
            'Cessation programs',
            'Early awareness',
            'Smoke-free environments'
          ]
        },
        {
          title: 'Healthy Eating',
          points: [
            'Salt/sugar reduction',
            'Fruit/vegetable access',
            'Nutrition education'
          ]
        },
        {
          title: 'Physical Activity',
          points: [
            'Active environments',
            'Community programs',
            'Daily integration'
          ]
        }
      ],
      
      message: 'The S.I.S. acts on lifestyles to prevent disease, strengthen well-being and support sustainable development.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec carrousel */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <HeroCarousel language={language} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            {/* Contenu transparent pour voir le carrousel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-10"
            >
              <Link 
                href="/public/programs" 
                className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-6 group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {language === 'fr' ? 'Retour aux programmes' : 'Back to programs'}
              </Link>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-8">
                <Heart className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Programme Fondamental' : 'Fundamental Program'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {t.title}
              </h1>
              
              <p className="text-2xl md:text-3xl text-emerald-300 mb-8 font-semibold leading-snug drop-shadow-xl">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-white/95 mb-10 leading-relaxed drop-shadow-lg">
                {t.intro}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                  <Link href="/public/register" className="flex items-center">
                    {language === 'fr' ? 'S\'engager pour la Prévention' : 'Commit to Prevention'}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105">
                  <Link href="/public/contact">
                    {language === 'fr' ? 'Organiser un Programme' : 'Organize a Program'}
                  </Link>
                </Button>
              </div>
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

      {/* Focus Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Maladies Ciblées' : 'Targeted Diseases'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.focus.map((disease, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group hover:shadow-xl"
                >
                  <AlertTriangle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {disease}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Objectives */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Objectifs Stratégiques' : 'Strategic Objectives'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {t.objectives.map((objective, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group hover:shadow-xl"
                  >
                    <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {objective}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Approaches */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Niveaux de Prévention' : 'Prevention Levels'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.approaches.map((approach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group hover:shadow-xl"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                      <approach.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {approach.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {approach.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategies */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Stratégies d\'Intervention' : 'Intervention Strategies'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.strategies.map((strategy, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {strategy.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {strategy.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Impact de la Prévention' : 'Prevention Impact'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: language === 'fr' ? 'Réduction Mortalité' : 'Mortality Reduction',
                  impact: language === 'fr' ? '30-40%' : '30-40%',
                  description: language === 'fr'
                    ? 'Diminution des décès prématurés par MNT'
                    : 'Reduction in premature NCD deaths'
                },
                {
                  icon: Users,
                  title: language === 'fr' ? 'Qualité de Vie' : 'Quality of Life',
                  impact: language === 'fr' ? '+8 ans' : '+8 years',
                  description: language === 'fr'
                    ? 'Augmentation de l\'espérance de vie en santé'
                    : 'Increase in healthy life expectancy'
                },
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Économies Santé' : 'Health Savings',
                  impact: language === 'fr' ? '1:4' : '1:4',
                  description: language === 'fr'
                    ? 'Retour sur investissement de la prévention'
                    : 'Prevention return on investment'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                    <item.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                    {item.impact}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Heart className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'S\'engager pour la Prévention' : 'Commit to Prevention'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 shadow-lg">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser un Programme' : 'Organize a Program'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}