// app/public/programs/wellbeing/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Brain, Heart, Users, Target, CheckCircle2, ArrowRight, Shield, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Images pour le carrousel Bien-être (tes images exactes)
const wellbeingHeroImages = [
  {
    id: 1,
    src: '/images/Bien-être/mindfulness-meditation-peaceful-person.png',
    alt: { 
      fr: 'Personne en méditation pleine conscience paisible', 
      en: 'Peaceful person practicing mindfulness meditation' 
    },
    title: { 
      fr: 'Pleine Conscience', 
      en: 'Mindfulness' 
    }
  },
  {
    id: 2,
    src: '/images/Bien-être/yoga-class-community-wellness-center.png',
    alt: { 
      fr: 'Cours de yoga dans un centre de bien-être communautaire', 
      en: 'Yoga class in community wellness center' 
    },
    title: { 
      fr: 'Yoga Communautaire', 
      en: 'Community Yoga' 
    }
  },
  {
    id: 3,
    src: '/images/Bien-être/stress-management-workshop-office-workers.png',
    alt: { 
      fr: 'Atelier de gestion du stress pour employés de bureau', 
      en: 'Stress management workshop for office workers' 
    },
    title: { 
      fr: 'Gestion du Stress', 
      en: 'Stress Management' 
    }
  },
  {
    id: 4,
    src: '/images/Bien-être/group-therapy-support-circle-diverse-people.png',
    alt: { 
      fr: 'Cercle de soutien et thérapie de groupe avec des personnes diverses', 
      en: 'Group therapy support circle with diverse people' 
    },
    title: { 
      fr: 'Soutien de Groupe', 
      en: 'Group Support' 
    }
  }
];

// Composant HeroCarousel pour Bien-être
function HeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % wellbeingHeroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + wellbeingHeroImages.length) % wellbeingHeroImages.length);
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
            src={wellbeingHeroImages[currentIndex].src}
            alt={wellbeingHeroImages[currentIndex].alt[language]}
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
              <Brain className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">
                {wellbeingHeroImages[currentIndex].title[language]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicateurs de slide */}
        <div className="flex gap-2">
          {wellbeingHeroImages.map((_, index) => (
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

export default function WellbeingPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Bien-être & Santé Mentale',
      subtitle: 'Reconnaître la santé mentale et psychosociale comme composante essentielle de la santé globale',
      intro: 'Le programme Bien-être vise à favoriser la gestion du stress, renforcer le bien-être émotionnel et prévenir les risques psychosociaux.',
      
      objectives: [
        'Favoriser la gestion du stress et l\'équilibre de vie',
        'Renforcer le bien-être émotionnel et psychologique',
        'Prévenir les risques psychosociaux',
        'Améliorer la qualité de vie personnelle et professionnelle'
      ],
      
      approaches: [
        {
          icon: Brain,
          title: 'Approche Holistique',
          description: 'Intégration corps-esprit pour un équilibre complet'
        },
        {
          icon: Heart,
          title: 'Prévention Positive',
          description: 'Focus sur les ressources et résilience personnelle'
        },
        {
          icon: Users,
          title: 'Support Communautaire',
          description: 'Création de réseaux d\'entraide et de partage'
        },
        {
          icon: Shield,
          title: 'Durabilité',
          description: 'Outils pour un bien-être durable au quotidien'
        }
      ],
      
      techniques: [
        {
          category: language === 'fr' ? 'Gestion du Stress' : 'Stress Management',
          methods: [
            language === 'fr' ? 'Techniques de respiration' : 'Breathing techniques',
            language === 'fr' ? 'Méditation et pleine conscience' : 'Meditation and mindfulness',
            language === 'fr' ? 'Gestion du temps et priorités' : 'Time and priority management'
          ]
        },
        {
          category: language === 'fr' ? 'Équilibre Émotionnel' : 'Emotional Balance',
          methods: [
            language === 'fr' ? 'Intelligence émotionnelle' : 'Emotional intelligence',
            language === 'fr' ? 'Communication non violente' : 'Non-violent communication',
            language === 'fr' ? 'Gestion des conflits' : 'Conflict management'
          ]
        },
        {
          category: language === 'fr' ? 'Résilience' : 'Resilience',
          methods: [
            language === 'fr' ? 'Développement des compétences' : 'Skills development',
            language === 'fr' ? 'Gestion du changement' : 'Change management',
            language === 'fr' ? 'Création de sens' : 'Meaning creation'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'Well-being & Mental Health',
      subtitle: 'Recognize mental and psychosocial health as an essential component of overall health',
      intro: 'The Well-being program aims to promote stress management, strengthen emotional well-being and prevent psychosocial risks.',
      
      objectives: [
        'Promote stress management and work-life balance',
        'Strengthen emotional and psychological well-being',
        'Prevent psychosocial risks',
        'Improve personal and professional quality of life'
      ],
      
      approaches: [
        {
          icon: Brain,
          title: 'Holistic Approach',
          description: 'Body-mind integration for complete balance'
        },
        {
          icon: Heart,
          title: 'Positive Prevention',
          description: 'Focus on personal resources and resilience'
        },
        {
          icon: Users,
          title: 'Community Support',
          description: 'Creation of support and sharing networks'
        },
        {
          icon: Shield,
          title: 'Sustainability',
          description: 'Tools for daily sustainable well-being'
        }
      ],
      
      techniques: [
        {
          category: 'Stress Management',
          methods: [
            'Breathing techniques',
            'Meditation and mindfulness',
            'Time and priority management'
          ]
        },
        {
          category: 'Emotional Balance',
          methods: [
            'Emotional intelligence',
            'Non-violent communication',
            'Conflict management'
          ]
        },
        {
          category: 'Resilience',
          methods: [
            'Skills development',
            'Change management',
            'Meaning creation'
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
                <Brain className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Programme Bien-être' : 'Well-being Program'}
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
                    {language === 'fr' ? 'Participer aux Sessions' : 'Join Sessions'}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white/20 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105">
                  <Link href="/public/contact">
                    {language === 'fr' ? 'Devenir Facilitateur' : 'Become Facilitator'}
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

            {/* Approaches */}
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

            {/* Techniques */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Techniques Proposées' : 'Proposed Techniques'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.techniques.map((technique, idx) => (
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
                        {technique.category}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {technique.methods.map((method, methodIdx) => (
                        <li key={methodIdx} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{method}</span>
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

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Bénéfices du Bien-être' : 'Well-being Benefits'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: language === 'fr' ? 'Santé Mentale' : 'Mental Health',
                  benefits: [
                    language === 'fr' ? 'Réduction du stress et anxiété' : 'Stress and anxiety reduction',
                    language === 'fr' ? 'Amélioration de l\'humeur' : 'Mood improvement',
                    language === 'fr' ? 'Meilleure concentration' : 'Better concentration'
                  ]
                },
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Santé Physique' : 'Physical Health',
                  benefits: [
                    language === 'fr' ? 'Réduction tension artérielle' : 'Blood pressure reduction',
                    language === 'fr' ? 'Amélioration du sommeil' : 'Sleep improvement',
                    language === 'fr' ? 'Renforcement immunitaire' : 'Immune system strengthening'
                  ]
                },
                {
                  icon: Users,
                  title: language === 'fr' ? 'Vie Sociale' : 'Social Life',
                  benefits: [
                    language === 'fr' ? 'Meilleures relations' : 'Better relationships',
                    language === 'fr' ? 'Communication améliorée' : 'Improved communication',
                    language === 'fr' ? 'Cohésion communautaire' : 'Community cohesion'
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
            <Brain className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer aux Sessions' : 'Join Sessions'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-emerald-700 border-white hover:bg-white/10 shadow-lg">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Devenir Facilitateur' : 'Become Facilitator'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}