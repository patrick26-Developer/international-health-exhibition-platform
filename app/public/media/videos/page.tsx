'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { PlayCircle, Film, Users, BookOpen, Target, Clock, Download, Share2, Filter, Search, Play, Calendar, Globe, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function VideosPage() {
  const { language } = useLanguageStore();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const content = {
    fr: {
      title: 'Vidéothèque S.I.S.',
      subtitle: 'Contenus pédagogiques, documentaires et témoignages pour la prévention santé',
      intro: 'Notre vidéothèque rassemble des ressources visuelles éducatives, des reportages terrain et des interventions expertes pour informer, former et inspirer l\'action en santé préventive.',
      
      categories: [
        { id: 'all', label: 'Toutes les vidéos', count: 156 },
        { id: 'educational', label: 'Pédagogiques', count: 42 },
        { id: 'documentary', label: 'Documentaires', count: 28 },
        { id: 'testimonial', label: 'Témoignages', count: 36 },
        { id: 'conference', label: 'Conférences', count: 35 },
        { id: 'tutorial', label: 'Tutoriels', count: 15 }
      ],
      
      featuredSeries: [
        {
          title: 'Prévention en 3 Minutes',
          description: 'Micro-formats sur les gestes santé quotidiens',
          episodes: 20,
          duration: '3 min',
          color: 'bg-emerald-100 dark:bg-emerald-900/30'
        },
        {
          title: 'Parcours Santé',
          description: 'Documentaires sur les défis des MNT',
          episodes: 8,
          duration: '15-25 min',
          color: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
          title: 'Expert Insights',
          description: 'Interventions de spécialistes internationaux',
          episodes: 25,
          duration: '10-30 min',
          color: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
          title: 'Témoignages de Vie',
          description: 'Histoires de changement de comportement',
          episodes: 15,
          duration: '5-8 min',
          color: 'bg-amber-100 dark:bg-amber-900/30'
        }
      ],
      
      videoResources: [
        {
          type: 'Pédagogique',
          title: 'Les bases de la nutrition préventive',
          duration: '4:32',
          views: '15.2K',
          date: '2024-01-15',
          thumbnailColor: 'from-emerald-400 to-emerald-600'
        },
        {
          type: 'Documentaire',
          title: 'Le défi diabète en Afrique subsaharienne',
          duration: '22:18',
          views: '8.7K',
          date: '2023-11-30',
          thumbnailColor: 'from-blue-400 to-blue-600'
        },
        {
          type: 'Conférence',
          title: 'Prévention primaire : stratégies efficaces',
          duration: '38:45',
          views: '12.4K',
          date: '2024-02-20',
          thumbnailColor: 'from-purple-400 to-purple-600'
        },
        {
          type: 'Témoignage',
          title: 'De la sédentarité au semi-marathon',
          duration: '7:15',
          views: '25.1K',
          date: '2024-03-10',
          thumbnailColor: 'from-amber-400 to-amber-600'
        },
        {
          type: 'Tutoriel',
          title: '10 exercices bureau contre la sédentarité',
          duration: '6:48',
          views: '32.8K',
          date: '2024-01-28',
          thumbnailColor: 'from-rose-400 to-rose-600'
        },
        {
          type: 'Pédagogique',
          title: 'Comprendre le stress et ses mécanismes',
          duration: '5:20',
          views: '18.9K',
          date: '2024-02-15',
          thumbnailColor: 'from-emerald-400 to-emerald-600'
        }
      ],
      
      pressFeatures: [
        {
          outlet: 'France 24 - Santé',
          title: 'Reportage sur le S.I.S. 2024',
          duration: '5:18',
          date: 'Nov 2024'
        },
        {
          outlet: 'TV5 Monde - Documentaire',
          title: 'Prévention santé : l\'approche communautaire',
          duration: '26:45',
          date: 'Oct 2024'
        },
        {
          outlet: 'BBC Health',
          title: 'Interview du Directeur S.I.S.',
          duration: '8:32',
          date: 'Sep 2024'
        }
      ],
      
      downloadOptions: [
        'MP4 HD (1920x1080)',
        'MP4 Web (1280x720)',
        'Audio seulement (MP3)',
        'Sous-titres (SRT)'
      ],
      
      message: 'Des vidéos qui éduquent, inspirent et transforment les comportements de santé.'
    },
    en: {
      title: 'S.I.S. Video Library',
      subtitle: 'Educational content, documentaries and testimonials for health prevention',
      intro: 'Our video library brings together educational visual resources, field reports and expert interventions to inform, train and inspire preventive health action.',
      
      categories: [
        { id: 'all', label: 'All Videos', count: 156 },
        { id: 'educational', label: 'Educational', count: 42 },
        { id: 'documentary', label: 'Documentaries', count: 28 },
        { id: 'testimonial', label: 'Testimonials', count: 36 },
        { id: 'conference', label: 'Conferences', count: 35 },
        { id: 'tutorial', label: 'Tutorials', count: 15 }
      ],
      
      featuredSeries: [
        {
          title: 'Prevention in 3 Minutes',
          description: 'Micro-formats on daily health gestures',
          episodes: 20,
          duration: '3 min',
          color: 'bg-emerald-100 dark:bg-emerald-900/30'
        },
        {
          title: 'Health Journeys',
          description: 'Documentaries on NCD challenges',
          episodes: 8,
          duration: '15-25 min',
          color: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
          title: 'Expert Insights',
          description: 'International specialist interventions',
          episodes: 25,
          duration: '10-30 min',
          color: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
          title: 'Life Testimonials',
          description: 'Behavior change stories',
          episodes: 15,
          duration: '5-8 min',
          color: 'bg-amber-100 dark:bg-amber-900/30'
        }
      ],
      
      videoResources: [
        {
          type: 'Educational',
          title: 'Basics of preventive nutrition',
          duration: '4:32',
          views: '15.2K',
          date: '2024-01-15',
          thumbnailColor: 'from-emerald-400 to-emerald-600'
        },
        {
          type: 'Documentary',
          title: 'Diabetes challenge in Sub-Saharan Africa',
          duration: '22:18',
          views: '8.7K',
          date: '2023-11-30',
          thumbnailColor: 'from-blue-400 to-blue-600'
        },
        {
          type: 'Conference',
          title: 'Primary prevention: effective strategies',
          duration: '38:45',
          views: '12.4K',
          date: '2024-02-20',
          thumbnailColor: 'from-purple-400 to-purple-600'
        },
        {
          type: 'Testimonial',
          title: 'From sedentary to half-marathon',
          duration: '7:15',
          views: '25.1K',
          date: '2024-03-10',
          thumbnailColor: 'from-amber-400 to-amber-600'
        },
        {
          type: 'Tutorial',
          title: '10 desk exercises against sedentariness',
          duration: '6:48',
          views: '32.8K',
          date: '2024-01-28',
          thumbnailColor: 'from-rose-400 to-rose-600'
        },
        {
          type: 'Educational',
          title: 'Understanding stress and its mechanisms',
          duration: '5:20',
          views: '18.9K',
          date: '2024-02-15',
          thumbnailColor: 'from-emerald-400 to-emerald-600'
        }
      ],
      
      pressFeatures: [
        {
          outlet: 'France 24 - Health',
          title: 'Report on S.I.S. 2024',
          duration: '5:18',
          date: 'Nov 2024'
        },
        {
          outlet: 'TV5 Monde - Documentary',
          title: 'Health prevention: community approach',
          duration: '26:45',
          date: 'Oct 2024'
        },
        {
          outlet: 'BBC Health',
          title: 'S.I.S. Director Interview',
          duration: '8:32',
          date: 'Sep 2024'
        }
      ],
      
      downloadOptions: [
        'MP4 HD (1920x1080)',
        'MP4 Web (1280x720)',
        'Audio only (MP3)',
        'Subtitles (SRT)'
      ],
      
      message: 'Videos that educate, inspire and transform health behaviors.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-white dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/public/media" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour aux médias' : 'Back to media'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <PlayCircle className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Ressources Vidéo' : 'Video Resources'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-2xl text-emerald-600 dark:text-emerald-400 mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Categories & Search */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder={language === 'fr' ? 'Rechercher une vidéo...' : 'Search a video...'}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {t.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                    activeFilter === category.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            {language === 'fr' ? 'Séries à la Une' : 'Featured Series'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {t.featuredSeries.map((series, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:-translate-y-1">
                  <div className={`mb-6 p-4 rounded-xl ${series.color} inline-block`}>
                    <Film className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {series.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {series.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{series.episodes} {language === 'fr' ? 'épisodes' : 'episodes'}</span>
                    <span>{series.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'fr' ? 'Dernières Vidéos' : 'Latest Videos'}
              </h3>
              <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                <Filter className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Filtrer' : 'Filter'}
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.videoResources.map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:-translate-y-1">
                    {/* Thumbnail */}
                    <div className={`relative h-48 bg-gradient-to-br ${video.thumbnailColor} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <Button className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-emerald-600 ml-1" />
                      </Button>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs">
                        {video.duration}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                          {video.type}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users className="h-4 w-4" />
                          {video.views}
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {video.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {video.date}
                        </div>
                        <div className="flex gap-2">
                          <Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Press Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {language === 'fr' ? 'Dans les Médias' : 'In the Media'}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {t.pressFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {feature.outlet}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {feature.date}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      {feature.duration}
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400">
                      {language === 'fr' ? 'Regarder' : 'Watch'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Download className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Ressources pour la Presse' : 'Press Resources'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'fr' 
                  ? 'Accédez aux fichiers haute qualité pour vos productions éditoriales'
                  : 'Access high-quality files for your editorial productions'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Formats Disponibles' : 'Available Formats'}
                </h3>
                <ul className="space-y-4">
                  {t.downloadOptions.map((option, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                      <Button size="sm" variant="ghost" className="text-emerald-600 dark:text-emerald-400">
                        <Download className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Conditions d\'Utilisation' : 'Usage Terms'}
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Usage éditorial uniquement' : 'Editorial use only'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Crédit obligatoire : © S.I.S.' : 'Mandatory credit: © S.I.S.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Pas d\'usage commercial sans autorisation' : 'No commercial use without permission'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Respect des droits à l\'image' : 'Respect of image rights'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <PlayCircle className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Demander un Accès Presse' : 'Request Press Access'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/media/photos" className="flex items-center">
                  {language === 'fr' ? 'Galerie Photos' : 'Photo Gallery'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}