'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Heart, Target, Users, Award, Shield, Sparkles, ArrowRight, CheckCircle2, BarChart3, Globe, Leaf, ChevronLeft, ChevronRight, Pause, Play, Home, FileText, Building2, Users2, MapPin, Clock, Handshake } from 'lucide-react';
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
  Area
} from 'recharts';

// Images carrousel HERO
const heroImages = [
  {
    id: 1,
    src: '/images/mecenat/health-summit-professional-diverse-conference-sizelarge.png',
    alt: { 
      fr: 'Sommet santé professionnel avec public diversifié', 
      en: 'Professional health summit with diverse audience' 
    },
    title: { 
      fr: 'Sommet International', 
      en: 'International Summit' 
    }
  },
  {
    id: 2,
    src: '/images/mecenat/global-health-partnership-signing-ceremony-vector.png',
    alt: { 
      fr: 'Cérémonie de signature partenariat santé mondial', 
      en: 'Global health partnership signing ceremony' 
    },
    title: { 
      fr: 'Signature Partenariat', 
      en: 'Partnership Signing' 
    }
  },
  {
    id: 3,
    src: '/images/mecenat/ministry-of-health-meeting-officials-cartoon-illustration.png',
    alt: { 
      fr: 'Réunion ministère de la santé avec officiels', 
      en: 'Ministry of Health meeting with officials' 
    },
    title: { 
      fr: 'Collaboration Institutionnelle', 
      en: 'Institutional Collaboration' 
    }
  },
  {
    id: 4,
    src: '/images/mecenat/corporate-wellness-office-exercise-employees-gym.png',
    alt: { 
      fr: 'Bien-être en entreprise, exercices pour employés', 
      en: 'Corporate wellness, employee exercises' 
    },
    title: { 
      fr: 'Bien-être Corporatif', 
      en: 'Corporate Well-being' 
    }
  }
];

// Images sections
const sectionImages = [
  {
    id: 1,
    src: '/images/mecenat/Images-de-programmes-philanthropiques-sur-le-terrain.png',
    alt: { 
      fr: 'Programmes philanthropiques sur le terrain', 
      en: 'Philanthropic programs in the field' 
    },
    title: { 
      fr: 'Actions Terrain', 
      en: 'Field Actions' 
    }
  },
  {
    id: 2,
    src: '/images/mecenat/Images-illustrant-impact-des-dons-communautés-bénéficiaires.png',
    alt: { 
      fr: 'Impact des donations sur les communautés bénéficiaires', 
      en: 'Impact of donations on beneficiary communities' 
    },
    title: { 
      fr: 'Impact Communautaire', 
      en: 'Community Impact' 
    }
  },
  {
    id: 3,
    src: '/images/mecenat/Photos-de-donateurspartenaires-philanthropiques.png',
    alt: { 
      fr: 'Donateurs et partenaires philanthropiques', 
      en: 'Donors and philanthropic partners' 
    },
    title: { 
      fr: 'Nos Donateurs', 
      en: 'Our Donors' 
    }
  }
];

// Composant Carrousel Hero
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
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/50 to-emerald-900/20 z-10" />
      
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
            quality={90}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Contrôles */}
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
              aria-label={`Go to image ${index + 1}`}
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
      
      {/* Navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

// Page principale
export default function PhilanthropyPage() {
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState('impact');
  
  // Références pour chaque section
  const impactRef = useRef<HTMLElement>(null);
  const programsRef = useRef<HTMLElement>(null);
  const governanceRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

  // Fonction pour naviguer vers une section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    
    let ref = null;
    switch(sectionId) {
      case 'impact':
        ref = impactRef;
        break;
      case 'programs':
        ref = programsRef;
        break;
      case 'governance':
        ref = governanceRef;
        break;
      case 'partners':
        ref = partnersRef;
        break;
    }
    
    if (ref?.current) {
      const offset = 80; // Offset pour la navbar sticky
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Observer pour changer l'onglet actif au scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveTab(sectionId);
        }
      });
    }, options);

    // Observer chaque section
    const sections = [impactRef, programsRef, governanceRef, partnersRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Données pour graphiques
  const impactGrowthData = [
    { year: '2020', beneficiaries: 2500, programs: 3, investment: 125000 },
    { year: '2021', beneficiaries: 5200, programs: 5, investment: 280000 },
    { year: '2022', beneficiaries: 10500, programs: 8, investment: 450000 },
    { year: '2023', beneficiaries: 18500, programs: 12, investment: 750000 },
    { year: '2024', beneficiaries: 32000, programs: 18, investment: 1200000 },
  ];

  const fundAllocationData = language === 'fr' ? [
    { name: 'Programmes terrain', value: 70, color: '#059669' },
    { name: 'Recherche & Innovation', value: 15, color: '#2563eb' },
    { name: 'Formation & Renforcement', value: 10, color: '#d97706' },
    { name: 'Gouvernance', value: 5, color: '#6b7280' }
  ] : [
    { name: 'Field Programs', value: 70, color: '#059669' },
    { name: 'Research & Innovation', value: 15, color: '#2563eb' },
    { name: 'Training & Capacity', value: 10, color: '#d97706' },
    { name: 'Governance', value: 5, color: '#6b7280' }
  ];

  const geographicImpactData = language === 'fr' ? [
    { region: 'Afrique de l\'Ouest', programs: 8, beneficiaries: 12000 },
    { region: 'Afrique Centrale', programs: 5, beneficiaries: 8000 },
    { region: 'Afrique de l\'Est', programs: 4, beneficiaries: 6000 },
    { region: 'Europe', programs: 3, beneficiaries: 4000 },
    { region: 'Asie', programs: 2, beneficiaries: 2000 }
  ] : [
    { region: 'West Africa', programs: 8, beneficiaries: 12000 },
    { region: 'Central Africa', programs: 5, beneficiaries: 8000 },
    { region: 'East Africa', programs: 4, beneficiaries: 6000 },
    { region: 'Europe', programs: 3, beneficiaries: 4000 },
    { region: 'Asia', programs: 2, beneficiaries: 2000 }
  ];

  const roiMetricsData = [
    { metric: language === 'fr' ? 'Santé Publique' : 'Public Health', value: 85 },
    { metric: language === 'fr' ? 'Développement Social' : 'Social Development', value: 78 },
    { metric: language === 'fr' ? 'Économie Locale' : 'Local Economy', value: 65 },
    { metric: language === 'fr' ? 'Innovation' : 'Innovation', value: 72 },
    { metric: language === 'fr' ? 'Durabilité' : 'Sustainability', value: 88 }
  ];

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
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

  const content = {
    fr: {
      title: 'Mécénat Santé',
      subtitle: 'Investissement philanthropique stratégique pour la santé publique durable',
      intro: 'Le Salon International de la Santé propose un cadre structuré de mécénat santé, aligné sur les Objectifs de Développement Durable et les priorités de l\'OMS.',
      
      // Tabs
      tabs: {
        impact: 'Impact & Résultats',
        programs: 'Programmes',
        governance: 'Gouvernance',
        partners: 'Partenaires'
      },
      
      // Value Proposition
      valueProposition: {
        title: 'Philanthropie à Impact Mesurable',
        subtitle: 'Une approche structurée, transparente et orientée résultats',
        points: [
          'Alignement stratégique avec les Objectifs de Développement Durable',
          'Indicateurs d\'impact validés par l\'OMS',
          'Traçabilité complète des fonds aux résultats terrain',
          'Reporting institutionnel standardisé'
        ]
      },
      
      // Key Stats
      keyStats: [
        { value: '32,000+', label: 'Bénéficiaires directs', icon: Users2 },
        { value: '18', label: 'Programmes actifs', icon: FileText },
        { value: '12', label: 'Pays d\'intervention', icon: MapPin },
        { value: '5 ans', label: 'Suivi d\'impact', icon: Clock }
      ],
      
      // Programs Focus
      programs: [
        {
          icon: Users,
          title: 'Santé Communautaire',
          description: 'Programmes de prévention dans les zones vulnérables',
          impact: 'Réduction de 40% des facteurs de risque MNT',
          imageIndex: 0
        },
        {
          icon: Leaf,
          title: 'Innovation Sociale',
          description: 'Recherche-action sur les déterminants de santé',
          impact: '5 modèles réplicables développés',
          imageIndex: 1
        },
        {
          icon: Globe,
          title: 'Éducation Santé',
          description: 'Campagnes nationales et outils pédagogiques',
          impact: '500,000 personnes sensibilisées',
          imageIndex: 0
        },
        {
          icon: Shield,
          title: 'Renforcement Institutionnel',
          description: 'Formation des acteurs de santé publique',
          impact: '750 professionnels formés',
          imageIndex: 2
        }
      ],
      
      // Giving Framework
      givingFramework: {
        title: 'Cadre d\'Investissement Philanthropique',
        levels: [
          {
            level: 'Contributeur Stratégique',
            range: '10,000 - 50,000 €',
            focus: 'Programmes ciblés régionaux',
            benefits: [
              'Rapport d\'impact détaillé',
              'Reconnaissance institutionnelle',
              'Participation aux comités techniques'
            ],
            color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
          },
          {
            level: 'Partenaire Fondateur',
            range: '50,000 - 200,000 €',
            focus: 'Programmes multi-pays innovants',
            benefits: [
              'Visibilité leadership internationale',
              'Participation au conseil stratégique',
              'Études d\'impact personnalisées'
            ],
            color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
          },
          {
            level: 'Alliance Institutionnelle',
            range: '200,000 € +',
            focus: 'Transformations systémiques',
            benefits: [
              'Co-création de programmes',
              'Positionnement ODD mondial',
              'Partenariat de haut niveau'
            ],
            color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
          }
        ]
      },
      
      impactCalculator: {
        title: 'Votre Impact en Chiffres',
        examples: [
          '10,000€ = 100 ateliers de prévention diabète',
          '25,000€ = Programme annuel dans une région prioritaire',
          '50,000€ = Recherche-action sur les comportements santé',
          '100,000€ = Partenaire fondateur d\'un programme pérenne'
        ]
      },
      
      governance: {
        title: 'Gouvernance & Transparence',
        principles: [
          'Conformité aux standards internationaux (OMS, ONU)',
          'Audit annuel par cabinet indépendant',
          'Publication des rapports financiers',
          'Comité d\'éthique pluridisciplinaire',
          'Indicateurs alignés Objectifs Développement Durable'
        ]
      },
      
      partners: {
        title: 'Nos Partenaires Philanthropiques',
        description: 'Des institutions de renom engagées pour la santé durable',
        logos: [
          { name: 'Fondation Internationale Santé', type: 'Fondation' },
          { name: 'Groupe Santé Global', type: 'Entreprise' },
          { name: 'Institut Recherche Médicale', type: 'Institut' },
          { name: 'Alliance Santé Publique', type: 'Réseau' }
        ]
      },
      
      message: 'Votre générosité construit les fondations d\'un système de santé préventif et durable pour les générations futures.',
      
      cta: {
        primary: 'Devenir Donateur',
        secondary: 'Demander le Livret',
        actions: [
          { label: 'Demander une proposition détaillée', href: '/contact' },
          { label: 'Rencontrer notre équipe', href: '/contact' },
          { label: 'Télécharger le dossier institutionnel', href: '/documents/philanthropy-framework.pdf' }
        ]
      }
    },
    en: {
      title: 'Health Philanthropy',
      subtitle: 'Strategic philanthropic investment for sustainable public health',
      intro: 'The International Health Fair offers a structured health philanthropy framework, aligned with Sustainable Development Goals and WHO priorities.',
      
      // Tabs
      tabs: {
        impact: 'Impact & Results',
        programs: 'Programs',
        governance: 'Governance',
        partners: 'Partners'
      },
      
      // Value Proposition
      valueProposition: {
        title: 'Measurable Impact Philanthropy',
        subtitle: 'A structured, transparent, and results-oriented approach',
        points: [
          'Strategic alignment with Sustainable Development Goals',
          'WHO-validated impact indicators',
          'Complete fund-to-results traceability',
          'Standardized institutional reporting'
        ]
      },
      
      // Key Stats
      keyStats: [
        { value: '32,000+', label: 'Direct beneficiaries', icon: Users2 },
        { value: '18', label: 'Active programs', icon: FileText },
        { value: '12', label: 'Countries of intervention', icon: MapPin },
        { value: '5 years', label: 'Impact monitoring', icon: Clock }
      ],
      
      // Programs Focus
      programs: [
        {
          icon: Users,
          title: 'Community Health',
          description: 'Prevention programs in vulnerable areas',
          impact: '40% reduction in NCD risk factors',
          imageIndex: 0
        },
        {
          icon: Leaf,
          title: 'Social Innovation',
          description: 'Action-research on health determinants',
          impact: '5 replicable models developed',
          imageIndex: 1
        },
        {
          icon: Globe,
          title: 'Health Education',
          description: 'National campaigns and educational tools',
          impact: '500,000 people reached',
          imageIndex: 0
        },
        {
          icon: Shield,
          title: 'Institutional Strengthening',
          description: 'Training of public health actors',
          impact: '750 professionals trained',
          imageIndex: 2
        }
      ],
      
      // Giving Framework
      givingFramework: {
        title: 'Philanthropic Investment Framework',
        levels: [
          {
            level: 'Strategic Contributor',
            range: '€10,000 - €50,000',
            focus: 'Targeted regional programs',
            benefits: [
              'Detailed impact report',
              'Institutional recognition',
              'Participation in technical committees'
            ],
            color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
          },
          {
            level: 'Founding Partner',
            range: '€50,000 - €200,000',
            focus: 'Innovative multi-country programs',
            benefits: [
              'International leadership visibility',
              'Strategic board participation',
              'Customized impact studies'
            ],
            color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
          },
          {
            level: 'Institutional Alliance',
            range: '€200,000 +',
            focus: 'Systemic transformations',
            benefits: [
              'Program co-creation',
              'Global SDG positioning',
              'High-level partnership'
            ],
            color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
          }
        ]
      },
      
      impactCalculator: {
        title: 'Your Impact in Numbers',
        examples: [
          '€10,000 = 100 diabetes prevention workshops',
          '€25,000 = Annual program in priority region',
          '€50,000 = Action-research on health behaviors',
          '€100,000 = Founding partner of sustainable program'
        ]
      },
      
      governance: {
        title: 'Governance & Transparency',
        principles: [
          'Compliance with international standards (WHO, UN)',
          'Annual audit by independent firm',
          'Financial reports publication',
          'Multidisciplinary ethics committee',
          'SDG-aligned indicators'
        ]
      },
      
      partners: {
        title: 'Our Philanthropic Partners',
        description: 'Renowned institutions committed to sustainable health',
        logos: [
          { name: 'International Health Foundation', type: 'Foundation' },
          { name: 'Global Health Group', type: 'Company' },
          { name: 'Medical Research Institute', type: 'Institute' },
          { name: 'Public Health Alliance', type: 'Network' }
        ]
      },
      
      message: 'Your generosity builds the foundations of a preventive and sustainable health system for future generations.',
      
      cta: {
        primary: 'Become a Donor',
        secondary: 'Request Brochure',
        actions: [
          { label: 'Request detailed proposal', href: '/contact' },
          { label: 'Meet our team', href: '/contact' },
          { label: 'Download institutional dossier', href: '/documents/philanthropy-framework.pdf' }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Section Hero avec Carrousel */}
      <section className="relative min-h-[70vh] flex items-center py-12 overflow-hidden">
        <HeroCarousel language={language} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-10"
            >
              {/* Bouton retour */}
              <Link 
                href="/public/partners"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-emerald-200 mb-6 group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {language === 'fr' ? 'Retour aux partenariats' : 'Back to partnerships'}
              </Link>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 mb-8">
                <Heart className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Philanthropie Stratégique' : 'Strategic Philanthropy'}
                </span>
              </div>
              
              {/* Titres */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {t.title}
              </h1>
              
              <p className="text-2xl md:text-3xl text-emerald-300 mb-8 font-semibold leading-snug drop-shadow-xl">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-white/95 mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
                {t.intro}
              </p>
              
              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                  <Link href="/public/contact" className="flex items-center">
                    {t.cta.primary}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="border-2 dark:border-white border-emerald-600 dark:text-white text-emerald-700 hover:bg-emerald-50 dark:hover:bg-white/20 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-105">
                  <Link href="#impact">
                    {language === 'fr' ? 'Découvrir l\'Impact' : 'Discover Impact'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
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

      {/* Tabs de Navigation - Scroll automatique */}
      <section className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {Object.entries(t.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques Clés */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.keyStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION IMPACT & RÉSULTATS */}
      <section 
        id="impact" 
        ref={impactRef}
        className="py-16 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Target className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.tabs.impact}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Mesure précise de notre impact sanitaire, social et économique' 
                  : 'Precise measurement of our health, social and economic impact'}
              </p>
            </div>
            
            {/* Grid de graphiques */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Graphique Évolution */}
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Évolution de l\'Impact' : 'Impact Evolution'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impactGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="beneficiaries" 
                        name={language === 'fr' ? 'Bénéficiaires' : 'Beneficiaries'} 
                        stroke="#059669" 
                        fill="#059669" 
                        fillOpacity={0.1}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="programs" 
                        name={language === 'fr' ? 'Programmes' : 'Programs'} 
                        stroke="#2563eb" 
                        fill="#2563eb" 
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Graphique Répartition */}
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Allocation des Fonds' : 'Fund Allocation'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fundAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {fundAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, language === 'fr' ? 'Part' : 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Graphiques supplémentaires */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Impact Géographique' : 'Geographic Impact'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geographicImpactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="region" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="beneficiaries" name={language === 'fr' ? 'Bénéficiaires' : 'Beneficiaries'} fill="#059669" />
                      <Bar dataKey="programs" name={language === 'fr' ? 'Programmes' : 'Programs'} fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Indicateurs de Performance' : 'Performance Indicators'}
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiMetricsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                      <YAxis type="category" dataKey="metric" stroke="#6b7280" width={120} />
                      <Tooltip formatter={(value) => [`${value}%`, language === 'fr' ? 'Score' : 'Score']} />
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
          </div>
        </div>
      </section>

      {/* SECTION PROGRAMMES */}
      <section 
        id="programs" 
        ref={programsRef}
        className="py-16 bg-gray-50 dark:bg-gray-900/50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <FileText className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.tabs.programs}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Nos programmes structurés pour un impact sanitaire durable' 
                  : 'Our structured programs for sustainable health impact'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {t.programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={sectionImages[program.imageIndex].src}
                        alt={sectionImages[program.imageIndex].alt[language]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <program.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {program.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {program.description}
                      </p>
                      
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {program.impact}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION GOUVERNANCE */}
      <section 
        id="governance" 
        ref={governanceRef}
        className="py-16 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.tabs.governance}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Un cadre de gouvernance rigoureux et transparent' 
                  : 'A rigorous and transparent governance framework'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {t.governance.principles.map((principle, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                    <p className="text-gray-700 dark:text-gray-300">{principle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculateur d'Impact */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-center mb-8">
                <BarChart3 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t.impactCalculator.title}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.impactCalculator.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full p-6 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-gray-900 hover:border-emerald-300 dark:hover:border-emerald-400 transition-colors">
                      <div className="text-center">
                        <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 group-hover:scale-110 transition-transform">
                          <Sparkles className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {example}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PARTENAIRES */}
      <section 
        id="partners" 
        ref={partnersRef}
        className="py-16 bg-gray-50 dark:bg-gray-900/50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Handshake className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.tabs.partners}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {t.partners.description}
              </p>
            </div>
            
            {/* Cadre d'Investissement */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t.givingFramework.title}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.givingFramework.levels.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium mb-4 ${level.color}`}>
                          {level.level}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {level.range}
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {level.benefits.map((benefit, benefitIdx) => (
                          <li key={benefitIdx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-emerald-200 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        onClick={() => scrollToSection('contact')}
                      >
                        {language === 'fr' ? 'Choisir ce niveau' : 'Choose this level'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Partenaires logos */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t.partners.title}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {t.partners.logos.map((partner, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {partner.type}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section 
        id="contact"
        className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800"
      >
        {/* Image de fond */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={sectionImages[1].src}
            alt={sectionImages[1].alt[language]}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Building2 className="h-16 w-16 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'fr' ? 'Devenir Acteur du Changement Sanitaire' : 'Become a Health Change Agent'}
            </h2>
            <p className="text-xl text-emerald-100 mb-10">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {t.cta.actions.map((action, idx) => (
                <Button
                  key={idx}
                  size="lg"
                  variant={idx === 0 ? "secondary" : "outline"}
                  className={`${
                    idx === 0 
                      ? 'bg-white text-emerald-700 hover:bg-white/90' 
                      : 'text-white border-white hover:bg-white/10'
                  } px-8`}
                >
                  <Link href={action.href} className="flex items-center">
                    {action.label}
                    {idx === 0 && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Link>
                </Button>
              ))}
            </div>
            
            {/* Bouton retour accueil */}
            <div className="mt-12">
              <Link 
                href="/public"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Home className="h-4 w-4" />
                {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}