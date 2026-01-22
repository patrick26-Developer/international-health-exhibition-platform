'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/lib/stores/language-store';

interface BackToTopProps {
  threshold?: number; // Pixel à partir duquel le bouton apparaît
  className?: string;
}

export function BackToTop({ threshold = 300, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguageStore();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "p-3 rounded-full shadow-lg",
            "bg-emerald-600 hover:bg-emerald-700",
            "text-white transition-all duration-200",
            "hover:scale-110 active:scale-95",
            "border border-emerald-700",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
            "dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:border-emerald-600",
            className
          )}
          aria-label={language === 'fr' ? 'Retour en haut' : 'Back to top'}
        >
          <div className="relative">
            <ArrowUp className="h-6 w-6" />
            {/* Effet de halo subtil */}
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-400"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}