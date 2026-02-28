import { motion } from 'framer-motion';
import { Hotel, Car, Plane, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'en' | 'es' | 'fr';

const TRANSLATIONS = {
  en: { sectionLabel: 'Travel Guide', title: 'Plan Your World Cup Trip', subtitle: 'Book hotels, rent cars, and explore host cities across USA, Canada & Mexico', hotel: 'World Cup Hotels', hotelDesc: 'Find the best hotels near World Cup stadiums across all host cities', car: 'Rental Cars', carDesc: 'Get around host cities with ease — rent a car for the tournament', flight: 'World Cup Flights', flightDesc: 'Find flights to World Cup host cities across USA, Canada & Mexico', cities: 'Host Cities', citiesDesc: '6 stadiums across 3 countries — the biggest World Cup ever', btn: 'Book Now', viewHotels: 'View Hotels' },
  es: { sectionLabel: 'Guía de Viaje', title: 'Planifica tu Viaje al Mundial', subtitle: 'Reserva hoteles, alquila autos y explora las ciudades sede en EE.UU., Canadá y México', hotel: 'Hoteles del Mundial', hotelDesc: 'Encuentra los mejores hoteles cerca de los estadios del Mundial', car: 'Alquiler de Coches', carDesc: 'Muévete fácilmente entre ciudades sede — alquila un auto para el torneo', flight: 'Vuelos del Mundial', flightDesc: 'Encuentra vuelos a las ciudades sede del Mundial en EE.UU., Canadá y México', cities: 'Ciudades Anfitrionas', citiesDesc: '6 estadios en 3 países — el Mundial más grande de la historia', btn: 'Reservar Ahora', viewHotels: 'Ver Hoteles' },
  fr: { sectionLabel: 'Guide de Voyage', title: 'Planifiez Votre Voyage Mondial', subtitle: 'Réservez hôtels, louez des voitures et explorez les villes hôtes aux USA, Canada et Mexique', hotel: 'Hôtels de la Coupe du Monde', hotelDesc: 'Trouvez les meilleurs hôtels près des stades de la Coupe du Monde', car: 'Location de Voitures', carDesc: 'Déplacez-vous facilement entre les villes hôtes — louez une voiture pour le tournoi', flight: 'Vols de la Coupe du Monde', flightDesc: 'Trouvez des vols vers les villes hôtes de la Coupe du Monde aux USA, Canada et Mexique', cities: 'Villes Hôtes', citiesDesc: '6 stades dans 3 pays — la plus grande Coupe du Monde de l\'histoire', btn: 'Réserver', viewHotels: 'Voir Hôtels' },
};

const getSecureLink = (type: 'hotel' | 'car' | 'flight', lang: string) => {
  const links = {
    hotel: `https://www.booking.com/searchresults.html?ss=USA&dest_type=country&selected_currency=USD&lang=${lang}`,
    car: `https://www.booking.com/cars/country/us.html?selected_currency=USD&lang=${lang}`,
    flight: `https://arangrant.com/search?destination=USA&lang=${lang}`,
  };
  return links[type];
};

const NOTICE: Record<Language, string> = {
  en: 'Note: You can manually set your preferred language and currency inside the booking page.',
  es: 'Nota: Puede configurar su idioma y moneda manualmente dentro de la página de reserva.',
  fr: 'Note: Vous pouvez régler votre langue et votre devise manuellement dans la page de réservation.',
};

const HOST_CITIES = [
  { name: { en: 'New York / NJ', es: 'Nueva York / NJ', fr: 'New York / NJ' }, stadium: { en: 'MetLife Stadium', es: 'Estadio MetLife', fr: 'Stade MetLife' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🗽', search: 'New%20York' },
  { name: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' }, stadium: { en: 'SoFi Stadium', es: 'Estadio SoFi', fr: 'Stade SoFi' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🌴', search: 'Los%20Angeles' },
  { name: { en: 'Miami', es: 'Miami', fr: 'Miami' }, stadium: { en: 'Hard Rock Stadium', es: 'Estadio Hard Rock', fr: 'Stade Hard Rock' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🏖️', search: 'Miami' },
  { name: { en: 'Dallas', es: 'Dallas', fr: 'Dallas' }, stadium: { en: 'AT&T Stadium', es: 'Estadio AT&T', fr: 'Stade AT&T' }, country: { en: 'USA', es: 'EE.UU.', fr: 'États-Unis' }, emoji: '🤠', search: 'Dallas' },
  { name: { en: 'Toronto', es: 'Toronto', fr: 'Toronto' }, stadium: { en: 'BMO Field', es: 'Campo BMO', fr: 'Terrain BMO' }, country: { en: 'Canada', es: 'Canadá', fr: 'Canada' }, emoji: '🍁', search: 'Toronto' },
  { name: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' }, stadium: { en: 'Estadio Azteca', es: 'Estadio Azteca', fr: 'Stade Azteca' }, country: { en: 'Mexico', es: 'México', fr: 'Mexique' }, emoji: '🇲🇽', search: 'Mexico%20City' },
];

const TravelSection = () => {
  const { language } = useLanguage();
  const lang = (language as Language) || 'en';
  const txt = TRANSLATIONS[lang];

  const cityHotelUrl = (search: string) =>
    `https://www.booking.com/searchresults.html?ss=${search}&selected_currency=USD&lang=${lang}`;

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

        {/* Dynamic Language Notice */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-xs text-muted-foreground italic bg-secondary/50 inline-block px-4 py-2 rounded-full">
            {NOTICE[lang]}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Hotel className="w-7 h-7 text-blue-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{txt.hotel}</h3>
                <p className="text-sm text-muted-foreground">{txt.hotelDesc}</p>
              </div>
              <Button size="lg" className="shrink-0" onClick={() => window.open(getSecureLink('hotel', lang), '_blank', 'noopener,noreferrer')}>
                {txt.btn} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 2. Car Rentals ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Car className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{txt.car}</h3>
                <p className="text-sm text-muted-foreground">{txt.carDesc}</p>
              </div>
              <Button size="lg" variant="outline" className="shrink-0" onClick={() => window.open(getSecureLink('car', lang), '_blank', 'noopener,noreferrer')}>
                {txt.btn} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 3. Flights ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                <Plane className="w-7 h-7 text-purple-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">{txt.flight}</h3>
                <p className="text-sm text-muted-foreground">{txt.flightDesc}</p>
              </div>
              <Button size="lg" variant="outline" className="shrink-0" onClick={() => window.open(getSecureLink('flight', lang), '_blank', 'noopener,noreferrer')}>
                {txt.btn} <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 4. Host Cities ── */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{txt.cities}</h3>
            <p className="text-sm text-muted-foreground">{txt.citiesDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOST_CITIES.map((city, i) => (
              <motion.a
                key={city.name.en}
                href={cityHotelUrl(city.search)}
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
                  {txt.viewHotels} <ExternalLink className="w-2.5 h-2.5" />
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
