import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Car, MapPin, ExternalLink, Star, Users, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'en' | 'es' | 'fr';

const HOST_CITIES = [
  {
    name: { en: 'New York / NJ', es: 'Nueva York / NJ', fr: 'New York / NJ' },
    stadium: 'MetLife Stadium',
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    fanGuide: {
      en: 'The Big Apple offers world-class dining, iconic landmarks like Times Square, and vibrant nightlife. Perfect base for multiple group stage matches.',
      es: 'La Gran Manzana ofrece gastronomía de clase mundial, monumentos icónicos como Times Square y vida nocturna vibrante. Base perfecta para varios partidos.',
      fr: 'La Grosse Pomme offre une cuisine de classe mondiale, des monuments iconiques comme Times Square et une vie nocturne vibrante. Base parfaite pour plusieurs matchs.',
    },
    searchQuery: 'New+York',
    emoji: '🗽',
  },
  {
    name: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' },
    stadium: 'SoFi Stadium',
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    fanGuide: {
      en: 'Sun, beaches, and Hollywood glamour. SoFi Stadium is state-of-the-art. Enjoy Santa Monica, Venice Beach, and incredible food between matches.',
      es: 'Sol, playas y glamour de Hollywood. SoFi Stadium es de última tecnología. Disfruta Santa Mónica y Venice Beach entre partidos.',
      fr: 'Soleil, plages et glamour hollywoodien. SoFi Stadium est ultramoderne. Profitez de Santa Monica et Venice Beach entre les matchs.',
    },
    searchQuery: 'Los+Angeles',
    emoji: '🌴',
  },
  {
    name: { en: 'Miami', es: 'Miami', fr: 'Miami' },
    stadium: 'Hard Rock Stadium',
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    fanGuide: {
      en: 'Tropical vibes, Latin flavor, and stunning beaches. South Beach and Wynwood Arts District offer unforgettable fan experiences.',
      es: 'Vibras tropicales, sabor latino y playas impresionantes. South Beach y Wynwood ofrecen experiencias inolvidables para fans.',
      fr: 'Ambiance tropicale, saveur latine et plages magnifiques. South Beach et Wynwood offrent des expériences inoubliables.',
    },
    searchQuery: 'Miami',
    emoji: '🏖️',
  },
  {
    name: { en: 'Dallas', es: 'Dallas', fr: 'Dallas' },
    stadium: 'AT&T Stadium',
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    fanGuide: {
      en: 'Everything is bigger in Texas! AT&T Stadium\'s massive screen and BBQ culture make Dallas a must-visit World Cup destination.',
      es: '¡Todo es más grande en Texas! La pantalla gigante del AT&T Stadium y la cultura BBQ hacen de Dallas un destino imperdible.',
      fr: 'Tout est plus grand au Texas ! L\'écran géant de l\'AT&T Stadium et la culture BBQ font de Dallas une destination incontournable.',
    },
    searchQuery: 'Dallas',
    emoji: '🤠',
  },
  {
    name: { en: 'Toronto', es: 'Toronto', fr: 'Toronto' },
    stadium: 'BMO Field',
    country: { en: 'Canada', es: 'Canadá', fr: 'Canada' },
    fanGuide: {
      en: 'Canada\'s cultural capital with the iconic CN Tower. Diverse food scene, safe neighborhoods, and passionate soccer fans await you.',
      es: 'La capital cultural de Canadá con la icónica Torre CN. Gastronomía diversa, barrios seguros y fans apasionados te esperan.',
      fr: 'La capitale culturelle du Canada avec l\'emblématique Tour CN. Cuisine diversifiée, quartiers sûrs et fans passionnés vous attendent.',
    },
    searchQuery: 'Toronto',
    emoji: '🍁',
  },
  {
    name: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
    stadium: 'Estadio Azteca',
    country: { en: 'Mexico', es: 'México', fr: 'Mexique' },
    fanGuide: {
      en: 'The legendary Estadio Azteca hosted two World Cup finals. Explore ancient ruins, incredible street food, and passionate fan culture.',
      es: 'El legendario Estadio Azteca albergó dos finales de Copa del Mundo. Explora ruinas antiguas, comida callejera increíble y cultura fan apasionada.',
      fr: 'Le légendaire Estadio Azteca a accueilli deux finales de Coupe du Monde. Explorez ruines anciennes, street food et culture fan passionnée.',
    },
    searchQuery: 'Mexico+City',
    emoji: '🇲🇽',
  },
];

const CAR_CATEGORIES = [
  {
    key: 'compact',
    icon: Car,
    color: 'bg-blue-500/20 text-blue-300',
  },
  {
    key: 'suv',
    icon: Users,
    color: 'bg-emerald-500/20 text-emerald-300',
  },
  {
    key: 'luxury',
    icon: Star,
    color: 'bg-amber-500/20 text-amber-300',
  },
];

const TravelSection = () => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const langKey = (language as Language) || 'en';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            i18n.changeLanguage(language);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language, i18n]);

  const langParam = langKey === 'es' ? 'es' : langKey === 'fr' ? 'fr' : 'en';
  const bookingBase = `https://www.booking.com/searchresults.html?aid=8944582&lang=${langParam}&checkin=2026-06-11&checkout=2026-07-19`;
  const carsBase = `https://www.booking.com/cars/index.html?aid=8944582&lang=${langParam}`;

  return (
    <section ref={sectionRef} id="travel" className="py-16 md:py-24 bg-background relative moroccan-pattern">
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

        {/* ── Hotels: Curated City Cards ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-blue-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {t('travel.matchDayStays')}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOST_CITIES.map((city, i) => (
              <motion.div
                key={`hotel-${city.name.en}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="bg-card border-border h-full card-hover-purple overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center text-5xl">
                    {city.emoji}
                  </div>
                  <CardContent className="p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">{city.name[langKey]}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        {city.country[langKey]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">📍 {city.stadium}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {city.fanGuide[langKey]}
                    </p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`${bookingBase}&ss=${city.searchQuery}`, '_blank', 'noopener,noreferrer')}
                    >
                      {t('travel.bookStay')}
                      <ExternalLink className="w-3.5 h-3.5 ms-1.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Car Rentals: Category Grid ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {t('travel.carRentals')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CAR_CATEGORIES.map((cat, i) => (
              <motion.div
                key={`car-${cat.key}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="bg-card border-border h-full card-hover-purple">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-lg text-foreground mb-2">
                      {t(`travel.car.${cat.key}.title`)}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-5 flex-1">
                      {t(`travel.car.${cat.key}.desc`)}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(carsBase, '_blank', 'noopener,noreferrer')}
                    >
                      {t('travel.rentCar')}
                      <ExternalLink className="w-3.5 h-3.5 ms-1.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Host Cities Quick Guide ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
            {t('travel.hostCities')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOST_CITIES.map((city) => (
              <a
                key={`guide-${city.name.en}`}
                href={`${bookingBase}&ss=${city.searchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-secondary rounded-xl border border-border text-center hover:border-primary transition-all"
              >
                <span className="text-2xl block mb-2">{city.emoji}</span>
                <h4 className="font-bold text-sm text-foreground">{city.name[langKey]}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{city.stadium}</p>
                <p className="text-[10px] text-primary mt-0.5">{city.country[langKey]}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('travel.viewStadiumHotels')} <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
