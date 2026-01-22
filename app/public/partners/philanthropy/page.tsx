'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Heart, Target, Users, Award, Shield, Sparkles, TrendingUp, ArrowRight, CheckCircle2, BarChart3, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PhilanthropyPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Mécénat Santé',
      subtitle: 'Transformer la générosité en impact sanitaire durable',
      intro: 'Le mécénat S.I.S. dépasse le simple don pour devenir un investissement mesurable dans le capital santé des populations. Une philanthropie stratégique, transparente et à impact.',
      
      valueProposition: {
        title: 'Philanthropie à Impact Mesurable',
        points: [
          'Chaque euro génère un retour social et sanitaire quantifié',
          'Traçabilité complète de la donation aux résultats sur le terrain',
          'Alignement avec les Objectifs de Développement Durable',
          'Reconnaissance institutionnelle internationale'
        ]
      },
      
      focusAreas: [
        {
          icon: Users,
          title: 'Populations Vulnérables',
          description: 'Prévention santé dans les zones à faible accès aux soins',
          impact: '10,000 bénéficiaires directs par an'
        },
        {
          icon: Leaf,
          title: 'Innovation Sociale',
          description: 'Financement de programmes pilotes et R&D en prévention',
          impact: '5 programmes innovants soutenus'
        },
        {
          icon: Globe,
          title: 'Éducation Santé',
          description: 'Campagnes d\'éducation et outils pédagogiques',
          impact: '50,000 supports distribués annuellement'
        },
        {
          icon: Shield,
          title: 'Renforcement Institutionnel',
          description: 'Formation des acteurs locaux de santé publique',
          impact: '500 professionnels formés'
        }
      ],
      
      impactCalculator: {
        title: 'Votre Impact en Chiffres',
        examples: [
          '10,000€ = 100 ateliers de prévention diabète',
          '25,000€ = Programme annuel dans une région prioritaire',
          '50,000€ = Recherche-action sur les comportements santé',
          '100,000€ = Partenaire fondateur d\'un programme pérenne'
        ]
      },
      
      givingLevels: [
        {
          level: 'Bienfaiteur',
          range: '1,000 - 10,000€',
          benefits: [
            'Reconnaissance sur supports digitaux',
            'Rapport d\'impact personnalisé',
            'Invitation aux événements'
          ]
        },
        {
          level: 'Bienfaiteur Majeur',
          range: '10,000 - 50,000€',
          benefits: [
            'Nom sur le mur des donateurs',
            'Visite terrain programmée',
            'Rencontre avec les équipes'
          ]
        },
        {
          level: 'Partenaire Fondateur',
          range: '50,000€ et +',
          benefits: [
            'Espace dédié sur le site web',
            'Participation au comité stratégique',
            'Reportage sur votre engagement'
          ]
        }
      ],
      
      governance: [
        '100% des dons affectés aux programmes terrain',
        'Audit annuel par cabinet indépendant',
        'Publication transparente des comptes',
        'Indicateurs d\'impact validés par l\'OMS'
      ],
      
      message: 'Votre générosité construit les fondations d\'un système de santé préventif et durable pour les générations futures.'
    },
    en: {
      title: 'Health Philanthropy',
      subtitle: 'Transforming generosity into sustainable health impact',
      intro: 'S.I.S. philanthropy goes beyond simple donation to become a measurable investment in population health capital. Strategic, transparent, and high-impact giving.',
      
      valueProposition: {
        title: 'Measurable Impact Philanthropy',
        points: [
          'Every euro generates quantified social and health returns',
          'Complete traceability from donation to field results',
          'Alignment with Sustainable Development Goals',
          'International institutional recognition'
        ]
      },
      
      focusAreas: [
        {
          icon: Users,
          title: 'Vulnerable Populations',
          description: 'Health prevention in low-access areas',
          impact: '10,000 direct beneficiaries per year'
        },
        {
          icon: Leaf,
          title: 'Social Innovation',
          description: 'Funding pilot programs and prevention R&D',
          impact: '5 innovative programs supported'
        },
        {
          icon: Globe,
          title: 'Health Education',
          description: 'Education campaigns and pedagogical tools',
          impact: '50,000 materials distributed annually'
        },
        {
          icon: Shield,
          title: 'Institutional Strengthening',
          description: 'Training local public health actors',
          impact: '500 professionals trained'
        }
      ],
      
      impactCalculator: {
        title: 'Your Impact in Numbers',
        examples: [
          '€10,000 = 100 diabetes prevention workshops',
          '€25,000 = Annual program in priority region',
          '€50,000 = Action-research on health behaviors',
          '€100,000 = Founding partner of sustainable program'
        ]
      },
      
      givingLevels: [
        {
          level: 'Benefactor',
          range: '€1,000 - €10,000',
          benefits: [
            'Recognition on digital media',
            'Personalized impact report',
            'Event invitations'
          ]
        },
        {
          level: 'Major Benefactor',
          range: '€10,000 - €50,000',
          benefits: [
            'Name on donor wall',
            'Scheduled field visit',
            'Meeting with teams'
          ]
        },
        {
          level: 'Founding Partner',
          range: '€50,000+',
          benefits: [
            'Dedicated website space',
            'Strategic committee participation',
            'Feature story on your engagement'
          ]
        }
      ],
      
      governance: [
        '100% of donations allocated to field programs',
        'Annual audit by independent firm',
        'Transparent financial publication',
        'Impact indicators validated by WHO'
      ],
      
      message: 'Your generosity builds the foundations of a preventive and sustainable health system for future generations.'
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
              href="/public/partners" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour aux partenariats' : 'Back to partnerships'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <Heart className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Philanthropie Stratégique' : 'Strategic Philanthropy'}
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

      {/* Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-center">
                <Target className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.valueProposition.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {t.valueProposition.points.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Domaines d\'Intervention' : 'Focus Areas'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.focusAreas.map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="mb-6 p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 inline-block">
                    <area.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {area.description}
                  </p>
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {area.impact}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Impact Calculator */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t.impactCalculator.title}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.impactCalculator.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-gray-900"
                  >
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {example}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Giving Levels */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Niveaux d\'Engagement' : 'Giving Levels'}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.givingLevels.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="text-center mb-6">
                      <div className={`inline-flex px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                        idx === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        idx === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {level.level}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {level.range}
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {level.benefits.map((benefit, benefitIdx) => (
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

            {/* Governance */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-center">
                <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Gouvernance & Transparence' : 'Governance & Transparency'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {t.governance.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-gray-700 dark:text-gray-300">{point}</p>
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
            <Sparkles className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Discuter d\'un Projet' : 'Discuss a Project'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Demander une Proposition' : 'Request a Proposal'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}