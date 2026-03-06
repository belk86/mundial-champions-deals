import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, MapPin, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'es' | 'fr';

const SECTION_TEXT: Record<Language, { label: string; title: string; subtitle: string; readMore: string; minRead: string; featured: string; close: string }> = {
  en: { label: 'World Cup Blog', title: 'City Guides & Articles', subtitle: 'Expert travel guides and insider tips for every World Cup 2026 host city', readMore: 'Read Article', minRead: 'min read', featured: '⭐ Featured', close: 'Close' },
  es: { label: 'Blog del Mundial', title: 'Guías de Ciudades y Artículos', subtitle: 'Guías de viaje expertas y consejos para cada ciudad sede del Mundial 2026', readMore: 'Leer Artículo', minRead: 'min de lectura', featured: '⭐ Destacado', close: 'Cerrar' },
  fr: { label: 'Blog Mondial', title: 'Guides des Villes & Articles', subtitle: 'Guides de voyage experts et conseils pour chaque ville hôte de la Coupe du Monde 2026', readMore: "Lire l'Article", minRead: 'min de lecture', featured: '⭐ En Vedette', close: 'Fermer' },
};

interface BlogArticle {
  id: string;
  image: string;
  category: Record<Language, string>;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  body: Record<Language, string>;
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
    body: {
      en: "Throughout history, the ones who dared to speak the truth have paid the steepest price. From whistleblowers in corporate boardrooms to referees calling fouls that change the outcome of a match, honesty carries a cost — an \"insight tax\" that the courageous pay willingly.\n\nIn the world of football, we see this play out on the grandest stage. The 2026 FIFA World Cup, spanning three nations, will test not just athletic ability but the integrity of every player, coach, and official. When a player chooses not to dive, when a referee stands by a difficult call despite the roaring crowd, they pay this tax.\n\nBut why does honesty come at such a premium? Because truth disrupts the comfortable narratives we build. It forces accountability. It demands change. And change, as we know, is the most expensive currency in any system.\n\nAs fans travel across the USA, Canada, and Mexico for the biggest World Cup ever, they'll witness moments of raw truth on the pitch — moments where integrity wins, even when the scoreboard says otherwise. That's the beauty of the beautiful game: it reminds us that some things are worth more than winning.\n\nThe insight tax isn't a punishment — it's a badge of honor. Those who pay it light the way for everyone else.",
      es: "A lo largo de la historia, quienes se atrevieron a decir la verdad han pagado el precio más alto. Desde denunciantes en salas corporativas hasta árbitros que señalan faltas que cambian el resultado de un partido, la honestidad tiene un costo — un \"impuesto de la visión\" que los valientes pagan voluntariamente.\n\nEn el mundo del fútbol, vemos esto en el escenario más grande. El Mundial de la FIFA 2026, que abarca tres naciones, pondrá a prueba no solo la habilidad atlética sino la integridad de cada jugador, entrenador y oficial. Cuando un jugador elige no tirarse, cuando un árbitro mantiene una decisión difícil a pesar de la multitud rugiente, están pagando este impuesto.\n\n¿Pero por qué la honestidad tiene un precio tan alto? Porque la verdad interrumpe las narrativas cómodas que construimos. Obliga a la rendición de cuentas. Exige cambio. Y el cambio, como sabemos, es la moneda más cara en cualquier sistema.\n\nMientras los aficionados viajan por EE.UU., Canadá y México para el Mundial más grande de la historia, serán testigos de momentos de verdad pura en la cancha — momentos donde la integridad gana, incluso cuando el marcador dice lo contrario. Esa es la belleza del deporte rey: nos recuerda que algunas cosas valen más que ganar.\n\nEl impuesto de la visión no es un castigo — es una insignia de honor. Quienes lo pagan iluminan el camino para todos los demás.",
      fr: "Tout au long de l'histoire, ceux qui ont osé dire la vérité en ont payé le prix le plus élevé. Des lanceurs d'alerte dans les conseils d'administration aux arbitres qui sifflent des fautes changeant le résultat d'un match, l'honnêteté a un coût — un \"impôt de la lucidité\" que les courageux paient volontairement.\n\nDans le monde du football, nous voyons cela sur la plus grande scène. La Coupe du Monde FIFA 2026, s'étendant sur trois nations, mettra à l'épreuve non seulement les capacités athlétiques mais l'intégrité de chaque joueur, entraîneur et officiel. Quand un joueur choisit de ne pas plonger, quand un arbitre maintient une décision difficile malgré la foule rugissante, ils paient cet impôt.\n\nMais pourquoi l'honnêteté a-t-elle un prix si élevé ? Parce que la vérité perturbe les récits confortables que nous construisons. Elle force la responsabilité. Elle exige le changement. Et le changement, comme nous le savons, est la monnaie la plus chère dans tout système.\n\nAlors que les fans voyagent à travers les USA, le Canada et le Mexique pour la plus grande Coupe du Monde jamais organisée, ils assisteront à des moments de vérité pure sur le terrain — des moments où l'intégrité gagne, même quand le tableau d'affichage dit le contraire. C'est la beauté du beau jeu : il nous rappelle que certaines choses valent plus que gagner.\n\nL'impôt de la lucidité n'est pas une punition — c'est un insigne d'honneur. Ceux qui le paient éclairent le chemin pour tous les autres.",
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
      en: 'MetLife Stadium in East Rutherford will host key World Cup matches including a semifinal. Discover the best hotels, transit options, and fan zones.',
      es: 'El MetLife Stadium en East Rutherford albergará partidos clave del Mundial, incluida una semifinal. Descubre los mejores hoteles, opciones de transporte y zonas de fans.',
      fr: "Le MetLife Stadium d'East Rutherford accueillera des matchs clés dont une demi-finale. Découvrez les meilleurs hôtels, transports et fan zones.",
    },
    body: {
      en: "MetLife Stadium in East Rutherford, New Jersey will host key World Cup 2026 matches including a semifinal. Located just across the Hudson River from Manhattan, it offers one of the most exciting urban backdrops for any World Cup venue.\n\nWhere to Stay\nMidtown Manhattan provides the best balance of access and atmosphere. Hotels near Penn Station offer direct NJ Transit service to MetLife. Jersey City is a budget-friendly alternative with PATH train access to Manhattan and shuttle services on match days.\n\nGetting Around\nNJ Transit trains run from Penn Station directly to MetLife Stadium on event days. The NYC subway system connects all five boroughs, and rideshare services are widely available. Consider getting a 7-day MetroCard for unlimited subway and bus rides.\n\nFan Zones & Atmosphere\nTimes Square will host the largest outdoor fan zone in the city. Expect giant screens, live music, and international food vendors. The Rockefeller Center area and Hudson Yards are also expected to have major activations.\n\nDining & Nightlife\nNew York's food scene needs no introduction. Head to Arthur Avenue in the Bronx for authentic Italian, Jackson Heights in Queens for incredible South American cuisine, or the West Village for upscale dining. Sports bars like Legends and The Ainsworth will be packed on match days.\n\nInsider Tips\nBook hotels at least 6 months in advance — World Cup demand will push prices significantly. Arrive at the stadium at least 2 hours early for security screening. Download the MTA app for real-time transit updates.",
      es: "El MetLife Stadium en East Rutherford, New Jersey albergará partidos clave del Mundial 2026, incluida una semifinal. Ubicado justo al otro lado del río Hudson desde Manhattan, ofrece uno de los telones de fondo urbanos más emocionantes.\n\nDónde Alojarse\nMidtown Manhattan ofrece el mejor equilibrio entre acceso y ambiente. Los hoteles cerca de Penn Station tienen servicio directo de NJ Transit al MetLife. Jersey City es una alternativa económica con acceso al tren PATH.\n\nCómo Moverse\nLos trenes NJ Transit van desde Penn Station directamente al MetLife Stadium en días de eventos. El sistema de metro de NYC conecta los cinco distritos. Considera una MetroCard de 7 días para viajes ilimitados.\n\nZonas de Fans\nTimes Square albergará la zona de fans al aire libre más grande de la ciudad. Espera pantallas gigantes, música en vivo y vendedores de comida internacional.\n\nGastronomía y Vida Nocturna\nDirígete a Arthur Avenue en el Bronx para comida italiana auténtica, Jackson Heights en Queens para increíble cocina sudamericana, o el West Village para cenas elegantes.\n\nConsejos\nReserva hoteles con al menos 6 meses de anticipación. Llega al estadio al menos 2 horas antes. Descarga la app MTA para actualizaciones de transporte en tiempo real.",
      fr: "Le MetLife Stadium d'East Rutherford, New Jersey accueillera des matchs clés de la Coupe du Monde 2026, dont une demi-finale. Situé juste de l'autre côté de l'Hudson depuis Manhattan, il offre l'un des décors urbains les plus excitants.\n\nOù Séjourner\nMidtown Manhattan offre le meilleur équilibre entre accès et ambiance. Les hôtels près de Penn Station ont un service direct NJ Transit vers le MetLife. Jersey City est une alternative économique avec accès au train PATH.\n\nSe Déplacer\nLes trains NJ Transit circulent depuis Penn Station directement au MetLife Stadium les jours d'événements. Le métro de NYC connecte les cinq arrondissements. Pensez à la MetroCard 7 jours.\n\nFan Zones\nTimes Square accueillera la plus grande fan zone en plein air de la ville. Attendez-vous à des écrans géants, de la musique live et des vendeurs de cuisine internationale.\n\nRestauration\nDirection Arthur Avenue dans le Bronx pour l'italien authentique, Jackson Heights dans le Queens pour la cuisine sud-américaine, ou le West Village pour la haute gastronomie.\n\nConseils\nRéservez les hôtels au moins 6 mois à l'avance. Arrivez au stade au moins 2 heures avant. Téléchargez l'app MTA pour les mises à jour en temps réel.",
    },
    readTime: 8,
    city: { en: 'New York', es: 'Nueva York', fr: 'New York' },
  },
  {
    id: 'mexico-city-guide',
    image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&q=80',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: 'Mexico City: Estadio Azteca & Beyond — Your Complete Guide',
      es: 'Ciudad de México: Estadio Azteca y Más — Tu Guía Completa',
      fr: 'Mexico : Estadio Azteca et Au-Delà — Votre Guide Complet',
    },
    excerpt: {
      en: 'The legendary Estadio Azteca — the only stadium to host two World Cup finals — returns for 2026. Explore neighborhoods, street food, and culture.',
      es: 'El legendario Estadio Azteca — el único estadio que ha albergado dos finales mundialistas — regresa en 2026. Explora barrios, comida callejera y cultura.',
      fr: "Le légendaire Estadio Azteca — seul stade à avoir accueilli deux finales — revient en 2026. Explorez quartiers, street food et culture.",
    },
    body: {
      en: "The legendary Estadio Azteca — the only stadium in history to host two FIFA World Cup finals (1970 and 1986) — returns to the global stage for 2026. Mexico City offers an unparalleled cultural experience alongside world-class football.\n\nWhere to Stay\nCondesa and Roma Norte are the most popular neighborhoods for visitors, offering tree-lined streets, boutique hotels, and excellent restaurants. Polanco is the upscale option with luxury hotels near Chapultepec Park. For budget travelers, the Historic Center has great value options near the Zócalo.\n\nGetting Around\nMexico City's Metro system is one of the cheapest in the world and covers most tourist areas. The Metrobús (BRT) connects major corridors. Uber and DiDi are widely used and affordable. On match days, expect special transit services to Estadio Azteca.\n\nFood & Culture\nMexico City is a UNESCO Creative City of Design and a food lover's paradise. Don't miss tacos al pastor from street stalls in the Centro Histórico, churros from El Moro, or a fine dining experience at Pujol (one of the world's best restaurants). Visit the National Museum of Anthropology, Frida Kahlo's Casa Azul, and the ancient pyramids of Teotihuacán.\n\nPractical Tips\nMexico City sits at 2,240 meters (7,350 feet) elevation. Give yourself a day to acclimate before attending matches. Stay hydrated and avoid intense physical activity on your first day. The weather in June-July is warm with afternoon rain showers — bring a light rain jacket.\n\nSafety\nStick to well-known neighborhoods and use registered transportation. Tourist areas are generally very safe. Keep valuables secure in crowded areas like the Metro.",
      es: "El legendario Estadio Azteca — el único estadio en la historia que ha albergado dos finales del Mundial FIFA (1970 y 1986) — regresa al escenario global en 2026. La Ciudad de México ofrece una experiencia cultural sin igual junto con fútbol de clase mundial.\n\nDónde Alojarse\nCondesa y Roma Norte son los barrios más populares, con calles arboladas, hoteles boutique y excelentes restaurantes. Polanco es la opción de lujo con hoteles cerca del Parque de Chapultepec. Para viajeros con presupuesto, el Centro Histórico tiene opciones de gran valor cerca del Zócalo.\n\nCómo Moverse\nEl Metro de la Ciudad de México es uno de los más baratos del mundo. El Metrobús conecta corredores principales. Uber y DiDi son ampliamente utilizados y asequibles. En días de partido, habrá servicios de transporte especiales al Estadio Azteca.\n\nComida y Cultura\nLa Ciudad de México es Ciudad Creativa del Diseño de la UNESCO y un paraíso gastronómico. No te pierdas los tacos al pastor del Centro Histórico, los churros de El Moro, o una experiencia en Pujol. Visita el Museo Nacional de Antropología, la Casa Azul de Frida Kahlo y las pirámides de Teotihuacán.\n\nConsejos Prácticos\nLa ciudad está a 2,240 metros de altitud. Date un día para aclimatarte. Mantente hidratado. El clima en junio-julio es cálido con lluvias por la tarde — lleva una chaqueta ligera.\n\nSeguridad\nQuédate en barrios conocidos y usa transporte registrado. Las zonas turísticas son generalmente muy seguras.",
      fr: "Le légendaire Estadio Azteca — le seul stade de l'histoire à avoir accueilli deux finales de Coupe du Monde FIFA (1970 et 1986) — revient sur la scène mondiale en 2026. Mexico offre une expérience culturelle inégalée aux côtés d'un football de classe mondiale.\n\nOù Séjourner\nCondesa et Roma Norte sont les quartiers les plus populaires, avec des rues arborées, des hôtels boutique et d'excellents restaurants. Polanco est l'option haut de gamme avec des hôtels de luxe près du parc de Chapultepec. Pour les petits budgets, le Centre Historique offre de bonnes options près du Zócalo.\n\nSe Déplacer\nLe métro de Mexico est l'un des moins chers au monde. Le Metrobús connecte les corridors principaux. Uber et DiDi sont largement utilisés et abordables. Les jours de match, des services spéciaux seront mis en place vers l'Estadio Azteca.\n\nCuisine et Culture\nMexico est une Ville Créative de Design UNESCO et un paradis gastronomique. Ne manquez pas les tacos al pastor du Centro Histórico, les churros d'El Moro, ou Pujol. Visitez le Musée National d'Anthropologie, la Casa Azul de Frida Kahlo et les pyramides de Teotihuacán.\n\nConseils Pratiques\nMexico se situe à 2 240 mètres d'altitude. Accordez-vous un jour d'acclimatation. Restez hydraté. Le temps en juin-juillet est chaud avec des averses l'après-midi.\n\nSécurité\nRestez dans les quartiers connus et utilisez les transports enregistrés. Les zones touristiques sont généralement très sûres.",
    },
    readTime: 7,
    city: { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico' },
  },
  {
    id: 'toronto-guide',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=1000&auto=format&fit=crop',
    category: { en: 'City Guide', es: 'Guía de Ciudad', fr: 'Guide Ville' },
    title: {
      en: "Toronto: Canada's World Cup Hub at BMO Field",
      es: 'Toronto: El Centro Mundial de Canadá en el BMO Field',
      fr: 'Toronto : Le Centre Mondial du Canada au BMO Field',
    },
    excerpt: {
      en: "Toronto brings multicultural energy to the 2026 World Cup. BMO Field near Lake Ontario hosts group stage matches. Discover where to stay, eat, and explore.",
      es: 'Toronto trae energía multicultural al Mundial 2026. El BMO Field junto al Lago Ontario alberga partidos de fase de grupos. Descubre dónde alojarte, comer y explorar.',
      fr: "Toronto apporte son énergie multiculturelle à la Coupe du Monde 2026. Le BMO Field près du Lac Ontario accueille des matchs de poules. Découvrez où séjourner, manger et explorer.",
    },
    body: {
      en: "Toronto brings its incredible multicultural energy to the 2026 FIFA World Cup. BMO Field, nestled near the shores of Lake Ontario in Exhibition Place, will host group stage matches in one of North America's most vibrant cities.\n\nWhere to Stay\nThe Entertainment District puts you close to restaurants, bars, and nightlife. Liberty Village is walkable to BMO Field and has a trendy, creative vibe. The Harbourfront area offers waterfront hotels with stunning lake views. For budget options, look at hostels and Airbnbs along the Bloor-Danforth subway line.\n\nGetting Around\nThe TTC (Toronto Transit Commission) operates subways, streetcars, and buses across the city. The 509 and 511 streetcar lines run directly to Exhibition Place / BMO Field. Presto cards work across all TTC services. Cycling is popular — Toronto has an extensive bike lane network and Bike Share stations.\n\nFood & Attractions\nToronto is one of the most diverse cities on Earth. Kensington Market offers eclectic food stalls and vintage shops. St. Lawrence Market is a must-visit for local produce and peameal bacon sandwiches. For global cuisine, explore the restaurants along Dundas West, Ossington, or Danforth Avenue (Greektown). Don't miss the CN Tower, Ripley's Aquarium, and the Royal Ontario Museum.\n\nMatch Day Tips\nBMO Field has a capacity of about 30,000 (expandable for the World Cup). Arrive early to soak in the atmosphere at nearby Ontario Place and the waterfront boardwalk. Pack layers — Toronto summers are warm but lakefront breezes can be cool in the evening.\n\nNightlife\nKing West is Toronto's premier nightlife strip. The Ossington Strip offers more indie bars and craft cocktail lounges. After a match, head to a rooftop patio for skyline views.",
      es: "Toronto aporta su increíble energía multicultural al Mundial de la FIFA 2026. El BMO Field, ubicado cerca del Lago Ontario en Exhibition Place, albergará partidos de la fase de grupos en una de las ciudades más vibrantes de Norteamérica.\n\nDónde Alojarse\nEl Entertainment District te pone cerca de restaurantes, bares y vida nocturna. Liberty Village está a distancia caminable del BMO Field con ambiente creativo. El Harbourfront ofrece hoteles frente al lago. Para opciones económicas, busca alojamientos a lo largo de la línea de metro Bloor-Danforth.\n\nCómo Moverse\nEl TTC opera metros, tranvías y autobuses. Las líneas de tranvía 509 y 511 van directamente a Exhibition Place / BMO Field. Las tarjetas Presto funcionan en todos los servicios TTC. El ciclismo es popular con estaciones Bike Share.\n\nComida y Atracciones\nToronto es una de las ciudades más diversas del mundo. Kensington Market ofrece puestos de comida eclécticos. St. Lawrence Market es imperdible. Explora los restaurantes de Dundas West, Ossington o Danforth Avenue. No te pierdas la Torre CN, el Acuario de Ripley y el Museo Real de Ontario.\n\nConsejos para el Día del Partido\nEl BMO Field tiene capacidad para unos 30,000 espectadores. Llega temprano para disfrutar del ambiente. Lleva capas — los veranos son cálidos pero la brisa del lago puede ser fresca por la noche.\n\nVida Nocturna\nKing West es la principal zona nocturna de Toronto. La franja de Ossington ofrece bares indie y cócteles artesanales.",
      fr: "Toronto apporte son incroyable énergie multiculturelle à la Coupe du Monde FIFA 2026. Le BMO Field, niché près des rives du Lac Ontario à Exhibition Place, accueillera des matchs de phase de groupes dans l'une des villes les plus vibrantes d'Amérique du Nord.\n\nOù Séjourner\nLe Entertainment District vous place près des restaurants, bars et de la vie nocturne. Liberty Village est à distance de marche du BMO Field avec une ambiance créative. Le Harbourfront offre des hôtels avec vue sur le lac. Pour les petits budgets, cherchez le long de la ligne de métro Bloor-Danforth.\n\nSe Déplacer\nLe TTC opère métros, tramways et bus. Les lignes de tramway 509 et 511 vont directement à Exhibition Place / BMO Field. Les cartes Presto fonctionnent sur tous les services TTC. Le vélo est populaire avec des stations Bike Share.\n\nCuisine et Attractions\nToronto est l'une des villes les plus diversifiées au monde. Kensington Market offre des stands de nourriture éclectiques. St. Lawrence Market est incontournable. Explorez les restaurants de Dundas West, Ossington ou Danforth Avenue. Ne manquez pas la Tour CN, l'Aquarium de Ripley et le Musée Royal de l'Ontario.\n\nConseils Jour de Match\nLe BMO Field a une capacité d'environ 30 000 spectateurs. Arrivez tôt pour profiter de l'ambiance. Emportez des couches — les étés sont chauds mais la brise du lac peut être fraîche le soir.\n\nVie Nocturne\nKing West est la principale zone de vie nocturne de Toronto. Ossington Strip offre des bars indépendants et des cocktails artisanaux.",
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
      en: "SoFi Stadium in Inglewood will host the World Cup Final. From Santa Monica to Hollywood, LA offers an unmatched backdrop for fans.",
      es: 'El Estadio SoFi en Inglewood albergará la Final del Mundial. Desde Santa Mónica hasta Hollywood, LA ofrece un telón de fondo inigualable.',
      fr: "Le SoFi Stadium d'Inglewood accueillera la Finale. De Santa Monica à Hollywood, LA offre un décor inégalé.",
    },
    body: {
      en: "The state-of-the-art SoFi Stadium in Inglewood will host the 2026 FIFA World Cup Final — the crown jewel of the tournament. Los Angeles, the entertainment capital of the world, offers an unmatched experience for football fans.\n\nWhere to Stay\nDowntown LA has seen a hotel boom with stylish options near LA Live. Santa Monica offers beachfront hotels for those wanting sun and surf between matches. For proximity to SoFi Stadium, Inglewood and nearby El Segundo have more affordable options near LAX.\n\nGetting Around\nLA is a car city, but public transit is improving. The Metro C (Green) Line connects to a shuttle service for SoFi Stadium. Rideshare (Uber/Lyft) is ubiquitous. If you rent a car, expect traffic — plan extra time for match days. The new LAX People Mover will connect the airport to Metro.\n\nBeaches & Attractions\nSanta Monica Pier, Venice Beach boardwalk, and Malibu offer classic California beach experiences. Hollywood Boulevard has the Walk of Fame and TCL Chinese Theatre. The Getty Center and Griffith Observatory provide stunning views and world-class art. Universal Studios and Disneyland are day-trip options.\n\nFood Scene\nLA's food scene is legendary. Grand Central Market downtown has everything from tacos to ramen. Koreatown has the best Korean BBQ outside Seoul. The taco trucks of East LA are unmissable. For fine dining, try Bestia or Republique.\n\nMatch Day at SoFi\nSoFi Stadium is a technological marvel with a 70,000+ capacity. The Hollywood Park entertainment complex surrounding it has restaurants and bars for pre-game festivities. Arrive early — the atmosphere outside will be electric.",
      es: "El moderno Estadio SoFi en Inglewood albergará la Final del Mundial FIFA 2026 — la joya de la corona del torneo. Los Ángeles, capital mundial del entretenimiento, ofrece una experiencia inigualable para los fans del fútbol.\n\nDónde Alojarse\nEl centro de LA tiene opciones elegantes cerca de LA Live. Santa Mónica ofrece hoteles frente al mar. Para proximidad al SoFi Stadium, Inglewood y El Segundo tienen opciones más asequibles cerca de LAX.\n\nCómo Moverse\nLA es una ciudad de autos, pero el transporte público mejora. La línea Metro C conecta con servicio de shuttle al SoFi Stadium. Uber/Lyft es ubicuo. Si alquilas auto, espera tráfico.\n\nPlayas y Atracciones\nSanta Monica Pier, Venice Beach y Malibú ofrecen experiencias clásicas de playa. Hollywood Boulevard tiene el Paseo de la Fama. El Getty Center y el Observatorio Griffith ofrecen vistas impresionantes. Universal Studios y Disneyland son opciones de excursión.\n\nGastronomía\nGrand Central Market tiene de todo. Koreatown tiene el mejor BBQ coreano fuera de Seúl. Los camiones de tacos de East LA son imperdibles. Para alta cocina, prueba Bestia o Republique.\n\nDía de Partido en SoFi\nEl SoFi Stadium es una maravilla tecnológica con capacidad de más de 70,000. El complejo Hollywood Park tiene restaurantes y bares para festividades pre-partido.",
      fr: "Le SoFi Stadium ultramoderne d'Inglewood accueillera la Finale de la Coupe du Monde FIFA 2026 — le joyau du tournoi. Los Angeles, capitale mondiale du divertissement, offre une expérience inégalée pour les fans de football.\n\nOù Séjourner\nLe centre-ville de LA a des options élégantes près de LA Live. Santa Monica offre des hôtels en bord de mer. Pour la proximité du SoFi Stadium, Inglewood et El Segundo ont des options plus abordables près de LAX.\n\nSe Déplacer\nLA est une ville de voitures, mais les transports publics s'améliorent. La ligne Metro C connecte à un service de navette vers le SoFi Stadium. Uber/Lyft est omniprésent.\n\nPlages et Attractions\nSanta Monica Pier, Venice Beach et Malibu offrent des expériences de plage classiques. Hollywood Boulevard a le Walk of Fame. Le Getty Center et l'Observatoire Griffith offrent des vues superbes.\n\nCuisine\nGrand Central Market a de tout. Koreatown a le meilleur BBQ coréen hors de Séoul. Les food trucks de East LA sont incontournables. Pour la haute gastronomie, essayez Bestia ou Republique.\n\nJour de Match au SoFi\nLe SoFi Stadium est une merveille technologique de 70 000+ places. Le complexe Hollywood Park autour propose restaurants et bars pour les festivités d'avant-match.",
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
      en: "Hard Rock Stadium in Miami Gardens will be a World Cup hotspot. South Beach glamour, Little Havana culture, and Wynwood art await.",
      es: 'El Hard Rock Stadium en Miami Gardens será un punto candente del Mundial. Glamour de South Beach, cultura de Little Havana y arte de Wynwood.',
      fr: "Le Hard Rock Stadium de Miami Gardens sera incontournable. Glamour de South Beach, culture de Little Havana et art de Wynwood.",
    },
    body: {
      en: "Hard Rock Stadium in Miami Gardens will be one of the most exciting venues of the 2026 FIFA World Cup. Miami's tropical energy, Latin culture, and stunning beaches create the perfect backdrop for the beautiful game.\n\nWhere to Stay\nMiami Beach offers iconic oceanfront hotels along Collins Avenue and Ocean Drive. For a more local vibe, Brickell is Miami's urban core with sleek high-rise hotels and walkable restaurants. Coral Gables provides a quieter, tree-lined alternative with Mediterranean-style architecture.\n\nGetting Around\nMiami's Metrorail and Metromover serve Downtown and Brickell. Uber and Lyft are the most common way to get around. On match days, expect shuttle services from key locations to Hard Rock Stadium. Renting a car is useful for exploring beyond the city center.\n\nBeaches & Culture\nSouth Beach is legendary — Art Deco architecture, crystal-clear water, and vibrant nightlife. Little Havana on Calle Ocho is a must-visit for Cuban coffee, cigars, and domino games at Máximo Gómez Park. Wynwood Walls is an outdoor street art museum that's become a global destination.\n\nFood\nMiami's food scene reflects its Latin roots. Try a Cuban sandwich at Versailles, stone crab at Joe's Stone Crab, ceviche at Juvia, or explore the food halls at Time Out Market. The Brickell area has excellent upscale dining options.\n\nBeat the Heat\nMiami in June-July is hot and humid. Stay hydrated, wear sunscreen, and plan outdoor activities for early morning or evening. Many venues have excellent air conditioning — take advantage of indoor attractions during peak heat.\n\nNightlife\nMiami's nightlife is world-famous. From megaclubs in South Beach to rooftop bars in Brickell, the party never stops. Expect special World Cup-themed events across the city.",
      es: "El Hard Rock Stadium en Miami Gardens será una de las sedes más emocionantes del Mundial FIFA 2026. La energía tropical de Miami, su cultura latina y sus playas impresionantes crean el telón de fondo perfecto.\n\nDónde Alojarse\nMiami Beach ofrece hoteles icónicos frente al mar en Collins Avenue y Ocean Drive. Brickell es el centro urbano con hoteles elegantes. Coral Gables ofrece una alternativa más tranquila con arquitectura mediterránea.\n\nCómo Moverse\nEl Metrorail y Metromover sirven Downtown y Brickell. Uber y Lyft son los más comunes. En días de partido, habrá servicios de shuttle al Hard Rock Stadium.\n\nPlayas y Cultura\nSouth Beach es legendaria — arquitectura Art Deco y vida nocturna vibrante. Little Havana en la Calle Ocho es imperdible para café cubano y dominó en el Parque Máximo Gómez. Wynwood Walls es un museo de arte callejero al aire libre.\n\nComida\nPrueba un sándwich cubano en Versailles, cangrejo de piedra en Joe's Stone Crab, o ceviche en Juvia. El área de Brickell tiene excelentes opciones de alta cocina.\n\nCalor\nMiami en junio-julio es caluroso y húmedo. Mantente hidratado, usa protector solar y planifica actividades al aire libre temprano o al atardecer.\n\nVida Nocturna\nDesde megaclubes en South Beach hasta terrazas en Brickell, la fiesta nunca para. Espera eventos temáticos del Mundial por toda la ciudad.",
      fr: "Le Hard Rock Stadium de Miami Gardens sera l'un des sites les plus passionnants de la Coupe du Monde FIFA 2026. L'énergie tropicale de Miami, sa culture latine et ses plages magnifiques créent le décor parfait.\n\nOù Séjourner\nMiami Beach offre des hôtels iconiques en bord de mer sur Collins Avenue et Ocean Drive. Brickell est le cœur urbain avec des hôtels élégants. Coral Gables offre une alternative plus calme avec une architecture méditerranéenne.\n\nSe Déplacer\nLe Metrorail et Metromover desservent Downtown et Brickell. Uber et Lyft sont les plus courants. Les jours de match, des navettes seront mises en place vers le Hard Rock Stadium.\n\nPlages et Culture\nSouth Beach est légendaire — architecture Art Déco et vie nocturne vibrante. Little Havana sur la Calle Ocho est incontournable pour le café cubain. Wynwood Walls est un musée d'art de rue en plein air.\n\nCuisine\nEssayez un sandwich cubain chez Versailles, du crabe chez Joe's Stone Crab, ou du ceviche chez Juvia. Brickell a d'excellentes options de haute gastronomie.\n\nChaleur\nMiami en juin-juillet est chaud et humide. Restez hydraté, portez de la crème solaire et planifiez les activités en plein air tôt le matin ou en soirée.\n\nVie Nocturne\nDes mégaclubs de South Beach aux terrasses de Brickell, la fête ne s'arrête jamais.",
    },
    readTime: 5,
    city: { en: 'Miami', es: 'Miami', fr: 'Miami' },
  },
];

/* ───── Article Modal ───── */
const ArticleModal = ({ article, lang, txt, onClose }: { article: BlogArticle; lang: Language; txt: typeof SECTION_TEXT['en']; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header Image */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={article.image} alt={article.title[lang]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">{article.category[lang]}</span>
          {article.city && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 text-foreground backdrop-blur-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {article.city[lang]}
            </span>
          )}
        </div>
      </div>

      {/* Modal Body */}
      <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">{article.title[lang]}</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Clock className="w-4 h-4" /> {article.readTime} {txt.minRead}
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {article.body[lang]}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ───── Main Section ───── */
const BlogSection = () => {
  const { language } = useLanguage();
  const lang = (language as Language) || 'en';
  const txt = SECTION_TEXT[lang];
  const [openArticle, setOpenArticle] = useState<BlogArticle | null>(null);

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
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Card
              className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
              onClick={() => setOpenArticle(featured)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-72 md:h-[420px] overflow-hidden">
                  <img src={featured.image} alt={featured.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-primary-foreground bg-primary shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> {txt.featured}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">{featured.category[lang]}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight group-hover:text-primary transition-colors duration-300">{featured.title[lang]}</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{featured.excerpt[lang]}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="w-4 h-4" /> {featured.readTime} {txt.minRead}</span>
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
            <motion.div key={article.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card
                className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-400 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.1)] h-full flex flex-col"
                onClick={() => setOpenArticle(article)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={article.image} alt={article.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary/90 text-primary-foreground backdrop-blur-sm">{article.category[lang]}</span>
                    {article.city && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-background/80 text-foreground backdrop-blur-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {article.city[lang]}
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h4 className="font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300 text-base md:text-lg">{article.title[lang]}</h4>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed flex-1 line-clamp-4">{article.excerpt[lang]}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {article.readTime} {txt.minRead}</span>
                    <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">{txt.readMore} <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {openArticle && <ArticleModal article={openArticle} lang={lang} txt={txt} onClose={() => setOpenArticle(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
