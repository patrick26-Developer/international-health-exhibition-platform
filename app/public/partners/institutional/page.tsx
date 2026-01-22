// app/public/partners/institutional/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Building2, Globe, Shield, Target, Users, Handshake, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InstitutionalPartnersPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Partenaires Institutionnels',
      subtitle: 'Alliances stratégiques avec les acteurs publics pour la santé durable',
      intro: 'Nous développons des partenariats avec les ministères, autorités publiques, institutions de santé et collectivités territoriales pour aligner nos actions avec les politiques publiques.',
      
      benefits: [
        'Alignement avec les politiques publiques de santé',
        'Renforcement de la cohérence des actions de prévention',
        'Appropriation institutionnelle et territoriale du S.I.S.',
        'Soutien à la mise en œuvre opérationnelle des engagements'
      ],
      
      types: [
        {
          icon: Building2,
          title: 'Ministères & Autorités',
          description: 'Collaboration avec les décideurs politiques nationaux'
        },
        {
          icon: Globe,
          title: 'Organisations Internationales',
          description: 'Partenariats avec institutions sanitaires mondiales'
        },
        {
          icon: Shield,
          title: 'Collectivités Territoriales',
          description: 'Action locale en coordination avec les territoires'
        },
        {
          icon: Users,
          title: 'Institutions de Santé',
          description: 'Coopération avec hôpitaux et centres de recherche'
        }
      ],
      
      value: 'S\'associer au S.I.S., c\'est contribuer à la réduction durable des maladies non transmissibles et participer à une dynamique internationale de prévention.',
      
      message: 'Le S.I.S. fédère institutions, entreprises et mécènes autour d\'un objectif commun : prévenir, promouvoir la santé et agir durablement.'
    },
    en: {
      title: 'Institutional Partners',
      subtitle: 'Strategic alliances with public stakeholders for sustainable health',
      intro: 'We develop partnerships with ministries, public authorities, health institutions and local governments to align our actions with public policies.',
      
      benefits: [
        'Alignment with public health policies',
        'Strengthening prevention action coherence',
        'Institutional and territorial ownership of S.I.S.',
        'Support for operational implementation of commitments'
      ],
      
      types: [
        {
          icon: Building2,
          title: 'Ministries & Authorities',
          description: 'Collaboration with national policy makers'
        },
        {
          icon: Globe,
          title: 'International Organizations',
          description: 'Partnerships with global health institutions'
        },
        {
          icon: Shield,
          title: 'Local Governments',
          description: 'Local action coordinated with territories'
        },
        {
          icon: Users,
          title: 'Health Institutions',
          description: 'Cooperation with hospitals and research centers'
        }
      ],
      
      value: 'Partnering with S.I.S. means contributing to the sustainable reduction of non-communicable diseases and participating in an international prevention dynamic.',
      
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
              <Building2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
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

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Valeurs Ajoutées' : 'Value Added'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {t.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {benefit}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partner Types */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {language === 'fr' ? 'Types de Partenaires' : 'Partner Types'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.types.map((type, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                      <type.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {type.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Value Proposition */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-center">
                <Target className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Proposition de Valeur' : 'Value Proposition'}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  {t.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Model */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {language === 'fr' ? 'Modèle de Collaboration' : 'Collaboration Model'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: language === 'fr' ? 'Diagnostic Partagé' : 'Shared Diagnosis',
                  description: language === 'fr'
                    ? 'Analyse conjointe des besoins et des priorités de santé publique'
                    : 'Joint analysis of public health needs and priorities'
                },
                {
                  step: '2',
                  title: language === 'fr' ? 'Co-construction' : 'Co-construction',
                  description: language === 'fr'
                    ? 'Élaboration collaborative des programmes et actions'
                    : 'Collaborative development of programs and actions'
                },
                {
                  step: '3',
                  title: language === 'fr' ? 'Mise en Œuvre' : 'Implementation',
                  description: language === 'fr'
                    ? 'Déploiement conjoint avec suivi et évaluation'
                    : 'Joint deployment with monitoring and evaluation'
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="h-full p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
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
                <Link href="/public/partners" className="flex items-center">
                  {language === 'fr' ? 'Voir les Autres Partenariats' : 'View Other Partnerships'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}