// components/sections/programs-preview.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Activity, Apple, Brain, Heart, ArrowRight, Calendar, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function ProgramsPreview() {
  const { language } = useLanguageStore();
  
  const programs = [
    {
      id: 'sport-sante',
      icon: Activity,
      title: language === 'fr' ? 'Sport & Santé' : 'Sport & Health',
      description: language === 'fr' 
        ? 'Intégration du sport dans la prévention et le traitement des maladies'
        : 'Integration of sport in disease prevention and treatment',
      sessions: 24,
      experts: 15,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'nutrition',
      icon: Apple,
      title: language === 'fr' ? 'Nutrition' : 'Nutrition',
      description: language === 'fr'
        ? 'Alimentation préventive et thérapeutique pour la santé durable'
        : 'Preventive and therapeutic nutrition for sustainable health',
      sessions: 18,
      experts: 12,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'bien-etre',
      icon: Brain,
      title: language === 'fr' ? 'Bien-être Mental' : 'Mental Wellbeing',
      description: language === 'fr'
        ? 'Stratégies innovantes pour la santé mentale et la résilience'
        : 'Innovative strategies for mental health and resilience',
      sessions: 16,
      experts: 10,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 'prevention',
      icon: Heart,
      title: language === 'fr' ? 'Prévention MNT' : 'NCD Prevention',
      description: language === 'fr'
        ? 'Lutte contre les maladies non transmissibles par la prévention'
        : 'Fighting non-communicable diseases through prevention',
      sessions: 22,
      experts: 18,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Programmes Scientifiques' : 'Scientific Programs'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'fr'
                ? 'Des sessions expertes structurées en 4 axes majeurs pour transformer la santé'
                : 'Expert sessions structured around 4 major axes to transform health'}
            </p>
          </div>
          
          <Button size="lg" className="group">
            {language === 'fr' ? 'Voir tous les programmes' : 'View all programs'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${program.borderColor}`}>
                <CardContent className="p-8">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl ${program.bgColor}`}>
                        <program.icon className={`h-8 w-8 ${program.color}`} />
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {program.sessions}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {program.experts}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {program.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                      {program.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                      <Button variant="outline" className={`border ${program.borderColor} ${program.color} hover:${program.bgColor}`}>
                        {language === 'fr' ? 'Découvrir' : 'Discover'}
                      </Button>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'fr' ? 'Programme certifié' : 'Certified program'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800">
            <Award className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mb-6" />
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Certification Internationale' : 'International Certification'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'fr'
                ? 'Crédits de formation continue reconnus mondialement'
                : 'Globally recognized continuing education credits'}
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border border-blue-200 dark:border-blue-800">
            <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Experts Mondiaux' : 'Global Experts'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'fr'
                ? 'Intervenants de renommée internationale'
                : 'Speakers with international reputation'}
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border border-purple-200 dark:border-purple-800">
            <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-6" />
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Format Flexible' : 'Flexible Format'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'fr'
                ? 'Sessions en présentiel, hybrides et replays'
                : 'In-person, hybrid sessions and replays'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}