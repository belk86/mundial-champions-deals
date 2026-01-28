import { motion } from 'framer-motion';
import { ChevronDown, ShoppingBag, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import FanEdgeLogo from './FanEdgeLogo';
import stadiumHero from '@/assets/stadium-hero.jpg';

const FanEdgeHero = () => {
  const { t } = useTranslation();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTravel = () => {
    document.getElementById('travel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Stadium Background Image - Primary visual */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${stadiumHero})` }}
      />
      
      {/* Dark Overlay - Very subtle to keep stadium visible */}
      <div className="absolute inset-0 bg-background/60" />
      
      {/* Subtle Moroccan Pattern Overlay - 10% opacity */}
      <div className="absolute inset-0 moroccan-pattern-hero opacity-20" />
      
      {/* Subtle bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Subtle Purple Orbs - Very muted */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <FanEdgeLogo size="lg" />
          </motion.div>

          {/* Headline - Translated */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            <span className="text-foreground">{t('hero.yourPremium')}</span>
            <br />
            <span className="text-gradient-purple">{t('hero.worldCup2026')}</span>
            <br />
            <span className="text-foreground">{t('hero.destination')}</span>
          </motion.h1>

          {/* Subheadline - Translated */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons - Translated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-primary hover:bg-purple-dark text-primary-foreground font-bold text-lg px-8 py-6 glow-purple pulse-button-purple"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {t('hero.shopGear')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToTravel}
              className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
            >
              <Plane className="w-5 h-5 mr-2" />
              {t('hero.planTrip')}
            </Button>
          </motion.div>

          {/* Scroll Indicator - Translated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-muted-foreground cursor-pointer"
              onClick={scrollToProducts}
            >
              <span className="text-sm mb-2">{t('hero.scrollExplore')}</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FanEdgeHero;
