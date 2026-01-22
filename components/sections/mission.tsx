// components/sections/mission.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Target, Heart, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function MissionSection() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      title: 'Notre Mission & Vision',
      subtitle: 'Transformer la santé mondiale par la prévention',
      description: 'Nous créons un écosystème international qui rassemble experts, décideurs, innovateurs et citoyens pour construire un avenir plus sain et durable.',
      values: [
        {
          icon: Target,
          title: 'Impact Mesurable',
          description: 'Suivi rigoureux des indicateurs de santé publique et des ODD'
        },
        {
          icon: Heart,
          title: 'Approche Humaniste',
          description: 'Personne au centre, équité d\'accès aux soins et prévention'
        },
        {
          icon: Globe,
          title: 'Vision Globale',
          description: 'Collaboration internationale, échange des meilleures pratiques'
        },
        {
          icon: Shield,
          title: 'Intégrité Scientifique',
          description: 'Bases scientifiques solides, éthique de recherche rigoureuse'
        }
      ]
    },
    en: {
      title: 'Our Mission & Vision',
      subtitle: 'Transforming global health through prevention',
      description: 'We create an international ecosystem that brings together experts, decision-makers, innovators, and citizens to build a healthier and more sustainable future.',
      values: [
        {
          icon: Target,
          title: 'Measurable Impact',
          description: 'Rigorous monitoring of public health indicators and SDGs'
        },
        {
          icon: Heart,
          title: 'Human-centered Approach',
          description: 'People at the center, equitable access to care and prevention'
        },
        {
          icon: Globe,
          title: 'Global Vision',
          description: 'International collaboration, sharing best practices'
        },
        {
          icon: Shield,
          title: 'Scientific Integrity',
          description: 'Strong scientific basis, rigorous research ethics'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-emerald-600 dark:text-emerald-400 mb-6">
            {t.subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.description}
          </p>
        </div>
        
        {/* Value Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.values.map((value, idx) => (
            <Card key={idx} className="border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/50 transition-colors">
                    <value.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* SDG Integration */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Aligné sur les Objectifs de Développement Durable' : 'Aligned with Sustainable Development Goals'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Notre action contribue directement à 8 ODD, avec un focus particulier sur la santé et le bien-être (ODD 3)'
                : 'Our action directly contributes to 8 SDGs, with a particular focus on health and wellbeing (SDG 3)'}
            </p>
            {/* SDG Icons Grid */}
            <div className="flex flex-wrap justify-center gap-4">
              {[3, 4, 5, 8, 10, 11, 13, 17].map((sdg) => (
                <div key={sdg} className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {sdg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}