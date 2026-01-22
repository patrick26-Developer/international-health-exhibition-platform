// app/public/partners/sponsors/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Handshake, Award, Shield, Sparkles, Users, Globe, Target, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SponsorsPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Sponsors & Partenaires Privés',
      subtitle: 'Cadre structuré pour l\'engagement des entreprises en faveur de la santé durable',
      intro: 'Le S.I.S. offre aux entreprises un espace crédible pour renforcer leur RSE et s\'associer à une initiative à fort impact sanitaire et social.',
      
      whyPartner: {
        title: 'Pourquoi Participer au S.I.S.',
        points: [
          'Visibilité institutionnelle maîtrisée',
          'Association à des programmes de prévention à fort impact',
          'Reconnaissance de l\'engagement sociétal',
          'Positionnement aligné avec les priorités mondiales de santé'
        ]
      },
      
      levels: [
        {
          title: 'Partenaire Platine',
          icon: Sparkles,
          investment: 'Engagement stratégique majeur',
          benefits: [
            'Visibilité leadership sur tous supports',
            'Participation au comité stratégique',
            'Programme dédié de communication',
            'Accès privilégié aux décideurs'
          ]
        },
        {
          title: 'Partenaire Or',
          icon: Award,
          investment: 'Engagement significatif',
          benefits: [
            'Visibilité majeure sur supports clés',
            'Programme de valorisation média',
            'Participation aux événements exclusifs',
            'Accès aux données d\'impact'
          ]
        },
        {
          title: 'Partenaire Argent',
          icon: Shield,
          investment: 'Engagement ciblé',
          benefits: [
            'Visibilité sur supports sélectionnés',
            'Valorisation institutionnelle',
            'Participation aux activités',
            'Certification partenaire'
          ]
        }
      ],
      
      valueProposition: [
        {
          icon: TrendingUp,
          title: 'Performance RSE',
          description: 'Améliorez votre scoring RSE avec un projet à impact sanitaire mesurable'
        },
        {
          icon: Users,
          title: 'Engagement Collaborateur',
          description: 'Impliquez vos équipes dans des actions de prévention santé'
        },
        {
          icon: Globe,
          title: 'Portée Internationale',
          description: 'Bénéficiez d\'une visibilité internationale alignée sur les ODD'
        },
        {
          icon: Target,
          title: 'Positionnement Institutionnel',
          description: 'Associez votre marque à une plateforme crédible de santé publique'
        }
      ],
      
      process: [
        {
          step: '01',
          title: 'Premier Contact',
          description: 'Échange initial pour comprendre vos objectifs et nos synergies'
        },
        {
          step: '02',
          title: 'Proposition Stratégique',
          description: 'Élaboration d\'un plan de partenariat personnalisé'
        },
        {
          step: '03',
          title: 'Signature & Lancement',
          description: 'Cérémonie de signature et communication conjointe'
        },
        {
          step: '04',
          title: 'Suivi & Valorisation',
          description: 'Rapports réguliers et valorisation de l\'impact'
        }
      ],
      
      message: 'Le S.I.S. fédère institutions, entreprises et mécènes autour d\'un objectif commun : prévenir, promouvoir la santé et agir durablement.'
    },
    en: {
      title: 'Sponsors & Private Partners',
      subtitle: 'Structured framework for corporate engagement in sustainable health',
      intro: 'The S.I.S. offers companies a credible space to strengthen their CSR and associate with a high-impact health and social initiative.',
      
      whyPartner: {
        title: 'Why Partner with S.I.S.',
        points: [
          'Controlled institutional visibility',
          'Association with high-impact prevention programs',
          'Recognition of societal engagement',
          'Positioning aligned with global health priorities'
        ]
      },
      
      levels: [
        {
          title: 'Platinum Partner',
          icon: Sparkles,
          investment: 'Major strategic commitment',
          benefits: [
            'Leadership visibility on all media',
            'Participation in strategic committee',
            'Dedicated communication program',
            'Privileged access to decision-makers'
          ]
        },
        {
          title: 'Gold Partner',
          icon: Award,
          investment: 'Significant commitment',
          benefits: [
            'Major visibility on key media',
            'Media valorization program',
            'Participation in exclusive events',
            'Access to impact data'
          ]
        },
        {
          title: 'Silver Partner',
          icon: Shield,
          investment: 'Targeted commitment',
          benefits: [
            'Visibility on selected media',
            'Institutional valorization',
            'Participation in activities',
            'Partner certification'
          ]
        }
      ],
      
      valueProposition: [
        {
          icon: TrendingUp,
          title: 'CSR Performance',
          description: 'Improve your CSR scoring with a measurable health impact project'
        },
        {
          icon: Users,
          title: 'Employee Engagement',
          description: 'Involve your teams in health prevention actions'
        },
        {
          icon: Globe,
          title: 'International Reach',
          description: 'Benefit from international visibility aligned with SDGs'
        },
        {
          icon: Target,
          title: 'Institutional Positioning',
          description: 'Associate your brand with a credible public health platform'
        }
      ],
      
      process: [
        {
          step: '01',
          title: 'Initial Contact',
          description: 'First exchange to understand your objectives and our synergies'
        },
        {
          step: '02',
          title: 'Strategic Proposal',
          description: 'Development of a customized partnership plan'
        },
        {
          step: '03',
          title: 'Signature & Launch',
          description: 'Signing ceremony and joint communication'
        },
        {
          step: '04',
          title: 'Monitoring & Valorization',
          description: 'Regular reports and impact valorization'
        }
      ],
      
      message: 'The S.I.S. brings together institutions, companies and philanthropies around a shared objective: prevention, health promotion and sustainable action.'
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
              <Handshake className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Partenariat Stratégique' : 'Strategic Partnership'}
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

      {/* Why Partner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {t.whyPartner.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {t.whyPartner.points.map((point, idx) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {point}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partnership Levels */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Niveaux de Partenariat' : 'Partnership Levels'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t.levels.map((level, idx) => (
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
                        <level.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {level.title}
                      </h3>
                    </div>
                    
                    <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {level.investment}
                      </p>
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

            {/* Value Proposition */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Valeur Ajoutée' : 'Value Proposition'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {t.valueProposition.map((item, idx) => (
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
                        <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Processus de Partenariat' : 'Partnership Process'}
              </h3>
              
              <div className="grid md:grid-cols-4 gap-8">
                {t.process.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                        {step.step}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                    
                    {idx < t.process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 dark:bg-gray-800" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Impact Mesurable' : 'Measurable Impact'}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  value: '50K+',
                  label: language === 'fr' ? 'Personnes Sensibilisées' : 'People Reached'
                },
                {
                  icon: Target,
                  value: '15+',
                  label: language === 'fr' ? 'Pays Impliqués' : 'Countries Involved'
                },
                {
                  icon: Handshake,
                  value: '100+',
                  label: language === 'fr' ? 'Partenariats Actifs' : 'Active Partnerships'
                },
                {
                  icon: Award,
                  value: '3',
                  label: language === 'fr' ? 'Prix Santé' : 'Health Awards'
                }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                    <metric.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                    {metric.value}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {metric.label}
                  </h3>
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
            <Handshake className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/partners/institutional" className="flex items-center">
                  {language === 'fr' ? 'Partenariats Institutionnels' : 'Institutional Partnerships'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}