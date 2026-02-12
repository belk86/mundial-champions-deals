import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface NewsCard {
  id: string;
  title: string;
  titleEs: string;
  titleFr: string;
  description: string;
  descriptionEs: string;
  descriptionFr: string;
  icon: typeof Calendar;
  gradient: string;
}

const newsCards: NewsCard[] = [
  {
    id: 'matches',
    title: 'Match Schedules',
    titleEs: 'Calendario de Partidos',
    titleFr: 'Calendrier des Matchs',
    description: 'Stay updated with all World Cup 2026 match times and venues across USA, Mexico & Canada',
    descriptionEs: 'Mantente actualizado con todos los horarios y sedes del Mundial 2026',
    descriptionFr: 'Restez informé des horaires et lieux de la Coupe du Monde 2026',
    icon: Calendar,
    gradient: 'from-gold/20 to-gold-dark/10',
  },
  {
    id: 'stadiums',
    title: 'Stadium Updates',
    titleEs: 'Actualizaciones de Estadios',
    titleFr: 'Actualités des Stades',
    description: 'Explore the 16 iconic stadiums hosting the biggest football tournament in history',
    descriptionEs: 'Explora los 16 estadios icónicos que albergarán el torneo más grande',
    descriptionFr: 'Explorez les 16 stades iconiques accueillant le plus grand tournoi de l\'histoire',
    icon: MapPin,
    gradient: 'from-purple-500/20 to-purple-700/10',
  },
  {
    id: 'fanGuide',
    title: 'Fan Guide',
    titleEs: 'Guía del Aficionado',
    titleFr: 'Guide du Fan',
    description: 'Essential tips for traveling fans: visas, tickets, accommodations & local experiences',
    descriptionEs: 'Consejos esenciales para aficionados viajeros: visas, entradas, alojamiento',
    descriptionFr: 'Conseils essentiels pour les fans voyageurs : visas, billets, hébergement',
    icon: Users,
    gradient: 'from-green-500/20 to-green-700/10',
  },
];

const NewsHub = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [showPopup, setShowPopup] = useState(false);

  const getTitle = (card: NewsCard) => {
    if (lang === 'es') return card.titleEs;
    if (lang === 'fr') return card.titleFr;
    return card.title;
  };

  const getDescription = (card: NewsCard) => {
    if (lang === 'es') return card.descriptionEs;
    if (lang === 'fr') return card.descriptionFr;
    return card.description;
  };

  const handleCardClick = () => {
    setShowPopup(true);
  };

  return (
    <section className="py-16 bg-background">
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}
              className="bg-card border border-gold/30 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Coming Soon!</h3>
              <p className="text-muted-foreground mb-6">Stay Tuned for World Cup 2026 Updates!</p>
              <Button onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-primary-foreground">
                Got it!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-foreground">World Cup </span>
            <span className="text-gradient-gold">News Hub</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Your gateway to everything World Cup 2026 – schedules, stadiums, and fan essentials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }} onClick={handleCardClick}
                className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${card.gradient} border border-border/50 backdrop-blur-sm hover:border-gold/40 transition-all duration-300 cursor-pointer group card-hover`}>
                <div className="w-12 h-12 rounded-lg bg-card/80 border border-border flex items-center justify-center mb-4 group-hover:border-gold/50 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">{getTitle(card)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{getDescription(card)}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-medium text-gold">Coming Soon</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsHub;
