// app/public/programs/prevention/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Heart, Target, Users, Shield, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PreventionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Prévention des MNT',
      subtitle: 'Socle transversal des actions du S.I.S. pour réduire durablement les facteurs de risque évitables',
      intro: 'Le programme Prévention constitue le fondement de toutes nos actions, ciblant prioritairement les principales maladies non transmissibles.',
      
      focus: [
        'Maladies cardiovasculaires',
        'Diabète',
        'Cancers liés aux modes de vie',
        'Maladies respiratoires chroniques'
      ],
      
      objectives: [
        'Réduire les facteurs de risque évitables',
        'Promouvoir l\'éducation à la santé',
        'Mobiliser les communautés',
        'Adopter des comportements protecteurs'
      ],
      
      approaches: [
        {
          icon: Target,
          title: 'Prévention Primordiale',
          description: 'Intervention avant l\'apparition des facteurs de risque'
        },
        {
          icon: Shield,
          title: 'Prévention Primaire',
          description: 'Réduction des facteurs de risque existants'
        },
        {
          icon: Users,
          title: 'Prévention Populationnelle',
          description: 'Approche collective et communautaire'
        },
        {
          icon: Heart,
          title: 'Prévention Personnalisée',
          description: 'Adaptation aux profils individuels'
        }
      ],
      
      strategies: [
        {
          title: language === 'fr' ? 'Réduction Tabac/Alcool' : 'Tobacco/Alcohol Reduction',
          points: [
            language === 'fr' ? 'Programmes de sevrage' : 'Cessation programs',
            language === 'fr' ? 'Sensibilisation précoce' : 'Early awareness',
            language === 'fr' ? 'Environnements sans tabac' : 'Smoke-free environments'
          ]
        },
        {
          title: language === 'fr' ? 'Alimentation Saine' : 'Healthy Eating',
          points: [
            language === 'fr' ? 'Réduction sel/sucre' : 'Salt/sugar reduction',
            language === 'fr' ? 'Accès aux fruits/légumes' : 'Fruit/vegetable access',
            language === 'fr' ? 'Éducation nutritionnelle' : 'Nutrition education'
          ]
        },
        {
          title: language === 'fr' ? 'Activité Physique' : 'Physical Activity',
          points: [
            language === 'fr' ? 'Environnements actifs' : 'Active environments',
            language === 'fr' ? 'Programmes communautaires' : 'Community programs',
            language === 'fr' ? 'Intégration quotidienne' : 'Daily integration'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'NCD Prevention',
      subtitle: 'Transversal foundation of S.I.S. actions to sustainably reduce avoidable risk factors',
      intro: 'The Prevention program constitutes the foundation of all our actions, primarily targeting main non-communicable diseases.',
      
      focus: [
        'Cardiovascular diseases',
        'Diabetes',
        'Lifestyle-related cancers',
        'Chronic respiratory diseases'
      ],
      
      objectives: [
        'Reduce avoidable risk factors',
        'Promote health education',
        'Mobilize communities',
        'Adopt protective behaviors'
      ],
      
      approaches: [
        {
          icon: Target,
          title: 'Primordial Prevention',
          description: 'Intervention before risk factors appear'
        },
        {
          icon: Shield,
          title: 'Primary Prevention',
          description: 'Reduction of existing risk factors'
        },
        {
          icon: Users,
          title: 'Population Prevention',
          description: 'Collective and community approach'
        },
        {
          icon: Heart,
          title: 'Personalized Prevention',
          description: 'Adaptation to individual profiles'
        }
      ],
      
      strategies: [
        {
          title: 'Tobacco/Alcohol Reduction',
          points: [
            'Cessation programs',
            'Early awareness',
            'Smoke-free environments'
          ]
        },
        {
          title: 'Healthy Eating',
          points: [
            'Salt/sugar reduction',
            'Fruit/vegetable access',
            'Nutrition education'
          ]
        },
        {
          title: 'Physical Activity',
          points: [
            'Active environments',
            'Community programs',
            'Daily integration'
          ]
        }
      ],
      
      message: 'The S.I.S. acts on lifestyles to prevent disease, strengthen well-being and support sustainable development.'
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
              href="/public/programs" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour aux programmes' : 'Back to programs'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <Heart className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Programme Fondamental' : 'Fundamental Program'}
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

      {/* Focus Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Maladies Ciblées' : 'Targeted Diseases'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.focus.map((disease, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <AlertTriangle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {disease}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Objectives */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Objectifs Stratégiques' : 'Strategic Objectives'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {t.objectives.map((objective, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {objective}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Approaches */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Niveaux de Prévention' : 'Prevention Levels'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.approaches.map((approach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                      <approach.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {approach.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {approach.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategies */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Stratégies d\'Intervention' : 'Intervention Strategies'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.strategies.map((strategy, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {strategy.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {strategy.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Impact de la Prévention' : 'Prevention Impact'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: language === 'fr' ? 'Réduction Mortalité' : 'Mortality Reduction',
                  impact: language === 'fr' ? '30-40%' : '30-40%',
                  description: language === 'fr'
                    ? 'Diminution des décès prématurés par MNT'
                    : 'Reduction in premature NCD deaths'
                },
                {
                  icon: Users,
                  title: language === 'fr' ? 'Qualité de Vie' : 'Quality of Life',
                  impact: language === 'fr' ? '+8 ans' : '+8 years',
                  description: language === 'fr'
                    ? 'Augmentation de l\'espérance de vie en santé'
                    : 'Increase in healthy life expectancy'
                },
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Économies Santé' : 'Health Savings',
                  impact: language === 'fr' ? '1:4' : '1:4',
                  description: language === 'fr'
                    ? 'Retour sur investissement de la prévention'
                    : 'Prevention return on investment'
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
                  <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                    {item.impact}
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
            <Heart className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'S\'engager pour la Prévention' : 'Commit to Prevention'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser un Programme' : 'Organize a Program'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}