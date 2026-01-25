// app/public/programs/nutrition/page.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguageStore } from '@/lib/stores/language-store';
import { Apple, Heart, Target, Users, CheckCircle2, ArrowRight, BookOpen, Leaf, Droplets, Zap, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Données des nutriments avec vos images locales
const nutrientStories = [
  {
    id: 1,
    icon: Leaf,
    title: { fr: 'FIBRES', en: 'FIBERS' },
    color: 'from-emerald-500/20 to-green-400/20',
    image: '/images/Alimentation/legumes-de-fruits-et-de-cereales.jpg',
    description: { 
      fr: 'Essentielles pour la santé digestive et la satiété', 
      en: 'Essential for digestive health and satiety' 
    }
  },
  {
    id: 2,
    icon: Droplets,
    title: { fr: 'OMÉGA-3', en: 'OMEGA-3' },
    color: 'from-blue-500/20 to-cyan-400/20',
    image: '/images/ACIDES-GRAS-OMÉGA-3/poisson.jpg',
    description: { 
      fr: 'Protection cardiovasculaire et fonction cérébrale', 
      en: 'Cardiovascular protection and brain function' 
    }
  },
  {
    id: 3,
    icon: Zap,
    title: { fr: 'ANTIOXYDANTS', en: 'ANTIOXIDANTS' },
    color: 'from-purple-500/20 to-pink-400/20',
    image: '/images/ANTIOXYDANTS/complet-thé.jpeg',
    description: { 
      fr: 'Combat le stress oxydatif et le vieillissement', 
      en: 'Fights oxidative stress and aging' 
    }
  },
  {
    id: 4,
    icon: Shield,
    title: { fr: 'PROTÉINES', en: 'PROTEINS' },
    color: 'from-orange-500/20 to-amber-400/20',
    image: '/images/PROTÉINES-DE-QUALITÉ/Légumineuses-poissons-œufs-produits-laitiers.jpg',
    description: { 
      fr: 'Construction musculaire et réparation cellulaire', 
      en: 'Muscle building and cellular repair' 
    }
  },
    {
    id: 5,
    icon: Shield,
    title: { fr: 'PROTÉINES', en: 'PROTEINS' },
    color: 'from-orange-500/20 to-amber-400/20',
    image: '/images/PROTÉINES-DE-QUALITÉ/Légumineuses-poissons-œufs-produits-laitiers.jpg',
    description: { 
      fr: 'Construction musculaire et réparation cellulaire', 
      en: 'Muscle building and cellular repair' 
    }
  }
];

// Magnifique carrousel de nutriments
function NutrientsStoriesCarousel({ language }: { language: 'fr' | 'en' }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Déterminer l'index actif basé sur la position de défilement
      const cardWidth = 220;
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(currentIndex);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 220;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? cardWidth : -cardWidth);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 220;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-emerald-50/80 via-white to-white dark:from-emerald-950/20 dark:via-gray-950 dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* En-tête avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200 dark:border-emerald-800 mb-4">
            <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {language === 'fr' ? 'Les Essentiels' : 'The Essentials'}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {language === 'fr' ? 'Nutriments Clés' : 'Key Nutrients'}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les piliers d\'une alimentation équilibrée pour votre santé' 
              : 'Discover the pillars of balanced nutrition for your health'
            }
          </p>
        </motion.div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Boutons de navigation avec design moderne */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border-2 border-emerald-100 dark:border-emerald-900"
              aria-label={language === 'fr' ? 'Précédent' : 'Previous'}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border-2 border-emerald-100 dark:border-emerald-900"
              aria-label={language === 'fr' ? 'Suivant' : 'Next'}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          )}

          {/* Container du carrousel */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 px-12 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {nutrientStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex-shrink-0 w-[200px] aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.08] hover:shadow-3xl group snap-center"
                style={{
                  boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={story.image}
                    alt={story.title[language]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="200px"
                    priority={index < 2}
                  />
                </div>
                
                {/* Overlay gradient léger */}
                <div className={`absolute inset-0 bg-gradient-to-t ${story.color} opacity-40 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Gradient supérieur */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
                
                {/* Gradient inférieur renforcé */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                
                {/* Icône et titre en haut */}
                <div className="absolute top-5 left-5 right-5 z-10">
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <div className="p-2.5 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 shadow-lg">
                      <story.icon className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                    <span className="text-white text-base font-bold drop-shadow-2xl tracking-wide">
                      {story.title[language]}
                    </span>
                  </motion.div>
                </div>
                
                {/* Description en bas */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="text-white text-sm font-medium leading-snug drop-shadow-2xl"
                  >
                    {story.description[language]}
                  </motion.p>
                </div>

                {/* Bordure de hover */}
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/40 rounded-3xl transition-all duration-500 pointer-events-none" />
                
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 group-hover:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {nutrientStories.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg'
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-emerald-400 dark:hover:bg-emerald-500'
                }`}
                aria-label={`${language === 'fr' ? 'Aller au nutriment' : 'Go to nutrient'} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Badge info avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 border-2 border-emerald-200 dark:border-emerald-800 backdrop-blur-sm shadow-xl">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Apple className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <span className="text-base font-semibold text-emerald-800 dark:text-emerald-300">
              {language === 'fr' 
                ? '4 nutriments essentiels • Alimentation équilibrée • Santé optimale' 
                : '4 essential nutrients • Balanced diet • Optimal health'
              }
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function NutritionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Nutrition',
      subtitle: 'Renforcer l\'éducation nutritionnelle et encourager des habitudes alimentaires favorables à la santé',
      intro: 'Le programme Nutrition vise à promouvoir une alimentation équilibrée et adaptée aux contextes locaux pour prévenir les déséquilibres nutritionnels.',
      
      objectives: [
        'Promouvoir une alimentation équilibrée et adaptée',
        'Prévenir les déséquilibres nutritionnels, diabète et obésité',
        'Renforcer les compétences en matière de choix alimentaires',
        'Sensibiliser aux liens entre nutrition, santé et performance'
      ],
      
      approaches: [
        {
          icon: Apple,
          title: 'Éducation Nutritionnelle',
          description: 'Ateliers pratiques et sessions d\'information'
        },
        {
          icon: BookOpen,
          title: 'Approche Pédagogique',
          description: 'Méthodes non culpabilisantes et accessibles'
        },
        {
          icon: Users,
          title: 'Adaptation Locale',
          description: 'Solutions adaptées aux contextes culturels'
        },
        {
          icon: Heart,
          title: 'Prévention Ciblée',
          description: 'Focus sur les populations à risque'
        }
      ],
      
      focus: [
        {
          title: 'Prévention Diabète',
          points: [
            'Équilibre glycémique',
            'Alimentation à faible index glycémique',
            'Gestion du poids'
          ]
        },
        {
          title: 'Santé Cardiovasculaire',
          points: [
            'Réduction du sel',
            'Graisses saines',
            'Fibres alimentaires'
          ]
        },
        {
          title: 'Bien-être Digestif',
          points: [
            'Microbiote intestinal',
            'Aliments fermentés',
            'Hydratation optimale'
          ]
        }
      ],
      
      activities: [
        'Ateliers culinaires et de nutrition pratique',
        'Conférences avec des nutritionnistes experts',
        'Analyses personnalisées des habitudes alimentaires',
        'Formations pour professionnels de santé'
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'Nutrition',
      subtitle: 'Strengthen nutrition education and encourage healthy eating habits',
      intro: 'The Nutrition program aims to promote balanced diets adapted to local contexts to prevent nutritional imbalances.',
      
      objectives: [
        'Promote balanced and adapted diets',
        'Prevent nutritional imbalances, diabetes and obesity',
        'Strengthen food choice skills',
        'Raise awareness of nutrition-health-performance links'
      ],
      
      approaches: [
        {
          icon: Apple,
          title: 'Nutrition Education',
          description: 'Practical workshops and information sessions'
        },
        {
          icon: BookOpen,
          title: 'Pedagogical Approach',
          description: 'Non-judgmental and accessible methods'
        },
        {
          icon: Users,
          title: 'Local Adaptation',
          description: 'Solutions adapted to cultural contexts'
        },
        {
          icon: Heart,
          title: 'Targeted Prevention',
          description: 'Focus on at-risk populations'
        }
      ],
      
      focus: [
        {
          title: 'Diabetes Prevention',
          points: [
            'Glycemic balance',
            'Low glycemic index foods',
            'Weight management'
          ]
        },
        {
          title: 'Cardiovascular Health',
          points: [
            'Salt reduction',
            'Healthy fats',
            'Dietary fibers'
          ]
        },
        {
          title: 'Digestive Well-being',
          points: [
            'Gut microbiome',
            'Fermented foods',
            'Optimal hydration'
          ]
        }
      ],
      
      activities: [
        'Culinary and practical nutrition workshops',
        'Conferences with expert nutritionists',
        'Personalized eating habit analysis',
        'Training for health professionals'
      ],
      
      message: 'The S.I.S. acts on lifestyles to prevent disease, strengthen well-being and support sustainable development.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - Même structure que les autres pages */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-white dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/public/programs" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour aux programmes' : 'Back to programs'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <Apple className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Programme Alimentation' : 'Food Program'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-2xl text-emerald-600 dark:text-emerald-400 mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              {t.intro}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer' : 'Participate'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900/30">
                <Link href="/public/contact">
                  {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Magnifique carrousel de nutriments */}
      <NutrientsStoriesCarousel language={language} />

      {/* Objectives - Même structure que les autres pages */}
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
                  className="flex items-start gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
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

            {/* Approach - Même structure que les autres pages */}
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
                    className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
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

            {/* Focus Areas */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Domaines d\'Intervention' : 'Focus Areas'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.focus.map((area, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {area.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {area.points.map((point, pointIdx) => (
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

            {/* Activities - Même style que Sport-Health */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {language === 'fr' ? 'Activités Proposées' : 'Proposed Activities'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact/Benefits Section - Même structure que Sport-Health */}
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
                  title: language === 'fr' ? 'Prévention des Maladies' : 'Disease Prevention',
                  benefits: [
                    language === 'fr' ? 'Réduction du risque de diabète de type 2' : 'Reduced type 2 diabetes risk',
                    language === 'fr' ? 'Prévention des maladies cardiovasculaires' : 'Cardiovascular disease prevention',
                    language === 'fr' ? 'Contrôle du poids et prévention de l\'obésité' : 'Weight control and obesity prevention'
                  ]
                },
                {
                  icon: Shield,
                  title: language === 'fr' ? 'Optimisation Métabolique' : 'Metabolic Optimization',
                  benefits: [
                    language === 'fr' ? 'Équilibre glycémique stable' : 'Stable glycemic balance',
                    language === 'fr' ? 'Meilleure gestion du cholestérol' : 'Better cholesterol management',
                    language === 'fr' ? 'Optimisation de la fonction intestinale' : 'Optimized intestinal function'
                  ]
                },
                {
                  icon: Zap,
                  title: language === 'fr' ? 'Énergie & Performance' : 'Energy & Performance',
                  benefits: [
                    language === 'fr' ? 'Augmentation des niveaux d\'énergie' : 'Increased energy levels',
                    language === 'fr' ? 'Amélioration des performances cognitives' : 'Improved cognitive performance',
                    language === 'fr' ? 'Meilleure récupération après l\'effort' : 'Better post-exercise recovery'
                  ]
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800"
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

      {/* CTA - Exactement le même que les autres pages */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Apple className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer aux Ateliers' : 'Join Workshops'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser une Session' : 'Organize a Session'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}