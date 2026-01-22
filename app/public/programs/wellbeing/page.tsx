// app/public/programs/wellbeing/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Brain, Heart, Users, Target, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WellbeingPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Bien-être & Santé Mentale',
      subtitle: 'Reconnaître la santé mentale et psychosociale comme composante essentielle de la santé globale',
      intro: 'Le programme Bien-être vise à favoriser la gestion du stress, renforcer le bien-être émotionnel et prévenir les risques psychosociaux.',
      
      objectives: [
        'Favoriser la gestion du stress et l\'équilibre de vie',
        'Renforcer le bien-être émotionnel et psychologique',
        'Prévenir les risques psychosociaux',
        'Améliorer la qualité de vie personnelle et professionnelle'
      ],
      
      approaches: [
        {
          icon: Brain,
          title: 'Approche Holistique',
          description: 'Intégration corps-esprit pour un équilibre complet'
        },
        {
          icon: Heart,
          title: 'Prévention Positive',
          description: 'Focus sur les ressources et résilience personnelle'
        },
        {
          icon: Users,
          title: 'Support Communautaire',
          description: 'Création de réseaux d\'entraide et de partage'
        },
        {
          icon: Shield,
          title: 'Durabilité',
          description: 'Outils pour un bien-être durable au quotidien'
        }
      ],
      
      techniques: [
        {
          category: language === 'fr' ? 'Gestion du Stress' : 'Stress Management',
          methods: [
            language === 'fr' ? 'Techniques de respiration' : 'Breathing techniques',
            language === 'fr' ? 'Méditation et pleine conscience' : 'Meditation and mindfulness',
            language === 'fr' ? 'Gestion du temps et priorités' : 'Time and priority management'
          ]
        },
        {
          category: language === 'fr' ? 'Équilibre Émotionnel' : 'Emotional Balance',
          methods: [
            language === 'fr' ? 'Intelligence émotionnelle' : 'Emotional intelligence',
            language === 'fr' ? 'Communication non violente' : 'Non-violent communication',
            language === 'fr' ? 'Gestion des conflits' : 'Conflict management'
          ]
        },
        {
          category: language === 'fr' ? 'Résilience' : 'Resilience',
          methods: [
            language === 'fr' ? 'Développement des compétences' : 'Skills development',
            language === 'fr' ? 'Gestion du changement' : 'Change management',
            language === 'fr' ? 'Création de sens' : 'Meaning creation'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit sur les modes de vie pour prévenir la maladie, renforcer le bien-être et soutenir le développement durable.'
    },
    en: {
      title: 'Well-being & Mental Health',
      subtitle: 'Recognize mental and psychosocial health as an essential component of overall health',
      intro: 'The Well-being program aims to promote stress management, strengthen emotional well-being and prevent psychosocial risks.',
      
      objectives: [
        'Promote stress management and work-life balance',
        'Strengthen emotional and psychological well-being',
        'Prevent psychosocial risks',
        'Improve personal and professional quality of life'
      ],
      
      approaches: [
        {
          icon: Brain,
          title: 'Holistic Approach',
          description: 'Body-mind integration for complete balance'
        },
        {
          icon: Heart,
          title: 'Positive Prevention',
          description: 'Focus on personal resources and resilience'
        },
        {
          icon: Users,
          title: 'Community Support',
          description: 'Creation of support and sharing networks'
        },
        {
          icon: Shield,
          title: 'Sustainability',
          description: 'Tools for daily sustainable well-being'
        }
      ],
      
      techniques: [
        {
          category: 'Stress Management',
          methods: [
            'Breathing techniques',
            'Meditation and mindfulness',
            'Time and priority management'
          ]
        },
        {
          category: 'Emotional Balance',
          methods: [
            'Emotional intelligence',
            'Non-violent communication',
            'Conflict management'
          ]
        },
        {
          category: 'Resilience',
          methods: [
            'Skills development',
            'Change management',
            'Meaning creation'
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
              <Brain className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Programme Bien-être' : 'Well-being Program'}
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

            {/* Techniques */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Techniques Proposées' : 'Proposed Techniques'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.techniques.map((technique, idx) => (
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
                        {technique.category}
                      </h4>
                    </div>
                    
                    <ul className="space-y-3">
                      {technique.methods.map((method, methodIdx) => (
                        <li key={methodIdx} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{method}</span>
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

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Bénéfices du Bien-être' : 'Well-being Benefits'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: language === 'fr' ? 'Santé Mentale' : 'Mental Health',
                  benefits: [
                    language === 'fr' ? 'Réduction du stress et anxiété' : 'Stress and anxiety reduction',
                    language === 'fr' ? 'Amélioration de l\'humeur' : 'Mood improvement',
                    language === 'fr' ? 'Meilleure concentration' : 'Better concentration'
                  ]
                },
                {
                  icon: Heart,
                  title: language === 'fr' ? 'Santé Physique' : 'Physical Health',
                  benefits: [
                    language === 'fr' ? 'Réduction tension artérielle' : 'Blood pressure reduction',
                    language === 'fr' ? 'Amélioration du sommeil' : 'Sleep improvement',
                    language === 'fr' ? 'Renforcement immunitaire' : 'Immune system strengthening'
                  ]
                },
                {
                  icon: Users,
                  title: language === 'fr' ? 'Vie Sociale' : 'Social Life',
                  benefits: [
                    language === 'fr' ? 'Meilleures relations' : 'Better relationships',
                    language === 'fr' ? 'Communication améliorée' : 'Improved communication',
                    language === 'fr' ? 'Cohésion communautaire' : 'Community cohesion'
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
            <Brain className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/register" className="flex items-center">
                  {language === 'fr' ? 'Participer aux Sessions' : 'Join Sessions'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Devenir Facilitateur' : 'Become Facilitator'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}