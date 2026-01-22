// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  User,
  Building,
  Users,
  Calendar,
  CheckCircle2,
  Shield,
  Ticket,
  Award,
  Clock
} from 'lucide-react';

export default function RegisterPage() {
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState('visitors');
  
  const content = {
    fr: {
      title: 'Inscription au Salon',
      subtitle: 'Choisissez votre profil et rejoignez notre communauté',
      tabs: [
        { id: 'visitors', label: 'Visiteurs', icon: User },
        { id: 'exhibitors', label: 'Exposants', icon: Building },
        { id: 'volunteers', label: 'Volontaires', icon: Users }
      ],
      features: [
        {
          icon: Ticket,
          title: 'Accès Illimité',
          description: 'Accès à toutes les sessions et expositions'
        },
        {
          icon: Award,
          title: 'Certification',
          description: 'Attestation de participation professionnelle'
        },
        {
          icon: Clock,
          title: 'Replay 3 Mois',
          description: 'Accès aux replays des sessions'
        },
        {
          icon: Shield,
          title: 'Assurance',
          description: 'Couverture assurance pendant l\'événement'
        }
      ]
    },
    en: {
      title: 'Fair Registration',
      subtitle: 'Choose your profile and join our community',
      tabs: [
        { id: 'visitors', label: 'Visitors', icon: User },
        { id: 'exhibitors', label: 'Exhibitors', icon: Building },
        { id: 'volunteers', label: 'Volunteers', icon: Users }
      ],
      features: [
        {
          icon: Ticket,
          title: 'Unlimited Access',
          description: 'Access to all sessions and exhibitions'
        },
        {
          icon: Award,
          title: 'Certification',
          description: 'Professional participation certificate'
        },
        {
          icon: Clock,
          title: '3 Month Replay',
          description: 'Access to session replays'
        },
        {
          icon: Shield,
          title: 'Insurance',
          description: 'Event insurance coverage'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    {t.tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Visitors Form */}
                  <TabsContent value="visitors" className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {language === 'fr' ? 'Inscription Visiteur' : 'Visitor Registration'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language === 'fr' ? 'Nom complet' : 'Full Name'}
                        </label>
                        <Input placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <Input type="email" placeholder="email@exemple.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language === 'fr' ? 'Profession' : 'Profession'}
                        </label>
                        <Input placeholder={language === 'fr' ? 'Médecin, Chercheur...' : 'Doctor, Researcher...'} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language === 'fr' ? 'Organisation' : 'Organization'}
                        </label>
                        <Input placeholder={language === 'fr' ? 'Hôpital, Université...' : 'Hospital, University...'} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {language === 'fr' ? 'Centres d\'intérêt' : 'Areas of Interest'}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          language === 'fr' ? 'Médecine du Sport' : 'Sports Medicine',
                          language === 'fr' ? 'Nutrition' : 'Nutrition',
                          language === 'fr' ? 'Santé Mentale' : 'Mental Health',
                          language === 'fr' ? 'Prévention' : 'Prevention',
                          language === 'fr' ? 'Recherche' : 'Research',
                          language === 'fr' ? 'Innovation' : 'Innovation'
                        ].map((interest, idx) => (
                          <label key={idx} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                            <Checkbox />
                            <span className="text-sm">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                      <Button className="w-full py-6 text-lg">
                        {language === 'fr' ? 'S\'inscrire maintenant' : 'Register Now'}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Exhibitors Form */}
                  <TabsContent value="exhibitors" className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {language === 'fr' ? 'Inscription Exposant' : 'Exhibitor Registration'}
                    </h3>
                    {/* Similar form structure for exhibitors */}
                  </TabsContent>

                  {/* Volunteers Form */}
                  <TabsContent value="volunteers" className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {language === 'fr' ? 'Inscription Volontaire' : 'Volunteer Registration'}
                    </h3>
                    {/* Similar form structure for volunteers */}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Ce qui est inclus' : 'What\'s Included'}
                </h3>
                <div className="space-y-4">
                  {t.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'fr' ? 'Dates importantes' : 'Important Dates'}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      date: language === 'fr' ? '30 Sept 2024' : 'Sept 30, 2024',
                      label: language === 'fr' ? 'Inscription précoce' : 'Early registration'
                    },
                    {
                      date: language === 'fr' ? '15 Nov 2024' : 'Nov 15, 2024',
                      label: language === 'fr' ? 'Début du Salon' : 'Fair opening'
                    },
                    {
                      date: language === 'fr' ? '17 Nov 2024' : 'Nov 17, 2024',
                      label: language === 'fr' ? 'Clôture' : 'Closing'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.date}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white">
              <h3 className="text-lg font-bold mb-4">
                {language === 'fr' ? 'Besoin d\'aide ?' : 'Need Help?'}
              </h3>
              <p className="text-sm mb-6 opacity-90">
                {language === 'fr'
                  ? 'Notre équipe est disponible pour vous accompagner dans votre inscription.'
                  : 'Our team is available to assist you with your registration.'}
              </p>
              <Button variant="outline" className="w-full text-emerald-600 bg-white hover:bg-white/90">
                {language === 'fr' ? 'Contacter le support' : 'Contact Support'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}