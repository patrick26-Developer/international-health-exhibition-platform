// app/public/partners/institutional/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Building2, Globe, Shield, Target, Users, Handshake, ArrowRight, Award, BarChart3, TrendingUp, ChevronLeft, ChevronRight, Pause, Play, CheckCircle, MapPin, Users2, FileText, Home } from 'lucide-react';
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

// Images pour le carrousel Hero avec TOUTES les images disponibles
const heroImages = [
  {
    id: 1,
    src: '/images/partners/Hero/global-health-summit.png',
    alt: { 
      fr: 'Sommet mondial de la santé', 
      en: 'Global health summit' 
    },
    title: { 
      fr: 'Diplomatie Santé Internationale', 
      en: 'International Health Diplomacy' 
    }
  },
  {
    id: 2,
    src: '/images/partners/Hero/ministry-signing-ceremony.png',
    alt: { 
      fr: 'Cérémonie de signature avec ministère', 
      en: 'Ministry signing ceremony' 
    },
    title: { 
      fr: 'Accords Stratégiques Nationaux', 
      en: 'National Strategic Agreements' 
    }
  },
  {
    id: 3,
    src: '/images/partners/Hero/who-headquarters.png',
    alt: { 
      fr: 'Siège de l\'OMS', 
      en: 'WHO headquarters' 
    },
    title: { 
      fr: 'Coopération avec Organisations Internationales', 
      en: 'Cooperation with International Organizations' 
    }
  },
  {
    id: 4,
    src: '/images/partners/Hero/health-diplomacy.png',
    alt: { 
      fr: 'Diplomatie sanitaire internationale', 
      en: 'International health diplomacy' 
    },
    title: { 
      fr: 'Relations Internationales de Santé', 
      en: 'International Health Relations' 
    }
  },
  {
    id: 5,
    src: '/images/partners/Hero/policy-roundtable.png',
    alt: { 
      fr: 'Table ronde sur les politiques de santé', 
      en: 'Health policy roundtable' 
    },
    title: { 
      fr: 'Dialogues Politiques', 
      en: 'Policy Dialogues' 
    }
  }
];

// Toutes les images des bénéfices
const benefitsImages = [
  '/images/partners/Valeurs-Ajoutées/freepik__35mm-film-photography-runion-datelier-collaborativ__63067.png',
  '/images/partners/Valeurs-Ajoutées/freepik__35mm-film-photography-personnel-formant-bnvoles-di__63068.png',
  '/images/partners/Valeurs-Ajoutées/freepik__the-style-is-candid-image-photography-with-natural__63069.png',
  '/images/partners/Valeurs-Ajoutées/freepik__infographic-showing-public-policy-impact-clear-ico__63070.png'
];

// Toutes les images des types de partenaires
const partnerTypeImages = [
  '/images/partners/Types-de-Partenaires/ministry-building.png',
  '/images/partners/Types-de-Partenaires/international-organization.png',
  '/images/partners/Types-de-Partenaires/local-government-meeting.png',
  '/images/partners/Types-de-Partenaires/hospital-research-center.png'
];

// Toutes les images du modèle de collaboration
const collaborationImages = [
  '/images/partners/Modèle-de-Collaboration/co-creation-workshop.png',
  '/images/partners/Modèle-de-Collaboration/field-implementation-team.png'
];

// Images supplémentaires
const additionalImages = {
  worldMap: '/images/partners/carte-du-monde-numerique-abstraite-lignes-connexion-points-illustration-vectorielle-reseaux-mondiaux-communication-internationale-carte-du-monde-comme-symbole-du-reseau-mondial-ai-genere.avif',
  globeConnections: '/images/partners/pngtree-the-globe-with-lines-of-connection-is-shown-picture-image_2728782.jpg',
  handshake: '/images/partners/poignee-main-professionnelle-entre-deux-hommes-affaires-scellant-accord_108146-8430.avif',
  partnershipHandshake: '/images/partners/trust-partnership-handshake.jpg',
  sdg: '/images/partners/sustainable-development-goals.jpg',
  leadership: '/images/partners/institutional-leadership.png'
};

// Composant HeroCarousel optimisé
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

export default function InstitutionalPartnersPage() {
  const { language } = useLanguageStore();
  
  // Données pour les graphiques - CORRIGÉES
  const partnershipGrowthData = [
    { year: '2020', institutions: 5, international: 3, local: 8 },
    { year: '2021', institutions: 8, international: 5, local: 12 },
    { year: '2022', institutions: 12, international: 8, local: 18 },
    { year: '2023', institutions: 18, international: 12, local: 25 },
    { year: '2024', institutions: 25, international: 15, local: 35 },
  ];

  // Données dynamiques basées sur la langue - CORRIGÉES
  const partnerDistribution = language === 'fr' ? [
    { 
      name: 'Ministères', 
      value: 35,
      color: '#059669',
      description: 'Autorités nationales de santé'
    },
    { 
      name: 'Agences ONU', 
      value: 25,
      color: '#2563eb',
      description: 'Organisations internationales'
    },
    { 
      name: 'Collectivités', 
      value: 20,
      color: '#d97706',
      description: 'Gouvernements locaux et régionaux'
    },
    { 
      name: 'Institutions Santé', 
      value: 20,
      color: '#7c3aed',
      description: 'Hôpitaux et centres de recherche'
    }
  ] : [
    { 
      name: 'Ministries', 
      value: 35,
      color: '#059669',
      description: 'National health authorities'
    },
    { 
      name: 'UN Agencies', 
      value: 25,
      color: '#2563eb',
      description: 'International organizations'
    },
    { 
      name: 'Local Gov.', 
      value: 20,
      color: '#d97706',
      description: 'Local and regional governments'
    },
    { 
      name: 'Health Inst.', 
      value: 20,
      color: '#7c3aed',
      description: 'Hospitals and research centers'
    }
  ];

  const collaborationImpactData = language === 'fr' ? [
    { subject: 'Impact Santé', value: 85, fullMark: 100 },
    { subject: 'Politiques', value: 78, fullMark: 100 },
    { subject: 'Communautés', value: 92, fullMark: 100 },
    { subject: 'Durabilité', value: 80, fullMark: 100 },
    { subject: 'Innovation', value: 75, fullMark: 100 },
  ] : [
    { subject: 'Health Impact', value: 85, fullMark: 100 },
    { subject: 'Policies', value: 78, fullMark: 100 },
    { subject: 'Communities', value: 92, fullMark: 100 },
    { subject: 'Sustainability', value: 80, fullMark: 100 },
    { subject: 'Innovation', value: 75, fullMark: 100 },
  ];

  const content = {
    fr: {
      title: 'Partenaires Institutionnels',
      subtitle: 'Alliances stratégiques pour la santé publique durable',
      intro: 'Nous établissons des partenariats structurés avec les acteurs publics et institutionnels pour renforcer l\'impact des politiques de santé et favoriser une prévention efficace.',
      
      stats: {
        title: 'Impact Mesurable de Nos Partenariats',
        subtitle: 'Données quantitatives illustrant la portée et l\'efficacité de nos collaborations institutionnelles'
      },
      
      benefits: [
        {
          title: 'Alignement Politique',
          description: 'Harmonisation avec les stratégies nationales et internationales de santé publique'
        },
        {
          title: 'Expertise Conjointe',
          description: 'Mobilisation des compétences institutionnelles pour des solutions adaptées'
        },
        {
          title: 'Portée Élargie',
          description: 'Accès à des réseaux institutionnels étendus pour une plus grande influence'
        },
        {
          title: 'Durabilité',
          description: 'Création de cadres de collaboration pérennes et structurants'
        }
      ],
      
      types: [
        {
          icon: Building2,
          title: 'Ministères & Agences Gouvernementales',
          description: 'Collaboration avec les autorités nationales de santé publique'
        },
        {
          icon: Globe,
          title: 'Organisations Internationales',
          description: 'Partenariats avec l\'OMS, ONU et autres agences spécialisées'
        },
        {
          icon: Shield,
          title: 'Collectivités Territoriales',
          description: 'Coopération avec régions, départements et municipalités'
        },
        {
          icon: Users,
          title: 'Institutions de Santé Publique',
          description: 'Alliances avec hôpitaux, centres de recherche et instituts'
        }
      ],
      
      value: 'Un partenariat institutionnel avec le S.I.S. représente un investissement stratégique dans la santé publique durable, générant des retours mesurables en termes de santé des populations et de performance des systèmes.',
      
      message: 'Ensemble, transformons la prévention en priorité d\'action publique pour des sociétés plus saines et résilientes.',
      
      collaborationSteps: [
        {
          phase: '1',
          title: 'Cadrage Stratégique',
          description: 'Définition conjointe des objectifs et cadres d\'intervention'
        },
        {
          phase: '2',
          title: 'Co-développement',
          description: 'Élaboration collaborative des programmes et outils'
        },
        {
          phase: '3',
          title: 'Mise en Œuvre',
          description: 'Déploiement opérationnel avec suivi rigoureux'
        }
      ]
    },
    en: {
      title: 'Institutional Partners',
      subtitle: 'Strategic alliances for sustainable public health',
      intro: 'We establish structured partnerships with public and institutional stakeholders to strengthen the impact of health policies and promote effective prevention.',
      
      stats: {
        title: 'Measurable Impact of Our Partnerships',
        subtitle: 'Quantitative data illustrating the reach and effectiveness of our institutional collaborations'
      },
      
      benefits: [
        {
          title: 'Policy Alignment',
          description: 'Harmonization with national and international public health strategies'
        },
        {
          title: 'Joint Expertise',
          description: 'Mobilization of institutional competencies for adapted solutions'
        },
        {
          title: 'Extended Reach',
          description: 'Access to extensive institutional networks for greater influence'
        },
        {
          title: 'Sustainability',
          description: 'Creation of enduring and structuring collaboration frameworks'
        }
      ],
      
      types: [
        {
          icon: Building2,
          title: 'Ministries & Government Agencies',
          description: 'Collaboration with national public health authorities'
        },
        {
          icon: Globe,
          title: 'International Organizations',
          description: 'Partnerships with WHO, UN and other specialized agencies'
        },
        {
          icon: Shield,
          title: 'Local Governments',
          description: 'Cooperation with regions, departments and municipalities'
        },
        {
          icon: Users,
          title: 'Public Health Institutions',
          description: 'Alliances with hospitals, research centers and institutes'
        }
      ],
      
      value: 'An institutional partnership with S.I.S. represents a strategic investment in sustainable public health, generating measurable returns in terms of population health and system performance.',
      
      message: 'Together, let\'s transform prevention into a public action priority for healthier and more resilient societies.',
      
      collaborationSteps: [
        {
          phase: '1',
          title: 'Strategic Framing',
          description: 'Joint definition of objectives and intervention frameworks'
        },
        {
          phase: '2',
          title: 'Co-development',
          description: 'Collaborative development of programs and tools'
        },
        {
          phase: '3',
          title: 'Implementation',
          description: 'Operational deployment with rigorous monitoring'
        }
      ]
    }
  };

  const t = content[language];

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
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
        case 'institutions': return 'Institutions';
        case 'international': return 'International';
        case 'local': return 'Local';
        default: return key;
      }
    } else {
      switch (key) {
        case 'institutions': return 'Institutions';
        case 'international': return 'International';
        case 'local': return 'Local';
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
                  <Building2 className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {language === 'fr' ? 'Partenariat Institutionnel' : 'Institutional Partnership'}
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

      {/* Section Graphiques */}
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
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Graphique Croissance */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  {language === 'fr' ? 'Évolution des Partenariats' : 'Partnerships Evolution'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={partnershipGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend formatter={getLegendText} />
                      <Area 
                        type="monotone" 
                        dataKey="institutions" 
                        name={language === 'fr' ? 'Institutions' : 'Institutions'} 
                        stroke="#059669" 
                        fill="#059669" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="international" 
                        name={language === 'fr' ? 'International' : 'International'} 
                        stroke="#2563eb" 
                        fill="#2563eb" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="local" 
                        name={language === 'fr' ? 'Local' : 'Local'} 
                        stroke="#d97706" 
                        fill="#d97706" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Graphique Répartition */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  {language === 'fr' ? 'Répartition des Partenaires' : 'Partners Distribution'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partnerDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {partnerDistribution.map((entry, index) => (
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
            </div>
            
            {/* Graphique Radar */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Impact Multidimensionnel' : 'Multidimensional Impact'}
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={collaborationImpactData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" />
                    <Radar
                      name={language === 'fr' ? 'Performance' : 'Performance'}
                      dataKey="value"
                      stroke="#059669"
                      fill="#059669"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs Ajoutées avec Images */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Valeur Ajoutée du Partenariat' : 'Partnership Value Added'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {t.benefits.map((benefit, idx) => (
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
                        src={benefitsImages[idx]}
                        alt={benefit.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Types de Partenaires avec Images */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Nos Partenaires Institutionnels' : 'Our Institutional Partners'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.types.map((type, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={partnerTypeImages[idx]}
                        alt={type.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center p-6">
                      <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 -mt-8 relative z-10">
                        <type.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Modèle de Collaboration avec Images */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Processus de Collaboration' : 'Collaboration Process'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {t.collaborationSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={collaborationImages[idx] || additionalImages.globeConnections}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-900/40 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                      {step.phase}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image supplémentaire de leadership */}
            <div className="mt-16">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl">
                <Image
                  src={additionalImages.leadership}
                  alt={language === 'fr' ? 'Leadership Institutionnel' : 'Institutional Leadership'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-900/40" />
                <div className="relative z-10 h-full flex items-center justify-center p-8">
                  <div className="text-center text-white max-w-2xl">
                    <h3 className="text-2xl font-bold mb-4">
                      {language === 'fr' ? 'Leadership Partagé' : 'Shared Leadership'}
                    </h3>
                    <p className="text-lg">
                      {language === 'fr' 
                        ? 'Une gouvernance collaborative pour maximiser l\'impact des politiques de santé publique'
                        : 'Collaborative governance to maximize the impact of public health policies'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA avec Images */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <Image
          src={additionalImages.sdg}
          alt="Objectifs de développement durable"
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
              <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
                {t.value}
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
                <Link href="/public" className="flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}