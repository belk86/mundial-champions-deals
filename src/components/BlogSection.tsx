import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'es' | 'fr';

const SECTION_TEXT: Record<Language, { label: string; title: string; subtitle: string; readMore: string; minRead: string }> = {
  en: { label: 'World Cup Blog', title: 'City Guides & Articles', subtitle: 'Expert travel guides and insider tips for every World Cup 2026 host city', readMore: 'Read Article', minRead: 'min read' },
  es: { label: 'Blog del Mundial', title: 'Guías de Ciudades y Artículos', subtitle: 'Guías de viaje expertas y consejos para cada ciudad sede del Mundial 2026', readMore: 'Leer Artículo', minRead: 'min de lectura' },
  fr: { label: 'Blog Mondial', title: 'Guides des Villes & Articles', subtitle: 'Guides de voyage experts et conseils pour chaque ville hôte de la Coupe du Monde 2026', readMore: "Lire l'Article", minRead: 'min de lecture' },
};

interface BlogArticle {
  id: string;
  image: string;
  category: Record<Language, string>;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  readTime: number;
  date: string;
  featured?: boolean;
}

const ARTICLES: BlogArticle[] = [
  {
    id: 'new-york-guide',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'New York City: The Ultimate World Cup 2026 Fan Guide',
      es: 'Nueva York: La Guía Definitiva del Fan para el Mundial 2026',
      fr: 'New York : Le Guide Ultime du Fan pour la Coupe du Monde 2026',
    },
    excerpt: {
      en: 'Everything you need to know about attending World Cup matches at MetLife Stadium — from hotels and transit to the best fan zones in Manhattan.',
      es: 'Todo lo que necesitas saber sobre asistir a los partidos del Mundial en el MetLife Stadium — desde hoteles y transporte hasta las mejores zonas de fans en Manhattan.',
      fr: 'Tout ce que vous devez savoir pour assister aux matchs au MetLife Stadium — hôtels, transports et meilleures fan zones à Manhattan.',
    },
    readTime: 8,
    date: '2026-03-01',
    featured: true,
  },
  {
    id: 'mexico-city-guide',
    image: 'https://images.unsplash.com/photo-1518659526286-ce0e72d14797?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Mexico City: Estadio Azteca & Beyond — Your Complete Guide',
      es: 'Ciudad de México: Estadio Azteca y Más — Tu Guía Completa',
      fr: 'Mexico : Estadio Azteca et Au-Delà — Votre Guide Complet',
    },
    excerpt: {
      en: 'Discover the magic of Mexico City during the World Cup. From the legendary Azteca Stadium to vibrant street food and cultural hotspots.',
      es: 'Descubre la magia de la Ciudad de México durante el Mundial. Desde el legendario Estadio Azteca hasta la vibrante comida callejera y puntos culturales.',
      fr: "Découvrez la magie de Mexico pendant la Coupe du Monde. Du légendaire Stade Azteca à la cuisine de rue vibrante et aux sites culturels.",
    },
    readTime: 7,
    date: '2026-02-28',
  },
  {
    id: 'los-angeles-guide',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Los Angeles: SoFi Stadium World Cup Experience',
      es: 'Los Ángeles: La Experiencia del Mundial en el Estadio SoFi',
      fr: 'Los Angeles : L\'Expérience Coupe du Monde au SoFi Stadium',
    },
    excerpt: {
      en: 'LA is ready for the world\'s biggest stage. Here\'s your insider guide to SoFi Stadium, nearby hotels, beaches, and the best match-day spots.',
      es: 'LA está lista para el escenario más grande del mundo. Tu guía interna del Estadio SoFi, hoteles cercanos, playas y los mejores spots del día del partido.',
      fr: "LA est prête pour la plus grande scène du monde. Votre guide du SoFi Stadium, hôtels proches, plages et meilleurs spots de jour de match.",
    },
    readTime: 6,
    date: '2026-02-25',
  },
  {
    id: 'miami-guide',
    image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Miami: Sun, Soccer & Hard Rock Stadium',
      es: 'Miami: Sol, Fútbol y el Estadio Hard Rock',
      fr: 'Miami : Soleil, Football et Hard Rock Stadium',
    },
    excerpt: {
      en: 'Catch World Cup fever in Miami. Your guide to Hard Rock Stadium, South Beach vibes, top-rated hotels, and the best nightlife after the final whistle.',
      es: 'Vive la fiebre del Mundial en Miami. Tu guía del Hard Rock Stadium, vibraciones de South Beach, hoteles top y la mejor vida nocturna.',
      fr: "Vivez la fièvre de la Coupe du Monde à Miami. Guide du Hard Rock Stadium, ambiance South Beach, meilleurs hôtels et vie nocturne.",
    },
    readTime: 5,
    date: '2026-02-20',
  },
  {
    id: 'toronto-guide',
    image: 'https://images.unsplash.com/photo-1517090504332-84f4f9469bff?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Toronto: Canada\'s World Cup Hub at BMO Field',
      es: 'Toronto: El Centro Mundial de Canadá en el BMO Field',
      fr: 'Toronto : Le Centre Mondial du Canada au BMO Field',
    },
    excerpt: {
      en: 'Toronto brings multicultural energy to the World Cup. Explore BMO Field, the CN Tower, and the best neighborhoods for fans visiting Canada.',
      es: 'Toronto trae energía multicultural al Mundial. Explora el BMO Field, la Torre CN y los mejores barrios para fans que visitan Canadá.',
      fr: "Toronto apporte son énergie multiculturelle à la Coupe du Monde. Explorez le BMO Field, la Tour CN et les meilleurs quartiers pour les fans.",
    },
    readTime: 6,
    date: '2026-02-18',
  },
  {
    id: 'dallas-guide',
    image: 'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Dallas: AT&T Stadium — Everything Bigger in Texas',
      es: 'Dallas: Estadio AT&T — Todo Más Grande en Texas',
      fr: 'Dallas : AT&T Stadium — Tout Est Plus Grand au Texas',
    },
    excerpt: {
      en: 'Texas goes all-in for the World Cup. Discover AT&T Stadium\'s incredible scale, Dallas BBQ, cowboy culture, and where to stay for the matches.',
      es: 'Texas va con todo al Mundial. Descubre la escala increíble del AT&T Stadium, el BBQ de Dallas, la cultura vaquera y dónde alojarte.',
      fr: "Le Texas mise tout pour la Coupe du Monde. Découvrez l'AT&T Stadium, le BBQ de Dallas, la culture cowboy et où séjourner.",
    },
    readTime: 5,
    date: '2026-02-15',
  },
];

const BlogSection = () => {
  const { language } = useLanguage();
  const lang = (language as Language) || 'en';
  const txt = SECTION_TEXT[lang];

  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <section id="blog" className="py-16 md:py-24 bg-background relative">
      <div className="container px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{txt.label}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{txt.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{txt.subtitle}</p>
        </motion.div>

        {/* Featured Article */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(220,100%,60%,0.12)]">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #4D9FFF 0%, #9B4DFF 100%)' }}>
                      ⭐ Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{featured.category[lang]}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {featured.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{featured.excerpt[lang]}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} {txt.minRead}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> New York</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-semibold gap-1">
                      {txt.readMore} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(220,100%,60%,0.1)] h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/90 text-primary-foreground">
                    {article.category[lang]}
                  </span>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors text-sm md:text-base">
                    {article.title[lang]}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">{article.excerpt[lang]}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" /> {article.readTime} {txt.minRead}
                    </span>
                    <span className="text-[11px] text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {txt.readMore} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
