// components/sections/cta.tsx
'use client';

import { useLanguageStore } from '@/lib/stores/language-store';
import { ArrowRight, Calendar, Mail, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function CTASection() {
  const { language } = useLanguageStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // API call would go here
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 dark:from-emerald-600 dark:via-emerald-700 dark:to-blue-700" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === 'fr' ? '15-17 Novembre 2024' : 'November 15-17, 2024'}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {language === 'fr' 
                  ? 'Rejoignez la Transformation de la Santé'
                  : 'Join the Health Transformation'}
              </h2>
              
              <p className="text-xl mb-10 opacity-90">
                {language === 'fr'
                  ? 'Inscrivez-vous dès maintenant pour participer à l\'événement santé le plus influent de l\'année.'
                  : 'Register now to participate in the most influential health event of the year.'}
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    text: language === 'fr' 
                      ? 'Réseau exclusif de professionnels de santé'
                      : 'Exclusive network of health professionals'
                  },
                  {
                    icon: CheckCircle2,
                    text: language === 'fr'
                      ? 'Certification internationale reconnue'
                      : 'Globally recognized international certification'
                  },
                  {
                    icon: Calendar,
                    text: language === 'fr'
                      ? 'Format flexible : présentiel, hybride, replay'
                      : 'Flexible format: in-person, hybrid, replay'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 group">
                  {language === 'fr' ? "S'inscrire maintenant" : 'Register now'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  {language === 'fr' ? 'Voir le programme' : 'View program'}
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                {subscribed ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-emerald-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {language === 'fr' ? 'Merci de votre inscription !' : 'Thank you for subscribing!'}
                    </h3>
                    <p className="text-white/80">
                      {language === 'fr'
                        ? 'Vous recevrez bientôt nos dernières actualités.'
                        : 'You will soon receive our latest updates.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 rounded-xl bg-emerald-500">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {language === 'fr' ? 'Restez Informé' : 'Stay Informed'}
                        </h3>
                        <p className="text-white/80">
                          {language === 'fr' ? 'Newsletter exclusive' : 'Exclusive newsletter'}
                        </p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubscribe} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          {language === 'fr' ? 'Votre email' : 'Your email'}
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@exemple.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                          required
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <label className="flex items-start gap-3 text-sm text-white/80">
                          <input
                            type="checkbox"
                            className="mt-1"
                            required
                          />
                          <span>
                            {language === 'fr'
                              ? 'J\'accepte de recevoir les communications du Salon International de la Santé'
                              : 'I agree to receive communications from the International Health Fair'}
                          </span>
                        </label>
                        
                        <label className="flex items-start gap-3 text-sm text-white/80">
                          <input
                            type="checkbox"
                            className="mt-1"
                          />
                          <span>
                            {language === 'fr'
                              ? 'J\'accepte la politique de confidentialité'
                              : 'I accept the privacy policy'}
                          </span>
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        {language === 'fr' ? "S'abonner" : 'Subscribe'}
                      </Button>
                    </form>
                    
                    <p className="text-sm text-white/60 mt-6 text-center">
                      {language === 'fr'
                        ? 'Désabonnement possible à tout moment'
                        : 'Unsubscribe at any time'}
                    </p>
                  </>
                )}
              </div>
              
              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  {
                    label: language === 'fr' ? 'Devenir exposant' : 'Become exhibitor',
                    color: 'bg-blue-500/20 hover:bg-blue-500/30'
                  },
                  {
                    label: language === 'fr' ? 'Devenir partenaire' : 'Become partner',
                    color: 'bg-purple-500/20 hover:bg-purple-500/30'
                  },
                  {
                    label: language === 'fr' ? 'Devenir volontaire' : 'Become volunteer',
                    color: 'bg-emerald-500/20 hover:bg-emerald-500/30'
                  },
                  {
                    label: language === 'fr' ? 'Presse & média' : 'Press & media',
                    color: 'bg-amber-500/20 hover:bg-amber-500/30'
                  }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`p-4 rounded-xl border border-white/10 text-white text-center font-medium transition-colors ${link.color}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: '72h',
                  label: language === 'fr' ? 'D\'échanges intensifs' : 'Of intensive exchange'
                },
                {
                  number: '150+',
                  label: language === 'fr' ? 'Sessions expertes' : 'Expert sessions'
                },
                {
                  number: '65+',
                  label: language === 'fr' ? 'Pays représentés' : 'Countries represented'
                },
                {
                  number: '98%',
                  label: language === 'fr' ? 'De satisfaction' : 'Satisfaction rate'
                }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}