import { motion } from 'framer-motion';
import { Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'en' | 'es' | 'fr';

const HOST_CITIES = [
  {
    name: { en: 'New York / NJ', es: 'Nueva York / NJ', fr: 'New York / NJ' },
    stadium: { en: 'MetLife Stadium', es: 'Estadio MetLife', fr: 'Stade MetLife' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    emoji: '🗽',
  },
  {
    name: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' },
    stadium: { en: 'SoFi Stadium', es: 'Estadio SoFi', fr: 'Stade SoFi' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    emoji: '🌴',
  },
  {
    name: { en: 'Miami', es: 'Miami', fr: 'Miami' },
    stadium: { en: 'Hard Rock Stadium', es: 'Estadio Hard Rock', fr: 'Stade Hard Rock' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    emoji: '🏖️',
  },
  {
    name: { en: 'Dallas', es: 'Dallas', fr: 'Dallas' },
    stadium: { en: 'AT&T Stadium', es: 'Estadio AT&T', fr: 'Stade AT&T' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    emoji: '🤠',
  },
  {
    name: { en: 'Toronto', es: 'Toronto', fr: 'Toronto' },
    stadium: { en: 'BMO Field', es: 'Campo BMO', fr: 'Terrain BMO' },
    country: { en: 'Canada', es: 'Canadá', fr: 'Canada' },
    emoji: '🍁',
  },
  {
    name: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
    stadium: { en: 'Estadio Azteca', es: 'Estadio Azteca', fr: 'Stade Azteca' },
    country: { en: 'Mexico', es: 'México', fr: 'Mexique' },
    emoji: '🇲🇽',
  },
];

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const lang = (language as Language) || 'en';
  const langParam = lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : 'en';

  const hotelUrl = `https://www.booking.com/searchresults.html?ss=USA&aid=8944582&lang=${langParam}&dest_type=country&checkin=2026-06-11&checkout=2026-07-19`;
  const carUrl = `https://www.booking.com/cars.${langParam}.html?ss=USA&aid=8944582&dest_type=country`;

  const cityHotelUrl = (city: string) =>
    `https://www.booking.com/searchresults.html?ss=${city}&aid=8944582&lang=${langParam}&dest_type=city&checkin=2026-06-11&checkout=2026-07-19`;

  return (
    <section key={language} id="travel" className="py-16 md:py-24 bg-background relative moroccan-pattern">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              {t('travel.sectionLabel')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('travel.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('travel.subtitle')}
          </p>
        </motion.div>

        {/* ── 1. Hotels ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Hotel className="w-7 h-7 text-blue-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{t('travel.hotelsTitle')}</h3>
                <p className="text-sm text-muted-foreground">{t('travel.hotelsDesc')}</p>
              </div>
              <Button
                size="lg"
                className="shrink-0"
                onClick={() => window.open(hotelUrl, '_blank', 'noopener,noreferrer')}
              >
                {t('travel.findHotels')}
                <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 2. Car Rentals ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Car className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{t('travel.carsTitle')}</h3>
                <p className="text-sm text-muted-foreground">{t('travel.carsDesc')}</p>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="shrink-0"
                onClick={() => window.open(carUrl, '_blank', 'noopener,noreferrer')}
              >
                {t('travel.findCars')}
                <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 3. Host Cities ── */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {t('travel.hostCities')}
            </h3>
            <p className="text-sm text-muted-foreground">{t('travel.hostCitiesDesc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOST_CITIES.map((city, i) => (
              <motion.a
                key={city.name.en}
                href={cityHotelUrl(city.name.en.replace(/ /g, '%20'))}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 bg-secondary rounded-xl border border-border text-center hover:border-primary transition-all"
              >
                <span className="text-3xl block mb-2">{city.emoji}</span>
                <h4 className="font-bold text-sm text-foreground">{city.name[lang]}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">📍 {city.stadium[lang]}</p>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium mt-2">
                  {city.country[lang]}
                </span>
                <span className="flex items-center justify-center gap-1 text-[10px] text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('travel.viewStadiumHotels')} <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
