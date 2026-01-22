// app/partners/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  Handshake, 
  Sparkles, 
  Award,
  Globe,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

export default function PartnersPage() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Partenariats Stratégiques',
      subtitle: 'Construire ensemble un avenir plus sain',
      description: 'Nous unissons nos forces avec des organisations partageant notre vision pour créer un impact durable sur la santé mondiale.',
      partnerTypes: [
        {
          id: 'institutional',
          title: 'Partenaires Institutionnels',
          icon: Building2,
          description: 'Organisations gouvernementales et internationales',
          examples: ['OMS', 'UNESCO', 'Union Européenne', 'Gouvernements']
        },
        {
          id: 'sponsors',
          title: 'Sponsors & Partenaires Privés',
          icon: Handshake,
          description: 'Entreprises engagées dans la RSE santé',
          examples: ['Industrie Pharma', 'Équipement Médical', 'Assurances']
        },
        {
          id: 'philanthropy',
          title: 'Mécènes & Fondations',
          icon: Sparkles,
          description: 'Organisations philanthropiques dédiées à la santé',
          examples: ['Fondations Santé', 'ONG Internationales', 'Donateurs']
        }
      ],
      benefits: [
        {
          icon: Globe,
          title: 'Visibilité Internationale',
          description: 'Exposition auprès de 50+ pays participants'
        },
        {
          icon: Users,
          title: 'Accès au Réseau',
          description: 'Connexions avec leaders santé mondiaux'
        },
        {
          icon: TrendingUp,
          title: 'Impact Mesurable',
          description: 'Contributions aux ODD documentées'
        },
        {
          icon: Shield,
          title: 'Alignement RSE',
          description: 'Valorisation des engagements sociaux'
        }
      ]
    },
    en: {
      title: 'Strategic Partnerships',
      subtitle: 'Building a healthier future together',
      description: 'We join forces with organizations sharing our vision to create lasting impact on global health.',
      partnerTypes: [
        {
          id: 'institutional',
          title: 'Institutional Partners',
          icon: Building2,
          description: 'Governmental and international organizations',
          examples: ['WHO', 'UNESCO', 'European Union', 'Governments']
        },
        {
          id: 'sponsors',
          title: 'Sponsors & Private Partners',
          icon: Handshake,
          description: 'Companies committed to health CSR',
          examples: ['Pharma Industry', 'Medical Equipment', 'Insurance']
        },
        {
          id: 'philanthropy',
          title: 'Patrons & Foundations',
          icon: Sparkles,
          description: 'Philanthropic organizations dedicated to health',
          examples: ['Health Foundations', 'International NGOs', 'Donors']
        }
      ],
      benefits: [
        {
          icon: Globe,
          title: 'International Visibility',
          description: 'Exposure to 50+ participating countries'
        },
        {
          icon: Users,
          title: 'Network Access',
          description: 'Connections with global health leaders'
        },
        {
          icon: TrendingUp,
          title: 'Measurable Impact',
          description: 'Documented contributions to SDGs'
        },
        {
          icon: Shield,
          title: 'CSR Alignment',
          description: 'Recognition of social commitments'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-8">
              <Handshake className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'fr' ? '+150 Partenaires Stratégiques' : '+150 Strategic Partners'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-2xl text-blue-600 dark:text-blue-400 mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              {t.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                {language === 'fr' ? 'Télécharger le Dossier' : 'Download Partnership Kit'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Types de Partenariats' : 'Partnership Types'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.partnerTypes.map((type, idx) => (
              <Card key={idx} className="border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                      <type.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2 w-full">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {language === 'fr' ? 'Exemples :' : 'Examples:'}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {type.examples.map((example, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Avantages du Partenariat' : 'Partnership Benefits'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Rejoignez un réseau d\'influence et créez un impact mesurable'
                : 'Join an influential network and create measurable impact'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 mb-6">
                  <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="h-16 w-16 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'fr' 
                ? 'Rejoignez les Leaders de la Santé Mondiale'
                : 'Join Global Health Leaders'}
            </h2>
            <p className="text-xl mb-10 opacity-90">
              {language === 'fr'
                ? 'Participez à une initiative d\'envergure internationale et marquez votre engagement pour la santé durable.'
                : 'Participate in an international initiative and mark your commitment to sustainable health.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                {language === 'fr' ? 'Demander un Rendez-vous' : 'Request a Meeting'}
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white/10">
                {language === 'fr' ? 'Voir les Partenaires Actuels' : 'See Current Partners'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}