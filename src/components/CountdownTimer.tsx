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
      <div className="bg-secondary/80 border border-primary/30 rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[40px] sm:min-w-[50px] text-center countdown-glow-purple">
        <span className="text-lg sm:text-2xl font-bold text-primary">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">{t(labelKey)}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-primary/20 via-purple-muted to-primary/20 border-b border-primary/30 py-2 sm:py-3"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          {/* Title - Translated */}
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">
              {t('countdown.limitedOffer')} - {t('countdown.endsIn')}
            </span>
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
          </div>

          {/* Countdown - Translated */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1 sm:mr-2" />
            <TimeBlock value={timeLeft.days} labelKey="countdown.days" />
            <span className="text-primary text-lg sm:text-xl font-bold">:</span>
            <TimeBlock value={timeLeft.hours} labelKey="countdown.hours" />
            <span className="text-primary text-lg sm:text-xl font-bold">:</span>
            <TimeBlock value={timeLeft.minutes} labelKey="countdown.mins" />
            <span className="text-primary text-lg sm:text-xl font-bold">:</span>
            <TimeBlock value={timeLeft.seconds} labelKey="countdown.secs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
