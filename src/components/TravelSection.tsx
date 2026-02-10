import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'en' | 'ar' | 'fr';

const HOST_CITIES = [
  {
    name: { en: 'New York/NJ', ar: 'نيويورك/نيوجيرسي', fr: 'New York/NJ' },
    stadium: 'MetLife Stadium',
    country: { en: 'USA', ar: 'الولايات المتحدة', fr: 'États-Unis' },
  },
  {
    name: { en: 'Los Angeles', ar: 'لوس أنجلوس', fr: 'Los Angeles' },
    stadium: 'SoFi Stadium',
    country: { en: 'USA', ar: 'الولايات المتحدة', fr: 'États-Unis' },
  },
  {
    name: { en: 'Miami', ar: 'ميامي', fr: 'Miami' },
    stadium: 'Hard Rock Stadium',
    country: { en: 'USA', ar: 'الولايات المتحدة', fr: 'États-Unis' },
  },
  {
    name: { en: 'Dallas', ar: 'دالاس', fr: 'Dallas' },
    stadium: 'AT&T Stadium',
    country: { en: 'USA', ar: 'الولايات المتحدة', fr: 'États-Unis' },
  },
  {
    name: { en: 'Toronto', ar: 'تورونتو', fr: 'Toronto' },
    stadium: 'BMO Field',
    country: { en: 'Canada', ar: 'كندا', fr: 'Canada' },
  },
  {
    name: { en: 'Mexico City', ar: 'مدينة مكسيكو', fr: 'Mexico' },
    stadium: 'Estadio Azteca',
    country: { en: 'Mexico', ar: 'المكسيك', fr: 'Mexique' },
  },
];

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const langKey = (language as Language) || 'en';

  const hotelsLink = `https://www.booking.com/searchresults.html?aid=8013322&lang=${langKey}`;
  const carsLink = `https://www.booking.com/cars/index.html?aid=8013322&lang=${langKey}`;

  const travelCards = [
    {
      icon: Hotel,
      title: t('travel.matchDayStays'),
      desc: t('travel.matchDayStaysDesc'),
      cta: t('travel.findHotels'),
      link: hotelsLink,
      color: 'bg-blue-500/20 text-blue-300',
    },
    {
      icon: Car,
      title: t('travel.carRentals'),
      desc: t('travel.carRentalsDesc'),
      cta: t('travel.rentCar'),
      link: carsLink,
      color: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      icon: Plane,
      title: t('travel.flights'),
      desc: t('travel.flightsDesc'),
      cta: t('travel.searchFlights'),
      link: '',
      color: 'bg-orange-500/20 text-orange-300',
    },
  ];

  return (
    <section id="travel" className="py-16 md:py-24 bg-background relative moroccan-pattern">
      <div className="container px-4">
        {/* Unified Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

        {/* Hotels / Cars / Flights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {travelCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card border-border h-full card-hover-purple">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{card.desc}</p>
                  <Button
                    className="w-full"
                    onClick={() => card.link && window.open(card.link, '_blank', 'noopener,noreferrer')}
                    disabled={!card.link}
                  >
                    {card.cta}
                    <ExternalLink className="w-4 h-4 ms-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Host Cities */}
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
                key={city.name.en}
                href={`https://www.booking.com/searchresults.html?ss=${city.name.en}&aid=8013322`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-secondary rounded-xl border border-border text-center hover:border-primary transition-all"
              >
                <h4 className="font-bold text-sm text-foreground">{city.name[langKey]}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{city.stadium}</p>
                <p className="text-[10px] text-primary mt-0.5">{city.country[langKey]}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
