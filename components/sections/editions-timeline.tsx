// components/sections/editions-timeline.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Calendar, MapPin, Users, TrendingUp, ChevronRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function EditionsTimeline() {
  const { language } = useLanguageStore();
  
  const editions = [
    {
      year: 2024,
      title: language === 'fr' ? '7ème Édition' : '7th Edition',
      location: 'Paris, France',
      theme: language === 'fr' ? 'Santé Durable : De la Prévention à l\'Action' : 'Sustainable Health: From Prevention to Action',
      participants: 8500,
      growth: '+25%',
      highlight: language === 'fr' ? 'Lancement du réseau global de prévention' : 'Launch of global prevention network',
      color: 'bg-emerald-500',
      status: 'active'
    },
    {
      year: 2023,
      title: language === 'fr' ? '6ème Édition' : '6th Edition',
      location: 'Genève, Suisse',
      theme: language === 'fr' ? 'Innovation et Santé Digitale' : 'Innovation and Digital Health',
      participants: 6800,
      growth: '+20%',
      highlight: language === 'fr' ? 'Partenariat avec l\'OMS étendu' : 'Expanded partnership with WHO',
      color: 'bg-blue-500',
      status: 'past'
    },
    {
      year: 2022,
      title: language === 'fr' ? '5ème Édition' : '5th Edition',
      location: 'Bruxelles, Belgique',
      theme: language === 'fr' ? 'Santé Mentale Post-Pandémie' : 'Post-Pandemic Mental Health',
      participants: 5600,
      growth: '+18%',
      highlight: language === 'fr' ? 'Premier sommet santé mentale européen' : 'First European mental health summit',
      color: 'bg-purple-500',
      status: 'past'
    },
    {
      year: 2021,
      title: language === 'fr' ? '4ème Édition' : '4th Edition',
      location: 'Lyon, France',
      theme: language === 'fr' ? 'Résilience des Systèmes de Santé' : 'Health Systems Resilience',
      participants: 4700,
      growth: '+15%',
      highlight: language === 'fr' ? 'Format hybride innovant' : 'Innovative hybrid format',
      color: 'bg-amber-500',
      status: 'past'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 mb-6">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'fr' ? 'Prochaine édition : Novembre 2024' : 'Next edition: November 2024'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Notre Parcours' : 'Our Journey'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'fr'
                ? '7 années d\'excellence et d\'innovation au service de la santé mondiale'
                : '7 years of excellence and innovation in service of global health'}
            </p>
          </div>
          
          <Button size="lg" variant="outline" className="group">
            {language === 'fr' ? 'Archives des éditions' : 'Edition archives'}
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-0.5 lg:w-1 bg-gradient-to-b from-emerald-400 via-blue-400 to-purple-400 transform lg:-translate-x-1/2" />
          
          {editions.map((edition, index) => (
            <motion.div
              key={edition.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col lg:flex-row items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Year indicator */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-20 h-20 rounded-full ${edition.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">
                    {edition.year}
                  </span>
                </div>
                {edition.status === 'active' && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Edition Card */}
              <div className={`flex-grow ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                <Card className="border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className={`flex-grow ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {edition.title}
                          </span>
                          {edition.status === 'active' && (
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                              {language === 'fr' ? 'Active' : 'Active'}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {edition.theme}
                        </h3>
                        
                        <div className="flex flex-wrap gap-6 mb-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {edition.location}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {edition.participants.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {edition.growth}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {edition.highlight}
                        </p>
                        
                        <Button variant="outline" size="sm">
                          {language === 'fr' ? 'Voir le rapport' : 'View report'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Summary */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'Années d\'excellence' : 'Years of excellence'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                25K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'Participants cumulés' : 'Cumulative participants'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'Villes hôtes' : 'Host cities'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'Taux de satisfaction' : 'Satisfaction rate'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}