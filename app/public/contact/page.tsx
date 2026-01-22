// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { useLanguageStore } from '@/lib/stores/language-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Users,
  Globe
} from 'lucide-react';

export default function ContactPage() {
  const { language } = useLanguageStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const content = {
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Une question ? Un projet ? Nous sommes à votre écoute.',
      form: {
        name: 'Nom complet',
        email: 'Email',
        subject: 'Sujet',
        message: 'Votre message',
        submit: 'Envoyer le message',
        success: 'Message envoyé avec succès !'
      },
      info: [
        {
          icon: Mail,
          title: 'Email',
          value: 'contact@salon-sante-international.org',
          subtitle: 'Réponse sous 24h'
        },
        {
          icon: Phone,
          title: 'Téléphone',
          value: '+33 1 23 45 67 89',
          subtitle: 'Lun-Ven, 9h-18h'
        },
        {
          icon: MapPin,
          title: 'Siège',
          value: 'Paris, France',
          subtitle: 'Siège international'
        },
        {
          icon: Clock,
          title: 'Horaires',
          value: '9h - 18h',
          subtitle: 'Fuseau horaire CET'
        }
      ],
      departments: [
        {
          title: 'Partenariats',
          description: 'Devenir partenaire ou sponsor'
        },
        {
          title: 'Programme Scientifique',
          description: 'Proposer une session ou un atelier'
        },
        {
          title: 'Inscriptions',
          description: 'Support technique et administratif'
        },
        {
          title: 'Presse & Médias',
          description: 'Accréditations et relations presse'
        }
      ]
    },
    en: {
      title: 'Contact Us',
      subtitle: 'A question? A project? We\'re here to listen.',
      form: {
        name: 'Full Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        success: 'Message sent successfully!'
      },
      info: [
        {
          icon: Mail,
          title: 'Email',
          value: 'contact@international-health-fair.org',
          subtitle: 'Response within 24h'
        },
        {
          icon: Phone,
          title: 'Phone',
          value: '+33 1 23 45 67 89',
          subtitle: 'Mon-Fri, 9am-6pm'
        },
        {
          icon: MapPin,
          title: 'Headquarters',
          value: 'Paris, France',
          subtitle: 'International headquarters'
        },
        {
          icon: Clock,
          title: 'Hours',
          value: '9am - 6pm',
          subtitle: 'CET Time Zone'
        }
      ],
      departments: [
        {
          title: 'Partnerships',
          description: 'Become a partner or sponsor'
        },
        {
          title: 'Scientific Program',
          description: 'Propose a session or workshop'
        },
        {
          title: 'Registration',
          description: 'Technical and administrative support'
        },
        {
          title: 'Press & Media',
          description: 'Accreditations and press relations'
        }
      ]
    }
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-8">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t.form.success}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'fr'
                        ? 'Notre équipe vous répondra dans les plus brefs délais.'
                        : 'Our team will respond to you as soon as possible.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                      {language === 'fr' ? 'Formulaire de contact' : 'Contact Form'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t.form.name}
                          </label>
                          <Input required placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t.form.email}
                          </label>
                          <Input type="email" required placeholder="email@exemple.com" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t.form.subject}
                        </label>
                        <Input required placeholder={language === 'fr' ? 'Objet de votre message' : 'Message subject'} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t.form.message}
                        </label>
                        <Textarea 
                          required 
                          rows={6}
                          placeholder={language === 'fr' ? 'Décrivez votre demande...' : 'Describe your request...'}
                          className="resize-none"
                        />
                      </div>

                      <Button type="submit" className="w-full py-6">
                        <Send className="mr-2 h-5 w-5" />
                        {t.form.submit}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Departments */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {language === 'fr' ? 'Services & Départements' : 'Services & Departments'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {t.departments.map((dept, idx) => (
                  <Card key={idx} className="border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {dept.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {dept.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {t.info.map((item, idx) => (
                <Card key={idx} className="border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Card */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                    <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {language === 'fr' ? 'Équipe Dédiée' : 'Dedicated Team'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Experts multilingues' : 'Multilingual experts'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr'
                    ? 'Notre équipe internationale est disponible pour répondre à vos questions dans votre langue préférée.'
                    : 'Our international team is available to answer your questions in your preferred language.'}
                </p>
              </CardContent>
            </Card>

            {/* Global Reach Card */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {language === 'fr' ? 'Portée Internationale' : 'International Reach'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? '50+ pays représentés' : '50+ countries represented'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr'
                    ? 'Nous collaborons avec des partenaires et participants du monde entier pour un impact global.'
                    : 'We collaborate with partners and participants worldwide for global impact.'}
                </p>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white">
              <h4 className="font-bold mb-2">
                {language === 'fr' ? 'Contact Urgent' : 'Emergency Contact'}
              </h4>
              <p className="text-sm mb-4 opacity-90">
                {language === 'fr'
                  ? 'Pour les situations urgentes pendant l\'événement'
                  : 'For urgent situations during the event'}
              </p>
              <div className="text-2xl font-bold">+33 6 12 34 56 78</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Notre Siège International' : 'Our International Headquarters'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Situé au cœur de Paris, notre siège est le centre névralgique de nos opérations mondiales.'
                : 'Located in the heart of Paris, our headquarters is the nerve center of our global operations.'}
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="h-96 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {language === 'fr' ? 'Carte interactive' : 'Interactive Map'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}