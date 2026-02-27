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
    fanGuide: {
      en: 'The Big Apple offers world-class dining, iconic landmarks like Times Square, and vibrant nightlife. Perfect base for multiple group stage matches.',
      es: 'La Gran Manzana ofrece gastronomía de clase mundial, monumentos icónicos como Times Square y vida nocturna vibrante. Base perfecta para varios partidos.',
      fr: 'La Grosse Pomme offre une cuisine de classe mondiale, des monuments iconiques comme Times Square et une vie nocturne vibrante. Base parfaite pour plusieurs matchs.',
    },
    searchQuery: 'New%20York',
    emoji: '🗽',
  },
  {
    name: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' },
    stadium: { en: 'SoFi Stadium', es: 'Estadio SoFi', fr: 'Stade SoFi' },
    country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' },
    fanGuide: {
      en: 'Sun, beaches, and Hollywood glamour. SoFi Stadium is state-of-the-art. Enjoy Santa Monica, Venice Beach, and incredible food between matches.',
      es: 'Sol, playas y glamour de Hollywood. SoFi Stadium es de última tecnología. Disfruta Santa Mónica y Venice Beach entre partidos.',
      fr: 'Soleil, plages et glamour hollywoodien. SoFi Stadium est ultramoderne. Profitez de Santa Monica et Venice Beach entre les matchs.',
    },
    searchQuery: 'Los%20Angeles',
    emoji: '🌴',
  },
  {
    name: { en: 'Miami', es: 'Miami', fr: 'Miami' },
    stadium: { en: 'Hard Rock Stadium', es: 'Estadio Hard Rock', fr: 'Stade Hard Rock' },
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
    stadium: { en: 'AT&T Stadium', es: 'Estadio AT&T', fr: 'Stade AT&T' },
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
    stadium: { en: 'BMO Field', es: 'Campo BMO', fr: 'Terrain BMO' },
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
    stadium: { en: 'Estadio Azteca', es: 'Estadio Azteca', fr: 'Stade Azteca' },
    country: { en: 'Mexico', es: 'México', fr: 'Mexique' },
    fanGuide: {
      en: 'The legendary Estadio Azteca hosted two World Cup finals. Explore ancient ruins, incredible street food, and passionate fan culture.',
      es: 'El legendario Estadio Azteca albergó dos finales de Copa del Mundo. Explora ruinas antiguas, comida callejera increíble y cultura fan apasionada.',
      fr: 'Le légendaire Estadio Azteca a accueilli deux finales de Coupe du Monde. Explorez ruines anciennes, street food et culture fan passionnée.',
    },
    searchQuery: 'Mexico%20City',
    emoji: '🇲🇽',
  },
];


const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const langKey = (language as Language) || 'en';

  const langParam = langKey === 'es' ? 'es' : langKey === 'fr' ? 'fr' : 'en';
  const hotelUrl = (city: string) => `https://www.booking.com/searchresults.html?ss=${city}&aid=8944582&lang=${langParam}&dest_type=city&checkin=2026-06-11&checkout=2026-07-19`;
  const carUrl = (city: string) => `https://www.booking.com/cars.${langParam}.html?ss=${city}&aid=8944582&dest_type=city`;

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

        {/* ── Hotels & Stays ── */}
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
                  <div className="h-28 bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center text-5xl">
                    {city.emoji}
                  </div>
                  <CardContent className="p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">{city.name[langKey]}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        {city.country[langKey]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">📍 {city.stadium[langKey]}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(hotelUrl(city.searchQuery), '_blank', 'noopener,noreferrer')}
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

        {/* ── Car Rentals ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {t('travel.carRentals')}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOST_CITIES.map((city, i) => (
              <motion.div
                key={`car-${city.name.en}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-card border-border h-full card-hover-purple">
                  <CardContent className="p-4 flex flex-col items-center text-center h-full">
                    <span className="text-2xl mb-2">{city.emoji}</span>
                    <h4 className="font-bold text-sm text-foreground mb-1">{city.name[langKey]}</h4>
                    <p className="text-[10px] text-muted-foreground mb-3">{city.country[langKey]}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto"
                      onClick={() => window.open(carUrl(city.searchQuery), '_blank', 'noopener,noreferrer')}
                    >
                      <Car className="w-3.5 h-3.5 me-1.5" />
                      {t('travel.rentCar')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
