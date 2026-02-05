import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ========== Type definition for supported languages ==========
type Language = 'en' | 'ar' | 'es' | 'fr';

// ========== TRAVEL_CONTENT: Single source of truth for all 4 languages ==========
const TRAVEL_CONTENT: Record<Language, {
  sectionTitle: string;
  sectionSubtitle: string;
  travelServicesTitle: string;
  travelServicesDesc: string;
  bookNow: string;
  hostCitiesTitle: string;
  explore: string;
}> = {
  en: {
    sectionTitle: 'Plan Your World Cup Trip',
    sectionSubtitle: 'Book your accommodations, car rentals, and flights to USA, Canada & Mexico for the World Cup 2026',
    travelServicesTitle: 'Travel Services',
    travelServicesDesc: 'Book hotels, rental cars, and flights for your World Cup 2026 adventure. Best rates across USA, Canada & Mexico.',
    bookNow: 'Book Now',
    hostCitiesTitle: 'Host Cities - USA, Canada & Mexico',
    explore: 'Explore',
  },
  ar: {
    sectionTitle: 'خطط رحلة كأس العالم',
    sectionSubtitle: 'احجز إقامتك وتأجير السيارات والرحلات إلى أمريكا وكندا والمكسيك لكأس العالم 2026',
    travelServicesTitle: 'خدمات السفر',
    travelServicesDesc: 'احجز الفنادق وتأجير السيارات والرحلات الجوية لمغامرة كأس العالم 2026. أفضل الأسعار في أمريكا وكندا والمكسيك.',
    bookNow: 'احجز الآن',
    hostCitiesTitle: 'المدن المستضيفة - أمريكا وكندا والمكسيك',
    explore: 'استكشف',
  },
  es: {
    sectionTitle: 'Planifica tu Viaje al Mundial',
    sectionSubtitle: 'Reserva alojamientos, alquiler de coches y vuelos a USA, Canadá y México para el Mundial 2026',
    travelServicesTitle: 'Servicios de Viaje',
    travelServicesDesc: 'Reserva hoteles, coches de alquiler y vuelos para tu aventura del Mundial 2026. Mejores tarifas en USA, Canadá y México.',
    bookNow: 'Reservar',
    hostCitiesTitle: 'Ciudades Sede - USA, Canadá y México',
    explore: 'Explorar',
  },
  fr: {
    sectionTitle: 'Planifiez Votre Voyage Mondial',
    sectionSubtitle: 'Réservez hébergements, locations de voitures et vols vers USA, Canada et Mexique pour la Coupe du Monde 2026',
    travelServicesTitle: 'Services de Voyage',
    travelServicesDesc: 'Réservez hôtels, voitures de location et vols pour votre aventure Coupe du Monde 2026. Meilleurs tarifs aux USA, Canada et Mexique.',
    bookNow: 'Réserver',
    hostCitiesTitle: 'Villes Hôtes - USA, Canada et Mexique',
    explore: 'Explorer',
  },
};

// ========== HOST_CITIES: Localized city names for all 4 languages ==========
const HOST_CITIES = [
  { nameEn: 'New York/NJ', nameAr: 'نيويورك/نيوجيرسي', nameEs: 'Nueva York/NJ', nameFr: 'New York/NJ', stadium: 'MetLife Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Los Angeles', nameAr: 'لوس أنجلوس', nameEs: 'Los Ángeles', nameFr: 'Los Angeles', stadium: 'SoFi Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Miami', nameAr: 'ميامي', nameEs: 'Miami', nameFr: 'Miami', stadium: 'Hard Rock Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Dallas', nameAr: 'دالاس', nameEs: 'Dallas', nameFr: 'Dallas', stadium: 'AT&T Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Atlanta', nameAr: 'أتلانتا', nameEs: 'Atlanta', nameFr: 'Atlanta', stadium: 'Mercedes-Benz Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Seattle', nameAr: 'سياتل', nameEs: 'Seattle', nameFr: 'Seattle', stadium: 'Lumen Field', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'San Francisco', nameAr: 'سان فرانسيسكو', nameEs: 'San Francisco', nameFr: 'San Francisco', stadium: "Levi's Stadium", countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Houston', nameAr: 'هيوستن', nameEs: 'Houston', nameFr: 'Houston', stadium: 'NRG Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Philadelphia', nameAr: 'فيلادلفيا', nameEs: 'Filadelfia', nameFr: 'Philadelphie', stadium: 'Lincoln Financial Field', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Kansas City', nameAr: 'كانساس سيتي', nameEs: 'Kansas City', nameFr: 'Kansas City', stadium: 'Arrowhead Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Boston', nameAr: 'بوسطن', nameEs: 'Boston', nameFr: 'Boston', stadium: 'Gillette Stadium', countryEn: 'USA', countryAr: 'الولايات المتحدة', countryEs: 'EE.UU.', countryFr: 'États-Unis' },
  { nameEn: 'Toronto', nameAr: 'تورونتو', nameEs: 'Toronto', nameFr: 'Toronto', stadium: 'BMO Field', countryEn: 'Canada', countryAr: 'كندا', countryEs: 'Canadá', countryFr: 'Canada' },
  { nameEn: 'Vancouver', nameAr: 'فانكوفر', nameEs: 'Vancouver', nameFr: 'Vancouver', stadium: 'BC Place', countryEn: 'Canada', countryAr: 'كندا', countryEs: 'Canadá', countryFr: 'Canada' },
  { nameEn: 'Mexico City', nameAr: 'مكسيكو سيتي', nameEs: 'Ciudad de México', nameFr: 'Mexico', stadium: 'Estadio Azteca', countryEn: 'Mexico', countryAr: 'المكسيك', countryEs: 'México', countryFr: 'Mexique' },
  { nameEn: 'Guadalajara', nameAr: 'غوادالاخارا', nameEs: 'Guadalajara', nameFr: 'Guadalajara', stadium: 'Estadio Akron', countryEn: 'Mexico', countryAr: 'المكسيك', countryEs: 'México', countryFr: 'Mexique' },
  { nameEn: 'Monterrey', nameAr: 'مونتيري', nameEs: 'Monterrey', nameFr: 'Monterrey', stadium: 'Estadio BBVA', countryEn: 'Mexico', countryAr: 'المكسيك', countryEs: 'México', countryFr: 'Mexique' },
];

const TravelSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Get current language content - falls back to English
  const langKey = language as Language;
  const content = TRAVEL_CONTENT[langKey] || TRAVEL_CONTENT.en;

  // Helper to get localized city name
  const getCityName = (city: typeof HOST_CITIES[0]) => {
    switch (language) {
      case 'ar': return city.nameAr;
      case 'es': return city.nameEs;
      case 'fr': return city.nameFr;
      default: return city.nameEn;
    }
  };

  // Helper to get localized country name
  const getCountryName = (city: typeof HOST_CITIES[0]) => {
    switch (language) {
      case 'ar': return city.countryAr;
      case 'es': return city.countryEs;
      case 'fr': return city.countryFr;
      default: return city.countryEn;
    }
  };

  // ========== UNIFIED BOOKING.COM LINK WITH AFFILIATE ID ==========
  // All Travel Services and Host Cities use this single Booking.com URL
  const bookingUrl = `https://www.booking.com/index.html?aid=304142&label=marker-495595&lang=${langKey}`;

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
            {content.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.sectionSubtitle}
          </p>
        </motion.div>

        {/* Unified Travel Services Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-card border-border card-hover-purple overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icons */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                    <Hotel className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Car className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                    <Plane className="w-8 h-8 text-orange-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-start">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {content.travelServicesTitle}
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-xl">
                    {content.travelServicesDesc}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="bg-primary hover:bg-purple-dark text-primary-foreground font-semibold glow-purple-sm px-8 py-6 text-lg"
                  onClick={() => window.open(bookingUrl, '_blank')}
                >
                  {content.bookNow}
                  <ExternalLink className="w-5 h-5 ms-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
            {HOST_CITIES.map((city, index) => (
              <motion.a
                key={city.nameEn}
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex-shrink-0 w-[140px] md:w-auto bg-card rounded-lg p-3 border border-border text-center hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer snap-start group"
              >
                <h4 className="font-semibold text-foreground text-sm mb-1">{getCityName(city)}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{city.stadium}</p>
                <span className="text-[10px] text-primary font-medium">{getCountryName(city)}</span>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-primary font-semibold flex items-center justify-center gap-1">
                    {content.explore}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
