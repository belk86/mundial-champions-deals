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
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div 
        className="bg-black/70 border border-amazon/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 min-w-[44px] sm:min-w-[56px] text-center"
        style={{
          boxShadow: '0 0 12px rgba(255, 153, 0, 0.4), inset 0 0 6px rgba(255, 153, 0, 0.15)'
        }}
      >
        <span 
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums"
          style={{ color: '#FF9900' }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 font-medium uppercase tracking-wide">{t(labelKey)}</span>
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
          <div className="flex items-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amazon mr-2 sm:mr-3" />
            <TimeBlock value={timeLeft.days} labelKey="countdown.days" />
            <span className="text-amazon text-xl sm:text-2xl font-bold">:</span>
            <TimeBlock value={timeLeft.hours} labelKey="countdown.hours" />
            <span className="text-amazon text-xl sm:text-2xl font-bold">:</span>
            <TimeBlock value={timeLeft.minutes} labelKey="countdown.mins" />
            <span className="text-amazon text-xl sm:text-2xl font-bold">:</span>
            <TimeBlock value={timeLeft.seconds} labelKey="countdown.secs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
