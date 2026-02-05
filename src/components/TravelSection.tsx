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

// ========== Type definition for supported languages ==========
type Language = 'en' | 'ar' | 'es' | 'fr';

// ========== TRAVEL_CONTENT: Single source of truth for all 4 languages ==========
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
    hotelDesc: 'Book premium hotels near World Cup stadiums across USA, Canada & Mexico. Best rates guaranteed.',
    carTitle: 'Rental Cars',
    carDesc: 'Explore host cities in style. Rent a car and drive between match venues across North America.',
    flightTitle: 'Flights',
    flightDesc: 'Find the best flight deals to New York, Los Angeles, Miami, Toronto, Mexico City & more.',
    bookNow: 'Book Now',
    hostCitiesTitle: 'Host Cities - USA, Canada & Mexico',
  },
  ar: {
    hotelTitle: 'فنادق',
    hotelDesc: 'احجز فنادق فاخرة بالقرب من ملاعب كأس العالم. أفضل الأسعار مضمونة.',
    carTitle: 'تأجير سيارات',
    carDesc: 'استكشف المدن المستضيفة بأناقة. استأجر سيارة وتنقل بين الملاعب.',
    flightTitle: 'تذاكر الطيران',
    flightDesc: 'اعثر على أفضل عروض الطيران إلى نيويورك ولوس أنجلوس وميامي وتورونتو ومكسيكو سيتي.',
    bookNow: 'احجز الآن',
    hostCitiesTitle: 'المدن المستضيفة - أمريكا وكندا والمكسيك',
  },
  es: {
    hotelTitle: 'Hoteles',
    hotelDesc: 'Reserva hoteles premium cerca de estadios del Mundial. Mejores tarifas garantizadas.',
    carTitle: 'Alquiler de coches',
    carDesc: 'Explora ciudades sede con estilo. Alquila un auto y conduce entre sedes.',
    flightTitle: 'Vuelos',
    flightDesc: 'Encuentra las mejores ofertas de vuelos a Nueva York, Los Ángeles, Miami, Toronto, Ciudad de México.',
    bookNow: 'Reservar',
    hostCitiesTitle: 'Ciudades Sede - USA, Canadá y México',
  },
  fr: {
    hotelTitle: 'Hôtels',
    hotelDesc: 'Réservez des hôtels premium près des stades. Meilleurs tarifs garantis.',
    carTitle: 'Location de voitures',
    carDesc: 'Explorez les villes hôtes avec style. Louez une voiture entre les sites.',
    flightTitle: 'Vols',
    flightDesc: 'Trouvez les meilleures offres de vols vers New York, Los Angeles, Miami, Toronto, Mexico.',
    bookNow: 'Réserver',
    hostCitiesTitle: 'Villes Hôtes - USA, Canada et Mexique',
  },
};

// ========== HOST_CITIES: Localized city names for all 4 languages ==========
const HOST_CITIES = [
  { name: { en: 'New York/NJ', ar: 'نيويورك/نيوجيرسي', es: 'Nueva York/NJ', fr: 'New York/NJ' }, stadium: 'MetLife Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Los Angeles', ar: 'لوس أنجلوس', es: 'Los Ángeles', fr: 'Los Angeles' }, stadium: 'SoFi Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Miami', ar: 'ميامي', es: 'Miami', fr: 'Miami' }, stadium: 'Hard Rock Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Dallas', ar: 'دالاس', es: 'Dallas', fr: 'Dallas' }, stadium: 'AT&T Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Atlanta', ar: 'أتلانتا', es: 'Atlanta', fr: 'Atlanta' }, stadium: 'Mercedes-Benz Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Seattle', ar: 'سياتل', es: 'Seattle', fr: 'Seattle' }, stadium: 'Lumen Field', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'San Francisco', ar: 'سان فرانسيسكو', es: 'San Francisco', fr: 'San Francisco' }, stadium: "Levi's Stadium", country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Houston', ar: 'هيوستن', es: 'Houston', fr: 'Houston' }, stadium: 'NRG Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Philadelphia', ar: 'فيلادلفيا', es: 'Filadelfia', fr: 'Philadelphie' }, stadium: 'Lincoln Financial Field', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Kansas City', ar: 'كانساس سيتي', es: 'Kansas City', fr: 'Kansas City' }, stadium: 'Arrowhead Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Boston', ar: 'بوسطن', es: 'Boston', fr: 'Boston' }, stadium: 'Gillette Stadium', country: { en: 'USA', ar: 'الولايات المتحدة', es: 'EE.UU.', fr: 'États-Unis' } },
  { name: { en: 'Toronto', ar: 'تورونتو', es: 'Toronto', fr: 'Toronto' }, stadium: 'BMO Field', country: { en: 'Canada', ar: 'كندا', es: 'Canadá', fr: 'Canada' } },
  { name: { en: 'Vancouver', ar: 'فانكوفر', es: 'Vancouver', fr: 'Vancouver' }, stadium: 'BC Place', country: { en: 'Canada', ar: 'كندا', es: 'Canadá', fr: 'Canada' } },
  { name: { en: 'Mexico City', ar: 'مكسيكو سيتي', es: 'Ciudad de México', fr: 'Mexico' }, stadium: 'Estadio Azteca', country: { en: 'Mexico', ar: 'المكسيك', es: 'México', fr: 'Mexique' } },
  { name: { en: 'Guadalajara', ar: 'غوادالاخارا', es: 'Guadalajara', fr: 'Guadalajara' }, stadium: 'Estadio Akron', country: { en: 'Mexico', ar: 'المكسيك', es: 'México', fr: 'Mexique' } },
  { name: { en: 'Monterrey', ar: 'مونتيري', es: 'Monterrey', fr: 'Monterrey' }, stadium: 'Estadio BBVA', country: { en: 'Mexico', ar: 'المكسيك', es: 'México', fr: 'Mexique' } },
];

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showFlightsSearch, setShowFlightsSearch] = useState(false);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  // Get current language content - falls back to English
  const langKey = language as Language;
  const content = TRAVEL_CONTENT[langKey] || TRAVEL_CONTENT.en;

  // World Cup 2026 destination cities
  const worldCupDestinations = [
    { value: 'new-york', labelEn: 'New York, USA', labelAr: 'نيويورك، الولايات المتحدة', labelEs: 'Nueva York, EE.UU.', labelFr: 'New York, États-Unis' },
    { value: 'los-angeles', labelEn: 'Los Angeles, USA', labelAr: 'لوس أنجلوس، الولايات المتحدة', labelEs: 'Los Ángeles, EE.UU.', labelFr: 'Los Angeles, États-Unis' },
    { value: 'miami', labelEn: 'Miami, USA', labelAr: 'ميامي، الولايات المتحدة', labelEs: 'Miami, EE.UU.', labelFr: 'Miami, États-Unis' },
    { value: 'toronto', labelEn: 'Toronto, Canada', labelAr: 'تورونتو، كندا', labelEs: 'Toronto, Canadá', labelFr: 'Toronto, Canada' },
    { value: 'mexico-city', labelEn: 'Mexico City, Mexico', labelAr: 'مكسيكو سيتي، المكسيك', labelEs: 'Ciudad de México, México', labelFr: 'Mexico, Mexique' },
    { value: 'dallas', labelEn: 'Dallas, USA', labelAr: 'دالاس، الولايات المتحدة', labelEs: 'Dallas, EE.UU.', labelFr: 'Dallas, États-Unis' },
    { value: 'atlanta', labelEn: 'Atlanta, USA', labelAr: 'أتلانتا، الولايات المتحدة', labelEs: 'Atlanta, EE.UU.', labelFr: 'Atlanta, États-Unis' },
  ];

  // Origin cities
  const originCities = [
    { value: 'casablanca', labelEn: 'Casablanca, Morocco', labelAr: 'الدار البيضاء، المغرب', labelEs: 'Casablanca, Marruecos', labelFr: 'Casablanca, Maroc' },
    { value: 'tangier', labelEn: 'Tangier, Morocco', labelAr: 'طنجة، المغرب', labelEs: 'Tánger, Marruecos', labelFr: 'Tanger, Maroc' },
    { value: 'marrakech', labelEn: 'Marrakech, Morocco', labelAr: 'مراكش، المغرب', labelEs: 'Marrakech, Marruecos', labelFr: 'Marrakech, Maroc' },
    { value: 'paris', labelEn: 'Paris, France', labelAr: 'باريس، فرنسا', labelEs: 'París, Francia', labelFr: 'Paris, France' },
    { value: 'london', labelEn: 'London, UK', labelAr: 'لندن، المملكة المتحدة', labelEs: 'Londres, Reino Unido', labelFr: 'Londres, Royaume-Uni' },
    { value: 'madrid', labelEn: 'Madrid, Spain', labelAr: 'مدريد، إسبانيا', labelEs: 'Madrid, España', labelFr: 'Madrid, Espagne' },
    { value: 'dubai', labelEn: 'Dubai, UAE', labelAr: 'دبي، الإمارات', labelEs: 'Dubái, EAU', labelFr: 'Dubaï, EAU' },
  ];

  const getCityLabel = (city: typeof worldCupDestinations[0]) => {
    switch (language) {
      case 'ar': return city.labelAr;
      case 'es': return city.labelEs;
      case 'fr': return city.labelFr;
      default: return city.labelEn;
    }
  };

  // Flights UI translations
  const flightsUI: Record<Language, {
    searchFlights: string;
    from: string;
    to: string;
    selectOrigin: string;
    selectDestination: string;
    search: string;
    worldCup2026: string;
    findBestDeals: string;
    close: string;
  }> = {
    ar: {
      searchFlights: 'بحث عن رحلات',
      from: 'الذهاب من',
      to: 'الوجهة إلى',
      selectOrigin: 'اختر مدينة المغادرة',
      selectDestination: 'اختر الوجهة',
      search: 'بحث',
      worldCup2026: 'رحلات كأس العالم 2026',
      findBestDeals: 'اعثر على أفضل العروض لمباريات كأس العالم',
      close: 'إغلاق',
    },
    es: {
      searchFlights: 'Buscar vuelos',
      from: 'Salida desde',
      to: 'Destino a',
      selectOrigin: 'Seleccionar ciudad de origen',
      selectDestination: 'Seleccionar destino',
      search: 'Buscar',
      worldCup2026: 'Vuelos Copa del Mundo 2026',
      findBestDeals: 'Encuentra las mejores ofertas para los partidos del Mundial',
      close: 'Cerrar',
    },
    fr: {
      searchFlights: 'Rechercher des vols',
      from: 'Départ de',
      to: 'Destination',
      selectOrigin: 'Sélectionner la ville de départ',
      selectDestination: 'Sélectionner la destination',
      search: 'Rechercher',
      worldCup2026: 'Vols Coupe du Monde 2026',
      findBestDeals: 'Trouvez les meilleures offres pour les matchs de la Coupe du Monde',
      close: 'Fermer',
    },
    en: {
      searchFlights: 'Search Flights',
      from: 'From',
      to: 'To',
      selectOrigin: 'Select departure city',
      selectDestination: 'Select destination',
      search: 'Search',
      worldCup2026: 'World Cup 2026 Flights',
      findBestDeals: 'Find the best deals for World Cup matches',
      close: 'Close',
    },
  };

  const ui = flightsUI[langKey] || flightsUI.en;

  const handleFlightsSearch = () => {
    if (!fromCity || !toCity) return;
    
    const fromCityData = originCities.find(c => c.value === fromCity);
    const toCityData = worldCupDestinations.find(c => c.value === toCity);
    
    if (fromCityData && toCityData) {
      const searchUrl = `https://www.aviasales.com/search/${encodeURIComponent(fromCityData.labelEn.split(',')[0])}${encodeURIComponent(toCityData.labelEn.split(',')[0])}1?marker=${MARKER_ID}`;
      window.open(searchUrl, '_blank');
    }
  };

  // Travelpayouts affiliate links with Marker ID: 495595
  const MARKER_ID = '495595';

  // Language code mapping for Travelpayouts
  const getLangCode = (): string => {
    switch (langKey) {
      case 'ar': return 'ar';
      case 'es': return 'es';
      case 'fr': return 'fr';
      default: return 'en';
    }
  };

  const getBookingLinks = () => {
    const lang = getLangCode();
    return { 
      flights: `https://www.aviasales.com/?marker=${MARKER_ID}&locale=${lang}`, 
      cars: `https://www.economybookings.com/?a_aid=${MARKER_ID}&lang=${lang}`, 
      hotels: `https://search.hotellook.com/?marker=${MARKER_ID}&language=${lang}` 
    };
  };

  const currentLinks = getBookingLinks();

  const travelOptions = [
    {
      icon: Hotel,
      type: 'hotels' as const,
      title: content.hotelTitle,
      desc: content.hotelDesc,
      link: currentLinks.hotels,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      iconColor: 'text-blue-400',
    },
    {
      icon: Car,
      type: 'cars' as const,
      title: content.carTitle,
      desc: content.carDesc,
      link: currentLinks.cars,
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Plane,
      type: 'flights' as const,
      title: content.flightTitle,
      desc: content.flightDesc,
      link: currentLinks.flights,
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      iconColor: 'text-orange-400',
    },
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

        {/* Flights Search Modal */}
        <AnimatePresence>
          {showFlightsSearch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFlightsSearch(false)}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{ui.worldCup2026}</h3>
                      <p className="text-sm text-muted-foreground">{ui.findBestDeals}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFlightsSearch(false)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Search Form */}
                <div className="space-y-4">
                  {/* From */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {ui.from}
                    </label>
                    <Select value={fromCity} onValueChange={setFromCity}>
                      <SelectTrigger className="w-full bg-secondary border-border">
                        <SelectValue placeholder={ui.selectOrigin} />
                      </SelectTrigger>
                      <SelectContent>
                        {originCities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {getCityLabel(city)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <ArrowRight className={`w-5 h-5 text-primary ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {ui.to}
                    </label>
                    <Select value={toCity} onValueChange={setToCity}>
                      <SelectTrigger className="w-full bg-secondary border-border">
                        <SelectValue placeholder={ui.selectDestination} />
                      </SelectTrigger>
                      <SelectContent>
                        {worldCupDestinations.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {getCityLabel(city)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button
                    onClick={handleFlightsSearch}
                    disabled={!fromCity || !toCity}
                    className="w-full bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm h-12 text-base"
                  >
                    <Search className="w-5 h-5 me-2" />
                    {ui.search}
                  </Button>
                </div>

                {/* Quick destinations */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 text-center">
                    🏆 {language === 'ar' ? 'وجهات كأس العالم 2026' : language === 'es' ? 'Destinos Copa del Mundo 2026' : language === 'fr' ? 'Destinations Coupe du Monde 2026' : 'World Cup 2026 Destinations'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['new-york', 'toronto', 'mexico-city'].map((cityValue) => {
                      const city = worldCupDestinations.find(c => c.value === cityValue);
                      if (!city) return null;
                      return (
                        <button
                          key={cityValue}
                          onClick={() => setToCity(cityValue)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            toCity === cityValue 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {getCityLabel(city).split(',')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{option.desc}</p>
                  <Button
                    className="w-full bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm"
                    onClick={() => {
                      if (option.type === 'flights') {
                        setShowFlightsSearch(true);
                      } else {
                        const url = currentLinks[option.type];
                        window.open(url, '_blank');
                      }
                    }}
                  >
                    {option.type === 'flights' ? ui.searchFlights : content.bookNow}
                    {option.type === 'flights' ? <Search className="w-4 h-4 ms-2" /> : <ExternalLink className="w-4 h-4 ms-2" />}
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
            {content.hostCitiesTitle}
          </h3>
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-8 gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {HOST_CITIES.map((city, index) => {
              const bookingBaseUrl = {
                en: 'https://www.booking.com/searchresults.html',
                ar: 'https://www.booking.com/searchresults.ar.html',
                es: 'https://www.booking.com/searchresults.es.html',
                fr: 'https://www.booking.com/searchresults.fr.html',
              };
              const baseUrl = bookingBaseUrl[language] || bookingBaseUrl.en;
              
              return (
              <motion.a
                key={city.name.en}
                href={`${baseUrl}?ss=${encodeURIComponent(city.name.en)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex-shrink-0 w-[140px] md:w-auto bg-card rounded-lg p-3 border border-border text-center hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer snap-start"
              >
                <h4 className="font-semibold text-foreground text-sm mb-1">{city.name[langKey]}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{city.stadium}</p>
                <span className="text-[10px] text-primary font-medium">{city.country[langKey]}</span>
              </motion.a>
            )})}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
