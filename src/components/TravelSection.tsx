import { motion } from 'framer-motion';
import { Hotel, Car, Plane, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSiteLinks } from '@/hooks/useSiteLinks';

type Language = 'en' | 'es' | 'fr';

const FLIGHT_URL = 'https://www.arangrant.com/en-ca/?utm_source=cj&utm_medium=affiliate&utm_campaign=101644092&cjevent=17039663';

const TRANSLATIONS = {
  en: { sectionLabel: 'Travel Guide', title: 'Plan Your World Cup Trip', subtitle: 'Book hotels, rent cars, and explore host cities across USA, Canada & Mexico', hotel: 'World Cup Hotels', hotelDesc: 'Find the best hotels near World Cup stadiums across all host cities', car: 'Rental Cars', carDesc: 'Get around host cities with ease — rent a car for the tournament', flight: 'Exclusive Flight Deals', flightDesc: 'Compare and book the best flights to World Cup 2026 host cities across North America', btn: 'Book Now', searchFlights: 'Search Flights', viewHotels: 'View Hotels' },
  es: { sectionLabel: 'Guía de Viaje', title: 'Planifica tu Viaje al Mundial', subtitle: 'Reserva hoteles, alquila autos y explora las ciudades sede en EE.UU., Canadá y México', hotel: 'Hoteles del Mundial', hotelDesc: 'Encuentra los mejores hoteles cerca de los estadios del Mundial', car: 'Alquiler de Coches', carDesc: 'Muévete fácilmente entre ciudades sede — alquila un auto para el torneo', flight: 'Ofertas Exclusivas de Vuelos', flightDesc: 'Compara y reserva los mejores vuelos a las ciudades sede del Mundial 2026 en Norteamérica', btn: 'Reservar Ahora', searchFlights: 'Buscar Vuelos', viewHotels: 'Ver Hoteles' },
  fr: { sectionLabel: 'Guide de Voyage', title: 'Planifiez Votre Voyage Mondial', subtitle: 'Réservez hôtels, louez des voitures et explorez les villes hôtes aux USA, Canada et Mexique', hotel: 'Hôtels de la Coupe du Monde', hotelDesc: 'Trouvez les meilleurs hôtels près des stades de la Coupe du Monde', car: 'Location de Voitures', carDesc: 'Déplacez-vous facilement entre les villes hôtes — louez une voiture pour le tournoi', flight: 'Offres de Vols Exclusives', flightDesc: 'Comparez et réservez les meilleurs vols vers les villes hôtes de la Coupe du Monde 2026', btn: 'Réserver', searchFlights: 'Rechercher des Vols', viewHotels: 'Voir Hôtels' },
};

// Hardcoded fallbacks in case DB fetch fails
const FALLBACK_LINKS: Record<string, string> = {
  Hotels_USA: 'https://www.booking.com/searchresults.html?ss=United+States&dest_type=country&selected_currency=USD&nflt=ht_id%3D204',
  Cars_USA: 'https://www.booking.com/cars/country/us.html?selected_currency=USD',
  Flights: FLIGHT_URL,
  Hotel_NewYork: 'https://www.booking.com/searchresults.html?ss=New+York+United+States&dest_type=city&selected_currency=USD',
  Hotel_LosAngeles: 'https://www.booking.com/searchresults.html?ss=Los+Angeles+United+States&dest_type=city&selected_currency=USD',
  Hotel_Miami: 'https://www.booking.com/searchresults.html?ss=Miami+United+States&dest_type=city&selected_currency=USD',
  Hotel_Dallas: 'https://www.booking.com/searchresults.html?ss=Dallas+United+States&dest_type=city&selected_currency=USD',
  Hotel_Toronto: 'https://www.booking.com/searchresults.html?ss=Toronto+Canada&dest_type=city&selected_currency=USD',
  Hotel_MexicoCity: 'https://www.booking.com/searchresults.html?ss=Mexico+City+Mexico&dest_type=city&selected_currency=USD',
};

const NOTICE: Record<Language, string> = {
  en: 'Note: You can manually set your preferred language and currency inside the booking page.',
  es: 'Nota: Puede configurar su idioma y moneda manualmente dentro de la página de reserva.',
  fr: 'Note: Vous pouvez régler votre langue et votre devise manuellement dans la page de réservation.',
};

const HOST_CITIES = [
  { name: { en: 'New York / NJ', es: 'Nueva York / NJ', fr: 'New York / NJ' }, stadium: { en: 'MetLife Stadium', es: 'Estadio MetLife', fr: 'Stade MetLife' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🗽', linkKey: 'Hotel_NewYork' },
  { name: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' }, stadium: { en: 'SoFi Stadium', es: 'Estadio SoFi', fr: 'Stade SoFi' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🌴', linkKey: 'Hotel_LosAngeles' },
  { name: { en: 'Miami', es: 'Miami', fr: 'Miami' }, stadium: { en: 'Hard Rock Stadium', es: 'Estadio Hard Rock', fr: 'Stade Hard Rock' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🏖️', linkKey: 'Hotel_Miami' },
  { name: { en: 'Dallas', es: 'Dallas', fr: 'Dallas' }, stadium: { en: 'AT&T Stadium', es: 'Estadio AT&T', fr: 'Stade AT&T' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🤠', linkKey: 'Hotel_Dallas' },
  { name: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' }, stadium: { en: 'Estadio Azteca', es: 'Estadio Azteca', fr: 'Stade Azteca' }, country: { en: 'Mexico', es: 'México', fr: 'Mexique' }, emoji: '🇲🇽', linkKey: 'Hotel_MexicoCity' },
];

const TravelSection = () => {
  const { language } = useLanguage();
  const lang = (language as Language) || 'en';
  const txt = TRANSLATIONS[lang];
  const { data: siteLinks } = useSiteLinks();

  const BOOKING_LANG: Record<Language, string> = { en: 'en-us', es: 'es', fr: 'fr' };

  const getLink = (key: string) => {
    if (key === 'Flights') return FLIGHT_URL;
    const base = siteLinks?.[key] || FALLBACK_LINKS[key] || '#';
    if (base.includes('booking.com')) return `${base}&lang=${BOOKING_LANG[lang]}`;
    return base;
  };

  return (
    <section key={language} id="travel" className="py-16 md:py-24 bg-background relative moroccan-pattern">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{txt.sectionLabel}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{txt.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{txt.subtitle}</p>
        </motion.div>

        {/* Language/Currency notice directly above Hotels */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-[hsl(220,100%,50%)] to-[hsl(280,100%,55%)] px-6 py-4 text-center">
          <p className="text-base md:text-lg font-bold text-white">
            {NOTICE[lang]}
          </p>
        </div>

        {/* Hotels */}
        <motion.div id="hotels-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Hotel className="w-7 h-7 text-blue-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{txt.hotel}</h3>
                <p className="text-sm text-muted-foreground">{txt.hotelDesc}</p>
              </div>
              <Button size="lg" className="shrink-0" onClick={() => window.open(getLink('Hotels_USA'), '_blank', 'noopener,noreferrer')}>
                {txt.btn} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Car Rentals */}
        <motion.div id="cars-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Car className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{TRANSLATIONS.en.car}</h3>
                <p className="text-sm text-muted-foreground">{TRANSLATIONS.en.carDesc}</p>
              </div>
              <Button size="lg" variant="outline" className="shrink-0" onClick={() => window.open(getLink('Cars_USA'), '_blank', 'noopener,noreferrer')}>
                {TRANSLATIONS.en.btn} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exclusive Flight Deals */}
        <motion.div id="flights-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <Card className="bg-card border-border overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <CardContent className="p-8 md:p-10 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Plane className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{txt.flight}</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">{txt.flightDesc}</p>
              </div>
              <Button size="lg" className="px-10 text-base" onClick={() => window.open(FLIGHT_URL, '_blank', 'noopener,noreferrer')}>
                {txt.searchFlights} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blog section rendered separately below */}
      </div>
    </section>
  );
};

export default TravelSection;
