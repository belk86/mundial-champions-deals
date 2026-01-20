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
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&q=80',
    source: 'amazon',
    rating: 4.8,
    reviews: 2341,
    affiliateUrl: '#',
  },
  {
    id: '2',
    name: 'Premium Team Jersey - Home Kit',
    nameAr: 'قميص الفريق الفاخر - طقم الملعب',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500&q=80',
    source: 'amazon',
    rating: 4.7,
    reviews: 5672,
    affiliateUrl: '#',
  },
  {
    id: '3',
    name: 'Fan Scarf Collection - Limited Edition',
    nameAr: 'مجموعة شال المشجعين - إصدار محدود',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80',
    source: 'aliexpress',
    rating: 4.5,
    reviews: 1289,
    affiliateUrl: '#',
  },
  {
    id: '4',
    name: 'Championship Trophy Replica',
    nameAr: 'نسخة طبق الأصل من كأس البطولة',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&q=80',
    source: 'aliexpress',
    rating: 4.6,
    reviews: 892,
    affiliateUrl: '#',
  },
  {
    id: '5',
    name: 'Premium Football Boots - Pro Series',
    nameAr: 'أحذية كرة القدم الفاخرة - السلسلة الاحترافية',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80',
    source: 'amazon',
    rating: 4.9,
    reviews: 3456,
    affiliateUrl: '#',
  },
  {
    id: '6',
    name: 'World Cup 2026 Cap Collection',
    nameAr: 'مجموعة قبعات كأس العالم 2026',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    source: 'aliexpress',
    rating: 4.4,
    reviews: 2156,
    affiliateUrl: '#',
  },
  {
    id: '7',
    name: 'Team Training Kit Bundle',
    nameAr: 'حزمة طقم التدريب',
    price: 129.99,
    originalPrice: 169.99,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&q=80',
    source: 'amazon',
    rating: 4.7,
    reviews: 1834,
    affiliateUrl: '#',
  },
  {
    id: '8',
    name: 'Commemorative Pin Set',
    nameAr: 'مجموعة دبابيس تذكارية',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80',
    source: 'aliexpress',
    rating: 4.3,
    reviews: 673,
    affiliateUrl: '#',
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
    <section id="products" className="py-20 bg-championship-charcoal">
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
