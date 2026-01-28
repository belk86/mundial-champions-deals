import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ScheduleSection = () => {
  const { t } = useTranslation();

  const matches = [
    {
      stageKey: 'schedule.openingMatch',
      date: 'June 11, 2026',
      time: '18:00 ET',
      teams: 'Mexico vs TBD',
      venue: 'Mexico City',
      stadium: 'Estadio Azteca',
      country: 'Mexico',
    },
    {
      stageKey: 'schedule.groupStage',
      date: 'June 12, 2026',
      time: '20:00 ET',
      teams: 'USA vs TBD',
      venue: 'Los Angeles',
      stadium: 'SoFi Stadium',
      country: 'USA',
    },
    {
      stageKey: 'schedule.groupStage',
      date: 'June 13, 2026',
      time: '19:00 ET',
      teams: 'Canada vs TBD',
      venue: 'Toronto',
      stadium: 'BMO Field',
      country: 'Canada',
    },
    {
      stageKey: 'schedule.quarterFinal',
      date: 'July 4, 2026',
      time: '21:00 ET',
      teams: 'TBD vs TBD',
      venue: 'Dallas',
      stadium: 'AT&T Stadium',
      country: 'USA',
    },
    {
      stageKey: 'schedule.semiFinal',
      date: 'July 14, 2026',
      time: '20:00 ET',
      teams: 'TBD vs TBD',
      venue: 'Miami',
      stadium: 'Hard Rock Stadium',
      country: 'USA',
    },
    {
      stageKey: 'schedule.final',
      date: 'July 19, 2026',
      time: '16:00 ET',
      teams: 'TBD vs TBD',
      venue: 'New York/NJ',
      stadium: 'MetLife Stadium',
      country: 'USA',
    },
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-secondary/20 moroccan-pattern">
      <div className="container px-4">
        {/* Section Header - Translated */}
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

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden card-hover-purple h-full">
                <CardContent className="p-0">
                  {/* Header - Translated */}
                  <div className="bg-primary/20 border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                    <Badge className="bg-primary/30 text-primary border-primary/50">
                      {t(match.stageKey)}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{match.country}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-3">{match.teams}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{match.venue} - {match.stadium}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer - Translated */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          {t('schedule.disclaimer')}
        </motion.p>
      </div>
    </section>
  );
};

export default ScheduleSection;
