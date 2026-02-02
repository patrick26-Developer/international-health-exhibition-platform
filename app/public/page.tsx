// app/public/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { ArrowRight, PlayCircle, Target, Globe, TrendingUp, Users, Award, Heart, Shield, Calendar, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel de la page d'accueil
const homeHeroImages = [
  {
    id: 1,
    src: '/images/accueil/Image-page-de-garde-du-SIS.png',
    alt: { 
      fr: 'Bannière du Salon International de la Santé', 
      en: 'International Health Fair banner' 
    },
    title: { 
      fr: 'Plateforme Mondiale', 
      en: 'Global Platform' 
    }
  },
  {
    id: 2,
    src: '/images/accueil/Conférence-de-santé-au-SIS.png',
    alt: { 
      fr: 'Conférence santé mondiale avec public diversifié', 
      en: 'Global health conference with diverse audience' 
    },
    title: { 
      fr: 'Engagement Collectif', 
      en: 'Collective Engagement' 
    }
  },
  {
    id: 3,
    src: '/images/accueil/Professionnels-de-santé-au-SIS.png',
    alt: { 
      fr: 'Professionnels de santé en réunion internationale', 
      en: 'Healthcare professionals in international meeting' 
    },
    title: { 
      fr: 'Expertise Internationale', 
      en: 'International Expertise' 
    }
  },
  {
    id: 4,
    src: '/images/accueil/health-prevention-promotion-event.png',
    alt: { 
      fr: 'Événement de prévention et promotion de la santé', 
      en: 'Health prevention and promotion event' 
    },
    title: { 
      fr: 'Prévention Active', 
      en: 'Active Prevention' 
    }
  },
  {
    id: 5,
    src: '/images/accueil/world-health-organization-meeting.png',
    alt: { 
      fr: 'Réunion de l\'Organisation Mondiale de la Santé', 
      en: 'World Health Organization meeting' 
    },
    title: { 
      fr: 'Partenariats Stratégiques', 
      en: 'Strategic Partnerships' 
    }
  }
];

// Composant HeroCarousel pour la page d'accueil
function HomeHeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % homeHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + homeHeroImages.length) % homeHeroImages.length);
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
            src={homeHeroImages[currentIndex].src}
            alt={homeHeroImages[currentIndex].alt[language]}
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
              <Globe className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {homeHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {homeHeroImages.map((_, index) => (
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

// Nouveau composant pour les cards de programmes avec carrousel
function ProgramCard({ 
  program, 
  index, 
  language 
}: { 
  program: {
    title: string;
    description: string;
    link: string;
    images: string[];
  };
  index: number;
  language: 'fr' | 'en';
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % program.images.length);
  };

  useEffect(() => {
    if (program.images.length > 1) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentImageIndex, program.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Carrousel d'images en arrière-plan */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={program.images[currentImageIndex]}
                alt={program.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        {/* Contenu */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
          <div className="mb-4">
            <div className="inline-block p-3 rounded-xl bg-emerald-500/30 backdrop-blur-sm mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
            {program.title}
          </h3>
          
          <p className="text-white/90 mb-6 drop-shadow-md line-clamp-2">
            {program.description}
          </p>
          
          <Link 
            href={program.link}
            className="inline-flex items-center text-emerald-300 hover:text-emerald-200 font-medium text-sm group-hover:translate-x-1 transition-all"
          >
            {language === 'fr' ? 'En savoir plus' : 'Learn more'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PublicHome() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      hero: {
        title: 'Salon International de la Santé',
        subtitle: 'Plateforme Mondiale de Prévention et de Promotion de la Santé',
        description: 'Transformer la prévention en investissement stratégique durable pour le développement humain, social et économique.',
        ctaPrimary: 'Découvrir la Vision',
        ctaSecondary: 'Voir les Programmes'
      },
      vision: {
        title: 'Notre Vision',
        text: 'Faire de la prévention et de la promotion de la santé un investissement stratégique durable pour le développement humain, social et économique.',
        points: [
          'Des individus acteurs de leur santé',
          'Des communautés disposant de solutions accessibles',
          'Des institutions intégrant la prévention'
        ]
      },
      stats: [
        { value: '70%', label: 'Décès liés aux MNT', icon: Heart },
        { value: '100+', label: 'Pays concernés', icon: Globe },
        { value: 'ODD 3', label: 'Alignement prioritaire', icon: Target },
        { value: '2024', label: 'Édition active', icon: Calendar }
      ],
      message: 'Prévenir aujourd\'hui, c\'est protéger la santé et le développement de demain.',
      programs: {
        title: 'Nos Programmes',
        subtitle: 'Des solutions intégrées pour agir sur les principaux déterminants des maladies non transmissibles'
      }
    },
    en: {
      hero: {
        title: 'International Health Fair',
        subtitle: 'Global Platform for Health Prevention and Promotion',
        description: 'Transforming prevention into a strategic sustainable investment for human, social, and economic development.',
        ctaPrimary: 'Discover the Vision',
        ctaSecondary: 'View Programs'
      },
      vision: {
        title: 'Our Vision',
        text: 'To make health prevention and promotion a strategic and sustainable investment for human, social, and economic development.',
        points: [
          'Individuals as active agents of their health',
          'Communities with accessible solutions',
          'Institutions integrating prevention'
        ]
      },
      stats: [
        { value: '70%', label: 'NCD-related deaths', icon: Heart },
        { value: '100+', label: 'Countries affected', icon: Globe },
        { value: 'SDG 3', label: 'Priority alignment', icon: Target },
        { value: '2024', label: 'Active edition', icon: Calendar }
      ],
      message: 'Prevention today means health, resilience, and development tomorrow.',
      programs: {
        title: 'Our Programs',
        subtitle: 'Integrated solutions to address the main determinants of non-communicable diseases'
      }
    }
  };

  const t = content[language];

  // Données des programmes avec images
  const programs = [
    {
      title: language === 'fr' ? 'Sport & Santé' : 'Sport & Health',
      description: language === 'fr' 
        ? 'Activité physique comme pilier fondamental de la prévention' 
        : 'Physical activity as a fundamental pillar of prevention',
      link: '/public/programs/sport-health',
      images: [
        '/images/Sport-health/group-exercise-outdoor-diverse-people.png',
        '/images/Sport-health/yoga-class-diverse-participants.png',
        '/images/Sport-health/morning-run-sunrise-nature.png',
        '/images/Sport-health/family-cycling-together-park.png'
      ]
    },
    {
      title: language === 'fr' ? 'Nutrition' : 'Nutrition',
      description: language === 'fr' 
        ? 'Éducation nutritionnelle et habitudes alimentaires favorables' 
        : 'Nutrition education and healthy eating habits',
      link: '/public/programs/nutrition',
      images: [
        '/images/Alimentation/legumes-de-fruits-et-de-cereales.jpg',
        '/images/Alimentation/img_04_idem.jpg'
      ]
    },
    {
      title: language === 'fr' ? 'Bien-être' : 'Well-being',
      description: language === 'fr' 
        ? 'Santé mentale et équilibre psychologique' 
        : 'Mental health and psychological balance',
      link: '/public/programs/wellbeing',
      images: [
        '/images/Bien-être/yoga-class-community-wellness-center.png',
        '/images/Bien-être/mindfulness-meditation-peaceful-person.png',
        '/images/Bien-être/group-therapy-support-circle-diverse-people.png',
        '/images/Bien-être/stress-management-workshop-office-workers.png'
      ]
    },
    {
      title: language === 'fr' ? 'Prévention MNT' : 'NCD Prevention',
      description: language === 'fr' 
        ? 'Réduction des facteurs de risque évitables' 
        : 'Reduction of avoidable risk factors',
      link: '/public/programs/prevention',
      images: [
        '/images/Prevention/health-screening-community.png',
        '/images/Prevention/heart-health-education.png',
        '/images/Prevention/diabetes-prevention-nutrition.png',
        '/images/Prevention/smoking-cessation-campaign.png'
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section avec Carrousel */}
      <section className="relative h-auto flex items-center justify-center overflow-hidden">
        <HomeHeroCarousel language={language} />
        
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Logo et en-tête */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-4">
                <Globe className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Plateforme Internationale' : 'International Platform'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                <span className="block text-white drop-shadow-2xl">{t.hero.title}</span>
                <span className="block text-emerald-300 drop-shadow-2xl mt-2 text-2xl md:text-3xl">
                  {t.hero.subtitle}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/95 mb-6 max-w-3xl leading-relaxed drop-shadow-lg">
                {t.hero.description}
              </p>
            </div>

            {/* Message fort */}
            <div className="mb-8 p-6 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50">
              <div className="flex items-start gap-4">
                <Target className="h-6 w-6 md:h-8 md:w-8 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {t.message}
                  </p>
                  <p className="text-sm md:text-base text-white/90 drop-shadow-md">
                    {language === 'fr' 
                      ? 'Le S.I.S. n\'est pas un simple événement. C\'est un levier de transformation des comportements et des politiques de santé.'
                      : 'The S.I.S. is not merely an event. It is a catalyst for behavioral change and health policy transformation.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="px-6 py-5 text-base bg-emerald-600 hover:bg-emerald-700 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                <Link href="/public/about/vision" className="flex items-center">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="px-6 py-5 text-base border-2 dark:border-white border-emerald-600 dark:text-white text-emerald-700 hover:bg-white/20 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105">
                <Link href="/public/programs" className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  {t.hero.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {t.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 md:p-5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30"
                >
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-emerald-300 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-white/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Défilement indicatif */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 right-6 z-20 hidden lg:block"
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-xs mb-2">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.vision.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                {t.vision.text}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {t.vision.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {point}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr'
                      ? 'Contribution directe à l\'amélioration durable de la santé et du bien-être.'
                      : 'Direct contribution to sustainable health and wellbeing improvement.'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Chiffres Clés - Pourquoi le S.I.S. ?' : 'Key Figures - Why the S.I.S.?'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: TrendingUp,
                  title: language === 'fr' ? 'Enjeu Mondial' : 'Global Challenge',
                  stats: [
                    language === 'fr' ? '70%+ des décès liés aux MNT' : '70%+ deaths from NCDs',
                    language === 'fr' ? 'Facteurs de risque largement évitables' : 'Largely preventable risk factors',
                    language === 'fr' ? 'Progression rapide mondiale' : 'Rapid global progression'
                  ]
                },
                {
                  icon: Award,
                  title: language === 'fr' ? 'Enjeu Économique' : 'Economic Challenge',
                  stats: [
                    language === 'fr' ? 'Coût considérable pour les systèmes de santé' : 'Substantial burden on health systems',
                    language === 'fr' ? 'Réduction durable des dépenses par la prévention' : 'Sustainable reduction of healthcare costs',
                    language === 'fr' ? 'Investissement générateur de bénéfices' : 'Investment generating measurable returns'
                  ]
                },
                {
                  icon: Shield,
                  title: language === 'fr' ? 'Enjeu Sociétal' : 'Societal Challenge',
                  stats: [
                    language === 'fr' ? 'Amélioration du bien-être et productivité' : 'Improved wellbeing and productivity',
                    language === 'fr' ? 'Renforcement de l\'autonomie des populations' : 'Strengthened population autonomy',
                    language === 'fr' ? 'Réduction des inégalités de santé' : 'Reduction of health inequalities'
                  ]
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                      <section.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {section.stats.map((stat, statIdx) => (
                      <li key={statIdx} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {stat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            {/* Positionnement clé */}
            <div className="mt-20 p-8 rounded-2xl bg-emerald-600 dark:bg-emerald-700 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">
                {language === 'fr'
                  ? 'Le Salon International de la Santé est une plateforme d\'actions, de mobilisation et d\'impact au service de la santé durable.'
                  : 'The International Health Fair is an action-oriented, impact-driven platform serving sustainable health development.'}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                  <Link href="/public/contact" className="flex items-center">
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="text-white dark:text-white border-white dark:border-white hover:bg-white/10 dark:hover:bg-white/10 bg-emerald-600 dark:bg-transparent">
                  <Link href="/public/register" className="flex items-center">
                    {language === 'fr' ? 'S\'inscrire' : 'Register'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Preview avec Carrousels */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t.programs.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.programs.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {programs.map((program, idx) => (
              <ProgramCard
                key={idx}
                program={program}
                index={idx}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}