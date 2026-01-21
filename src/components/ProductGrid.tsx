import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Filter, TrendingUp, ArrowUpDown, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts, useCategories, type ProductCategory, type SortOption } from '@/hooks/useProducts';

type SourceFilter = 'all' | 'amazon' | 'aliexpress';

const ProductGrid = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('trust');

  const { data: products, isLoading: productsLoading } = useProducts(sourceFilter, categoryFilter, sortBy);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const sourceFilters: { key: SourceFilter; label: string }[] = [
    { key: 'all', label: t('products.filter.all') },
    { key: 'amazon', label: t('products.filter.amazon') },
    { key: 'aliexpress', label: t('products.filter.aliexpress') },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'trust', label: t('products.sort.trust') },
    { key: 'rating', label: t('products.sort.rating') },
    { key: 'price_low', label: t('products.sort.priceLow') },
    { key: 'price_high', label: t('products.sort.priceHigh') },
  ];

  const getCategoryName = (cat: typeof categories extends (infer T)[] ? T : never) => {
    switch (language) {
      case 'ar':
        return cat.name_ar;
      case 'es':
        return cat.name_es;
      default:
        return cat.name;
    }
  };

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

        {/* Category Filters */}
        {!categoriesLoading && categories && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                {t('products.categories')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('all')}
                className={
                  categoryFilter === 'all'
                    ? 'bg-gold hover:bg-gold-light text-primary-foreground'
                    : 'border-border text-foreground/70 hover:text-foreground hover:border-gold/50'
                }
              >
                {t('products.filter.all')}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={categoryFilter === cat.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat.key as ProductCategory)}
                  className={
                    categoryFilter === cat.key
                      ? 'bg-gold hover:bg-gold-light text-primary-foreground'
                      : 'border-border text-foreground/70 hover:text-foreground hover:border-gold/50'
                  }
                >
                  {getCategoryName(cat)}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Source and Sort Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          {/* Source Filters */}
          <div className="flex flex-wrap gap-3">
            {sourceFilters.map((f) => (
              <Button
                key={f.key}
                variant={sourceFilter === f.key ? 'default' : 'outline'}
                onClick={() => setSourceFilter(f.key)}
                className={
                  sourceFilter === f.key
                    ? 'bg-gold hover:bg-gold-light text-primary-foreground'
                    : 'border-border text-foreground/70 hover:text-foreground hover:border-gold/50'
                }
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {sortOptions.map((opt) => (
                <Button
                  key={opt.key}
                  variant={sortBy === opt.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy(opt.key)}
                  className={
                    sortBy === opt.key
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'text-foreground/60 hover:text-foreground'
                  }
                >
                  {opt.key === 'trust' && <TrendingUp className="w-3 h-3 mr-1" />}
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {productsLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        )}

        {/* Product Grid */}
        {!productsLoading && products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!productsLoading && (!products || products.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t('products.noProducts')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
