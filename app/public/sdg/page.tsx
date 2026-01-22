// app/public/sdg/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Award, Globe, Target, Users, Heart, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SDGPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'ODD & OMS',
      subtitle: 'Alignement stratégique avec les Objectifs de Développement Durable et l\'Organisation Mondiale de la Santé',
      intro: 'Le Salon International de la Santé (S.I.S.) s\'inscrit pleinement dans les cadres internationaux de référence définis par l\'OMS et l\'Agenda 2030 des Nations Unies.',
      
      sections: [
        {
          icon: Target,
          title: 'ODD 3 - Bonne santé et bien-être',
          content: 'Notre contribution directe à la réduction de la mortalité prématurée liée aux maladies non transmissibles, la promotion de la santé mentale et le renforcement de la prévention.',
          points: [
            'Réduction des facteurs de risque des MNT',
            'Promotion de modes de vie sains',
            'Renforcement de l\'éducation à la santé'
          ]
        },
        {
          icon: Globe,
          title: 'Alignement OMS',
          content: 'Conformité avec les principes fondateurs de la promotion de la santé portés par l\'Organisation Mondiale de la Santé.',
          points: [
            'Prévention primaire des maladies',
            'Approche multisectorielle',
            'Création d\'environnements favorables'
          ]
        }
      ],
      
      contributions: [
        {
          number: '3',
          title: 'Bonne santé et bien-être',
          description: 'Contributions directes aux cibles de réduction des MNT'
        },
        {
          number: '4',
          title: 'Éducation de qualité',
          description: 'Programmes d\'éducation à la santé et formations'
        },
        {
          number: '8',
          title: 'Travail décent',
          description: 'Promotion de la santé au travail et bien-être'
        },
        {
          number: '17',
          title: 'Partenariats',
          description: 'Coopération multi-acteurs pour la santé'
        }
      ],
      
      message: 'Le S.I.S. traduit les chartes, résolutions et objectifs internationaux en actions concrètes au service de la prévention et du bien-être des populations.'
    },
    en: {
      title: 'SDGs & WHO',
      subtitle: 'Strategic alignment with Sustainable Development Goals and World Health Organization',
      intro: 'The International Health Fair (S.I.S.) is fully aligned with international public health frameworks established by WHO and the United Nations 2030 Agenda.',
      
      sections: [
        {
          icon: Target,
          title: 'SDG 3 - Good Health and Well-being',
          content: 'Our direct contribution to reducing premature mortality from non-communicable diseases, promoting mental health, and strengthening prevention.',
          points: [
            'Reduction of NCD risk factors',
            'Promotion of healthy lifestyles',
            'Strengthening health education'
          ]
        },
        {
          icon: Globe,
          title: 'WHO Alignment',
          content: 'Compliance with the foundational principles of health promotion promoted by the World Health Organization.',
          points: [
            'Primary disease prevention',
            'Multisectoral approach',
            'Creating supportive environments'
          ]
        }
      ],
      
      contributions: [
        {
          number: '3',
          title: 'Good Health and Well-being',
          description: 'Direct contributions to NCD reduction targets'
        },
        {
          number: '4',
          title: 'Quality Education',
          description: 'Health education programs and training'
        },
        {
          number: '8',
          title: 'Decent Work',
          description: 'Promotion of workplace health and wellbeing'
        },
        {
          number: '17',
          title: 'Partnerships',
          description: 'Multi-stakeholder cooperation for health'
        }
      ],
      
      message: 'The S.I.S. translates international charters, resolutions, and global goals into concrete actions serving prevention and population well-being.'
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
              <Award className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Alignement International' : 'International Alignment'}
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {t.sections.map((section, idx) => (
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
                      <section.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {section.content}
                  </p>
                  
                  <ul className="space-y-3">
                    {section.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* ODD Contributions */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Contributions aux ODD' : 'SDG Contributions'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.contributions.map((odd, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                          {odd.number}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {odd.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {odd.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategic Positioning */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-center">
                <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Positionnement Stratégique' : 'Strategic Positioning'}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  {t.message}
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {[
                    {
                      icon: Users,
                      title: language === 'fr' ? 'Outil Opérationnel' : 'Operational Tool',
                      description: language === 'fr' 
                        ? 'Mise en œuvre des politiques de santé'
                        : 'Implementation of health policies'
                    },
                    {
                      icon: Heart,
                      title: language === 'fr' ? 'Plateforme de Coopération' : 'Cooperation Platform',
                      description: language === 'fr'
                        ? 'Dialogue multisectoriel et international'
                        : 'Multisectoral and international dialogue'
                    },
                    {
                      icon: Target,
                      title: language === 'fr' ? 'Levier d\'Impact' : 'Impact Lever',
                      description: language === 'fr'
                        ? 'Impact sanitaire, social et économique durable'
                        : 'Sustainable health, social and economic impact'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-white dark:bg-gray-800 mb-4">
                        <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Globe className="h-16 w-16 mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-6">
              {language === 'fr' 
                ? 'Engagez-vous pour la Santé Durable' 
                : 'Commit to Sustainable Health'}
            </h2>
            <p className="text-xl mb-10 opacity-90">
              {language === 'fr'
                ? 'Rejoignez notre initiative alignée sur les priorités mondiales de santé publique.'
                : 'Join our initiative aligned with global public health priorities.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/programs" className="flex items-center">
                  {language === 'fr' ? 'Voir les Programmes' : 'View Programs'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}