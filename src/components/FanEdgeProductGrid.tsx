import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FanEdgeProductCard from './FanEdgeProductCard';
import { products } from '@/data/products';

const FanEdgeProductGrid = () => {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-16 md:py-24 moroccan-pattern">
      <div className="container px-4">
        {/* Section Header - Translated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              {t('products.sectionLabel')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('products.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Product Grid - 15 Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) => (
            <FanEdgeProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FanEdgeProductGrid;
