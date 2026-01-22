// app/about/vision/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Target, Globe, Heart, Users, ArrowRight, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VisionPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Vision du S.I.S.',
      subtitle: 'Faire de la prévention et de la promotion de la santé un investissement stratégique durable',
      sections: [
        {
          title: 'Notre Ambition',
          content: 'Le Salon International de la Santé (S.I.S.) porte la vision d\'un monde où la santé n\'est plus seulement traitée lorsqu\'elle est menacée, mais préservée, renforcée et valorisée tout au long de la vie. Nous œuvrons pour des sociétés dans lesquelles les individus sont acteurs de leur santé, les communautés disposent de solutions accessibles et adaptées, et les institutions intègrent la prévention au cœur de leurs stratégies.'
        },
        {
          title: 'Approche Stratégique',
          content: 'À travers une approche inclusive, multisectorielle et orientée impact, le S.I.S. contribue à la réduction durable des maladies non transmissibles et à l\'amélioration du bien-être des populations, en cohérence avec les priorités internationales de santé publique et les Objectifs de Développement Durable.'
        },
        {
          title: 'Impact Durable',
          content: 'Notre action vise à transformer la prévention en priorité stratégique et collective, créant un impact mesurable sur la santé publique, le développement social et la performance économique.'
        }
      ],
      pillars: [
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Engager tous les acteurs : citoyens, institutions, entreprises, ONG'
        },
        {
          icon: Globe,
          title: 'International',
          description: 'Vision globale, actions locales adaptées aux contextes'
        },
        {
          icon: Heart,
          title: 'Prévention',
          description: 'Agir en amont pour préserver la santé et le bien-être'
        },
        {
          icon: Shield,
          title: 'Durabilité',
          description: 'Impact mesurable et pérenne sur le long terme'
        }
      ]
    },
    en: {
      title: 'S.I.S. Vision',
      subtitle: 'To make health prevention and promotion a strategic and sustainable investment',
      sections: [
        {
          title: 'Our Ambition',
          content: 'The International Health Fair (S.I.S.) promotes a vision in which health is no longer addressed only through curative responses, but preserved, strengthened, and valued throughout the life course. We advocate for societies where individuals are active agents of their own health, communities have access to inclusive solutions, and institutions integrate prevention at the core of their strategies.'
        },
        {
          title: 'Strategic Approach',
          content: 'Through an inclusive, multisectoral, and impact-driven approach, the S.I.S. contributes to the sustainable reduction of non-communicable diseases and to the long-term improvement of population well-being, in line with international public health priorities and the Sustainable Development Goals.'
        },
        {
          title: 'Sustainable Impact',
          content: 'Our action aims to transform prevention into a strategic and collective priority, creating measurable impact on public health, social development, and economic performance.'
        }
      ],
      pillars: [
        {
          icon: Users,
          title: 'Inclusion',
          description: 'Engage all stakeholders: citizens, institutions, companies, NGOs'
        },
        {
          icon: Globe,
          title: 'International',
          description: 'Global vision, locally adapted actions'
        },
        {
          icon: Heart,
          title: 'Prevention',
          description: 'Act upstream to preserve health and wellbeing'
        },
        {
          icon: Shield,
          title: 'Sustainability',
          description: 'Measurable and lasting long-term impact'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                {language === 'fr' ? 'Retour au S.I.S.' : 'Back to S.I.S.'}
              </Link>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
                <Target className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {language === 'fr' ? 'Vision Institutionnelle' : 'Institutional Vision'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t.title}
              </h1>
              <p className="text-2xl text-emerald-600 dark:text-emerald-400 mb-8">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {t.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Pillars */}
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Piliers Fondateurs' : 'Founding Pillars'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.pillars.map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <pillar.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="h-16 w-16 mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-6">
              {language === 'fr' 
                ? 'Rejoignez Notre Vision' 
                : 'Join Our Vision'}
            </h2>
            <p className="text-xl mb-10 opacity-90">
              {language === 'fr'
                ? 'Contribuez à transformer la prévention en priorité stratégique pour la santé durable.'
                : 'Help transform prevention into a strategic priority for sustainable health.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/contact" className="flex items-center">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/programs" className="flex items-center">
                  {language === 'fr' ? 'Découvrir les Programmes' : 'Discover Programs'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}