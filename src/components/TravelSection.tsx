import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // HARDCODED travelLinks - Explicit URLs per language (v3 - fixed flights)
  const getTravelLinks = () => {
    switch (language) {
      case 'ar':
        return {
          flights: 'https://www.booking.com/flights/index.ar.html',
          cars: 'https://www.booking.com/cars/index.ar.html',
          hotels: 'https://www.booking.com/index.ar.html',
          btn: 'احجز الآن'
        };
      case 'es':
        return {
          flights: 'https://www.booking.com/flights/index.es.html',
          cars: 'https://www.booking.com/cars/index.es.html',
          hotels: 'https://www.booking.com/index.es.html',
          btn: 'Reservar'
        };
      case 'fr':
        return {
          flights: 'https://www.booking.com/flights/index.fr.html',
          cars: 'https://www.booking.com/cars/index.fr.html',
          hotels: 'https://www.booking.com/index.fr.html',
          btn: 'Réserver'
        };
      default:
        return {
          flights: 'https://www.booking.com/flights/',
          cars: 'https://www.booking.com/cars/',
          hotels: 'https://www.booking.com/',
          btn: 'Book Now'
        };
    }
  };

  const currentLinks = getTravelLinks();

  // HARDCODED titles (v4 - updated flight labels)
  const getTitle = (type: 'hotels' | 'cars' | 'flights'): string => {
    switch (language) {
      case 'ar':
        return type === 'hotels' ? 'فنادق' : type === 'cars' ? 'تأجير سيارات' : 'تذاكر الطيران';
      case 'es':
        return type === 'hotels' ? 'Hoteles' : type === 'cars' ? 'Alquiler de coches' : 'Billetes de avión';
      case 'fr':
        return type === 'hotels' ? 'Hôtels' : type === 'cars' ? 'Location de voitures' : 'Billets d\'avion';
      default:
        return type === 'hotels' ? 'Hotels' : type === 'cars' ? 'Rental Cars' : 'Flights';
    }
  };

  // HARDCODED descriptions
  const getDesc = (type: 'hotels' | 'cars' | 'flights'): string => {
    switch (language) {
      case 'ar':
        return type === 'hotels' 
          ? 'احجز فنادق فاخرة بالقرب من ملاعب كأس العالم. أفضل الأسعار مضمونة.'
          : type === 'cars'
          ? 'استكشف المدن المستضيفة بأناقة. استأجر سيارة وتنقل بين الملاعب.'
          : 'اعثر على أفضل عروض الطيران إلى نيويورك ولوس أنجلوس وميامي وتورونتو ومكسيكو سيتي.';
      case 'es':
        return type === 'hotels'
          ? 'Reserva hoteles premium cerca de estadios del Mundial. Mejores tarifas garantizadas.'
          : type === 'cars'
          ? 'Explora ciudades sede con estilo. Alquila un auto y conduce entre sedes.'
          : 'Encuentra las mejores ofertas de vuelos a Nueva York, Los Ángeles, Miami, Toronto, Ciudad de México.';
      case 'fr':
        return type === 'hotels'
          ? 'Réservez des hôtels premium près des stades. Meilleurs tarifs garantis.'
          : type === 'cars'
          ? 'Explorez les villes hôtes avec style. Louez une voiture entre les sites.'
          : 'Trouvez les meilleures offres de vols vers New York, Los Angeles, Miami, Toronto, Mexico.';
      default:
        return type === 'hotels'
          ? 'Book premium hotels near World Cup stadiums across USA, Canada & Mexico. Best rates guaranteed.'
          : type === 'cars'
          ? 'Explore host cities in style. Rent a car and drive between match venues across North America.'
          : 'Find the best flight deals to New York, Los Angeles, Miami, Toronto, Mexico City & more.';
    }
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
    <section key={i18n.language} id="travel" className="py-16 md:py-24 moroccan-pattern relative">
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
                    onClick={() => {
                      const url = currentLinks[option.type];
                      window.open(url, '_blank');
                    }}
                  >
                    {currentLinks.btn}
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
