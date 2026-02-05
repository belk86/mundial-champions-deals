import { motion } from 'framer-motion';
import { Plane, Hotel, Car, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TravelSection = () => {
  const travelOptions = [
    {
      icon: Hotel,
      title: 'Match Day Stays',
      description: 'Book premium hotels near World Cup stadiums in Morocco. Best rates guaranteed.',
      buttonText: 'Find Hotels',
      link: 'https://www.booking.com',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      iconColor: 'text-blue-400',
    },
    {
      icon: Car,
      title: 'Car Rentals',
      description: 'Explore Morocco in style. Rent a car and drive between match venues.',
      buttonText: 'Rent a Car',
      link: 'https://www.booking.com/cars',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Plane,
      title: 'Flights to Morocco',
      description: 'Find the best flight deals to Casablanca, Marrakech, and Tangier.',
      buttonText: 'Search Flights',
      link: 'https://www.skyscanner.com',
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      iconColor: 'text-orange-400',
    },
  ];

  const cities = [
    { name: 'Casablanca', stadium: 'Grand Stade de Casablanca' },
    { name: 'Rabat', stadium: 'Complexe Sportif Prince Moulay Abdellah' },
    { name: 'Tangier', stadium: 'Ibn Batouta Stadium' },
    { name: 'Marrakech', stadium: 'Grand Stade de Marrakech' },
    { name: 'Agadir', stadium: 'Stade Adrar' },
    { name: 'Fes', stadium: 'Stade de Fès' },
  ];

  return (
    <section id="travel" className="py-16 md:py-24 moroccan-pattern relative">
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-muted/10 to-transparent" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Travel Guide
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plan Your World Cup Trip
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your match day stays, car rentals, and flights to Morocco for the World Cup 2026
          </p>
        </motion.div>

        {/* Travel Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {travelOptions.map((option, index) => (
            <motion.div
              key={option.title}
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
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{option.description}</p>
                  <Button
                    className="w-full bg-primary hover:bg-purple-dark text-primary-foreground font-semibold"
                    onClick={() => window.open(option.link, '_blank')}
                  >
                    {option.buttonText}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Host Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/50 rounded-2xl p-6 md:p-8 border border-border"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Host Cities in Morocco
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-lg p-4 border border-border text-center hover:border-primary/50 transition-colors"
              >
                <h4 className="font-semibold text-foreground mb-1">{city.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{city.stadium}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelSection;
