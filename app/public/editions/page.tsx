'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Calendar, MapPin, Users, TrendingUp, Award, ArrowRight, ChevronRight, BarChart3, Globe, Star, Handshake, Download, Eye, ExternalLink, Filter, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function EditionsPage() {
  const { language } = useLanguageStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredEdition, setHoveredEdition] = useState<number | null>(null);
  const [selectedEdition, setSelectedEdition] = useState<number | null>(null);

  const content = {
    fr: {
      title: 'Éditions du S.I.S.',
      subtitle: 'Plateforme évolutive et itinérante au service de la prévention santé',
      intro: 'Chaque édition constitue une étape structurante permettant de renforcer la mobilisation, adapter les actions aux réalités territoriales et mesurer l\'impact.',
      
      editions: [
        {
          id: 1,
          year: '2024',
          title: '7ème Édition',
          location: 'Paris, France',
          country: 'France',
          continent: 'Europe',
          theme: 'Santé Durable : De la Prévention à l\'Action',
          participants: 8500,
          impact: 'Lancement du réseau global de prévention',
          status: 'active',
          color: 'from-emerald-500 to-emerald-600',
          image: '/images/edition/cities/paris-2024.png',
          highlights: ['Réseau global lancé', '30+ pays représentés', 'Nouveaux partenariats OMS'],
          reports: ['Rapport complet 2024', 'Impact économique', 'Étude satisfaction']
        },
        {
          id: 2,
          year: '2023',
          title: '6ème Édition',
          location: 'Genève, Suisse',
          country: 'Suisse',
          continent: 'Europe',
          theme: 'Innovation et Santé Digitale',
          participants: 6800,
          impact: 'Partenariat avec l\'OMS étendu',
          status: 'past',
          color: 'from-emerald-600 to-emerald-700',
          image: '/images/edition/cities/geneva-2023.png',
          highlights: ['Partenaire OMS confirmé', 'Plateforme digitale lancée', 'Start-up santé primées'],
          reports: ['Rapport innovation 2023', 'Étude santé digitale', 'Impact partenariats']
        },
        {
          id: 3,
          year: '2022',
          title: '5ème Édition',
          location: 'Bruxelles, Belgique',
          country: 'Belgique',
          continent: 'Europe',
          theme: 'Santé Mentale Post-Pandémie',
          participants: 5600,
          impact: 'Premier sommet santé mentale européen',
          status: 'past',
          color: 'from-emerald-700 to-emerald-800',
          image: '/images/edition/cities/brussels-2022.png',
          highlights: ['1er sommet santé mentale', 'Charte européenne signée', 'Réseau professionnels créé'],
          reports: ['Rapport santé mentale', 'Étude post-pandémie', 'Recommandations UE']
        },
        {
          id: 4,
          year: '2021',
          title: '4ème Édition',
          location: 'Lyon, France',
          country: 'France',
          continent: 'Europe',
          theme: 'Résilience des Systèmes de Santé',
          participants: 4700,
          impact: 'Format hybride innovant',
          status: 'past',
          color: 'from-emerald-800 to-emerald-900',
          image: '/images/edition/cities/lyon-2021.png',
          highlights: ['Format hybride réussi', 'Résilience systèmes santé', 'Collaboration internationale'],
          reports: ['Rapport résilience 2021', 'Étude format hybride', 'Impact COVID-19']
        },
        {
          id: 5,
          year: '2020',
          title: '3ème Édition',
          location: 'Montréal, Canada',
          country: 'Canada',
          continent: 'Amérique',
          theme: 'Santé Préventive Intelligente',
          participants: 5200,
          impact: 'Expansion internationale réussie',
          status: 'past',
          color: 'from-emerald-900 to-teal-800',
          image: '/images/edition/cities/montreal-2020.png',
          highlights: ['1ère édition hors Europe', 'Réseau Amérique du Nord', 'Technologies préventives'],
          reports: ['Rapport expansion 2020', 'Étude marché nord-américain', 'Impact international']
        }
      ],
      
      stats: [
        { value: '25,600+', label: 'Participants cumulés' },
        { value: '15', label: 'Villes hôtes' },
        { value: '98%', label: 'Satisfaction' },
        { value: '150+', label: 'Partenaires engagés' }
      ],
      
      message: 'Chaque édition du S.I.S. renforce la dynamique de prévention, consolide les partenariats et mesure l\'impact réel sur les territoires.'
    },
    en: {
      title: 'S.I.S. Editions',
      subtitle: 'Evolving and itinerant platform serving health prevention',
      intro: 'Each edition represents a strategic milestone strengthening mobilization, adapting actions to territorial realities, and measuring impact.',
      
      editions: [
        {
          id: 1,
          year: '2024',
          title: '7th Edition',
          location: 'Paris, France',
          country: 'France',
          continent: 'Europe',
          theme: 'Sustainable Health: From Prevention to Action',
          participants: 8500,
          impact: 'Launch of global prevention network',
          status: 'active',
          color: 'from-emerald-500 to-emerald-600',
          image: '/images/edition/cities/paris-2024.png',
          highlights: ['Global network launched', '30+ countries represented', 'New WHO partnerships'],
          reports: ['Full report 2024', 'Economic impact', 'Satisfaction study']
        },
        {
          id: 2,
          year: '2023',
          title: '6th Edition',
          location: 'Geneva, Switzerland',
          country: 'Switzerland',
          continent: 'Europe',
          theme: 'Innovation and Digital Health',
          participants: 6800,
          impact: 'Expanded partnership with WHO',
          status: 'past',
          color: 'from-emerald-600 to-emerald-700',
          image: '/images/edition/cities/geneva-2023.png',
          highlights: ['WHO partnership confirmed', 'Digital platform launched', 'Health start-ups awarded'],
          reports: ['Innovation report 2023', 'Digital health study', 'Partnership impact']
        },
        {
          id: 3,
          year: '2022',
          title: '5th Edition',
          location: 'Brussels, Belgium',
          country: 'Belgium',
          continent: 'Europe',
          theme: 'Post-Pandemic Mental Health',
          participants: 5600,
          impact: 'First European mental health summit',
          status: 'past',
          color: 'from-emerald-700 to-emerald-800',
          image: '/images/edition/cities/brussels-2022.png',
          highlights: ['1st mental health summit', 'European charter signed', 'Professional network created'],
          reports: ['Mental health report', 'Post-pandemic study', 'EU recommendations']
        },
        {
          id: 4,
          year: '2021',
          title: '4th Edition',
          location: 'Lyon, France',
          country: 'France',
          continent: 'Europe',
          theme: 'Health Systems Resilience',
          participants: 4700,
          impact: 'Innovative hybrid format',
          status: 'past',
          color: 'from-emerald-800 to-emerald-900',
          image: '/images/edition/cities/lyon-2021.png',
          highlights: ['Hybrid format successful', 'Health systems resilience', 'International collaboration'],
          reports: ['Resilience report 2021', 'Hybrid format study', 'COVID-19 impact']
        },
        {
          id: 5,
          year: '2020',
          title: '3rd Edition',
          location: 'Montreal, Canada',
          country: 'Canada',
          continent: 'America',
          theme: 'Smart Preventive Health',
          participants: 5200,
          impact: 'Successful international expansion',
          status: 'past',
          color: 'from-emerald-900 to-teal-800',
          image: '/images/edition/cities/montreal-2020.png',
          highlights: ['1st edition outside Europe', 'North America network', 'Preventive technologies'],
          reports: ['Expansion report 2020', 'North American market study', 'International impact']
        }
      ],
      
      stats: [
        { value: '25,600+', label: 'Cumulative participants' },
        { value: '15', label: 'Host cities' },
        { value: '98%', label: 'Satisfaction' },
        { value: '150+', label: 'Committed partners' }
      ],
      
      message: 'Each S.I.S. edition strengthens prevention dynamics, consolidates partnerships, and measures tangible territorial impact.'
    }
  };

  const t = content[language];

  // Filtrage des éditions
  const filteredEditions = t.editions.filter(edition => {
    const matchesSearch = searchTerm === '' || 
      edition.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edition.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edition.year.includes(searchTerm);
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'active' && edition.status === 'active') ||
      (activeFilter === 'past' && edition.status === 'past') ||
      (activeFilter === 'europe' && edition.continent === 'Europe') ||
      (activeFilter === 'america' && edition.continent === 'America');
    
    return matchesSearch && matchesFilter;
  });

  // Données pour les graphiques avec couleurs variées
  const participationData = t.editions.map(edition => ({
    year: edition.year,
    participants: edition.participants,
    name: edition.location,
    color: edition.status === 'active' ? '#059669' : '#10b981'
  })).reverse();

  // Couleurs variées pour les graphiques
  const satisfactionData = [
    { name: language === 'fr' ? 'Très Satisfait' : 'Very Satisfied', value: 78, color: '#3B82F6' }, // Bleu
    { name: language === 'fr' ? 'Satisfait' : 'Satisfied', value: 20, color: '#10B981' }, // Vert
    { name: language === 'fr' ? 'Neutre' : 'Neutral', value: 2, color: '#F59E0B' } // Orange
  ];

  const partnerTypesData = [
    { type: language === 'fr' ? 'Institutions' : 'Institutions', value: 40, color: '#8B5CF6' }, // Violet
    { type: language === 'fr' ? 'Entreprises' : 'Companies', value: 35, color: '#EF4444' }, // Rouge
    { type: language === 'fr' ? 'ONG/Associations' : 'NGOs/Associations', value: 15, color: '#F97316' }, // Orange foncé
    { type: language === 'fr' ? 'Médias' : 'Media', value: 10, color: '#06B6D4' } // Cyan
  ];

  const continentData = [
    { continent: language === 'fr' ? 'Europe' : 'Europe', editions: 4, color: '#10B981' }, // Vert
    { continent: language === 'fr' ? 'Amérique' : 'America', editions: 1, color: '#3B82F6' }, // Bleu
    { continent: language === 'fr' ? 'Asie' : 'Asia', editions: 0, color: '#F59E0B' }, // Jaune
    { continent: language === 'fr' ? 'Afrique' : 'Africa', editions: 0, color: '#8B5CF6' } // Violet
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero avec image et animation */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/edition/hero/hero-editions-main.png"
            alt={language === 'fr' ? 'Salon International de la Santé - Éditions' : 'International Health Fair - Editions'}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/60 to-emerald-700/40 dark:from-emerald-950/90 dark:via-emerald-900/70 dark:to-emerald-800/50" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/public" 
                className="inline-flex items-center gap-2 group text-sm font-medium text-white/90 hover:text-white transition-colors mb-6"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </Link>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8 group hover:bg-white/30 transition-all duration-300">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {language === 'fr' ? 'Éditions Internationales' : 'International Editions'}
                </span>
                <Sparkles className="h-3 w-3 text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                {t.title}
              </h1>
              
              <motion.p 
                className="text-2xl text-emerald-200 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t.subtitle}
              </motion.p>
              
              <p className="text-lg text-white/90 max-w-3xl mb-8">
                {t.intro}
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  variant="outline" 
                  className="text-gray-900 dark:text-white border-gray-300 dark:border-white/50 hover:border-emerald-500 dark:hover:border-white hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-700 dark:hover:text-white transition-all duration-300"
                  onClick={() => {
                    setActiveFilter('active');
                    setTimeout(() => {
                      document.getElementById('editions-section')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }, 100);
                  }}
                >
                  {language === 'fr' ? 'Édition Active' : 'Active Edition'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-gray-900 dark:text-white border-gray-300 dark:border-white/50 hover:border-emerald-500 dark:hover:border-white hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-700 dark:hover:text-white transition-all duration-300"
                  onClick={() => {
                    document.getElementById('stats-section')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {language === 'fr' ? 'Voir les Graphiques' : 'View Charts'}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistiques avec graphiques améliorés - SANS SHADOWS */}
      <section id="stats-section" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-6">
                <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {language === 'fr' ? 'Données & Statistiques' : 'Data & Statistics'}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Impact et Croissance' : 'Impact & Growth'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Une croissance constante et des résultats mesurables depuis notre lancement'
                  : 'Steady growth and measurable results since our launch'
                }
              </p>
            </motion.div>

            {/* Cartes de statistiques SIMPLES - SANS SHADOWS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {t.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Graphiques améliorés avec couleurs variées */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Graphique 1: Évolution des participants */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {language === 'fr' ? 'Évolution des Participants' : 'Participants Evolution'}
                    </h3>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    +38% depuis 2021
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={participationData}>
                      <defs>
                        <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280' }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`${value}`, language === 'fr' ? 'Participants' : 'Participants']}
                        labelFormatter={(label) => `${language === 'fr' ? 'Année' : 'Year'}: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="participants" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        fill="url(#colorParticipants)"
                        name={language === 'fr' ? 'Participants' : 'Participants'}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Graphique 2: Satisfaction interactive */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                      <Star className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {language === 'fr' ? 'Niveau de Satisfaction' : 'Satisfaction Level'}
                    </h3>
                  </div>
                  <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                    98% {language === 'fr' ? 'satisfaits' : 'satisfied'}
                  </span>
                </div>
                <div className="h-64 flex flex-col">
                  <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={satisfactionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {satisfactionData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, language === 'fr' ? 'Pourcentage' : 'Percentage']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #D1D5DB',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Légende détaillée */}
                  <div className="flex justify-center gap-4 mt-4">
                    {satisfactionData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Graphique supplémentaire : Répartition géographique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {language === 'fr' ? 'Répartition Géographique' : 'Geographical Distribution'}
                  </h3>
                </div>
                <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                  2 {language === 'fr' ? 'continents' : 'continents'}
                </span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={continentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="continent" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value}`, language === 'fr' ? 'Éditions' : 'Editions']}
                    />
                    <Bar 
                      dataKey="editions" 
                      name={language === 'fr' ? 'Nombre d\'éditions' : 'Number of editions'}
                      radius={[4, 4, 0, 0]}
                    >
                      {continentData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche - SANS SHADOWS */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'fr' ? 'Filtrer par :' : 'Filter by:'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: language === 'fr' ? 'Toutes' : 'All' },
                    { key: 'active', label: language === 'fr' ? 'Active' : 'Active' },
                    { key: 'past', label: language === 'fr' ? 'Passées' : 'Past' },
                    { key: 'europe', label: language === 'fr' ? 'Europe' : 'Europe' },
                    { key: 'america', label: language === 'fr' ? 'Amérique' : 'America' }
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeFilter === filter.key
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder={language === 'fr' ? 'Rechercher une édition...' : 'Search an edition...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full md:w-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline des Éditions */}
      <section id="editions-section" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Galerie des Éditions' : 'Editions Gallery'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Explorez nos éditions historiques et leurs impacts spécifiques'
                  : 'Explore our historical editions and their specific impacts'
                }
              </p>
              <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                {language === 'fr' 
                  ? `${filteredEditions.length} éditions trouvées`
                  : `${filteredEditions.length} editions found`
                }
              </div>
            </motion.div>
            
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEditions.map((edition, idx) => (
                  <motion.div
                    key={edition.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredEdition(edition.id)}
                    onMouseLeave={() => setHoveredEdition(null)}
                    onClick={() => setSelectedEdition(selectedEdition === edition.id ? null : edition.id)}
                    className="group relative"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 h-full">
                      {/* Image de l'édition */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={edition.image}
                          alt={`${edition.title} - ${edition.location}`}
                          fill
                          className={`object-cover transition-transform duration-500 ${
                            hoveredEdition === edition.id ? 'scale-110' : 'scale-100'
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${edition.color}/90 via-${edition.color}/50 to-transparent`} />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                              {edition.year}
                            </span>
                          </div>
                          {edition.status === 'active' && (
                            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                              <Award className="h-3 w-3" />
                              {language === 'fr' ? 'Active' : 'Active'}
                            </div>
                          )}
                        </div>
                        
                        {/* Indicateur de continent */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                            {edition.continent}
                          </div>
                        </div>
                      </div>
                      
                      {/* Contenu */}
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {edition.location}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {edition.theme}
                          </h3>
                          
                          <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                            {edition.title}
                          </p>
                        </div>
                        
                        {/* Statistiques rapides */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {edition.participants.toLocaleString()}+
                            </span>
                          </div>
                          
                          <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                            {edition.impact}
                          </div>
                        </div>
                        
                        {/* Points forts (affichés au survol/click) */}
                        <AnimatePresence>
                          {(hoveredEdition === edition.id || selectedEdition === edition.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                  {language === 'fr' ? 'Points forts :' : 'Highlights:'}
                                </h4>
                                <ul className="space-y-1.5">
                                  {edition.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {highlight}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex gap-2">
                            <Button className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                          >
                            {language === 'fr' ? 'Détails' : 'Details'}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
            
            {filteredEditions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Aucune édition ne correspond à votre recherche'
                    : 'No edition matches your search'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/edition/hero/global-health-events-collage.png"
            alt={language === 'fr' ? 'Rejoignez le mouvement S.I.S.' : 'Join the I.H.F. movement'}
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-teal-900/90 dark:from-emerald-950/95 dark:via-emerald-900/85 dark:to-teal-950/95" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
              <Calendar className="h-16 w-16 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {t.message}
            </h2>

            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Contribuez à la prochaine édition et participez à la transformation de la prévention santé'
                : 'Contribute to the next edition and participate in transforming health prevention'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-emerald-700 hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Link href="/public/contact" className="flex items-center gap-3">
                  {language === 'fr' ? 'Organiser une Édition' : 'Organize an Edition'}
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-2 border-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/public/partners" className="flex items-center gap-3">
                  {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
                  <Handshake className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}