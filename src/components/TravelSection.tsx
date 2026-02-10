import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink, Search, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Language = 'en' | 'es' | 'fr';

const TRAVEL_CONTENT: Record<Language, {
  hotelTitle: string;
  hotelDesc: string;
  carTitle: string;
  carDesc: string;
  flightTitle: string;
  flightDesc: string;
  bookNow: string;
  hostCitiesTitle: string;
}> = {
  en: {
    hotelTitle: 'Hotels',
    hotelDesc: 'Book premium hotels near World Cup stadiums across USA, Canada & Mexico.',
    carTitle: 'Rental Cars',
    carDesc: 'Explore host cities in style. Rent a car and drive between match venues.',
    flightTitle: 'Flights',
    flightDesc: 'Find the best flight deals to New York, Los Angeles, Miami, Toronto & Mexico City.',
    bookNow: 'Book Now',
    hostCitiesTitle: 'Host Cities - USA, Canada & Mexico',
  },
  es: {
    hotelTitle: 'Hoteles',
    hotelDesc: 'Reserva hoteles premium cerca de estadios del Mundial en EE.UU., Canadá y México.',
    carTitle: 'Alquiler de coches',
    carDesc: 'Explora ciudades sede con estilo. Alquila un auto y conduce entre sedes.',
    flightTitle: 'Vuelos',
    flightDesc: 'Encuentra las mejores ofertas de vuelos a Nueva York, Los Ángeles, Miami y más.',
    bookNow: 'Reservar',
    hostCitiesTitle: 'Ciudades Sede - USA, Canadá y México',
  },
  fr: {
    hotelTitle: 'Hôtels',
    hotelDesc: 'Réservez des hôtels premium près des stades aux États-Unis, au Canada et au Mexique.',
    carTitle: 'Location de voitures',
    carDesc: 'Explorez les villes hôtes avec style. Louez une voiture entre les sites de match.',
    flightTitle: 'Vols',
    flightDesc: 'Trouvez les meilleures offres de vols vers New York, Los Angeles, Miami, Toronto et Mexico.',
    bookNow: 'Réserver',
    hostCitiesTitle: 'Villes Hôtes - USA, Canada et Mexique',
  },
};

const HOST_CITIES = [
  { nameEn: 'New York/NJ', nameEs: 'Nueva York/NJ', nameFr: 'New York/NJ', stadium: 'MetLife Stadium', countryEn: 'USA', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Los Angeles', nameEs: 'Los Ángeles', nameFr: 'Los Angeles', stadium: 'SoFi Stadium', countryEn: 'USA', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Miami', nameEs: 'Miami', nameFr: 'Miami', stadium: 'Hard Rock Stadium', countryEn: 'USA', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Dallas', nameEs: 'Dallas', nameFr: 'Dallas', stadium: 'AT&T Stadium', countryEn: 'USA', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Toronto', nameEs: 'Toronto', nameFr: 'Toronto', stadium: 'BMO Field', countryEn: 'Canada', countryEs: 'Canadá', countryFr: 'Canada' },
  { nameEn: 'Mexico City', nameEs: 'Ciudad de México', nameFr: 'Mexico', stadium: 'Estadio Azteca', countryEn: 'Mexico', countryEs: 'México', countryFr: 'Mexique' },
];

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showFlightsSearch, setShowFlightsSearch] = useState(false);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const langKey = language as Language;
  const content = TRAVEL_CONTENT[langKey] || TRAVEL_CONTENT.en;

  const currentLinks = {
    hotels: `https://www.booking.com/searchresults.html?aid=304142&label=marker-495595&lang=${langKey}`,
    cars: `https://www.booking.com/cars/index.html?aid=304142&label=marker-495595&lang=${langKey}`,
  };

  const travelOptions = [
    { icon: Hotel, title: content.hotelTitle, desc: content.hotelDesc, link: currentLinks.hotels, color: 'bg-blue-500/20 text-blue-300', type: 'hotels' },
    { icon: Car, title: content.carTitle, desc: content.carDesc, link: currentLinks.cars, color: 'bg-emerald-500/20 text-emerald-300', type: 'cars' },
    { icon: Plane, title: content.flightTitle, desc: content.flightDesc, link: '', color: 'bg-orange-500/20 text-orange-300', type: 'flights' },
  ];

  return (
    <section id="travel" className="py-16 bg-background relative">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.hostCitiesTitle}</h2>
          <p className="text-muted-foreground">{content.hotelDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {travelOptions.map((option) => (
            <Card key={option.type} className="bg-card border-border">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.desc}</p>
                <Button className="w-full" onClick={() => option.type !== 'flights' && window.open(option.link, '_blank')}>
                  {content.bookNow} <ExternalLink className="w-4 h-4 ms-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HOST_CITIES.map((city) => (
            <a key={city.nameEn} href={`https://www.booking.com/searchresults.html?ss=${city.nameEn}&aid=304142`} target="_blank" className="p-4 bg-secondary rounded-xl border border-border text-center hover:border-primary transition-all">
              <h4 className="font-bold text-sm">{language === 'es' ? city.nameEs : language === 'fr' ? city.nameFr : city.nameEn}</h4>
              <p className="text-[10px] text-muted-foreground">{city.stadium}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
