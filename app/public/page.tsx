// app/public/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { ArrowRight, PlayCircle, Target, Globe, TrendingUp, Users, Award, Heart, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PublicHome() {
  const { language } = useLanguageStore();
  
  const content = {
    fr: {
      hero: {
        title: 'Salon International de la Santé',
        subtitle: 'Plateforme Mondiale de Prévention et de Promotion de la Santé',
        description: 'Transformer la prévention en investissement stratégique durable pour le développement humain, social et économique.',
        ctaPrimary: 'Découvrir la Vision',
        ctaSecondary: 'Voir les Programmes'
      },
      vision: {
        title: 'Notre Vision',
        text: 'Faire de la prévention et de la promotion de la santé un investissement stratégique durable pour le développement humain, social et économique.',
        points: [
          'Des individus acteurs de leur santé',
          'Des communautés disposant de solutions accessibles',
          'Des institutions intégrant la prévention'
        ]
      },
      stats: [
        { value: '70%', label: 'Décès liés aux MNT', icon: Heart },
        { value: '100+', label: 'Pays concernés', icon: Globe },
        { value: 'ODD 3', label: 'Alignement prioritaire', icon: Target },
        { value: '2024', label: 'Édition active', icon: Calendar }
      ],
      message: 'Prévenir aujourd\'hui, c\'est protéger la santé et le développement de demain.'
    },
    en: {
      hero: {
        title: 'International Health Fair',
        subtitle: 'Global Platform for Health Prevention and Promotion',
        description: 'Transforming prevention into a strategic sustainable investment for human, social, and economic development.',
        ctaPrimary: 'Discover the Vision',
        ctaSecondary: 'View Programs'
      },
      vision: {
        title: 'Our Vision',
        text: 'To make health prevention and promotion a strategic and sustainable investment for human, social, and economic development.',
        points: [
          'Individuals as active agents of their health',
          'Communities with accessible solutions',
          'Institutions integrating prevention'
        ]
      },
      stats: [
        { value: '70%', label: 'NCD-related deaths', icon: Heart },
        { value: '100+', label: 'Countries affected', icon: Globe },
        { value: 'SDG 3', label: 'Priority alignment', icon: Target },
        { value: '2024', label: 'Active edition', icon: Calendar }
      ],
      message: 'Prevention today means health, resilience, and development tomorrow.'
    }
  };

  const t = content[language];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950/20">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-gray-50/[0.02]" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Logo et en-tête */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-6">
                <Globe className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {language === 'fr' ? 'Plateforme Internationale' : 'International Platform'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="block text-gray-900 dark:text-white">{t.hero.title}</span>
                <span className="block text-emerald-600 dark:text-emerald-400 mt-4 text-3xl md:text-4xl">
                  {t.hero.subtitle}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* Message fort */}
            <div className="mb-16 p-8 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <Target className="h-8 w-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.message}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' 
                      ? 'Le S.I.S. n\'est pas un simple événement. C\'est un levier de transformation des comportements et des politiques de santé.'
                      : 'The S.I.S. is not merely an event. It is a catalyst for behavioral change and health policy transformation.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button size="lg" className="px-8 py-6 text-lg bg-emerald-600 hover:bg-emerald-700">
                <Link href="/public/about/vision" className="flex items-center">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                <Link href="/public/programs" className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  {t.hero.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
                >
                  <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.vision.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                {t.vision.text}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {t.vision.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {point}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr'
                      ? 'Contribution directe à l\'amélioration durable de la santé et du bien-être.'
                      : 'Direct contribution to sustainable health and wellbeing improvement.'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Chiffres Clés - Pourquoi le S.I.S. ?' : 'Key Figures - Why the S.I.S.?'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: TrendingUp,
                  title: language === 'fr' ? 'Enjeu Mondial' : 'Global Challenge',
                  stats: [
                    language === 'fr' ? '70%+ des décès liés aux MNT' : '70%+ deaths from NCDs',
                    language === 'fr' ? 'Facteurs de risque largement évitables' : 'Largely preventable risk factors',
                    language === 'fr' ? 'Progression rapide mondiale' : 'Rapid global progression'
                  ]
                },
                {
                  icon: Award,
                  title: language === 'fr' ? 'Enjeu Économique' : 'Economic Challenge',
                  stats: [
                    language === 'fr' ? 'Coût considérable pour les systèmes de santé' : 'Substantial burden on health systems',
                    language === 'fr' ? 'Réduction durable des dépenses par la prévention' : 'Sustainable reduction of healthcare costs',
                    language === 'fr' ? 'Investissement générateur de bénéfices' : 'Investment generating measurable returns'
                  ]
                },
                {
                  icon: Shield,
                  title: language === 'fr' ? 'Enjeu Sociétal' : 'Societal Challenge',
                  stats: [
                    language === 'fr' ? 'Amélioration du bien-être et productivité' : 'Improved wellbeing and productivity',
                    language === 'fr' ? 'Renforcement de l\'autonomie des populations' : 'Strengthened population autonomy',
                    language === 'fr' ? 'Réduction des inégalités de santé' : 'Reduction of health inequalities'
                  ]
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                      <section.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {section.stats.map((stat, statIdx) => (
                      <li key={statIdx} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {stat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            {/* Positionnement clé */}
            <div className="mt-20 p-8 rounded-2xl bg-emerald-600 dark:bg-emerald-700 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">
                {language === 'fr'
                  ? 'Le Salon International de la Santé est une plateforme d\'actions, de mobilisation et d\'impact au service de la santé durable.'
                  : 'The International Health Fair is an action-oriented, impact-driven platform serving sustainable health development.'}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                  <Link href="/public/contact" className="flex items-center">
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <Link href="/public/register" className="flex items-center">
                    {language === 'fr' ? 'S\'inscrire' : 'Register'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'fr' ? 'Nos Programmes' : 'Our Programs'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Des solutions intégrées pour agir sur les principaux déterminants des maladies non transmissibles'
                : 'Integrated solutions to address the main determinants of non-communicable diseases'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: language === 'fr' ? 'Sport & Santé' : 'Sport & Health',
                description: language === 'fr' ? 'Activité physique comme pilier fondamental de la prévention' : 'Physical activity as a fundamental pillar of prevention',
                link: '/public/programs/sport-health',
                color: 'bg-emerald-100 dark:bg-emerald-900/30'
              },
              {
                title: language === 'fr' ? 'Nutrition' : 'Nutrition',
                description: language === 'fr' ? 'Éducation nutritionnelle et habitudes alimentaires favorables' : 'Nutrition education and healthy eating habits',
                link: '/public/programs/nutrition',
                color: 'bg-emerald-100 dark:bg-emerald-900/30'
              },
              {
                title: language === 'fr' ? 'Bien-être' : 'Well-being',
                description: language === 'fr' ? 'Santé mentale et équilibre psychologique' : 'Mental health and psychological balance',
                link: '/public/programs/wellbeing',
                color: 'bg-emerald-100 dark:bg-emerald-900/30'
              },
              {
                title: language === 'fr' ? 'Prévention MNT' : 'NCD Prevention',
                description: language === 'fr' ? 'Réduction des facteurs de risque évitables' : 'Reduction of avoidable risk factors',
                link: '/public/programs/prevention',
                color: 'bg-emerald-100 dark:bg-emerald-900/30'
              }
            ].map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={program.link}>
                  <div className="h-full p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                    <div className={`mb-6 p-4 rounded-xl ${program.color} inline-block`}>
                      <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {program.description}
                    </p>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      {language === 'fr' ? 'En savoir plus →' : 'Learn more →'}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
              <Link href="/public/programs" className="flex items-center">
                {language === 'fr' ? 'Voir tous les programmes' : 'View all programs'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}