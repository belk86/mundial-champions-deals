import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'es' | 'fr';

const SECTION_TEXT: Record<Language, { label: string; title: string; subtitle: string; readMore: string; minRead: string; featured: string }> = {
  en: { label: 'World Cup Blog', title: 'City Guides & Articles', subtitle: 'Expert travel guides and insider tips for every World Cup 2026 host city', readMore: 'Read Article', minRead: 'min read', featured: '⭐ Featured' },
  es: { label: 'Blog del Mundial', title: 'Guías de Ciudades y Artículos', subtitle: 'Guías de viaje expertas y consejos para cada ciudad sede del Mundial 2026', readMore: 'Leer Artículo', minRead: 'min de lectura', featured: '⭐ Destacado' },
  fr: { label: 'Blog Mondial', title: 'Guides des Villes & Articles', subtitle: 'Guides de voyage experts et conseils pour chaque ville hôte de la Coupe du Monde 2026', readMore: "Lire l'Article", minRead: 'min de lecture', featured: '⭐ En Vedette' },
};

interface BlogArticle {
  id: string;
  image: string;
  category: Record<Language, string>;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  readTime: number;
  city?: Record<Language, string>;
  featured?: boolean;
}

const ARTICLES: BlogArticle[] = [
  {
    id: 'insight-tax',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    category: { en: 'Editorial', es: 'Editorial', fr: 'Éditorial' },
    title: {
      en: 'The Insight Tax: Why Do the Honest Pay the Price of Their Vision?',
      es: 'El Impuesto de la Visión: ¿Por qué los honestos pagan el precio de su clarividencia?',
      fr: "L'Impôt de la Lucidité : Pourquoi les honnêtes paient-ils le prix de leur vision ?",
    },
    excerpt: {
      en: 'A thought-provoking exploration of how those who see the truth are often the ones who bear its heaviest burden — and what the World Cup teaches us about integrity on the global stage.',
      es: 'Una exploración provocadora de cómo quienes ven la verdad suelen ser quienes cargan con su mayor peso — y lo que el Mundial nos enseña sobre la integridad en el escenario global.',
      fr: "Une exploration stimulante sur la façon dont ceux qui voient la vérité sont souvent ceux qui en portent le plus lourd fardeau — et ce que la Coupe du Monde nous apprend sur l'intégrité sur la scène mondiale.",
    },
    readTime: 10,
    featured: true,
  },
  {
    id: 'new-york-guide',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'New York City: The Ultimate World Cup 2026 Fan Guide',
      es: 'Nueva York: La Guía Definitiva del Fan para el Mundial 2026',
      fr: 'New York : Le Guide Ultime du Fan pour la Coupe du Monde 2026',
    },
    excerpt: {
      en: 'MetLife Stadium in East Rutherford will host key World Cup matches including a semifinal. This comprehensive guide covers the best hotels in Midtown Manhattan and Jersey City, transit options via NJ Transit and PATH trains, iconic fan zones in Times Square, and insider tips on navigating the city during the tournament. Discover the best sports bars, pre-match dining spots, and neighborhoods to stay in for an unforgettable experience.',
      es: 'El MetLife Stadium en East Rutherford albergará partidos clave del Mundial, incluida una semifinal. Esta guía completa cubre los mejores hoteles en Midtown Manhattan y Jersey City, opciones de transporte vía NJ Transit y trenes PATH, zonas de fans icónicas en Times Square, y consejos para moverte por la ciudad durante el torneo.',
      fr: "Le MetLife Stadium d'East Rutherford accueillera des matchs clés dont une demi-finale. Ce guide complet couvre les meilleurs hôtels à Midtown Manhattan et Jersey City, les options de transport via NJ Transit et PATH, les fan zones emblématiques à Times Square, et des conseils pour naviguer dans la ville pendant le tournoi.",
    },
    readTime: 8,
    city: { en: 'New York', es: 'Nueva York', fr: 'New York' },
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
      en: 'The legendary Estadio Azteca — the only stadium to host two World Cup finals — returns for 2026. Explore the best neighborhoods like Condesa, Roma Norte, and Polanco for accommodations. This guide covers street food gems from tacos al pastor to churros, cultural hotspots like the National Museum of Anthropology, and practical tips on altitude adjustment, local transit via Metro, and staying safe while soaking in the incredible atmosphere.',
      es: 'El legendario Estadio Azteca — el único estadio que ha albergado dos finales mundialistas — regresa en 2026. Explora los mejores barrios como Condesa, Roma Norte y Polanco para alojamiento. Esta guía cubre joyas gastronómicas callejeras, puntos culturales como el Museo Nacional de Antropología, y consejos prácticos sobre el ajuste a la altitud y el transporte local.',
      fr: "Le légendaire Estadio Azteca — seul stade à avoir accueilli deux finales de Coupe du Monde — revient en 2026. Explorez les meilleurs quartiers comme Condesa, Roma Norte et Polanco. Ce guide couvre la street food, les sites culturels comme le Musée National d'Anthropologie, et des conseils pratiques sur l'altitude et les transports locaux.",
    },
    readTime: 7,
    city: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
  },
  {
    id: 'toronto-guide',
    image: 'https://images.unsplash.com/photo-1517090504332-84f4f9469bff?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: "Toronto: Canada's World Cup Hub at BMO Field",
      es: 'Toronto: El Centro Mundial de Canadá en el BMO Field',
      fr: 'Toronto : Le Centre Mondial du Canada au BMO Field',
    },
    excerpt: {
      en: "Toronto brings multicultural energy to the 2026 World Cup. BMO Field, nestled near Lake Ontario, will host group stage matches. This guide covers the best areas to stay — from the Entertainment District to Liberty Village — plus transit tips using the TTC subway and streetcars, must-visit attractions like the CN Tower and St. Lawrence Market, and the city's vibrant international food scene that makes every fan feel at home.",
      es: 'Toronto trae energía multicultural al Mundial 2026. El BMO Field, junto al Lago Ontario, albergará partidos de la fase de grupos. Esta guía cubre las mejores zonas para hospedarse — desde el Entertainment District hasta Liberty Village — además de consejos de transporte usando el metro TTC, atracciones imperdibles como la Torre CN, y la vibrante escena gastronómica internacional.',
      fr: "Toronto apporte son énergie multiculturelle à la Coupe du Monde 2026. Le BMO Field, niché près du Lac Ontario, accueillera des matchs de phase de groupes. Ce guide couvre les meilleurs quartiers — du Entertainment District à Liberty Village — les conseils de transport via le métro TTC, les attractions incontournables comme la Tour CN, et la scène gastronomique internationale vibrante.",
    },
    readTime: 6,
    city: { en: 'Toronto', es: 'Toronto', fr: 'Toronto' },
  },
  {
    id: 'los-angeles-guide',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Los Angeles: SoFi Stadium World Cup Experience',
      es: 'Los Ángeles: La Experiencia del Mundial en el Estadio SoFi',
      fr: "Los Angeles : L'Expérience Coupe du Monde au SoFi Stadium",
    },
    excerpt: {
      en: "The state-of-the-art SoFi Stadium in Inglewood will host the World Cup Final. From Santa Monica beaches to Hollywood, LA offers an unmatched backdrop for football fans. This guide covers hotel recommendations near LAX and Downtown, driving and rideshare tips, the best sports bars on the Westside, and how to make the most of your match-day experience in the City of Angels.",
      es: 'El moderno Estadio SoFi en Inglewood albergará la Final del Mundial. Desde las playas de Santa Mónica hasta Hollywood, LA ofrece un telón de fondo inigualable. Esta guía cubre recomendaciones de hoteles cerca de LAX y el centro, consejos de transporte, los mejores bares deportivos del Westside, y cómo aprovechar al máximo tu experiencia en la Ciudad de los Ángeles.',
      fr: "Le SoFi Stadium d'Inglewood, ultramoderne, accueillera la Finale de la Coupe du Monde. De Santa Monica à Hollywood, LA offre un décor inégalé. Ce guide couvre les recommandations d'hôtels, les conseils de transport, les meilleurs bars sportifs du Westside, et comment profiter au maximum de votre expérience dans la Cité des Anges.",
    },
    readTime: 6,
    city: { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles' },
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
      en: "Hard Rock Stadium in Miami Gardens will be a World Cup hotspot. This tropical paradise combines world-class football with South Beach glamour, Little Havana's authentic culture, and Wynwood's art scene. Our guide covers the top-rated hotels in Miami Beach and Brickell, nightlife recommendations, how to beat the summer heat, and the best Cuban cafés to fuel up before the match.",
      es: 'El Hard Rock Stadium en Miami Gardens será un punto candente del Mundial. Este paraíso tropical combina fútbol de clase mundial con el glamour de South Beach, la cultura auténtica de Little Havana y la escena artística de Wynwood. Nuestra guía cubre los mejores hoteles en Miami Beach y Brickell, recomendaciones de vida nocturna, y los mejores cafés cubanos.',
      fr: "Le Hard Rock Stadium de Miami Gardens sera un lieu incontournable. Ce paradis tropical combine football de classe mondiale avec le glamour de South Beach, la culture authentique de Little Havana et la scène artistique de Wynwood. Notre guide couvre les meilleurs hôtels à Miami Beach et Brickell, les recommandations de vie nocturne, et les meilleurs cafés cubains.",
    },
    readTime: 5,
    city: { en: 'Miami', es: 'Miami', fr: 'Miami' },
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

        {/* Featured Article — "The Insight Tax" */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-72 md:h-[420px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-primary-foreground bg-primary shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> {txt.featured}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">{featured.category[lang]}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight group-hover:text-primary transition-colors duration-300">
                    {featured.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{featured.excerpt[lang]}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4" /> {featured.readTime} {txt.minRead}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-semibold gap-1.5 text-sm">
                      {txt.readMore} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* City Guide Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-400 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.1)] h-full flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {article.category[lang]}
                    </span>
                    {article.city && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-background/80 text-foreground backdrop-blur-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {article.city[lang]}
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h4 className="font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300 text-base md:text-lg">
                    {article.title[lang]}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed flex-1 line-clamp-4">{article.excerpt[lang]}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime} {txt.minRead}
                    </span>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      {txt.readMore} <ArrowRight className="w-3.5 h-3.5" />
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
