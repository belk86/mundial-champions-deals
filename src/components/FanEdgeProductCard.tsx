import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

const FanEdgeProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleBuyClick = () => {
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}`;
    window.open(amazonSearchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover-amazon"
    >
      {/* Tag Badge - Translated */}
      <div className="absolute top-3 left-3 z-10">
        <Badge
          className={`${
            product.tag === 'viral'
              ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          } border font-semibold text-xs`}
        >
          {product.tag === 'viral' ? (
            <>
              <Sparkles className="w-3 h-3 mr-1" />
              {t('products.viralTikTok')}
            </>
          ) : (
            <>
              <TrendingUp className="w-3 h-3 mr-1" />
              {t('products.topSeller')}
            </>
          )}
        </Badge>
      </div>

      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-amazon text-black font-bold">
            -{discount}%
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Orange glow overlay on hover */}
        <div className="absolute inset-0 bg-amazon/0 group-hover:bg-amazon/10 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs text-amazon font-medium uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-amazon transition-colors text-sm leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* CTA Button - Amazon Orange, Translated */}
        <Button
          className="w-full bg-amazon hover:bg-amazon-dark text-white font-semibold group/btn transition-all duration-300 pulse-button-amazon"
          onClick={handleBuyClick}
        >
          {t('products.buyOnAmazon')}
          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FanEdgeProductCard;
