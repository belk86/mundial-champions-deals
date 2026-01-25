import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpDown, Loader2 } from 'lucide-react';
import ProductSlider from './ProductSlider';
import CategorySidebar from './CategorySidebar';
import TrendingSidebar from './TrendingSidebar';
import { Button } from '@/components/ui/button';
import { useProducts, type ProductCategory, type SortOption } from '@/hooks/useProducts';

type SourceFilter = 'all' | 'amazon' | 'aliexpress';

const ProductGrid = () => {
  const { t } = useTranslation();
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('trust');

  const { data: products, isLoading: productsLoading } = useProducts(sourceFilter, categoryFilter, sortBy);

  const sourceFilters: { key: SourceFilter; label: string }[] = [
    { key: 'all', label: t('products.filter.all') },
    { key: 'amazon', label: '🛒 Amazon US' },
    { key: 'aliexpress', label: '🌏 AliExpress' },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'trust', label: t('products.sort.trust') },
    { key: 'rating', label: t('products.sort.rating') },
    { key: 'price_low', label: t('products.sort.priceLow') },
    { key: 'price_high', label: t('products.sort.priceHigh') },
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

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-6">
          {/* Left Sidebar - Categories */}
          <div className="hidden lg:block">
            <CategorySidebar 
              selectedCategory={categoryFilter} 
              onCategoryChange={setCategoryFilter} 
            />
          </div>

          {/* Center - Main Content */}
          <div>
            {/* Source and Sort Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-between gap-4 mb-6"
            >
              {/* Source Filters */}
              <div className="flex flex-wrap gap-2">
                {sourceFilters.map((f) => (
                  <Button
                    key={f.key}
                    variant={sourceFilter === f.key ? 'default' : 'outline'}
                    size="sm"
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
                <div className="flex gap-1">
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

            {/* Mobile Category Filter */}
            <div className="lg:hidden mb-6">
              <CategorySidebar 
                selectedCategory={categoryFilter} 
                onCategoryChange={setCategoryFilter} 
              />
            </div>

            {/* Loading State */}
            {productsLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gold" />
              </div>
            )}

            {/* Horizontal Product Slider */}
            {!productsLoading && products && (
              <ProductSlider products={products} />
            )}

            {/* Empty State */}
            {!productsLoading && (!products || products.length === 0) && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">{t('products.noProducts')}</p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Trending & Trust */}
          <div className="hidden lg:block">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
