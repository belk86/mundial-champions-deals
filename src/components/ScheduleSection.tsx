import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ScheduleSection = () => {
  const matches = [
    {
      stage: 'Group Stage',
      date: 'June 11, 2026',
      time: '18:00 GMT',
      teams: 'Morocco vs TBD',
      venue: 'Casablanca',
      stadium: 'Grand Stade de Casablanca',
    },
    {
      stage: 'Group Stage',
      date: 'June 15, 2026',
      time: '21:00 GMT',
      teams: 'Spain vs TBD',
      venue: 'Rabat',
      stadium: 'Complexe Sportif Prince Moulay Abdellah',
    },
    {
      stage: 'Round of 16',
      date: 'June 28, 2026',
      time: '20:00 GMT',
      teams: 'TBD vs TBD',
      venue: 'Tangier',
      stadium: 'Ibn Batouta Stadium',
    },
    {
      stage: 'Quarter Final',
      date: 'July 4, 2026',
      time: '20:00 GMT',
      teams: 'TBD vs TBD',
      venue: 'Marrakech',
      stadium: 'Grand Stade de Marrakech',
    },
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-secondary/20 moroccan-pattern">
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
              Match Schedule
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            World Cup 2026 in Morocco
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key matches happening in Morocco. Full schedule to be announced closer to the tournament.
          </p>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden card-hover-purple">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-primary/20 border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                    <Badge className="bg-primary/30 text-primary border-primary/50">
                      {match.stage}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {match.date}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-foreground mb-3">{match.teams}</h3>
                    <div className="space-y-2 text-sm">
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

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          * Schedule is preliminary. Official FIFA World Cup 2026 schedule to be confirmed.
        </motion.p>
      </div>
    </section>
  );
};

export default ScheduleSection;
