// app/public/programs/sport-health/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Activity, Heart, Target, Users, Award, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SportHealthPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Sport & Santé',
      subtitle: 'Promouvoir l\'activité physique comme pilier fondamental de la prévention et de la qualité de vie',
      intro: 'Le programme Sport & Santé vise à lutter contre la sédentarité et l\'inactivité physique, prévenir les maladies cardiovasculaires, le diabète et l\'obésité, et renforcer la cohésion sociale.',
      
      objectives: [
        'Lutter contre la sédentarité et l\'inactivité physique',
        'Prévenir les maladies cardiovasculaires, le diabète et l\'obésité',
        'Améliorer la condition physique, l\'autonomie et la longévité',
        'Renforcer la cohésion sociale à travers des pratiques collectives'
      ],
      
      approaches: [
        {
          icon: Activity,
          title: 'Activité Adaptée',
          description: 'Programmes individualisés selon les capacités et besoins'
        },
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Accessibilité pour tous les publics et conditions'
        },
        {
          icon: Heart,
          title: 'Prévention',
          description: 'Focus sur la prévention primaire des MNT'
        },
        {
          icon: Target,
          title: 'Durabilité',
          description: 'Ancrage durable dans les modes de vie'
        }
      ],
      
      activities: [
        'Ateliers d\'activité physique adaptée',
        'Conférences sur les bienfaits du sport santé',
        'Démonstrations de pratiques sportives inclusives',
        'Sessions de formation pour professionnels de santé'
      ],
      
      message: 'Le S.I.S. valorise une activité physique adaptée, inclusive et accessible à tous, intégrée au quotidien.'
    },
    en: {
      title: 'Sport & Health',
      subtitle: 'Promoting physical activity as a fundamental pillar of prevention and quality of life',
      intro: 'The Sport & Health program aims to combat physical inactivity and sedentary lifestyles, prevent cardiovascular diseases, diabetes and obesity, and strengthen social cohesion.',
      
      objectives: [
        'Combat physical inactivity and sedentary lifestyles',
        'Prevent cardiovascular diseases, diabetes and obesity',
        'Improve physical fitness, autonomy and longevity',
        'Strengthen social cohesion through collective practices'
      ],
      
      approaches: [
        {
          icon: Activity,
          title: 'Adapted Activity',
          description: 'Personalized programs according to abilities and needs'
        },
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Accessibility for all audiences and conditions'
        },
        {
          icon: Heart,
          title: 'Prevention',
          description: 'Focus on primary NCD prevention'
        },
        {
          icon: Target,
          title: 'Sustainability',
          description: 'Sustainable integration into lifestyles'
        }
      ],
      
      activities: [
        'Adapted physical activity workshops',
        'Conferences on sport health benefits',
        'Inclusive sports practice demonstrations',
        'Training sessions for health professionals'
      ],
      
      message: 'The S.I.S. promotes adapted, inclusive and accessible physical activity, integrated into daily life.'
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
              <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Programme Phare' : 'Flagship Program'}
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

      {/* Objectives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Objectifs du Programme' : 'Program Objectives'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
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

            {/* Approach */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
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

            {/* Activities */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {language === 'fr' ? 'Activités Proposées' : 'Proposed Activities'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Bénéfices pour la Santé' : 'Health Benefits'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Santé Cardiovasculaire' : 'Cardiovascular Health',
                  benefits: [
                    language === 'fr' ? 'Réduction de la tension artérielle' : 'Blood pressure reduction',
                    language === 'fr' ? 'Amélioration de la fonction cardiaque' : 'Improved cardiac function',
                    language === 'fr' ? 'Prévention des AVC' : 'Stroke prevention'
                  ]
                },
                {
                  icon: Target,
                  title: language === 'fr' ? 'Métabolisme' : 'Metabolism',
                  benefits: [
                    language === 'fr' ? 'Contrôle de la glycémie' : 'Blood sugar control',
                    language === 'fr' ? 'Prévention du diabète type 2' : 'Type 2 diabetes prevention',
                    language === 'fr' ? 'Gestion du poids' : 'Weight management'
                  ]
                },
                {
                  icon: Award,
                  title: language === 'fr' ? 'Bien-être Mental' : 'Mental Well-being',
                  benefits: [
                    language === 'fr' ? 'Réduction du stress et de l\'anxiété' : 'Stress and anxiety reduction',
                    language === 'fr' ? 'Amélioration de l\'humeur' : 'Mood improvement',
                    language === 'fr' ? 'Meilleure qualité de sommeil' : 'Better sleep quality'
                  ]
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <category.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
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
            <Activity className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer au Programme' : 'Join the Program'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Organiser une Session' : 'Organize a Session'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}