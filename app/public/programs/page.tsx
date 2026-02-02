'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { 
  Heart, 
  Shield, 
  Apple, 
  Activity, 
  Brain, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Données des programmes avec images d'arrière-plan
const programsData = {
  fr: {
    title: 'Nos Programmes',
    subtitle: 'Des solutions intégrées pour agir sur les principaux déterminants de santé',
    description: 'Chaque programme propose une approche complète associant éducation, action concrète et évaluation des résultats.',
    programs: [
      {
        id: 'sport-health',
        title: 'Sport & Santé',
        tagline: 'L\'activité physique comme pilier fondamental',
        description: 'Promotion de l\'activité physique régulière comme moyen de prévention des maladies non transmissibles et d\'amélioration de la qualité de vie.',
        longDescription: 'Programme complet incluant des sessions pratiques, des ateliers éducatifs et des outils de suivi personnalisé pour intégrer l\'activité physique dans le quotidien.',
        icon: Activity,
        color: 'from-emerald-600 to-emerald-800',
        lightColor: 'bg-emerald-100 dark:bg-emerald-900/20',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        images: [
          '/images/Sport-health/group-exercise-outdoor-diverse-people.png',
          '/images/Sport-health/corporate-wellness-office-exercises.png',
          '/images/Sport-health/family-cycling-together-park.png',
          '/images/Sport-health/morning-run-sunrise-nature.png'
        ],
        keyPoints: [
          'Ateliers pratiques d\'activité physique',
          'Éducation aux bienfaits du mouvement',
          'Outils de suivi et motivation',
          'Adaptation aux différents âges et capacités'
        ],
        stats: [
          { value: '30%', label: 'Réduction risque cardiovasculaire' },
          { value: '50+', label: 'Activités proposées' },
          { value: '1000+', label: 'Participants formés' }
        ]
      },
      {
        id: 'nutrition',
        title: 'Nutrition & Alimentation',
        tagline: 'Des choix alimentaires éclairés',
        description: 'Éducation nutritionnelle et promotion d\'habitudes alimentaires saines pour prévenir les carences et les maladies liées à l\'alimentation.',
        longDescription: 'Approche complète couvrant l\'éducation nutritionnelle, la lecture des étiquettes, la préparation de repas équilibrés et la gestion des portions.',
        icon: Apple,
        color: 'from-blue-600 to-blue-800',
        lightColor: 'bg-blue-100 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        images: [
          '/images/Alimentation/legumes-de-fruits-et-de-cereales.jpg',
          '/images/Alimentation/img_04_idem.jpg'
        ],
        keyPoints: [
          'Ateliers de cuisine santé',
          'Éducation nutritionnelle',
          'Gestion des portions',
          'Lecture des étiquettes alimentaires'
        ],
        stats: [
          { value: '40%', label: 'Amélioration habitudes alimentaires' },
          { value: '25+', label: 'Ateliers nutrition' },
          { value: '500+', label: 'Familles accompagnées' }
        ]
      },
      {
        id: 'wellbeing',
        title: 'Bien-être & Santé Mentale',
        tagline: 'L\'équilibre psychologique au cœur',
        description: 'Promotion de la santé mentale et développement de compétences pour gérer le stress et améliorer le bien-être psychologique.',
        longDescription: 'Programme intégrant méditation, gestion du stress, développement des compétences psychosociales et création d\'environnements favorables au bien-être.',
        icon: Brain,
        color: 'from-purple-600 to-purple-800',
        lightColor: 'bg-purple-100 dark:bg-purple-900/20',
        textColor: 'text-purple-700 dark:text-purple-300',
        images: [
          '/images/Bien-être/mindfulness-meditation-peaceful-person.png',
          '/images/Bien-être/group-therapy-support-circle-diverse-people.png',
          '/images/Bien-être/yoga-class-community-wellness-center.png',
          '/images/Bien-être/stress-management-workshop-office-workers.png'
        ],
        keyPoints: [
          'Sessions de méditation et pleine conscience',
          'Ateliers gestion du stress',
          'Développement résilience',
          'Création environnement favorable'
        ],
        stats: [
          { value: '60%', label: 'Réduction stress perçu' },
          { value: '40+', label: 'Sessions bien-être' },
          { value: '800+', label: 'Participants satisfaits' }
        ]
      },
      {
        id: 'prevention',
        title: 'Prévention MNT',
        tagline: 'Agir avant que la maladie ne survienne',
        description: 'Réduction des facteurs de risque évitables des maladies non transmissibles grâce à des actions ciblées et des dépistages précoces.',
        longDescription: 'Programme de prévention primaire et secondaire incluant dépistages, éducation aux facteurs de risque, accompagnement au changement de comportement.',
        icon: Shield,
        color: 'from-rose-600 to-rose-800',
        lightColor: 'bg-rose-100 dark:bg-rose-900/20',
        textColor: 'text-rose-700 dark:text-rose-300',
        images: [
          '/images/Prevention/diabetes-prevention-nutrition.png',
          '/images/Prevention/health-screening-community.png',
          '/images/Prevention/heart-health-education.png',
          '/images/Prevention/smoking-cessation-campaign.png'
        ],
        keyPoints: [
          'Dépistages gratuits',
          'Éducation facteurs de risque',
          'Accompagnement arrêt tabac',
          'Prévention diabète et hypertension'
        ],
        stats: [
          { value: '70%', label: 'Décès évitables' },
          { value: '15+', label: 'Facteurs de risque ciblés' },
          { value: '2000+', label: 'Dépistages réalisés' }
        ]
      }
    ]
  },
  en: {
    title: 'Our Programs',
    subtitle: 'Integrated solutions to address key health determinants',
    description: 'Each program offers a comprehensive approach combining education, concrete action, and results evaluation.',
    programs: [
      {
        id: 'sport-health',
        title: 'Sport & Health',
        tagline: 'Physical activity as a fundamental pillar',
        description: 'Promotion of regular physical activity as a means of preventing non-communicable diseases and improving quality of life.',
        longDescription: 'Comprehensive program including practical sessions, educational workshops, and personalized tracking tools to integrate physical activity into daily life.',
        icon: Activity,
        color: 'from-emerald-600 to-emerald-800',
        lightColor: 'bg-emerald-100 dark:bg-emerald-900/20',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        images: [
          '/images/Sport-health/group-exercise-outdoor-diverse-people.png',
          '/images/Sport-health/corporate-wellness-office-exercises.png',
          '/images/Sport-health/family-cycling-together-park.png',
          '/images/Sport-health/morning-run-sunrise-nature.png'
        ],
        keyPoints: [
          'Practical physical activity workshops',
          'Education on benefits of movement',
          'Tracking and motivation tools',
          'Adaptation to different ages and abilities'
        ],
        stats: [
          { value: '30%', label: 'Reduced cardiovascular risk' },
          { value: '50+', label: 'Activities offered' },
          { value: '1000+', label: 'Trained participants' }
        ]
      },
      {
        id: 'nutrition',
        title: 'Nutrition & Diet',
        tagline: 'Informed food choices',
        description: 'Nutrition education and promotion of healthy eating habits to prevent deficiencies and diet-related diseases.',
        longDescription: 'Comprehensive approach covering nutrition education, label reading, balanced meal preparation, and portion management.',
        icon: Apple,
        color: 'from-blue-600 to-blue-800',
        lightColor: 'bg-blue-100 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        images: [
          '/images/Alimentation/legumes-de-fruits-et-de-cereales.jpg',
          '/images/Alimentation/img_04_idem.jpg'
        ],
        keyPoints: [
          'Healthy cooking workshops',
          'Nutrition education',
          'Portion management',
          'Food label reading'
        ],
        stats: [
          { value: '40%', label: 'Improved eating habits' },
          { value: '25+', label: 'Nutrition workshops' },
          { value: '500+', label: 'Families supported' }
        ]
      },
      {
        id: 'wellbeing',
        title: 'Well-being & Mental Health',
        tagline: 'Psychological balance at the core',
        description: 'Promotion of mental health and development of skills to manage stress and improve psychological well-being.',
        longDescription: 'Program integrating meditation, stress management, psychosocial skills development, and creation of well-being-friendly environments.',
        icon: Brain,
        color: 'from-purple-600 to-purple-800',
        lightColor: 'bg-purple-100 dark:bg-purple-900/20',
        textColor: 'text-purple-700 dark:text-purple-300',
        images: [
          '/images/Bien-être/mindfulness-meditation-peaceful-person.png',
          '/images/Bien-être/group-therapy-support-circle-diverse-people.png',
          '/images/Bien-être/yoga-class-community-wellness-center.png',
          '/images/Bien-être/stress-management-workshop-office-workers.png'
        ],
        keyPoints: [
          'Meditation and mindfulness sessions',
          'Stress management workshops',
          'Resilience development',
          'Creating supportive environments'
        ],
        stats: [
          { value: '60%', label: 'Reduced perceived stress' },
          { value: '40+', label: 'Well-being sessions' },
          { value: '800+', label: 'Satisfied participants' }
        ]
      },
      {
        id: 'prevention',
        title: 'NCD Prevention',
        tagline: 'Act before disease occurs',
        description: 'Reduction of avoidable risk factors for non-communicable diseases through targeted actions and early screening.',
        longDescription: 'Primary and secondary prevention program including screenings, risk factor education, behavior change support.',
        icon: Shield,
        color: 'from-rose-600 to-rose-800',
        lightColor: 'bg-rose-100 dark:bg-rose-900/20',
        textColor: 'text-rose-700 dark:text-rose-300',
        images: [
          '/images/Prevention/diabetes-prevention-nutrition.png',
          '/images/Prevention/health-screening-community.png',
          '/images/Prevention/heart-health-education.png',
          '/images/Prevention/smoking-cessation-campaign.png'
        ],
        keyPoints: [
          'Free screenings',
          'Risk factor education',
          'Smoking cessation support',
          'Diabetes and hypertension prevention'
        ],
        stats: [
          { value: '70%', label: 'Preventable deaths' },
          { value: '15+', label: 'Targeted risk factors' },
          { value: '2000+', label: 'Screenings conducted' }
        ]
      }
    ]
  }
};

// Composant ProgramCard avec carrousel d'images
function ProgramCard({ program, language }: { program: any; language: 'fr' | 'en' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % program.images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + program.images.length) % program.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
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
        goToNextImage();
      }, 4000);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        goToNextImage();
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentImageIndex, isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      {/* Image d'arrière-plan avec carrousel */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={program.images[currentImageIndex]}
              alt={`${program.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </motion.div>
        </AnimatePresence>

        {/* Indicateurs du carrousel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {program.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'w-6 bg-white' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation images */}
        {program.images.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
              aria-label="Image suivante"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </>
        )}

        {/* En-tête de la card */}
        <div className="absolute top-6 left-6 z-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${program.lightColor} backdrop-blur-sm border border-white/20`}>
            <program.icon className={`h-5 w-5 ${program.textColor}`} />
            <span className={`font-medium ${program.textColor}`}>
              {program.tagline}
            </span>
          </div>
        </div>

        {/* Titre de la card */}
        <div className="absolute bottom-8 left-6 right-6 z-20">
          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {program.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`h-1 w-12 rounded-full ${program.lightColor}`} />
            <span className="text-white/90 text-sm font-medium">
              {language === 'fr' ? 'Programme certifié' : 'Certified program'}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu de la card */}
      <div className="p-6 md:p-8 bg-white dark:bg-gray-900">
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {program.description}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {program.longDescription}
          </p>
        </div>

        {/* Points clés */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            {language === 'fr' ? 'Points clés' : 'Key Points'}
          </h4>
          <ul className="space-y-2">
            {program.keyPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className={`h-2 w-2 rounded-full mt-2 ${program.textColor}`} />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {program.stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${program.textColor}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 transition-opacity`}>
          <Link href={`/public/programs/${program.id}`} className="flex items-center justify-center gap-2">
            {language === 'fr' ? 'Découvrir le programme' : 'Discover the program'}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Badge en coin */}
      <div className={`absolute top-0 right-0 ${program.lightColor} rounded-bl-2xl px-4 py-2`}>
        <div className="flex items-center gap-1">
          <Award className={`h-4 w-4 ${program.textColor}`} />
          <span className={`text-xs font-medium ${program.textColor}`}>
            {language === 'fr' ? 'Recommandé' : 'Recommended'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramsPage() {
  const { language } = useLanguageStore();
  const t = programsData[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:30px_30px] dark:bg-grid-slate-400/[0.05]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent dark:via-emerald-700" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50 mb-6">
                <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {language === 'fr' ? 'Programmes Internationaux' : 'International Programs'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-2xl text-emerald-700 dark:text-emerald-300 font-medium mb-8">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            {/* Stats globales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {[
                { value: '4', label: language === 'fr' ? 'Programmes' : 'Programs', icon: Heart },
                { value: '50+', label: language === 'fr' ? 'Activités' : 'Activities', icon: Activity },
                { value: '3000+', label: language === 'fr' ? 'Participants' : 'Participants', icon: Users },
                { value: '100%', label: language === 'fr' ? 'Satisfaction' : 'Satisfaction', icon: Award }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {t.programs.map((program: any, index: number) => (
              <ProgramCard 
                key={program.id} 
                program={program}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                {language === 'fr' 
                  ? 'Rejoignez notre communauté santé' 
                  : 'Join our health community'}
              </h2>
              
              <p className="text-xl mb-10 text-emerald-100">
                {language === 'fr'
                  ? 'Ensemble, transformons la prévention en action concrète pour un avenir plus sain.'
                  : 'Together, let\'s transform prevention into concrete action for a healthier future.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                  <Link href="/public/register" className="flex items-center">
                    {language === 'fr' ? 'S\'inscrire maintenant' : 'Register now'}
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <Link href="/public/contact" className="flex items-center">
                    {language === 'fr' ? 'Nous contacter' : 'Contact us'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}