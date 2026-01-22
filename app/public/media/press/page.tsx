'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Newspaper, FileText, Download, Mail, Calendar, Globe, Users, Target, Search, Filter, ExternalLink, Printer, Share2, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function PressPage() {
  const { language } = useLanguageStore();
  const [activeYear, setActiveYear] = useState('2024');
  
  const content = {
    fr: {
      title: 'Espace Presse',
      subtitle: 'Informations institutionnelles, ressources et contacts pour les médias',
      intro: 'L\'espace presse du S.I.S. fournit aux journalistes et médias toutes les ressources nécessaires pour couvrir nos actions et comprendre notre impact sur la santé publique mondiale.',
      
      pressKit: {
        title: 'Dossier de Presse Complet',
        downloadText: 'Télécharger le dossier complet (PDF, 2.1 MB)',
        sections: [
          {
            title: 'Communiqué de Presse Institutionnel',
            size: 'PDF · 245 KB',
            date: '15/11/2024'
          },
          {
            title: 'Fiche Technique S.I.S. 2024',
            size: 'PDF · 156 KB',
            date: '01/12/2024'
          },
          {
            title: 'Chiffres Clés & Impact',
            size: 'PDF · 312 KB',
            date: '10/11/2024'
          },
          {
            title: 'Photos Libres de Droits',
            size: 'ZIP · 45 MB',
            date: '05/12/2024'
          }
        ]
      },
      
      pressReview: [
        {
          year: '2024',
          articles: [
            {
              outlet: 'Le Monde - Santé',
              title: 'Le S.I.S., une réponse globale aux maladies non transmissibles',
              date: '20/11/2024',
              link: '#',
              type: 'Article'
            },
            {
              outlet: 'France Info',
              title: 'Interview exclusive : La prévention comme investissement stratégique',
              date: '18/11/2024',
              link: '#',
              type: 'Interview'
            },
            {
              outlet: 'WHO Bulletin',
              title: 'Aligning with SDG 3: The S.I.S. Approach',
              date: '15/10/2024',
              link: '#',
              type: 'Article'
            }
          ]
        },
        {
          year: '2023',
          articles: [
            {
              outlet: 'RFI - Afrique',
              title: 'Lutte contre les MNT : le modèle S.I.S. en Afrique',
              date: '22/09/2023',
              link: '#',
              type: 'Reportage'
            },
            {
              outlet: 'Le Figaro',
              title: 'Santé publique : investir dans la prévention',
              date: '10/07/2023',
              link: '#',
              type: 'Tribune'
            }
          ]
        }
      ],
      
      contact: {
        title: 'Contact Presse',
        person: {
          name: 'Marie Dubois',
          title: 'Responsable Relations Presse',
          email: 'presse@sis-international.org',
          phone: '+33 1 23 45 67 89',
          availability: 'Disponible 9h-18h, Lun-Ven'
        },
        responseTime: 'Réponse sous 24h ouvrables'
      },
      
      accreditation: {
        title: 'Demande d\'Accréditation',
        instructions: 'Pour les journalistes souhaitant couvrir nos événements, remplissez le formulaire ci-dessous.',
        required: [
          'Carte de presse valide',
          'Lettre de mission',
          'Délai : 15 jours avant l\'événement'
        ]
      },
      
      upcomingEvents: [
        {
          title: 'Conférence de presse - Édition 2025',
          date: '15 janvier 2025',
          location: 'Paris & En ligne',
          type: 'Hybride'
        },
        {
          title: 'Lancement programme Afrique',
          date: '28 février 2025',
          location: 'Dakar, Sénégal',
          type: 'Présentiel'
        }
      ],
      
      resources: [
        {
          icon: FileText,
          title: 'Infographies',
          description: 'Données clés en format visuel',
          count: '12 fichiers'
        },
        {
          icon: Users,
          title: 'Portraits Experts',
          description: 'Biographies et photos des intervenants',
          count: '25 profils'
        },
        {
          icon: Target,
          title: 'Données d\'Impact',
          description: 'Statistiques et indicateurs ODD',
          count: '8 datasets'
        },
        {
          icon: Award,
          title: 'Reconnaissances',
          description: 'Prix et distinctions obtenus',
          count: '5 documents'
        }
      ],
      
      message: 'Le S.I.S. s\'engage à fournir aux médias des informations précises, vérifiées et utiles pour éclairer le débat public sur les enjeux de prévention santé.'
    },
    en: {
      title: 'Press Room',
      subtitle: 'Institutional information, resources and contacts for media',
      intro: 'The S.I.S. press room provides journalists and media with all necessary resources to cover our actions and understand our impact on global public health.',
      
      pressKit: {
        title: 'Complete Press Kit',
        downloadText: 'Download complete kit (PDF, 2.1 MB)',
        sections: [
          {
            title: 'Institutional Press Release',
            size: 'PDF · 245 KB',
            date: '11/15/2024'
          },
          {
            title: 'S.I.S. Technical Sheet 2024',
            size: 'PDF · 156 KB',
            date: '12/01/2024'
          },
          {
            title: 'Key Figures & Impact',
            size: 'PDF · 312 KB',
            date: '11/10/2024'
          },
          {
            title: 'Royalty-Free Photos',
            size: 'ZIP · 45 MB',
            date: '12/05/2024'
          }
        ]
      },
      
      pressReview: [
        {
          year: '2024',
          articles: [
            {
              outlet: 'Le Monde - Health',
              title: 'S.I.S., a global response to non-communicable diseases',
              date: '11/20/2024',
              link: '#',
              type: 'Article'
            },
            {
              outlet: 'France Info',
              title: 'Exclusive interview: Prevention as strategic investment',
              date: '11/18/2024',
              link: '#',
              type: 'Interview'
            },
            {
              outlet: 'WHO Bulletin',
              title: 'Aligning with SDG 3: The S.I.S. Approach',
              date: '10/15/2024',
              link: '#',
              type: 'Article'
            }
          ]
        },
        {
          year: '2023',
          articles: [
            {
              outlet: 'RFI - Africa',
              title: 'Fight against NCDs: the S.I.S. model in Africa',
              date: '09/22/2023',
              link: '#',
              type: 'Report'
            },
            {
              outlet: 'Le Figaro',
              title: 'Public health: investing in prevention',
              date: '07/10/2023',
              link: '#',
              type: 'Op-ed'
            }
          ]
        }
      ],
      
      contact: {
        title: 'Press Contact',
        person: {
          name: 'Marie Dubois',
          title: 'Press Relations Manager',
          email: 'press@sis-international.org',
          phone: '+33 1 23 45 67 89',
          availability: 'Available 9am-6pm, Mon-Fri'
        },
        responseTime: 'Response within 24 business hours'
      },
      
      accreditation: {
        title: 'Accreditation Request',
        instructions: 'For journalists wishing to cover our events, please fill out the form below.',
        required: [
          'Valid press card',
          'Assignment letter',
          'Deadline: 15 days before event'
        ]
      },
      
      upcomingEvents: [
        {
          title: 'Press Conference - Edition 2025',
          date: 'January 15, 2025',
          location: 'Paris & Online',
          type: 'Hybrid'
        },
        {
          title: 'Africa Program Launch',
          date: 'February 28, 2025',
          location: 'Dakar, Senegal',
          type: 'In-person'
        }
      ],
      
      resources: [
        {
          icon: FileText,
          title: 'Infographics',
          description: 'Key data in visual format',
          count: '12 files'
        },
        {
          icon: Users,
          title: 'Expert Profiles',
          description: 'Biographies and photos of speakers',
          count: '25 profiles'
        },
        {
          icon: Target,
          title: 'Impact Data',
          description: 'Statistics and SDG indicators',
          count: '8 datasets'
        },
        {
          icon: Award,
          title: 'Recognition',
          description: 'Awards and distinctions received',
          count: '5 documents'
        }
      ],
      
      message: 'S.I.S. is committed to providing media with accurate, verified and useful information to inform public debate on health prevention issues.'
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
              href="/public/media" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour aux médias' : 'Back to media'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
              <Newspaper className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Informations Presse' : 'Press Information'}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Press Kit */}
          <div className="lg:col-span-2">
            {/* Press Kit */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t.pressKit.title}
                </h2>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4 mr-2" />
                  {t.pressKit.downloadText}
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.pressKit.sections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {section.title}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {section.size} · {section.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Press Review */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'fr' ? 'Revue de Presse' : 'Press Review'}
                </h2>
                <div className="flex gap-2">
                  {t.pressReview.map((yearData) => (
                    <button
                      key={yearData.year}
                      onClick={() => setActiveYear(yearData.year)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border ${
                        activeYear === yearData.year
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {yearData.year}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {t.pressReview
                  .find(year => year.year === activeYear)
                  ?.articles.map((article, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                              {article.outlet}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {article.date}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {article.type}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {article.title}
                          </h3>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {language === 'fr' ? 'Autres Ressources' : 'Additional Resources'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {t.resources.map((resource, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <resource.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {resource.title}
                        </h3>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                          {resource.count}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Events */}
          <div className="space-y-12">
            {/* Contact */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.contact.title}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t.contact.person.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t.contact.person.title}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${t.contact.person.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      {t.contact.person.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{t.contact.person.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{t.contact.person.availability}</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                    {t.contact.responseTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Accreditation */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.accreditation.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.accreditation.instructions}
              </p>
              
              <ul className="space-y-3 mb-8">
                {t.accreditation.required.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                {language === 'fr' ? 'Demander une Accréditation' : 'Request Accreditation'}
              </Button>
            </div>

            {/* Upcoming Events */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'fr' ? 'Événements à Venir' : 'Upcoming Events'}
              </h2>
              
              <div className="space-y-6">
                {t.upcomingEvents.map((event, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Newspaper className="h-16 w-16 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {t.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link href="/public/contact" className="flex items-center">
                  {language === 'fr' ? 'Contacter la Presse' : 'Contact Press'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/public/media/videos" className="flex items-center">
                  {language === 'fr' ? 'Vidéothèque' : 'Video Library'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}