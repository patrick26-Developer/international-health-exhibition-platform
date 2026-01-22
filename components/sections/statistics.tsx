// components/sections/statistics.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { TrendingUp, Users, Globe, Award, Heart, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function StatisticsSection() {
  const { language } = useLanguageStore();
  const [counts, setCounts] = useState({
    countries: 0,
    participants: 0,
    sessions: 0,
    impact: 0,
    partners: 0,
    editions: 0
  });

  const stats = [
    {
      id: 'countries',
      icon: Globe,
      value: counts.countries,
      suffix: '+',
      label: language === 'fr' ? 'Pays Représentés' : 'Countries Represented',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'participants',
      icon: Users,
      value: counts.participants,
      suffix: 'K+',
      label: language === 'fr' ? 'Participants' : 'Participants',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      id: 'sessions',
      icon: Award,
      value: counts.sessions,
      suffix: '+',
      label: language === 'fr' ? 'Sessions Scientifiques' : 'Scientific Sessions',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 'impact',
      icon: Heart,
      value: counts.impact,
      suffix: 'K+',
      label: language === 'fr' ? 'Vies Impactées' : 'Lives Impacted',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 'partners',
      icon: Target,
      value: counts.partners,
      suffix: '+',
      label: language === 'fr' ? 'Partenaires Stratégiques' : 'Strategic Partners',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 'editions',
      icon: TrendingUp,
      value: counts.editions,
      suffix: '',
      label: language === 'fr' ? 'Éditions Réussies' : 'Successful Editions',
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20'
    }
  ];

  useEffect(() => {
    const finalValues = {
      countries: 65,
      participants: 25,
      sessions: 150,
      impact: 500,
      partners: 180,
      editions: 7
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat) => {
      const finalValue = finalValues[stat.id as keyof typeof finalValues];
      const stepValue = finalValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= finalValue) {
          current = finalValue;
          clearInterval(timer);
        }
        
        setCounts(prev => ({
          ...prev,
          [stat.id]: Math.floor(current)
        }));
      }, interval);
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'fr' ? 'Notre Impact en Chiffres' : 'Our Impact in Numbers'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'fr' 
              ? 'Des années d\'engagement pour la santé mondiale mesurées par des résultats concrets'
              : 'Years of commitment to global health measured by concrete results'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-6 p-4 rounded-2xl ${stat.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className={`h-10 w-10 ${stat.color}`} />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                      {counts[stat.id as keyof typeof counts]}
                    </span>
                    <span className={`text-2xl font-bold ${stat.color}`}>
                      {stat.suffix}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Indicator */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Croissance Continue' : 'Continuous Growth'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'fr' 
                  ? 'Notre impact augmente chaque année grâce à notre réseau grandissant'
                  : 'Our impact increases each year thanks to our growing network'}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  +35%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Participation' : 'Participation'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  +42%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Partenariats' : 'Partnerships'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  +28%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Impact' : 'Impact'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}