// app/public/editions/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Calendar, MapPin, Users, TrendingUp, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditionsPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Éditions du S.I.S.',
      subtitle: 'Plateforme évolutive et itinérante au service de la prévention santé',
      intro: 'Chaque édition constitue une étape structurante permettant de renforcer la mobilisation, adapter les actions aux réalités territoriales et mesurer l\'impact.',
      
      editions: [
        {
          year: '2024',
          title: '7ème Édition',
          location: 'Paris, France',
          theme: 'Santé Durable : De la Prévention à l\'Action',
          participants: '8,500+',
          impact: 'Lancement du réseau global de prévention',
          status: 'active',
          color: 'from-emerald-500 to-emerald-600'
        },
        {
          year: '2023',
          title: '6ème Édition',
          location: 'Genève, Suisse',
          theme: 'Innovation et Santé Digitale',
          participants: '6,800+',
          impact: 'Partenariat avec l\'OMS étendu',
          status: 'past',
          color: 'from-emerald-600 to-emerald-700'
        },
        {
          year: '2022',
          title: '5ème Édition',
          location: 'Bruxelles, Belgique',
          theme: 'Santé Mentale Post-Pandémie',
          participants: '5,600+',
          impact: 'Premier sommet santé mentale européen',
          status: 'past',
          color: 'from-emerald-700 to-emerald-800'
        },
        {
          year: '2021',
          title: '4ème Édition',
          location: 'Lyon, France',
          theme: 'Résilience des Systèmes de Santé',
          participants: '4,700+',
          impact: 'Format hybride innovant',
          status: 'past',
          color: 'from-emerald-800 to-emerald-900'
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
          year: '2024',
          title: '7th Edition',
          location: 'Paris, France',
          theme: 'Sustainable Health: From Prevention to Action',
          participants: '8,500+',
          impact: 'Launch of global prevention network',
          status: 'active',
          color: 'from-emerald-500 to-emerald-600'
        },
        {
          year: '2023',
          title: '6th Edition',
          location: 'Geneva, Switzerland',
          theme: 'Innovation and Digital Health',
          participants: '6,800+',
          impact: 'Expanded partnership with WHO',
          status: 'past',
          color: 'from-emerald-600 to-emerald-700'
        },
        {
          year: '2022',
          title: '5th Edition',
          location: 'Brussels, Belgium',
          theme: 'Post-Pandemic Mental Health',
          participants: '5,600+',
          impact: 'First European mental health summit',
          status: 'past',
          color: 'from-emerald-700 to-emerald-800'
        },
        {
          year: '2021',
          title: '4th Edition',
          location: 'Lyon, France',
          theme: 'Health Systems Resilience',
          participants: '4,700+',
          impact: 'Innovative hybrid format',
          status: 'past',
          color: 'from-emerald-800 to-emerald-900'
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-white dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/public" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <Calendar className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Éditions Internationales' : 'International Editions'}
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

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editions Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Notre Parcours' : 'Our Journey'}
            </h2>
            
            <div className="space-y-8">
              {t.editions.map((edition, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600" />
                    
                    <div className="flex items-start gap-8">
                      {/* Year Badge */}
                      <div className="relative z-10">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${edition.color} flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl font-bold text-white">
                            {edition.year}
                          </span>
                        </div>
                        {edition.status === 'active' && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Edition Card */}
                      <div className="flex-grow">
                        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                                  {edition.title}
                                </span>
                                {edition.status === 'active' && (
                                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                    {language === 'fr' ? 'Active' : 'Active'}
                                  </span>
                                )}
                              </div>
                              
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {edition.theme}
                              </h3>
                              
                              <div className="flex flex-wrap gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {edition.location}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {edition.participants}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                    {edition.impact}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {edition.impact}
                              </p>
                              
                              <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                                {language === 'fr' ? 'Voir le rapport' : 'View report'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: language === 'fr' ? 'Implantation Territoriale' : 'Territorial Implementation',
                  description: language === 'fr'
                    ? 'Collaboration avec autorités locales et communautés pour une appropriation des enjeux de prévention'
                    : 'Collaboration with local authorities and communities for ownership of prevention challenges'
                },
                {
                  icon: Calendar,
                  title: language === 'fr' ? 'Continuïté' : 'Continuity',
                  description: language === 'fr'
                    ? 'Dynamique continue avec préparation, déploiement et suivi post-événement'
                    : 'Continuous dynamic with preparation, deployment, and post-event follow-up'
                },
                {
                  icon: TrendingUp,
                  title: language === 'fr' ? 'Amélioration Continue' : 'Continuous Improvement',
                  description: language === 'fr'
                    ? 'Capitalisation sur les enseignements pour ajuster contenus et formats'
                    : 'Capitalizing on lessons learned to adjust content and formats'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                    <item.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
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
            <Calendar className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90 group">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser une Édition' : 'Organize an Edition'}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/partners" className="flex items-center">
                  {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}