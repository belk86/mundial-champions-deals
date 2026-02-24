import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame } from 'lucide-react';

const TARGET_DATE = new Date('2026-06-11T00:00:00Z').getTime();

const WorldCupCountdown = () => {
  const { t } = useTranslation();

  const calcTimeLeft = () => {
    const diff = Math.max(0, TARGET_DATE - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="sticky top-0 w-full py-2 sm:py-2.5 px-3 text-center"
      style={{
        zIndex: 100000,
        background: 'linear-gradient(135deg, hsl(280,100%,40%) 0%, hsl(220,100%,50%) 100%)',
      }}
    >
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 animate-pulse shrink-0" />
        <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white whitespace-nowrap">
          {t('countdown.limitedOffer')} {t('countdown.endsIn')}
        </span>
        <span className="text-[11px] sm:text-xs md:text-sm font-black text-white tabular-nums tracking-wide">
          {timeLeft.days}
          <span className="text-white/70 font-semibold">d </span>
          {String(timeLeft.hours).padStart(2, '0')}
          <span className="text-white/70 font-semibold">h </span>
          {String(timeLeft.minutes).padStart(2, '0')}
          <span className="text-white/70 font-semibold">m </span>
          {String(timeLeft.seconds).padStart(2, '0')}
          <span className="text-white/70 font-semibold">s</span>
        </span>
        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 animate-pulse shrink-0" />
      </div>
    </div>
  );
};

export default WorldCupCountdown;
