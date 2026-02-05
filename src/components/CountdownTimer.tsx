import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CountdownTimer = () => {
  const { t } = useTranslation();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          // Reset to 7 days
          days = 7;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, labelKey }: { value: number; labelKey: string }) => (
    <div className="flex flex-col items-center">
      <div 
        className="bg-black/80 border-2 border-amazon/60 rounded-xl w-12 h-14 sm:w-16 sm:h-18 md:w-20 md:h-22 flex items-center justify-center"
        style={{
          boxShadow: '0 0 20px rgba(255, 153, 0, 0.5), inset 0 0 10px rgba(255, 153, 0, 0.2)'
        }}
      >
        <span 
          className="text-2xl sm:text-3xl md:text-4xl font-black tabular-nums leading-none"
          style={{ color: '#FF9900' }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-widest">{t(labelKey)}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-amazon/15 via-black/80 to-amazon/15 border-b border-amazon/40 py-3 sm:py-4"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          {/* Title - Translated */}
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amazon animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
              {t('countdown.limitedOffer')} - {t('countdown.endsIn')}
            </span>
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amazon animate-pulse" />
          </div>

          {/* Countdown - Responsive with proper spacing */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amazon" />
            <TimeBlock value={timeLeft.days} labelKey="countdown.days" />
            <span className="text-amazon text-2xl sm:text-3xl font-black mx-1">:</span>
            <TimeBlock value={timeLeft.hours} labelKey="countdown.hours" />
            <span className="text-amazon text-2xl sm:text-3xl font-black mx-1">:</span>
            <TimeBlock value={timeLeft.minutes} labelKey="countdown.mins" />
            <span className="text-amazon text-2xl sm:text-3xl font-black mx-1">:</span>
            <TimeBlock value={timeLeft.seconds} labelKey="countdown.secs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
