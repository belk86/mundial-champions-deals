import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  source: 'amazon' | 'aliexpress';
  rating: number;
  reviews: number;
  affiliateUrl: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const displayName = language === 'ar' ? product.nameAr : product.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover"
    >
      {/* Source Badge */}
      <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-10`}>
        <Badge
          variant="secondary"
          className={`${
            product.source === 'amazon'
              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          } border font-medium`}
        >
          {product.source === 'amazon' ? 'Amazon US' : 'AliExpress'}
        </Badge>
      </div>

      {/* Discount Badge */}
      {discount && (
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} z-10`}>
          <Badge className="bg-gold text-primary-foreground font-bold">
            -{discount}%
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? 'text-gold fill-gold'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors">
          {displayName}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button
          className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-primary-foreground font-semibold group/btn transition-all duration-300"
          onClick={() => window.open(product.affiliateUrl, '_blank')}
        >
          {t('products.getDeal')}
          <ExternalLink className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'} group-hover/btn:translate-x-1 transition-transform`} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
