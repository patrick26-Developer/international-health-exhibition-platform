// app/public/programs/nutrition/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Apple, Heart, Target, Users, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NutritionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Nutrition',
      subtitle: 'Renforcer l\'éducation nutritionnelle et encourager des habitudes alimentaires favorables à la santé',
      intro: 'Le programme Nutrition vise à promouvoir une alimentation équilibrée et adaptée aux contextes locaux pour prévenir les déséquilibres nutritionnels.',
      
      objectives: [
        'Promouvoir une alimentation équilibrée et adaptée',
        'Prévenir les déséquilibres nutritionnels, diabète et obésité',
        'Renforcer les compétences en matière de choix alimentaires',
        'Sensibiliser aux liens entre nutrition, santé et performance'
      ],
      
      approaches: [
        {
          icon: Apple,
          title: 'Éducation Nutritionnelle',
          description: 'Ateliers pratiques et sessions d\'information'
        },
        {
          icon: BookOpen,
          title: 'Approche Pédagogique',
          description: 'Méthodes non culpabilisantes et accessibles'
        },
        {
          icon: Users,
          title: 'Adaptation Locale',
          description: 'Solutions adaptées aux contextes culturels'
        },
        {
          icon: Heart,
          title: 'Prévention Ciblée',
          description: 'Focus sur les populations à risque'
        }
      ],
      
      focus: [
        {
          title: 'Prévention Diabète',
          points: [
            'Équilibre glycémique',
            'Alimentation à faible index glycémique',
            'Gestion du poids'
          ]
        },
        {
          title: 'Santé Cardiovasculaire',
          points: [
            'Réduction du sel',
            'Graisses saines',
            'Fibres alimentaires'
          ]
        },
        {
          title: 'Bien-être Digestif',
          points: [
            'Microbiote intestinal',
            'Aliments fermentés',
            'Hydratation optimale'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'Nutrition',
      subtitle: 'Strengthen nutrition education and encourage healthy eating habits',
      intro: 'The Nutrition program aims to promote balanced diets adapted to local contexts to prevent nutritional imbalances.',
      
      objectives: [
        'Promote balanced and adapted diets',
        'Prevent nutritional imbalances, diabetes and obesity',
        'Strengthen food choice skills',
        'Raise awareness of nutrition-health-performance links'
      ],
      
      approaches: [
        {
          icon: Apple,
          title: 'Nutrition Education',
          description: 'Practical workshops and information sessions'
        },
        {
          icon: BookOpen,
          title: 'Pedagogical Approach',
          description: 'Non-judgmental and accessible methods'
        },
        {
          icon: Users,
          title: 'Local Adaptation',
          description: 'Solutions adapted to cultural contexts'
        },
        {
          icon: Heart,
          title: 'Targeted Prevention',
          description: 'Focus on at-risk populations'
        }
      ],
      
      focus: [
        {
          title: 'Diabetes Prevention',
          points: [
            'Glycemic balance',
            'Low glycemic index foods',
            'Weight management'
          ]
        },
        {
          title: 'Cardiovascular Health',
          points: [
            'Salt reduction',
            'Healthy fats',
            'Dietary fibers'
          ]
        },
        {
          title: 'Digestive Well-being',
          points: [
            'Gut microbiome',
            'Fermented foods',
            'Optimal hydration'
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
              <Apple className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Programme Alimentation' : 'Food Program'}
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

            {/* Approaches */}
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

            {/* Focus Areas */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Domaines d\'Intervention' : 'Focus Areas'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.focus.map((area, idx) => (
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
                        {area.title}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {area.points.map((point, pointIdx) => (
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

      {/* Activities */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Activités Proposées' : 'Proposed Activities'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: language === 'fr' ? 'Ateliers Culinaires' : 'Culinary Workshops',
                  description: language === 'fr'
                    ? 'Préparation de repas sains et équilibrés'
                    : 'Preparation of healthy and balanced meals'
                },
                {
                  title: language === 'fr' ? 'Conférences Expertes' : 'Expert Conferences',
                  description: language === 'fr'
                    ? 'Interventions de nutritionnistes et diététiciens'
                    : 'Interventions by nutritionists and dieticians'
                },
                {
                  title: language === 'fr' ? 'Analyses Nutritionnelles' : 'Nutritional Analysis',
                  description: language === 'fr'
                    ? 'Évaluations personnalisées des habitudes alimentaires'
                    : 'Personalized assessment of eating habits'
                },
                {
                  title: language === 'fr' ? 'Formations Professionnelles' : 'Professional Training',
                  description: language === 'fr'
                    ? 'Certifications pour professionnels de santé'
                    : 'Certifications for health professionals'
                }
              ].map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <Apple className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {activity.description}
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
            <Apple className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer aux Ateliers' : 'Join Workshops'}
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