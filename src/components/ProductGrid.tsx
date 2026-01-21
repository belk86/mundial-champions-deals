import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';

// Mock product data - In production, this would come from the database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'World Cup 2026 Official Match Ball',
    nameAr: 'كرة المباراة الرسمية لكأس العالم 2026',
    nameEs: 'Balón Oficial del Mundial 2026',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&q=80',
    source: 'amazon',
    rating: 4.8,
    reviews: 2341,
    affiliateUrl: '#',
    trustBadge: 'verified',
    trendingReason: 'Viral on TikTok - 2.3M views this week',
    trendingReasonAr: 'فيروسي على تيك توك - 2.3 مليون مشاهدة هذا الأسبوع',
    trendingReasonEs: 'Viral en TikTok - 2.3M vistas esta semana',
  },
  {
    id: '2',
    name: 'Premium Team Jersey - Home Kit',
    nameAr: 'قميص الفريق الفاخر - طقم الملعب',
    nameEs: 'Camiseta Premium del Equipo - Local',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500&q=80',
    source: 'amazon',
    rating: 4.7,
    reviews: 5672,
    affiliateUrl: '#',
    trustBadge: 'hot',
    trendingReason: 'Top seller on Amazon - Fans favorite',
    trendingReasonAr: 'الأكثر مبيعاً على أمازون - مفضل المشجعين',
    trendingReasonEs: 'Más vendido en Amazon - Favorito de fans',
  },
  {
    id: '3',
    name: 'Fan Scarf Collection - Limited Edition',
    nameAr: 'مجموعة شال المشجعين - إصدار محدود',
    nameEs: 'Colección de Bufandas - Edición Limitada',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80',
    source: 'aliexpress',
    rating: 4.5,
    reviews: 1289,
    affiliateUrl: '#',
    trustBadge: 'limited',
    trendingReason: 'Only 50 left - High demand from Morocco',
    trendingReasonAr: 'متبقي 50 فقط - طلب عالي من المغرب',
    trendingReasonEs: 'Solo quedan 50 - Alta demanda de Marruecos',
  },
  {
    id: '4',
    name: 'Championship Trophy Replica',
    nameAr: 'نسخة طبق الأصل من كأس البطولة',
    nameEs: 'Réplica del Trofeo del Campeonato',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&q=80',
    source: 'aliexpress',
    rating: 4.6,
    reviews: 892,
    affiliateUrl: '#',
    trustBadge: 'trending',
    trendingReason: 'Featured on ESPN - Perfect gift item',
    trendingReasonAr: 'مميز على ESPN - هدية مثالية',
    trendingReasonEs: 'Destacado en ESPN - Regalo perfecto',
  },
  {
    id: '5',
    name: 'Premium Football Boots - Pro Series',
    nameAr: 'أحذية كرة القدم الفاخرة - السلسلة الاحترافية',
    nameEs: 'Botas de Fútbol Premium - Serie Pro',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80',
    source: 'amazon',
    rating: 4.9,
    reviews: 3456,
    affiliateUrl: '#',
    trustBadge: 'verified',
    trendingReason: 'Same model worn by pro players',
    trendingReasonAr: 'نفس الموديل الذي يرتديه المحترفون',
    trendingReasonEs: 'Mismo modelo usado por profesionales',
  },
  {
    id: '6',
    name: 'World Cup 2026 Cap Collection',
    nameAr: 'مجموعة قبعات كأس العالم 2026',
    nameEs: 'Colección de Gorras Mundial 2026',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    source: 'aliexpress',
    rating: 4.4,
    reviews: 2156,
    affiliateUrl: '#',
    trustBadge: 'hot',
    trendingReason: 'TikTok influencers choice - Summer essential',
    trendingReasonAr: 'اختيار مؤثري تيك توك - ضروري للصيف',
    trendingReasonEs: 'Elección de influencers TikTok - Esencial de verano',
  },
  {
    id: '7',
    name: 'Team Training Kit Bundle',
    nameAr: 'حزمة طقم التدريب',
    nameEs: 'Pack de Equipamiento de Entrenamiento',
    price: 129.99,
    originalPrice: 169.99,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&q=80',
    source: 'amazon',
    rating: 4.7,
    reviews: 1834,
    affiliateUrl: '#',
    trustBadge: 'trending',
    trendingReason: 'Best value bundle - Amazon bestseller',
    trendingReasonAr: 'أفضل حزمة قيمة - الأكثر مبيعاً على أمازون',
    trendingReasonEs: 'Mejor valor - Bestseller de Amazon',
  },
  {
    id: '8',
    name: 'Commemorative Pin Set',
    nameAr: 'مجموعة دبابيس تذكارية',
    nameEs: 'Set de Pins Conmemorativos',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80',
    source: 'aliexpress',
    rating: 4.3,
    reviews: 673,
    affiliateUrl: '#',
    trustBadge: 'limited',
    trendingReason: 'Collector edition - Perfect for trading',
    trendingReasonAr: 'إصدار جامعي - مثالي للتبادل',
    trendingReasonEs: 'Edición coleccionista - Perfecto para intercambio',
  },
];

type FilterType = 'all' | 'amazon' | 'aliexpress';

const ProductGrid = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredProducts = mockProducts.filter((product) => {
    if (filter === 'all') return true;
    return product.source === filter;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('products.filter.all') },
    { key: 'amazon', label: t('products.filter.amazon') },
    { key: 'aliexpress', label: t('products.filter.aliexpress') },
  ];

  return (
    <section id="products" className="py-20 bg-wc-navy-light">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">{t('products.title').split(' ')[0]} </span>
            <span className="text-gradient-gold">{t('products.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? 'default' : 'outline'}
              onClick={() => setFilter(f.key)}
              className={
                filter === f.key
                  ? 'bg-gold hover:bg-gold-light text-primary-foreground'
                  : 'border-border text-foreground/70 hover:text-foreground hover:border-gold/50'
              }
            >
              {f.label}
            </Button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
