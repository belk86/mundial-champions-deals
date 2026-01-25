import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NewsCard {
  id: string;
  title: string;
  titleAr: string;
  titleEs: string;
  description: string;
  descriptionAr: string;
  descriptionEs: string;
  icon: typeof Calendar;
  gradient: string;
}

const newsCards: NewsCard[] = [
  {
    id: 'matches',
    title: 'Match Schedules',
    titleAr: 'جدول المباريات',
    titleEs: 'Calendario de Partidos',
    description: 'Stay updated with all World Cup 2026 match times and venues across USA, Mexico & Canada',
    descriptionAr: 'ابق على اطلاع بجميع مواعيد مباريات كأس العالم 2026 وأماكنها',
    descriptionEs: 'Mantente actualizado con todos los horarios y sedes del Mundial 2026',
    icon: Calendar,
    gradient: 'from-gold/20 to-gold-dark/10',
  },
  {
    id: 'stadiums',
    title: 'Stadium Updates',
    titleAr: 'تحديثات الملاعب',
    titleEs: 'Actualizaciones de Estadios',
    description: 'Explore the 16 iconic stadiums hosting the biggest football tournament in history',
    descriptionAr: 'استكشف الـ 16 ملعبًا الأيقونية التي تستضيف أكبر بطولة كرة قدم',
    descriptionEs: 'Explora los 16 estadios icónicos que albergarán el torneo más grande',
    icon: MapPin,
    gradient: 'from-purple-500/20 to-purple-700/10',
  },
  {
    id: 'fanGuide',
    title: 'Fan Guide',
    titleAr: 'دليل المشجعين',
    titleEs: 'Guía del Aficionado',
    description: 'Essential tips for traveling fans: visas, tickets, accommodations & local experiences',
    descriptionAr: 'نصائح أساسية للمشجعين المسافرين: التأشيرات والتذاكر والإقامة',
    descriptionEs: 'Consejos esenciales para aficionados viajeros: visas, entradas, alojamiento',
    icon: Users,
    gradient: 'from-green-500/20 to-green-700/10',
  },
];

const NewsHub = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const getTitle = (card: NewsCard) => {
    if (lang === 'ar') return card.titleAr;
    if (lang === 'es') return card.titleEs;
    return card.title;
  };

  const getDescription = (card: NewsCard) => {
    if (lang === 'ar') return card.descriptionAr;
    if (lang === 'es') return card.descriptionEs;
    return card.description;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-foreground">World Cup </span>
            <span className="text-gradient-gold">News Hub</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Your gateway to everything World Cup 2026 – schedules, stadiums, and fan essentials
          </p>
        </motion.div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative overflow-hidden rounded-xl p-6
                  bg-gradient-to-br ${card.gradient}
                  border border-border/50 backdrop-blur-sm
                  hover:border-gold/40 transition-all duration-300
                  cursor-pointer group card-hover
                `}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-card/80 border border-border flex items-center justify-center mb-4 group-hover:border-gold/50 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {getTitle(card)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {getDescription(card)}
                </p>

                {/* Coming Soon Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-medium text-gold">Coming Soon</span>
                </div>

                {/* Hover Glow Effect */}
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
