// app/public/partners/sponsors/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Handshake, Award, Shield, Sparkles, Users, Globe, Target, TrendingUp, ArrowRight, CheckCircle2, Home, ChevronLeft, ChevronRight, Pause, Play, BarChart3, FileText, Users2, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

// Images pour le carrousel Hero
const heroImages = [
  {
    id: 1,
    src: '/images/sponsors/freepik__35mm-film-photography-sommet-dentreprises-partenai__63079.png',
    alt: { 
      fr: 'Sommet d\'entreprises partenaires', 
      en: 'Corporate partnership summit' 
    },
    title: { 
      fr: 'Sommet Partenarial', 
      en: 'Partnership Summit' 
    }
  },
  {
    id: 2,
    src: '/images/sponsors/freepik__the-style-is-candid-image-photography-with-natural__63080.png',
    alt: { 
      fr: 'Réunion stratégique d\'entreprise', 
      en: 'Corporate strategic meeting' 
    },
    title: { 
      fr: 'Stratégie d\'Engagement', 
      en: 'Engagement Strategy' 
    }
  },
  {
    id: 3,
    src: '/images/sponsors/partnership-signing-ceremony.jpg',
    alt: { 
      fr: 'Cérémonie de signature de partenariat', 
      en: 'Partnership signing ceremony' 
    },
    title: { 
      fr: 'Accords Officiels', 
      en: 'Official Agreements' 
    }
  }
];

// Autres images disponibles
const additionalImages = {
  csrEvent: '/images/sponsors/corporate-social-responsibility-event.jpg',
  initialMeeting: '/images/sponsors/initial-business-meeting.jpg',
  presentation: '/images/sponsors/corporate-presentation-meeting.jpg',
  globalNetwork: '/images/sponsors/overall-framework-global-business-networking-involves-analyzing-exchanging-data-related-customer-connections-recruitment-employees-outsourcing-global-scale-it-also-encompa_908985-120354.avif',
  restructure: '/images/sponsors/restructure.jpg',
  globalization: '/images/sponsors/WEB-Globalizacion.jpg'
};

// Composant HeroCarousel
function HeroCarousel({ language }: { language: 'fr' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % heroImages.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + heroImages.length) % heroImages.length);
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
      {/* Overlay professionnel */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/60 to-emerald-900/30 z-10" />
      
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
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt[language]}
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
            quality={95}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles du carrousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

export default function SponsorsPage() {
  const { language } = useLanguageStore();
  
  // Données pour les graphiques
  const sponsorshipGrowthData = [
    { year: '2021', platinum: 2, gold: 5, silver: 8, bronze: 12 },
    { year: '2022', platinum: 3, gold: 8, silver: 12, bronze: 18 },
    { year: '2023', platinum: 5, gold: 12, silver: 18, bronze: 25 },
    { year: '2024', platinum: 8, gold: 15, silver: 22, bronze: 32 },
  ];

  const sectorDistributionData = language === 'fr' ? [
    { name: 'Santé & Pharma', value: 35, color: '#10b981' },
    { name: 'Technologie', value: 25, color: '#3b82f6' },
    { name: 'Finance', value: 15, color: '#8b5cf6' },
    { name: 'Énergie', value: 10, color: '#f59e0b' },
    { name: 'Industrie', value: 8, color: '#ef4444' },
    { name: 'Autres', value: 7, color: '#6b7280' }
  ] : [
    { name: 'Health & Pharma', value: 35, color: '#10b981' },
    { name: 'Technology', value: 25, color: '#3b82f6' },
    { name: 'Finance', value: 15, color: '#8b5cf6' },
    { name: 'Energy', value: 10, color: '#f59e0b' },
    { name: 'Industry', value: 8, color: '#ef4444' },
    { name: 'Others', value: 7, color: '#6b7280' }
  ];

  const roiMetricsData = [
    { metric: language === 'fr' ? 'Visibilité Média' : 'Media Visibility', value: 85 },
    { metric: language === 'fr' ? 'Engagement' : 'Engagement', value: 78 },
    { metric: language === 'fr' ? 'RSE' : 'CSR', value: 92 },
    { metric: language === 'fr' ? 'Networking' : 'Networking', value: 88 },
    { metric: language === 'fr' ? 'Innovation' : 'Innovation', value: 75 },
  ];

  const investmentImpactData = [
    { month: language === 'fr' ? 'Jan' : 'Jan', marketing: 40, csr: 25, networking: 35 },
    { month: language === 'fr' ? 'Fév' : 'Feb', marketing: 45, csr: 30, networking: 40 },
    { month: language === 'fr' ? 'Mar' : 'Mar', marketing: 50, csr: 35, networking: 45 },
    { month: language === 'fr' ? 'Avr' : 'Apr', marketing: 55, csr: 40, networking: 50 },
    { month: language === 'fr' ? 'Mai' : 'May', marketing: 60, csr: 45, networking: 55 },
    { month: language === 'fr' ? 'Jun' : 'Jun', marketing: 65, csr: 50, networking: 60 },
  ];

  const content = {
    fr: {
      title: 'Sponsors & Partenaires Privés',
      subtitle: 'Cadre structuré pour l\'engagement des entreprises en faveur de la santé durable',
      intro: 'Le S.I.S. offre aux entreprises un espace crédible pour renforcer leur RSE et s\'associer à une initiative à fort impact sanitaire et social.',
      
      stats: {
        title: 'Impact et Performance des Partenariats',
        subtitle: 'Données mesurables démontrant la valeur ajoutée des collaborations privées'
      },
      
      whyPartner: {
        title: 'Pourquoi Participer au S.I.S.',
        points: [
          'Visibilité institutionnelle maîtrisée',
          'Association à des programmes de prévention à fort impact',
          'Reconnaissance de l\'engagement sociétal',
          'Positionnement aligné avec les priorités mondiales de santé'
        ]
      },
      
      levels: [
        {
          title: 'Partenaire Platine',
          icon: Sparkles,
          investment: 'Engagement stratégique majeur',
          color: 'from-gray-400 to-gray-600',
          benefits: [
            'Visibilité leadership sur tous supports',
            'Participation au comité stratégique',
            'Programme dédié de communication',
            'Accès privilégié aux décideurs'
          ]
        },
        {
          title: 'Partenaire Or',
          icon: Award,
          investment: 'Engagement significatif',
          color: 'from-amber-500 to-amber-700',
          benefits: [
            'Visibilité majeure sur supports clés',
            'Programme de valorisation média',
            'Participation aux événements exclusifs',
            'Accès aux données d\'impact'
          ]
        },
        {
          title: 'Partenaire Argent',
          icon: Shield,
          investment: 'Engagement ciblé',
          color: 'from-slate-400 to-slate-600',
          benefits: [
            'Visibilité sur supports sélectionnés',
            'Valorisation institutionnelle',
            'Participation aux activités',
            'Certification partenaire'
          ]
        }
      ],
      
      valueProposition: [
        {
          icon: TrendingUp,
          title: 'Performance RSE',
          description: 'Améliorez votre scoring RSE avec un projet à impact sanitaire mesurable'
        },
        {
          icon: Users,
          title: 'Engagement Collaborateur',
          description: 'Impliquez vos équipes dans des actions de prévention santé'
        },
        {
          icon: Globe,
          title: 'Portée Internationale',
          description: 'Bénéficiez d\'une visibilité internationale alignée sur les ODD'
        },
        {
          icon: Target,
          title: 'Positionnement Institutionnel',
          description: 'Associez votre marque à une plateforme crédible de santé publique'
        }
      ],
      
      process: [
        {
          step: '01',
          title: 'Premier Contact',
          description: 'Échange initial pour comprendre vos objectifs et nos synergies'
        },
        {
          step: '02',
          title: 'Proposition Stratégique',
          description: 'Élaboration d\'un plan de partenariat personnalisé'
        },
        {
          step: '03',
          title: 'Signature & Lancement',
          description: 'Cérémonie de signature et communication conjointe'
        },
        {
          step: '04',
          title: 'Suivi & Valorisation',
          description: 'Rapports réguliers et valorisation de l\'impact'
        }
      ],
      
      message: 'Le S.I.S. fédère institutions, entreprises et mécènes autour d\'un objectif commun : prévenir, promouvoir la santé et agir durablement.'
    },
    en: {
      title: 'Sponsors & Private Partners',
      subtitle: 'Structured framework for corporate engagement in sustainable health',
      intro: 'The S.I.S. offers companies a credible space to strengthen their CSR and associate with a high-impact health and social initiative.',
      
      stats: {
        title: 'Partnership Impact and Performance',
        subtitle: 'Measurable data demonstrating the added value of private collaborations'
      },
      
      whyPartner: {
        title: 'Why Partner with S.I.S.',
        points: [
          'Controlled institutional visibility',
          'Association with high-impact prevention programs',
          'Recognition of societal engagement',
          'Positioning aligned with global health priorities'
        ]
      },
      
      levels: [
        {
          title: 'Platinum Partner',
          icon: Sparkles,
          investment: 'Major strategic commitment',
          color: 'from-gray-400 to-gray-600',
          benefits: [
            'Leadership visibility on all media',
            'Participation in strategic committee',
            'Dedicated communication program',
            'Privileged access to decision-makers'
          ]
        },
        {
          title: 'Gold Partner',
          icon: Award,
          investment: 'Significant commitment',
          color: 'from-amber-500 to-amber-700',
          benefits: [
            'Major visibility on key media',
            'Media valorization program',
            'Participation in exclusive events',
            'Access to impact data'
          ]
        },
        {
          title: 'Silver Partner',
          icon: Shield,
          investment: 'Targeted commitment',
          color: 'from-slate-400 to-slate-600',
          benefits: [
            'Visibility on selected media',
            'Institutional valorization',
            'Participation in activities',
            'Partner certification'
          ]
        }
      ],
      
      valueProposition: [
        {
          icon: TrendingUp,
          title: 'CSR Performance',
          description: 'Improve your CSR scoring with a measurable health impact project'
        },
        {
          icon: Users,
          title: 'Employee Engagement',
          description: 'Involve your teams in health prevention actions'
        },
        {
          icon: Globe,
          title: 'International Reach',
          description: 'Benefit from international visibility aligned with SDGs'
        },
        {
          icon: Target,
          title: 'Institutional Positioning',
          description: 'Associate your brand with a credible public health platform'
        }
      ],
      
      process: [
        {
          step: '01',
          title: 'Initial Contact',
          description: 'First exchange to understand your objectives and our synergies'
        },
        {
          step: '02',
          title: 'Strategic Proposal',
          description: 'Development of a customized partnership plan'
        },
        {
          step: '03',
          title: 'Signature & Launch',
          description: 'Signing ceremony and joint communication'
        },
        {
          step: '04',
          title: 'Monitoring & Valorization',
          description: 'Regular reports and impact valorization'
        }
      ],
      
      message: 'The S.I.S. brings together institutions, companies and philanthropies around a shared objective: prevention, health promotion and sustainable action.'
    }
  };

  const t = content[language];

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm">
                <span className="font-medium">{entry.name}:</span> {entry.value}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Fonction pour obtenir la légende des graphiques
  const getLegendText = (key: string) => {
    if (language === 'fr') {
      switch (key) {
        case 'platinum': return 'Platine';
        case 'gold': return 'Or';
        case 'silver': return 'Argent';
        case 'bronze': return 'Bronze';
        case 'marketing': return 'Marketing';
        case 'csr': return 'RSE';
        case 'networking': return 'Networking';
        default: return key;
      }
    } else {
      switch (key) {
        case 'platinum': return 'Platinum';
        case 'gold': return 'Gold';
        case 'silver': return 'Silver';
        case 'bronze': return 'Bronze';
        case 'marketing': return 'Marketing';
        case 'csr': return 'CSR';
        case 'networking': return 'Networking';
        default: return key;
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section avec Carrousel */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <HeroCarousel language={language} />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Bouton de retour simple */}
            <Link 
              href="/public"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-emerald-200 mb-8 transition-colors group"
            >
              <Home className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
            
            {/* Contenu Hero */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 mb-6">
                  <Handshake className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {language === 'fr' ? 'Partenariat Stratégique' : 'Strategic Partnership'}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {t.title}
                </h1>
                <p className="text-xl text-emerald-100 mb-6">
                  {t.subtitle}
                </p>
                <p className="text-lg text-white/90 max-w-3xl">
                  {t.intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Graphiques et Statistiques */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t.stats.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t.stats.subtitle}
              </p>
            </div>
            
            {/* Graphique 1: Croissance des Partenariats */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Évolution des Partenariats par Niveau' : 'Partnership Evolution by Level'}
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sponsorshipGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={getLegendText} />
                    <Area 
                      type="monotone" 
                      dataKey="platinum" 
                      name="Platinum" 
                      stroke="#6b7280" 
                      fill="#6b7280" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="gold" 
                      name="Gold" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="silver" 
                      name="Silver" 
                      stroke="#94a3b8" 
                      fill="#94a3b8" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="bronze" 
                      name="Bronze" 
                      stroke="#d97706" 
                      fill="#d97706" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphiques 2 et 3 côte à côte */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Graphique 2: Répartition par Secteur */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Répartition des Partenaires par Secteur' : 'Partner Distribution by Sector'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, language === 'fr' ? 'Part' : 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Graphique 3: ROI Metrics */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Métriques de Retour sur Investissement' : 'Return on Investment Metrics'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiMetricsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                      <YAxis type="category" dataKey="metric" stroke="#6b7280" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, language === 'fr' ? 'Satisfaction' : 'Satisfaction']} />
                      <Bar dataKey="value" fill="#059669">
                        {roiMetricsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#059669" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Graphique 4: Impact des Investissements */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Impact des Investissements Partenaires' : 'Partner Investment Impact'}
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={getLegendText} />
                    <Bar 
                      dataKey="marketing" 
                      name="Marketing" 
                      fill="#3b82f6" 
                    />
                    <Bar 
                      dataKey="csr" 
                      name="CSR" 
                      fill="#10b981" 
                    />
                    <Bar 
                      dataKey="networking" 
                      name="Networking" 
                      fill="#8b5cf6" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi Participer avec Images */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {t.whyPartner.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {t.whyPartner.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={idx === 0 ? additionalImages.presentation : 
                             idx === 1 ? additionalImages.csrEvent : 
                             idx === 2 ? additionalImages.initialMeeting : 
                             additionalImages.globalization}
                        alt={point}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {point}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partnership Levels avec Images */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Niveaux de Partenariat' : 'Partnership Levels'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.levels.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={idx === 0 ? additionalImages.csrEvent : 
                               idx === 1 ? additionalImages.presentation : 
                               additionalImages.initialMeeting}
                          alt={level.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${level.color}`}>
                            <level.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {level.title}
                          </h3>
                        </div>
                        
                        <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {level.investment}
                          </p>
                        </div>
                        
                        <ul className="space-y-3">
                          {level.benefits.map((benefit, benefitIdx) => (
                            <li key={benefitIdx} className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
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
        </div>
      </section>

      {/* Section Valeur Ajoutée */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Valeur Ajoutée' : 'Value Proposition'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {t.valueProposition.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <item.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus de Partenariat */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Processus de Partenariat' : 'Partnership Process'}
            </h2>
            
            <div className="relative">
              {/* Ligne de connexion */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-300 transform -translate-x-1/2" />
              
              <div className="space-y-12 lg:space-y-0">
                {t.process.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col lg:flex-row items-center ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Point sur la ligne */}
                    <div className="hidden lg:block absolute left-1/2 top-12 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10" />
                    
                    {/* Contenu */}
                    <div className={`lg:w-1/2 ${idx % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'} mb-8 lg:mb-0`}>
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                              {step.step}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Espace pour la ligne sur mobile */}
                    <div className="lg:hidden w-full h-px bg-gradient-to-r from-emerald-500 to-transparent my-8" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <Image
          src={additionalImages.globalNetwork}
          alt={language === 'fr' ? 'Réseau d\'affaires global' : 'Global business network'}
          fill
          className="object-cover opacity-10"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-12">
              <div className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-sm mb-8">
                <Handshake className="h-12 w-12" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
                {t.message}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-700 hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/public/partners/institutional" className="flex items-center">
                  {language === 'fr' ? 'Partenariats Institutionnels' : 'Institutional Partnerships'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}