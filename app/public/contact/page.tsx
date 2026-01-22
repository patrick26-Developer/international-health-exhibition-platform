// app/public/contact/page.tsx - VERSION FUSION OPTIMALE
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { Mail, Phone, MapPin, Clock, Users, Globe, ArrowRight, CheckCircle2, Building2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const { language } = useLanguageStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    position: '',
    subject: '',
    message: '',
    consent: false
  });

  const content = {
    fr: {
      title: 'Contact',
      subtitle: 'Point de contact institutionnel pour partenariats, coopérations et échanges stratégiques',
      intro: 'Le S.I.S. met à disposition un espace dédié aux demandes officielles, propositions de partenariat et collaborations stratégiques.',
      
      departments: [
        {
          title: 'Partenariats Institutionnels',
          description: 'Collaborations avec ministères, autorités publiques et organisations internationales',
          icon: Building2
        },
        {
          title: 'Sponsoring & Mécénat',
          description: 'Engagement des entreprises privées et philanthropes',
          icon: Users
        },
        {
          title: 'Programmes Scientifiques',
          description: 'Propositions de sessions, ateliers et contenus éducatifs',
          icon: Globe
        },
        {
          title: 'Presse & Médias',
          description: 'Accréditations, communiqués et relations institutionnelles',
          icon: Send
        }
      ],
      
      info: [
        {
          icon: Mail,
          title: 'Email',
          value: 'contact@sis-international.org',
          subtitle: 'Réponse sous 24h ouvrables'
        },
        {
          icon: Phone,
          title: 'Téléphone',
          value: '+33 1 23 45 67 89',
          subtitle: 'Lun-Ven, 9h-18h (CET)'
        },
        {
          icon: MapPin,
          title: 'Siège International',
          value: 'Paris, France',
          subtitle: 'Plateforme mondiale de coordination'
        },
        {
          icon: Clock,
          title: 'Horaires Institutionnels',
          value: '9h - 18h',
          subtitle: 'Fuseau horaire Europe Centrale'
        }
      ],
      
      form: {
        name: 'Nom & Prénom',
        email: 'Email institutionnel',
        organization: 'Organisation',
        position: 'Fonction',
        subject: 'Sujet de la demande',
        message: 'Message détaillé',
        consent: 'J\'accepte de recevoir des informations concernant le S.I.S.',
        submit: 'Envoyer la demande',
        success: 'Message envoyé avec succès'
      },
      
      placeholders: {
        name: 'Votre nom complet',
        email: 'votre.email@organisation.org',
        organization: 'Nom de votre organisation',
        position: 'Votre fonction',
        subject: 'Objet de votre message',
        message: 'Décrivez votre demande en détail...'
      },
      
      message: 'Le S.I.S. privilégie un dialogue ouvert, structuré et responsable avec l\'ensemble de ses partenaires institutionnels.'
    },
    en: {
      title: 'Contact',
      subtitle: 'Institutional contact point for partnerships, cooperation and strategic exchanges',
      intro: 'The S.I.S. provides a dedicated space for official requests, partnership proposals and strategic collaborations.',
      
      departments: [
        {
          title: 'Institutional Partnerships',
          description: 'Collaborations with ministries, public authorities and international organizations',
          icon: Building2
        },
        {
          title: 'Sponsorship & Philanthropy',
          description: 'Engagement of private companies and philanthropists',
          icon: Users
        },
        {
          title: 'Scientific Programs',
          description: 'Proposals for sessions, workshops and educational content',
          icon: Globe
        },
        {
          title: 'Press & Media',
          description: 'Accreditations, press releases and institutional relations',
          icon: Send
        }
      ],
      
      info: [
        {
          icon: Mail,
          title: 'Email',
          value: 'contact@sis-international.org',
          subtitle: 'Response within 24 business hours'
        },
        {
          icon: Phone,
          title: 'Phone',
          value: '+33 1 23 45 67 89',
          subtitle: 'Mon-Fri, 9am-6pm (CET)'
        },
        {
          icon: MapPin,
          title: 'International Headquarters',
          value: 'Paris, France',
          subtitle: 'Global coordination platform'
        },
        {
          icon: Clock,
          title: 'Institutional Hours',
          value: '9am - 6pm',
          subtitle: 'Central European Time Zone'
        }
      ],
      
      form: {
        name: 'Full Name',
        email: 'Institutional Email',
        organization: 'Organization',
        position: 'Position',
        subject: 'Request Subject',
        message: 'Detailed Message',
        consent: 'I agree to receive information about S.I.S.',
        submit: 'Send Request',
        success: 'Message sent successfully'
      },
      
      placeholders: {
        name: 'Your full name',
        email: 'your.email@organization.org',
        organization: 'Your organization name',
        position: 'Your position',
        subject: 'Subject of your message',
        message: 'Describe your request in detail...'
      },
      
      message: 'The S.I.S. promotes open, structured and responsible dialogue with all institutional partners.'
    }
  };

  const t = content[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert(language === 'fr' ? 'Veuillez accepter les conditions.' : 'Please accept the terms.');
      return;
    }
    // API call would go here
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero - Ton style avec mon animation */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-white dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/public" 
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 hover:gap-3 transition-all"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
              <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'fr' ? 'Contact Institutionnel' : 'Institutional Contact'}
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

      {/* Departments - Ton contenu avec mon style */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center"
            >
              {language === 'fr' ? 'Services & Départements' : 'Services & Departments'}
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.departments.map((dept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-6 p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 inline-block group-hover:scale-110 transition-transform duration-300">
                    <dept.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {dept.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {dept.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Contact Info - Fusion du contenu et du style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {language === 'fr' ? 'Informations de Contact' : 'Contact Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.info.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="inline-flex p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                      {item.value}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form - Ton formulaire avec mon style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300"
            >
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.form.success}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr'
                      ? 'Notre équipe vous répondra dans les plus brefs délais.'
                      : 'Our team will respond to you as soon as possible.'}
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {language === 'fr' ? 'Formulaire de Contact' : 'Contact Form'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.form.name} *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.placeholders.name}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          aria-required="true"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.form.email} *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.placeholders.email}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.form.organization} *
                        </label>
                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          required
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder={t.placeholders.organization}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          aria-required="true"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.form.position}
                        </label>
                        <input
                          id="position"
                          name="position"
                          type="text"
                          value={formData.position}
                          onChange={handleChange}
                          placeholder={t.placeholders.position}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.form.subject} *
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t.placeholders.subject}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        aria-required="true"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.form.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.placeholders.message}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                        aria-required="true"
                      />
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        aria-required="true"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-300">
                        {t.form.consent}
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white h-12 hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center">
                        {t.form.submit}
                        <Send className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - Ton contenu avec mon style */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center"
            >
              {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'fr' ? 'Équipe Dédiée' : 'Dedicated Team'}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {language === 'fr'
                    ? 'Une équipe d\'experts internationaux spécialisés dans la prévention santé, les partenariats institutionnels et la coordination d\'événements.'
                    : 'A team of international experts specialized in health prevention, institutional partnerships and event coordination.'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'fr' ? 'Portée Internationale' : 'International Reach'}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {language === 'fr'
                    ? 'Nous collaborons avec des partenaires dans plus de 50 pays et assurons un suivi personnalisé selon les fuseaux horaires et cultures.'
                    : 'We collaborate with partners in over 50 countries and provide personalized follow-up according to time zones and cultures.'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Style moderne et dynamique */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Mail className="h-16 w-16 mx-auto mb-8" />
              <p className="text-2xl md:text-3xl font-bold mb-6">
                {t.message}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-emerald-700 hover:bg-white/90 hover:scale-105 transition-all duration-300"
                >
                  <Link href="/public/partners" className="flex items-center">
                    {language === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <Link href="/public/programs" className="flex items-center">
                    {language === 'fr' ? 'Découvrir les Programmes' : 'Discover Programs'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}