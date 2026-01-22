// app/public/media/photos/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Camera, Image as ImageIcon, Users, Calendar, MapPin, ArrowRight, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function PhotosPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Galerie Photos',
      subtitle: 'Moments forts et actions concrètes du Salon International de la Santé',
      intro: 'Découvrez les visuels qui témoignent du caractère concret, inclusif et participatif des actions du S.I.S.',
      
      categories: [
        {
          title: 'Éditions',
          count: '250+ photos',
          description: 'Moments clés des différentes éditions'
        },
        {
          title: 'Activités',
          count: '180+ photos',
          description: 'Ateliers et sessions interactives'
        },
        {
          title: 'Communauté',
          count: '320+ photos',
          description: 'Participants et bénévoles engagés'
        },
        {
          title: 'Partenaires',
          count: '150+ photos',
          description: 'Acteurs institutionnels et sponsors'
        }
      ],
      
      galleries: [
        {
          name: 'Édition 2024',
          location: 'Paris, France',
          date: 'Novembre 2024',
          count: '85 photos'
        },
        {
          name: 'Édition 2023',
          location: 'Genève, Suisse',
          date: 'Octobre 2023',
          count: '76 photos'
        },
        {
          name: 'Édition 2022',
          location: 'Bruxelles, Belgique',
          date: 'Novembre 2022',
          count: '92 photos'
        },
        {
          name: 'Édition 2021',
          location: 'Lyon, France',
          date: 'Septembre 2021',
          count: '68 photos'
        }
      ],
      
      message: 'Les médias du S.I.S. donnent à voir, à comprendre et à partager des actions concrètes au service de la santé durable.'
    },
    en: {
      title: 'Photo Gallery',
      subtitle: 'Key moments and concrete actions of the International Health Fair',
      intro: 'Discover visuals that reflect the concrete, inclusive and participatory nature of S.I.S. actions.',
      
      categories: [
        {
          title: 'Editions',
          count: '250+ photos',
          description: 'Key moments from different editions'
        },
        {
          title: 'Activities',
          count: '180+ photos',
          description: 'Workshops and interactive sessions'
        },
        {
          title: 'Community',
          count: '320+ photos',
          description: 'Engaged participants and volunteers'
        },
        {
          title: 'Partners',
          count: '150+ photos',
          description: 'Institutional actors and sponsors'
        }
      ],
      
      galleries: [
        {
          name: 'Edition 2024',
          location: 'Paris, France',
          date: 'November 2024',
          count: '85 photos'
        },
        {
          name: 'Edition 2023',
          location: 'Geneva, Switzerland',
          date: 'October 2023',
          count: '76 photos'
        },
        {
          name: 'Edition 2022',
          location: 'Brussels, Belgium',
          date: 'November 2022',
          count: '92 photos'
        },
        {
          name: 'Edition 2021',
          location: 'Lyon, France',
          date: 'September 2021',
          count: '68 photos'
        }
      ],
      
      message: 'The S.I.S. media gives visibility, meaning and reach to concrete actions serving sustainable health development.'
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
              <Camera className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Galerie Visuelle' : 'Visual Gallery'}
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

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Collections' : 'Collections'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-6 p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 inline-block group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {category.title}
                    </h3>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                      {category.count}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Photo Grid Placeholder */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === 'fr' ? 'Dernières Photos' : 'Latest Photos'}
                </h3>
                <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                  <Grid className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Voir toutes' : 'View all'}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="aspect-square rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center group hover:scale-105 transition-transform"
                  >
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Photo {idx + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Galleries */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {language === 'fr' ? 'Galeries par Édition' : 'Edition Galleries'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.galleries.map((gallery, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {gallery.name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {gallery.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {gallery.date}
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                          {gallery.count}
                        </div>
                      </div>
                      
                      <div className="aspect-video rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      
                      <Button variant="outline" className="w-full border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                        {language === 'fr' ? 'Voir la galerie' : 'View gallery'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Conditions d\'Utilisation' : 'Usage Guidelines'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'fr' ? 'Pour la Presse' : 'For Press'}
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Crédit photo obligatoire' : 'Photo credit required'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Usage éditorial uniquement' : 'Editorial use only'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Résolution HD disponible' : 'HD resolution available'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'fr' ? 'Pour les Partenaires' : 'For Partners'}
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Usage avec autorisation' : 'Use with permission'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Respect des droits d\'image' : 'Image rights respect'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{language === 'fr' ? 'Contactez-nous pour les besoins spécifiques' : 'Contact us for specific needs'}</span>
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
            <Camera className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Demander des Photos' : 'Request Photos'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/media" className="flex items-center">
                  {language === 'fr' ? 'Autres Médias' : 'Other Media'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}