import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Language = 'en' | 'es' | 'fr';

const SCHEDULE_CONTENT: Record<Language, {
  title: string;
  subtitle: string;
  viewMatch: string;
  stadium: string;
}> = {
  en: {
    title: 'Key Match Venues',
    subtitle: 'Experience the World Cup 2026 in iconic stadiums across North America.',
    viewMatch: 'View Details',
    stadium: 'Stadium'
  },
  es: {
    title: 'Sedes Principales',
    subtitle: 'Vive el Mundial 2026 en estadios icónicos de Norteamérica.',
    viewMatch: 'Ver Detalles',
    stadium: 'Estadio'
  },
  fr: {
    title: 'Lieux des Matchs',
    subtitle: 'Vivez la Coupe du Monde 2026 dans des stades emblématiques d\'Amérique du Nord.',
    viewMatch: 'Voir Détails',
    stadium: 'Stade'
  }
};

const MATCH_VENUES = [
  {
    id: 1,
    city: { en: 'New York/NJ', es: 'Nueva York/NJ', fr: 'New York/NJ' },
    stadium: 'MetLife Stadium',
    date: 'July 19, 2026',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    city: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
    stadium: 'Estadio Azteca',
    date: 'June 11, 2026',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    city: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' },
    stadium: 'SoFi Stadium',
    date: 'June 12, 2026',
    image: 'https://images.unsplash.com/photo-1619551731652-32b7086082ec?auto=format&fit=crop&q=80&w=800',
  }
];

const ScheduleSection = () => {
  const { language } = useLanguage();
  const langKey = (language as Language) || 'en';
  const content = SCHEDULE_CONTENT[langKey];

  return (
    <section id="schedule" className="py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            {content.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATCH_VENUES.map((venue) => (
            <motion.div
              key={venue.id}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl"
            >
              <div className="h-48 relative">
                <img src={venue.image} alt={venue.stadium} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-bold">
                  2026
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-bold">{venue.city[langKey]}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{venue.stadium}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {venue.date}
                  </div>
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
