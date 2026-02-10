import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Language = 'en' | 'es' | 'fr';

const MATCHES = [
  {
    round: { en: 'Opening Match', es: 'Partido Inaugural', fr: "Match d'Ouverture" },
    date: '11 June 2026',
    city: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
    stadium: 'Estadio Azteca',
    teams: { en: 'TBD vs TBD', es: 'POR vs POR', fr: 'À déf. vs À déf.' },
  },
  {
    round: { en: 'Group Stage', es: 'Fase de Grupos', fr: 'Phase de Groupes' },
    date: '12 June – 4 July 2026',
    city: { en: 'Multiple Cities', es: 'Varias Ciudades', fr: 'Plusieurs Villes' },
    stadium: '—',
    teams: { en: '48 Teams', es: '48 Equipos', fr: '48 Équipes' },
  },
  {
    round: { en: 'Round of 32', es: 'Dieciseisavos', fr: '32èmes de Finale' },
    date: '5 – 8 July 2026',
    city: { en: 'Multiple Cities', es: 'Varias Ciudades', fr: 'Plusieurs Villes' },
    stadium: '—',
    teams: { en: '32 Teams', es: '32 Equipos', fr: '32 Équipes' },
  },
  {
    round: { en: 'Quarter Final', es: 'Cuartos de Final', fr: 'Quart de Finale' },
    date: '11 – 12 July 2026',
    city: { en: 'Multiple Cities', es: 'Varias Ciudades', fr: 'Plusieurs Villes' },
    stadium: '—',
    teams: { en: '8 Teams', es: '8 Equipos', fr: '8 Équipes' },
  },
  {
    round: { en: 'Semi Final', es: 'Semifinal', fr: 'Demi-Finale' },
    date: '15 July 2026',
    city: { en: 'Dallas', es: 'Dallas', fr: 'Dallas' },
    stadium: 'AT&T Stadium',
    teams: { en: 'TBD vs TBD', es: 'POR vs POR', fr: 'À déf. vs À déf.' },
  },
  {
    round: { en: 'Final', es: 'Final', fr: 'Finale' },
    date: '19 July 2026',
    city: { en: 'New York/NJ', es: 'Nueva York/NJ', fr: 'New York/NJ' },
    stadium: 'MetLife Stadium',
    teams: { en: 'TBD vs TBD', es: 'POR vs POR', fr: 'À déf. vs À déf.' },
  },
];

const TABLE_HEADERS: Record<Language, { round: string; date: string; city: string; stadium: string; teams: string }> = {
  en: { round: 'Round', date: 'Date', city: 'City', stadium: 'Stadium', teams: 'Match' },
  es: { round: 'Ronda', date: 'Fecha', city: 'Ciudad', stadium: 'Estadio', teams: 'Partido' },
  fr: { round: 'Tour', date: 'Date', city: 'Ville', stadium: 'Stade', teams: 'Match' },
};

const ScheduleSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const langKey = (language as Language) || 'en';
  const headers = TABLE_HEADERS[langKey];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              {t('schedule.sectionLabel')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('schedule.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('schedule.subtitle')}
          </p>
        </motion.div>

        {/* Text-Only Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-secondary/50">
                <TableHead className="text-primary font-bold">{headers.round}</TableHead>
                <TableHead className="text-primary font-bold">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{headers.date}</span>
                </TableHead>
                <TableHead className="text-primary font-bold hidden md:table-cell">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{headers.city}</span>
                </TableHead>
                <TableHead className="text-primary font-bold hidden lg:table-cell">{headers.stadium}</TableHead>
                <TableHead className="text-primary font-bold">{headers.teams}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MATCHES.map((match, i) => (
                <TableRow key={i} className="border-border hover:bg-secondary/30 transition-colors">
                  <TableCell className="font-semibold text-foreground">{match.round[langKey]}</TableCell>
                  <TableCell className="text-muted-foreground">{match.date}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{match.city[langKey]}</TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">{match.stadium}</TableCell>
                  <TableCell className="text-foreground font-medium">{match.teams[langKey]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          {t('schedule.disclaimer')}
        </p>
      </div>
    </section>
  );
};

export default ScheduleSection;
