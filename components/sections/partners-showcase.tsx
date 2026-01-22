// components/sections/partners-showcase.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Building2, Handshake, Sparkles, Award, Globe, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function PartnersShowcase() {
  const { language } = useLanguageStore();
  
  const partnerTypes = [
    {
      type: 'institutional',
      icon: Building2,
      title: language === 'fr' ? 'Institutionnels' : 'Institutional',
      description: language === 'fr' 
        ? 'Organisations gouvernementales et internationales'
        : 'Governmental and international organizations',
      partners: ['OMS', 'UNESCO', 'UE', 'Gouvernements'],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      type: 'sponsors',
      icon: Handshake,
      title: language === 'fr' ? 'Sponsors' : 'Sponsors',
      description: language === 'fr'
        ? 'Entreprises engagées dans la RSE santé'
        : 'Companies committed to health CSR',
      partners: ['Sanofi', 'Roche', 'Medtronic', 'Siemens Health'],
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      type: 'philanthropy',
      icon: Sparkles,
      title: language === 'fr' ? 'Mécènes' : 'Patrons',
      description: language === 'fr'
        ? 'Fondations et philanthropes dédiés à la santé'
        : 'Foundations and philanthropists dedicated to health',
      partners: ['Gates Foundation', 'Wellcome Trust', 'Rockefeller', 'Bloomberg'],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  // Partner logos (placeholder - replace with actual logos)
  const partnerLogos = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Partner ${i + 1}`,
    type: i % 3 === 0 ? 'institutional' : i % 3 === 1 ? 'sponsors' : 'philanthropy'
  }));

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 mb-6">
            <Handshake className="h-4 w-4" />
            <span className="text-sm font-medium">
              {language === 'fr' ? '+150 Partenaires Stratégiques' : '+150 Strategic Partners'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'fr' ? 'Notre Réseau de Partenaires' : 'Our Partner Network'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'fr'
              ? 'Nous unissons nos forces avec des organisations leaders pour créer un impact durable'
              : 'We join forces with leading organizations to create lasting impact'}
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-6 p-5 rounded-2xl ${type.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <type.icon className={`h-10 w-10 ${type.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {type.description}
                  </p>
                  
                  <div className="space-y-3 w-full">
                    {type.partners.map((partner, idx) => (
                      <div key={idx} className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {partner}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {language === 'fr' ? 'Quelques-uns de nos partenaires' : 'Some of our partners'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-square p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative w-full h-full">
                    {/* Placeholder for partner logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${
                        partner.type === 'institutional' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        partner.type === 'sponsors' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        <Building2 className={`h-10 w-10 ${
                          partner.type === 'institutional' ? 'text-blue-600 dark:text-blue-400' :
                          partner.type === 'sponsors' ? 'text-emerald-600 dark:text-emerald-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} />
                      </div>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Pourquoi devenir partenaire ?' : 'Why become a partner?'}
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: Globe,
                  title: language === 'fr' ? 'Visibilité Internationale' : 'International Visibility',
                  description: language === 'fr'
                    ? 'Exposition auprès de décideurs santé de 65+ pays'
                    : 'Exposure to health decision-makers from 65+ countries'
                },
                {
                  icon: TrendingUp,
                  title: language === 'fr' ? 'Impact Mesurable' : 'Measurable Impact',
                  description: language === 'fr'
                    ? 'Contributions documentées aux ODD et indicateurs santé'
                    : 'Documented contributions to SDGs and health indicators'
                },
                {
                  icon: Award,
                  title: language === 'fr' ? 'Reconnaissance' : 'Recognition',
                  description: language === 'fr'
                    ? 'Certification et valorisation de votre engagement RSE'
                    : 'Certification and recognition of your CSR commitment'
                }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                    <benefit.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="mt-8 group">
              {language === 'fr' ? 'Devenir partenaire' : 'Become a partner'}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Nos Partenaires Témoignent' : 'Our Partners Testify'}
              </h4>
              
              <div className="space-y-6">
                {[
                  {
                    quote: language === 'fr'
                      ? "Un partenariat stratégique qui a transformé notre approche de la prévention santé à l'échelle mondiale."
                      : "A strategic partnership that transformed our approach to health prevention on a global scale.",
                    author: "Dr. Marie Laurent",
                    role: language === 'fr' ? "Directrice Santé Publique" : "Public Health Director",
                    organization: "OMS Europe"
                  },
                  {
                    quote: language === 'fr'
                      ? "L'impact mesurable de notre collaboration dépasse nos attentes en termes d'innovation et de portée."
                      : "The measurable impact of our collaboration exceeds our expectations in terms of innovation and reach.",
                    author: "John Smith",
                    role: language === 'fr' ? "VP RSE" : "CSO VP",
                    organization: "Sanofi"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="text-left">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}, {testimonial.organization}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}