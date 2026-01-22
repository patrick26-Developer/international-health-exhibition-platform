// app/public/about/context/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { FileText, AlertTriangle, Target, TrendingUp, Users, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContextPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Contexte & Objectifs',
      subtitle: 'Face à la montée des maladies non transmissibles, le S.I.S. agit pour transformer la prévention en priorité stratégique',
      intro: 'Les systèmes de santé font face à une transition épidémiologique majeure, marquée par la progression rapide des maladies non transmissibles.',
      
      context: {
        title: 'Contexte Épidémiologique',
        points: [
          'Première cause de mortalité mondiale (70%+ des décès)',
          'Décès prématurés largement évitables',
          'Fardeau économique croissant pour États et entreprises',
          'Facteurs de risque largement évitables'
        ]
      },
      
      challenge: {
        title: 'Problématique des MNT',
        description: 'Malgré les constats, les réponses restent majoritairement curatives, coûteuses et insuffisantes, tandis que la prévention demeure sous-exploitée.',
        issues: [
          'Manque d\'outils accessibles de sensibilisation',
          'Mobilisation multisectorielle limitée',
          'Approches individuelles plutôt que systémiques',
          'Investissements insuffisants en prévention'
        ]
      },
      
      objectives: [
        {
          icon: Target,
          title: 'Objectifs Sanitaires',
          items: [
            'Réduire les facteurs de risque des MNT',
            'Promouvoir l\'activité physique et nutrition',
            'Renforcer la prévention primaire'
          ]
        },
        {
          icon: Users,
          title: 'Objectifs Sociaux',
          items: [
            'Sensibiliser et responsabiliser les populations',
            'Favoriser l\'adoption de modes de vie sains',
            'Réduire les inégalités de santé'
          ]
        },
        {
          icon: TrendingUp,
          title: 'Objectifs Économiques',
          items: [
            'Présenter la prévention comme investissement',
            'Réduire les coûts des maladies évitables',
            'Engager les entreprises dans des démarches RSE'
          ]
        }
      ],
      
      message: 'Le S.I.S. agit pour que la prévention ne soit plus une option, mais une priorité stratégique au service du développement durable.'
    },
    en: {
      title: 'Context & Objectives',
      subtitle: 'Facing the rise of non-communicable diseases, S.I.S. acts to transform prevention into a strategic priority',
      intro: 'Health systems are facing a major epidemiological transition, marked by the rapid increase of non-communicable diseases.',
      
      context: {
        title: 'Epidemiological Context',
        points: [
          'Leading cause of global mortality (70%+ of deaths)',
          'Largely preventable premature deaths',
          'Growing economic burden for states and companies',
          'Largely preventable risk factors'
        ]
      },
      
      challenge: {
        title: 'NCD Challenge',
        description: 'Despite evidence, responses remain largely curative, costly and insufficient, while prevention remains underutilized.',
        issues: [
          'Lack of accessible awareness tools',
          'Limited multisectoral mobilization',
          'Individual rather than systemic approaches',
          'Insufficient prevention investments'
        ]
      },
      
      objectives: [
        {
          icon: Target,
          title: 'Health Objectives',
          items: [
            'Reduce NCD risk factors',
            'Promote physical activity and nutrition',
            'Strengthen primary prevention'
          ]
        },
        {
          icon: Users,
          title: 'Social Objectives',
          items: [
            'Raise awareness and empower populations',
            'Encourage adoption of healthy lifestyles',
            'Reduce health inequalities'
          ]
        },
        {
          icon: TrendingUp,
          title: 'Economic Objectives',
          items: [
            'Present prevention as investment',
            'Reduce costs of preventable diseases',
            'Engage companies in CSR initiatives'
          ]
        }
      ],
      
      message: 'The S.I.S. acts so that prevention is no longer an option, but a strategic priority serving sustainable development.'
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
              href="/public/about" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour au S.I.S.' : 'Back to S.I.S.'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <FileText className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Analyse Stratégique' : 'Strategic Analysis'}
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

      {/* Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.context.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.context.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.challenge.title}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {t.challenge.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {t.challenge.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{issue}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Objectives */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Objectifs Stratégiques' : 'Strategic Objectives'}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.objectives.map((objective, idx) => (
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
                        <objective.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {objective.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {objective.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-center text-white"
            >
              <Globe className="h-12 w-12 mx-auto mb-6" />
              <p className="text-2xl font-bold mb-6">
                {t.message}
              </p>
              <p className="opacity-90">
                {language === 'fr'
                  ? 'Une approche inclusive, multisectorielle et orientée impact pour la santé durable.'
                  : 'An inclusive, multisectoral and impact-oriented approach for sustainable health.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Rejoignez Notre Mission' : 'Join Our Mission'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              {language === 'fr'
                ? 'Contribuez à transformer le système de santé par la prévention.'
                : 'Help transform the health system through prevention.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/public/programs" className="flex items-center">
                  {language === 'fr' ? 'Découvrir les Programmes' : 'Discover Programs'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}