import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Get language-specific URLs for travel services
  const getLink = (type: 'hotels' | 'cars' | 'flights') => {
    const links = {
      hotels: {
        en: 'https://www.booking.com/searchresults.html?ss=World+Cup+2026',
        ar: 'https://www.booking.com/index.ar.html',
        es: 'https://www.booking.com/index.es.html',
        fr: 'https://www.booking.com/index.fr.html',
      },
      cars: {
        en: 'https://www.rentalcars.com',
        ar: 'https://www.rentalcars.com/ar/',
        es: 'https://www.rentalcars.com/es/',
        fr: 'https://www.rentalcars.com/fr/',
      },
      flights: {
        en: 'https://www.kayak.com/flights',
        ar: 'https://www.kayak.ae/flights',
        es: 'https://www.es.kayak.com/vuelos',
        fr: 'https://www.fr.kayak.com/vols',
      },
    };
    return links[type][language] || links[type].en;
  };

  // Direct translations for Travel section
  const getTitle = (type: 'hotels' | 'cars' | 'flights') => {
    const titles = {
      hotels: { en: 'Hotels', ar: 'فنادق', es: 'Hoteles', fr: 'Hôtels' },
      cars: { en: 'Rental Cars', ar: 'تأجير سيارات', es: 'Alquiler de coches', fr: 'Location de voitures' },
      flights: { en: 'Flights', ar: 'طيران', es: 'Vuelos', fr: 'Vols' },
    };
    return titles[type][language] || titles[type].en;
  };

  const getDesc = (type: 'hotels' | 'cars' | 'flights') => {
    const descs = {
      hotels: {
        en: 'Book premium hotels near World Cup stadiums across USA, Canada & Mexico. Best rates guaranteed.',
        ar: 'احجز فنادق فاخرة بالقرب من ملاعب كأس العالم. أفضل الأسعار مضمونة.',
        es: 'Reserva hoteles premium cerca de estadios del Mundial. Mejores tarifas garantizadas.',
        fr: 'Réservez des hôtels premium près des stades. Meilleurs tarifs garantis.',
      },
      cars: {
        en: 'Explore host cities in style. Rent a car and drive between match venues across North America.',
        ar: 'استكشف المدن المستضيفة بأناقة. استأجر سيارة وتنقل بين الملاعب.',
        es: 'Explora ciudades sede con estilo. Alquila un auto y conduce entre sedes.',
        fr: 'Explorez les villes hôtes avec style. Louez une voiture entre les sites.',
      },
      flights: {
        en: 'Find the best flight deals to New York, Los Angeles, Miami, Toronto, Mexico City & more.',
        ar: 'اعثر على أفضل عروض الطيران إلى نيويورك ولوس أنجلوس وميامي وتورونتو ومكسيكو سيتي.',
        es: 'Encuentra las mejores ofertas de vuelos a Nueva York, Los Ángeles, Miami, Toronto, Ciudad de México.',
        fr: 'Trouvez les meilleures offres de vols vers New York, Los Angeles, Miami, Toronto, Mexico.',
      },
    };
    return descs[type][language] || descs[type].en;
  };

  const getButton = (type: 'hotels' | 'cars' | 'flights') => {
    const buttons = {
      hotels: { en: 'Find Hotels', ar: 'ابحث عن فنادق', es: 'Buscar Hoteles', fr: 'Trouver Hôtels' },
      cars: { en: 'Rent a Car', ar: 'استأجر سيارة', es: 'Alquilar Auto', fr: 'Louer Voiture' },
      flights: { en: 'Search Flights', ar: 'ابحث عن رحلات', es: 'Buscar Vuelos', fr: 'Rechercher Vols' },
    };
    return buttons[type][language] || buttons[type].en;
  };

  const travelOptions = [
    {
      icon: Hotel,
      type: 'hotels' as const,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      iconColor: 'text-blue-400',
    },
    {
      icon: Car,
      type: 'cars' as const,
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Plane,
      type: 'flights' as const,
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
              key={option.type}
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
                  <h3 className="text-xl font-bold text-foreground mb-2">{getTitle(option.type)}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{getDesc(option.type)}</p>
                  <Button
                    className="w-full bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm"
                    onClick={() => window.open(getLink(option.type), '_blank')}
                  >
                    {getButton(option.type)}
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
            {cities.map((city, index) => {
              const bookingBaseUrl = {
                en: 'https://www.booking.com/searchresults.html',
                ar: 'https://www.booking.com/searchresults.ar.html',
                es: 'https://www.booking.com/searchresults.es.html',
                fr: 'https://www.booking.com/searchresults.fr.html',
              };
              const baseUrl = bookingBaseUrl[language] || bookingBaseUrl.en;
              
              return (
              <motion.a
                key={city.name}
                href={`${baseUrl}?ss=${encodeURIComponent(city.name)}`}
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
            )})}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
