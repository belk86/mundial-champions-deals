import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Helper to append language parameter to URLs
  const addLangParam = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=${language}`;
  };

  const travelOptions = [
    {
      icon: Hotel,
      titleKey: 'travel.matchDayStays',
      descKey: 'travel.matchDayStaysDesc',
      buttonKey: 'travel.findHotels',
      link: 'https://www.booking.com/searchresults.html?ss=World+Cup+2026',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      iconColor: 'text-blue-400',
    },
    {
      icon: Car,
      titleKey: 'travel.carRentals',
      descKey: 'travel.carRentalsDesc',
      buttonKey: 'travel.rentCar',
      link: 'https://www.rentalcars.com',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Plane,
      titleKey: 'travel.flights',
      descKey: 'travel.flightsDesc',
      buttonKey: 'travel.searchFlights',
      link: 'https://www.kayak.com/flights',
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      iconColor: 'text-orange-400',
    },
  ];

  const cities = [
    { name: 'New York/NJ', stadium: 'MetLife Stadium', country: 'USA' },
    { name: 'Los Angeles', stadium: 'SoFi Stadium', country: 'USA' },
    { name: 'Miami', stadium: 'Hard Rock Stadium', country: 'USA' },
    { name: 'Dallas', stadium: 'AT&T Stadium', country: 'USA' },
    { name: 'Atlanta', stadium: 'Mercedes-Benz Stadium', country: 'USA' },
    { name: 'Seattle', stadium: 'Lumen Field', country: 'USA' },
    { name: 'San Francisco', stadium: "Levi's Stadium", country: 'USA' },
    { name: 'Houston', stadium: 'NRG Stadium', country: 'USA' },
    { name: 'Philadelphia', stadium: 'Lincoln Financial Field', country: 'USA' },
    { name: 'Kansas City', stadium: 'Arrowhead Stadium', country: 'USA' },
    { name: 'Boston', stadium: 'Gillette Stadium', country: 'USA' },
    { name: 'Toronto', stadium: 'BMO Field', country: 'Canada' },
    { name: 'Vancouver', stadium: 'BC Place', country: 'Canada' },
    { name: 'Mexico City', stadium: 'Estadio Azteca', country: 'Mexico' },
    { name: 'Guadalajara', stadium: 'Estadio Akron', country: 'Mexico' },
    { name: 'Monterrey', stadium: 'Estadio BBVA', country: 'Mexico' },
  ];

  return (
    <section id="travel" className="py-16 md:py-24 moroccan-pattern relative">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-muted/10 to-transparent" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header - Translated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-6 h-6 text-primary" />
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

        {/* Travel Options Grid - Translated */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {travelOptions.map((option, index) => (
            <motion.div
              key={option.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border h-full card-hover-purple">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-xl ${option.color} border flex items-center justify-center mb-4`}>
                    <option.icon className={`w-7 h-7 ${option.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t(option.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{t(option.descKey)}</p>
                  <Button
                    className="w-full bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm"
                    onClick={() => window.open(addLangParam(option.link), '_blank')}
                  >
                    {t(option.buttonKey)}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Host Cities - Horizontal Scroll on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/50 rounded-2xl p-6 md:p-8 border border-border"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {t('travel.hostCities')}
          </h3>
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-8 gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {cities.map((city, index) => (
              <motion.a
                key={city.name}
                href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city.name)}&lang=${language}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex-shrink-0 w-[140px] md:w-auto bg-card rounded-lg p-3 border border-border text-center hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer snap-start"
              >
                <h4 className="font-semibold text-foreground text-sm mb-1">{city.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{city.stadium}</p>
                <span className="text-[10px] text-primary font-medium">{city.country}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
