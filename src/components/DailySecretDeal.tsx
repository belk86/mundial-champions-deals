import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Timer, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DailyDeal {
  id: string;
  name: string;
  nameAr: string;
  nameEs: string;
  price: number;
  originalPrice: number;
  image: string;
  affiliateUrl: string;
}

const secretDeal: DailyDeal = {
  id: 'secret-1',
  name: '4K Portable Sports Projector',
  nameAr: 'جهاز عرض رياضي محمول 4K',
  nameEs: 'Proyector Deportivo Portátil 4K',
  price: 119.99,
  originalPrice: 159.99,
  image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
  affiliateUrl: 'https://amzn.to/4pOKPIY',
};

const DailySecretDeal = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDisplayName = () => {
    switch (language) {
      case 'ar':
        return secretDeal.nameAr || secretDeal.name;
      default:
        return secretDeal.name;
    }
  };

  const discount = Math.round(
    ((secretDeal.originalPrice - secretDeal.price) / secretDeal.originalPrice) * 100
  );

  const handleUnlock = () => {
    setIsRevealed(true);
  };

  const handleGetDeal = () => {
    if (secretDeal.affiliateUrl) {
      window.open(secretDeal.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-12 bg-secret-gradient relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 300,
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium tracking-wider uppercase">
              {t('dailyDeal.title')}
            </span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-muted-foreground text-sm">
            {t('dailyDeal.subtitle')}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>{t('dailyDeal.endsIn')}</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: timeLeft.hours, label: t('dailyDeal.hours') },
              { value: timeLeft.minutes, label: t('dailyDeal.minutes') },
              { value: timeLeft.seconds, label: t('dailyDeal.seconds') },
            ].map((item, idx) => (
              <div
                key={idx}
                className="countdown-glow bg-purple-900/50 rounded-lg px-3 py-2 min-w-[50px] text-center border border-purple-500/30"
              >
                <span className="text-lg font-bold text-purple-200">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-purple-400 text-xs ml-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Secret Deal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="countdown-glow bg-card rounded-2xl overflow-hidden border border-purple-500/30 relative">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 text-center"
                >
                  {/* Mystery overlay */}
                  <div className="relative aspect-square max-w-[200px] mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-16 h-16 text-purple-300" />
                      </motion.div>
                    </div>
                  </div>

                  <p className="text-purple-200 font-medium mb-4">
                    {t('dailyDeal.title')}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gradient-gold">
                      -{discount}%
                    </span>
                  </div>

                  <Button
                    onClick={handleUnlock}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold pulse-button"
                  >
                    <Unlock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('dailyDeal.unlockNow')}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6"
                >
                  {/* Revealed content */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm font-medium">
                      {t('dailyDeal.secretReveal')}
                    </span>
                    <Sparkles className="w-4 h-4 text-gold" />
                  </div>

                  <div className="relative aspect-square max-w-[200px] mx-auto mb-4 rounded-xl overflow-hidden">
                    <img
                      src={secretDeal.image}
                      alt={getDisplayName()}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-gold text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground text-center mb-2">
                    {getDisplayName()}
                  </h3>

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gold">
                      ${secretDeal.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground line-through">
                      ${secretDeal.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleGetDeal}
                    className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-primary-foreground font-semibold pulse-button"
                  >
                    {t('products.getDeal')}
                    <ExternalLink className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailySecretDeal;
