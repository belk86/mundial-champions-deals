import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Hotel, Plane, Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteLinks } from '@/hooks/useSiteLinks';

type Lang = 'en' | 'es' | 'fr';

const TEXTS: Record<Lang, { greeting: string; hotels: string; flights: string; cars: string }> = {
  en: { greeting: "Hey! I'm BelkAI ⚽ What are you looking for?", hotels: '🏨 Book Hotels', flights: '✈️ Find Flights', cars: '🚗 Rent Cars' },
  es: { greeting: '¡Hola! Soy BelkAI ⚽ ¿Qué estás buscando?', hotels: '🏨 Reservar Hoteles', flights: '✈️ Buscar Vuelos', cars: '🚗 Alquilar Coches' },
  fr: { greeting: 'Salut! Je suis BelkAI ⚽ Que cherchez-vous?', hotels: '🏨 Réserver Hôtels', flights: '✈️ Trouver des Vols', cars: '🚗 Louer une Voiture' },
};

const FALLBACK_LINKS: Record<string, string> = {
  Hotels_USA: 'https://www.booking.com/searchresults.html?ss=United+States&dest_type=country&selected_currency=USD',
  Flights: 'https://arangrant.com',
  Cars_USA: 'https://www.booking.com/cars/country/us.html?selected_currency=USD',
};

const BelkAI = () => {
  const { language } = useLanguage();
  const lang = (language as Lang) || 'en';
  const txt = TEXTS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const { data: siteLinks } = useSiteLinks();

  const getLink = (key: string) => {
    const base = siteLinks?.[key] || FALLBACK_LINKS[key] || '#';
    if (base.includes('booking.com')) return `${base}&lang=${lang}`;
    return base;
  };

  const actions = [
    { label: txt.hotels, link: getLink('Hotels_USA'), icon: Hotel },
    { label: txt.flights, link: getLink('Flights'), icon: Plane },
    { label: txt.cars, link: getLink('Cars_USA'), icon: Car },
  ];

  return (
    <div>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(220,100%,60%)] to-[hsl(280,100%,65%)] shadow-lg flex items-center justify-center text-primary-foreground"
          style={{ zIndex: 40 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px hsl(220,100%,60%,0.5), 0 0 50px hsl(280,100%,65%,0.3)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          aria-label="Open BelkAI"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 w-[280px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            style={{ zIndex: 50 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[hsl(220,100%,50%)] to-[hsl(280,100%,55%)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-primary-foreground text-sm">BelkAI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-all"
                aria-label="Close BelkAI"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-foreground font-medium">{txt.greeting}</p>
              <div className="space-y-2.5">
                {actions.map((a) => (
                  <a
                    key={a.label}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-all text-sm font-semibold text-foreground hover:shadow-[0_0_15px_hsl(220,100%,60%,0.2)]"
                  >
                    <a.icon className="w-5 h-5 text-primary" />
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BelkAI;
