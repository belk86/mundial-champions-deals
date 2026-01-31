import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, ExternalLink, X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FlightsDestinationsUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightsDestinationsUI = ({ isOpen, onClose }: FlightsDestinationsUIProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Destinations organized by country
  const destinations = {
    usa: [
      { city: 'New York', code: 'JFK', stadium: 'MetLife Stadium' },
      { city: 'Los Angeles', code: 'LAX', stadium: 'SoFi Stadium' },
      { city: 'Miami', code: 'MIA', stadium: 'Hard Rock Stadium' },
      { city: 'Dallas', code: 'DFW', stadium: 'AT&T Stadium' },
      { city: 'Atlanta', code: 'ATL', stadium: 'Mercedes-Benz Stadium' },
      { city: 'Seattle', code: 'SEA', stadium: 'Lumen Field' },
      { city: 'San Francisco', code: 'SFO', stadium: "Levi's Stadium" },
      { city: 'Houston', code: 'IAH', stadium: 'NRG Stadium' },
      { city: 'Philadelphia', code: 'PHL', stadium: 'Lincoln Financial Field' },
      { city: 'Kansas City', code: 'MCI', stadium: 'Arrowhead Stadium' },
      { city: 'Boston', code: 'BOS', stadium: 'Gillette Stadium' },
    ],
    canada: [
      { city: 'Toronto', code: 'YYZ', stadium: 'BMO Field' },
      { city: 'Vancouver', code: 'YVR', stadium: 'BC Place' },
    ],
    mexico: [
      { city: 'Mexico City', code: 'MEX', stadium: 'Estadio Azteca' },
      { city: 'Guadalajara', code: 'GDL', stadium: 'Estadio Akron' },
      { city: 'Monterrey', code: 'MTY', stadium: 'Estadio BBVA' },
    ],
  };

  // Translated labels
  const getLabels = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'رحلات ووجهات 2026',
          subtitle: 'اختر وجهتك لكأس العالم',
          usa: 'الولايات المتحدة',
          canada: 'كندا',
          mexico: 'المكسيك',
          searchFlights: 'ابحث عن رحلات إلى',
          stadium: 'الملعب',
          close: 'إغلاق',
          selectCity: 'اختر مدينة للبحث عن رحلات',
        };
      case 'es':
        return {
          title: 'Vuelos y Destinos 2026',
          subtitle: 'Elige tu destino del Mundial',
          usa: 'Estados Unidos',
          canada: 'Canadá',
          mexico: 'México',
          searchFlights: 'Buscar vuelos a',
          stadium: 'Estadio',
          close: 'Cerrar',
          selectCity: 'Selecciona una ciudad para buscar vuelos',
        };
      case 'fr':
        return {
          title: 'Vols et Destinations 2026',
          subtitle: 'Choisissez votre destination Mondial',
          usa: 'États-Unis',
          canada: 'Canada',
          mexico: 'Mexique',
          searchFlights: 'Rechercher des vols vers',
          stadium: 'Stade',
          close: 'Fermer',
          selectCity: 'Sélectionnez une ville pour rechercher des vols',
        };
      default:
        return {
          title: 'Flights & Destinations 2026',
          subtitle: 'Choose your World Cup destination',
          usa: 'United States',
          canada: 'Canada',
          mexico: 'Mexico',
          searchFlights: 'Search flights to',
          stadium: 'Stadium',
          close: 'Close',
          selectCity: 'Select a city to search for flights',
        };
    }
  };

  const labels = getLabels();

  // Generate flight search URL (CJ Affiliate ready)
  const getFlightSearchUrl = (cityCode: string, cityName: string) => {
    // Using Booking.com flights with city search
    const baseUrl = 'https://www.booking.com/flights/index.html';
    const params = new URLSearchParams({
      label: 'gen173nr-1FEghmZWF0dXJlcyiCAjoohpYBSOC_AYgBAZgBCbgBB8gBDNgBAegBAfgBAogCAagCA7gC_8vXvAbAAgHSAiRlODg3ZTMwNC1iZGE2LTQ0MzEtYmYyMC04ZGYwZDUzYjYwZTLYAgXgAgE',
      ss: cityName,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleCityClick = (city: string, code: string) => {
    setSelectedCity(city);
    // Open flight search in new tab
    window.open(getFlightSearchUrl(code, city), '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{labels.title}</h2>
                  <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            {/* USA */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="text-lg font-semibold text-foreground">{labels.usa}</h3>
                <span className="text-xs text-muted-foreground">({destinations.usa.length} cities)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {destinations.usa.map((dest) => (
                  <motion.button
                    key={dest.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCityClick(dest.city, dest.code)}
                    className="bg-secondary/50 hover:bg-secondary border border-border hover:border-orange-500/50 rounded-lg p-3 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{dest.city}</p>
                        <p className="text-xs text-muted-foreground">{dest.code}</p>
                      </div>
                      <Plane className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {dest.stadium}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Canada */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇨🇦</span>
                <h3 className="text-lg font-semibold text-foreground">{labels.canada}</h3>
                <span className="text-xs text-muted-foreground">({destinations.canada.length} cities)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {destinations.canada.map((dest) => (
                  <motion.button
                    key={dest.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCityClick(dest.city, dest.code)}
                    className="bg-secondary/50 hover:bg-secondary border border-border hover:border-orange-500/50 rounded-lg p-3 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{dest.city}</p>
                        <p className="text-xs text-muted-foreground">{dest.code}</p>
                      </div>
                      <Plane className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {dest.stadium}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mexico */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇲🇽</span>
                <h3 className="text-lg font-semibold text-foreground">{labels.mexico}</h3>
                <span className="text-xs text-muted-foreground">({destinations.mexico.length} cities)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {destinations.mexico.map((dest) => (
                  <motion.button
                    key={dest.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCityClick(dest.city, dest.code)}
                    className="bg-secondary/50 hover:bg-secondary border border-border hover:border-orange-500/50 rounded-lg p-3 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{dest.city}</p>
                        <p className="text-xs text-muted-foreground">{dest.code}</p>
                      </div>
                      <Plane className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {dest.stadium}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Info Footer */}
            <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <Search className="w-3 h-3 inline mr-1" />
                {labels.selectCity}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlightsDestinationsUI;
