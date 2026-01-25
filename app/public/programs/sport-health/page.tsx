// app/public/programs/sport-health/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Activity, Heart, Target, Users, Award, ArrowRight, CheckCircle2, TrendingUp, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel Sport & Santé - CORRIGÉ (chemins exacts)
const sportHeroImages = [
  {
    id: 1,
    src: '/images/Sport-health/group-exercise-outdoor-diverse-people.png',
    alt: { 
      fr: 'Groupe diversifié faisant de l\'exercice en plein air', 
      en: 'Diverse group exercising outdoors' 
    },
    title: { 
      fr: 'Activité Collective', 
      en: 'Group Activity' 
    }
  },
  {
    id: 2,
    src: '/images/Sport-health/yoga-class-diverse-participants.png',
    alt: { 
      fr: 'Cours de yoga inclusif pour tous les âges', 
      en: 'Inclusive yoga class for all ages' 
    },
    title: { 
      fr: 'Yoga & Bien-être', 
      en: 'Yoga & Wellness' 
    }
  },
  {
    id: 3,
    src: '/images/Sport-health/senior-citizens-exercising-park.png',
    alt: { 
      fr: 'Personnes âgées actives en plein air', 
      en: 'Active seniors outdoors' 
    },
    title: { 
      fr: 'Sport Senior', 
      en: 'Senior Fitness' 
    }
  },
  {
    id: 4,
    src: '/images/Sport-health/family-cycling-together-park.png',
    alt: { 
      fr: 'Famille faisant du vélo ensemble', 
      en: 'Family cycling together' 
    },
    title: { 
      fr: 'Activité Familiale', 
      en: 'Family Activity' 
    }
  },
  {
    id: 5,
    src: '/images/Sport-health/corporate-wellness-office-exercises.png',
    alt: { 
      fr: 'Exercices de bien-être en entreprise', 
      en: 'Corporate wellness office exercises' 
    },
    title: { 
      fr: 'Sport en Entreprise', 
      en: 'Corporate Wellness' 
    }
  }
];

// Composant HeroCarousel CORRIGÉ
function HeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % sportHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + sportHeroImages.length) % sportHeroImages.length);
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 z-10" />
      
      {/* Overlay supplémentaire pour le bas de l'image */}
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
            src={sportHeroImages[currentIndex].src}
            alt={sportHeroImages[currentIndex].alt[language]}
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
              <Activity className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {sportHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {sportHeroImages.map((_, index) => (
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

export default function SportHealthPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Sport & Santé',
      subtitle: 'Promouvoir l\'activité physique comme pilier fondamental de la prévention et de la qualité de vie',
      intro: 'Le programme Sport & Santé vise à lutter contre la sédentarité et l\'inactivité physique, prévenir les maladies cardiovasculaires, le diabète et l\'obésité, et renforcer la cohésion sociale.',
      
      objectives: [
        'Lutter contre la sédentarité et l\'inactivité physique',
        'Prévenir les maladies cardiovasculaires, le diabète et l\'obésité',
        'Améliorer la condition physique, l\'autonomie et la longévité',
        'Renforcer la cohésion sociale à travers des pratiques collectives'
      ],
      
      approaches: [
        {
          icon: Activity,
          title: 'Activité Adaptée',
          description: 'Programmes individualisés selon les capacités et besoins'
        },
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Accessibilité pour tous les publics et conditions'
        },
        {
          icon: Heart,
          title: 'Prévention',
          description: 'Focus sur la prévention primaire des MNT'
        },
        {
          icon: Target,
          title: 'Durabilité',
          description: 'Ancrage durable dans les modes de vie'
        }
      ],
      
      activities: [
        'Ateliers d\'activité physique adaptée',
        'Conférences sur les bienfaits du sport santé',
        'Démonstrations de pratiques sportives inclusives',
        'Sessions de formation pour professionnels de santé'
      ],
      
      message: 'Le S.I.S. valorise une activité physique adaptée, inclusive et accessible à tous, intégrée au quotidien.'
    },
    en: {
      title: 'Sport & Health',
      subtitle: 'Promoting physical activity as a fundamental pillar of prevention and quality of life',
      intro: 'The Sport & Health program aims to combat physical inactivity and sedentary lifestyles, prevent cardiovascular diseases, diabetes and obesity, and strengthen social cohesion.',
      
      objectives: [
        'Combat physical inactivity and sedentary lifestyles',
        'Prevent cardiovascular diseases, diabetes and obesity',
        'Improve physical fitness, autonomy and longevity',
        'Strengthen social cohesion through collective practices'
      ],
      
      approaches: [
        {
          icon: Activity,
          title: 'Adapted Activity',
          description: 'Personalized programs according to abilities and needs'
        },
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Accessibility for all audiences and conditions'
        },
        {
          icon: Heart,
          title: 'Prevention',
          description: 'Focus on primary NCD prevention'
        },
        {
          icon: Target,
          title: 'Sustainability',
          description: 'Sustainable integration into lifestyles'
        }
      ],
      
      activities: [
        'Adapted physical activity workshops',
        'Conferences on sport health benefits',
        'Inclusive sports practice demonstrations',
        'Training sessions for health professionals'
      ],
      
      message: 'The S.I.S. promotes adapted, inclusive and accessible physical activity, integrated into daily life.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec carrousel - HAUTEUR RÉDUITE */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <HeroCarousel language={language} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            {/* Contenu SANS FOND - transparent pour voir le carrousel */}
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
                <Activity className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Programme Phare' : 'Flagship Program'}
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
                    {language === 'fr' ? 'S\'inscrire aux Ateliers' : 'Register for Workshops'}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105">
                  <Link href="/public/contact">
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
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

      {/* Objectives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Objectifs du Programme' : 'Program Objectives'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
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

            {/* Approach */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
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

            {/* Activities */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {language === 'fr' ? 'Activités Proposées' : 'Proposed Activities'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Bénéfices pour la Santé' : 'Health Benefits'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Santé Cardiovasculaire' : 'Cardiovascular Health',
                  benefits: [
                    language === 'fr' ? 'Réduction de la tension artérielle' : 'Blood pressure reduction',
                    language === 'fr' ? 'Amélioration de la fonction cardiaque' : 'Improved cardiac function',
                    language === 'fr' ? 'Prévention des AVC' : 'Stroke prevention'
                  ]
                },
                {
                  icon: Target,
                  title: language === 'fr' ? 'Métabolisme' : 'Metabolism',
                  benefits: [
                    language === 'fr' ? 'Contrôle de la glycémie' : 'Blood sugar control',
                    language === 'fr' ? 'Prévention du diabète type 2' : 'Type 2 diabetes prevention',
                    language === 'fr' ? 'Gestion du poids' : 'Weight management'
                  ]
                },
                {
                  icon: Award,
                  title: language === 'fr' ? 'Bien-être Mental' : 'Mental Well-being',
                  benefits: [
                    language === 'fr' ? 'Réduction du stress et de l\'anxiété' : 'Stress and anxiety reduction',
                    language === 'fr' ? 'Amélioration de l\'humeur' : 'Mood improvement',
                    language === 'fr' ? 'Meilleure qualité de sommeil' : 'Better sleep quality'
                  ]
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <category.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
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
            <Activity className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer au Programme' : 'Join the Program'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 shadow-lg">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser une Session' : 'Organize a Session'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}