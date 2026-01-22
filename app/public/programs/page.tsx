// app/programs/page.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Apple, 
  Brain, 
  Heart, 
  Calendar, 
  Users, 
  Award,
  Clock,
  MapPin
} from 'lucide-react';

export default function ProgramsPage() {
  const { language } = useLanguageStore();
  
  const programs = {
    fr: {
      title: 'Programmes Scientifiques',
      subtitle: 'Des sessions expertes pour transformer la santé',
      tabs: [
        {
          id: 'sport-sante',
          label: 'Sport & Santé',
          icon: Activity,
          description: 'Intégration du sport dans la prévention et le traitement',
          sessions: [
            {
              title: 'Médecine du sport préventive',
              description: 'Stratégies pour prévenir les blessures chez les athlètes amateurs et professionnels',
              date: '15 Nov 2024',
              time: '09:00 - 12:30',
              speaker: 'Dr. Marie Laurent'
            }
          ]
        },
        {
          id: 'nutrition',
          label: 'Nutrition',
          icon: Apple,
          description: 'Alimentation comme pilier de la santé',
          sessions: [
            {
              title: 'Nutrition préventive des MNT',
              description: 'Régimes alimentaires pour prévenir maladies chroniques',
              date: '15 Nov 2024',
              time: '14:00 - 16:30',
              speaker: 'Pr. Jean Dubois'
            }
          ]
        },
        {
          id: 'bien-etre',
          label: 'Bien-être Mental',
          icon: Brain,
          description: 'Santé mentale et équilibre psychologique',
          sessions: [
            {
              title: 'Stress et résilience',
              description: 'Techniques de gestion du stress en milieu professionnel',
              date: '16 Nov 2024',
              time: '10:00 - 12:00',
              speaker: 'Dr. Sophie Martin'
            }
          ]
        },
        {
          id: 'prevention',
          label: 'Prévention MNT',
          icon: Heart,
          description: 'Lutte contre les maladies non transmissibles',
          sessions: [
            {
              title: 'Dépistage précoce du diabète',
              description: 'Nouvelles technologies de dépistage communautaire',
              date: '16 Nov 2024',
              time: '15:00 - 17:30',
              speaker: 'Dr. Ahmed Benali'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Scientific Programs',
      subtitle: 'Expert sessions to transform health',
      tabs: [
        {
          id: 'sport-sante',
          label: 'Sport & Health',
          icon: Activity,
          description: 'Integration of sport in prevention and treatment',
          sessions: [
            {
              title: 'Preventive sports medicine',
              description: 'Strategies to prevent injuries in amateur and professional athletes',
              date: 'Nov 15, 2024',
              time: '09:00 - 12:30',
              speaker: 'Dr. Marie Laurent'
            }
          ]
        },
        // ... autres programmes
      ]
    }
  };

  const t = programs[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={t.tabs[0].id} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent">
              {t.tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white py-6"
                >
                  <div className="flex flex-col items-center gap-2">
                    <tab.icon className="h-6 w-6" />
                    <span className="font-semibold">{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {t.tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {tab.label}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {tab.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tab.sessions.map((session, idx) => (
                    <Card key={idx} className="group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {session.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {session.description}
                          </p>
                          
                          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4" />
                              {session.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              {session.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Users className="h-4 w-4" />
                              {session.speaker}
                            </div>
                          </div>
                          
                          <Button className="w-full mt-6">
                            {language === 'fr' ? 'S\'inscrire à la session' : 'Register for session'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Points Forts du Programme' : 'Program Highlights'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: language === 'fr' ? 'Certification Scientifique' : 'Scientific Certification',
                description: language === 'fr' 
                  ? 'Crédits de formation continue pour professionnels de santé'
                  : 'Continuing education credits for health professionals'
              },
              {
                icon: Users,
                title: language === 'fr' ? 'Réseautage Premium' : 'Premium Networking',
                description: language === 'fr'
                  ? 'Rencontres avec les leaders mondiaux de la santé'
                  : 'Meetings with global health leaders'
              },
              {
                icon: MapPin,
                title: language === 'fr' ? 'Sessions Pratiques' : 'Practical Sessions',
                description: language === 'fr'
                  ? 'Ateliers interactifs et démonstrations live'
                  : 'Interactive workshops and live demonstrations'
              }
            ].map((highlight, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800">
                <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-6">
                  <highlight.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}