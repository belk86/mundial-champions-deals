import { useLanguage } from '@/contexts/LanguageContext';

const BANNER_TEXT: Record<string, string> = {
  en: 'Please set your language and currency manually inside the booking sections for the best experience.',
  es: 'Configure su idioma y moneda manualmente dentro de las secciones de reserva para la mejor experiencia.',
  fr: 'Veuillez configurer votre langue et votre devise manuellement dans les sections de réservation pour la meilleure expérience.',
};

const SmartBanner = () => {
  const { language } = useLanguage();
  return (
    <div data-smart-banner className="fixed top-0 left-0 right-0 z-[100000] bg-gradient-to-r from-[hsl(220,100%,50%)] to-[hsl(280,100%,55%)] py-2 px-4 text-center">
      <p className="text-xs md:text-sm font-bold text-primary-foreground">
        {BANNER_TEXT[language] || BANNER_TEXT.en}
      </p>
    </div>
  );
};

export default SmartBanner;
