import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Star, ShieldCheck, Flame, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  nameEs: string;
  price: number;
  originalPrice?: number;
  image: string;
  source: 'amazon' | 'aliexpress';
  rating: number;
  reviews: number;
  affiliateUrl: string;
  trustBadge?: 'verified' | 'hot' | 'trending' | 'limited';
  trendingReason?: string;
  trendingReasonAr?: string;
  trendingReasonEs?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const trustBadgeConfig = {
  verified: { icon: ShieldCheck, colorClass: 'bg-purple-600/30 text-purple-300 border-purple-500/40' },
  hot: { icon: Flame, colorClass: 'bg-orange-600/30 text-orange-300 border-orange-500/40' },
  trending: { icon: TrendingUp, colorClass: 'bg-pink-600/30 text-pink-300 border-pink-500/40' },
  limited: { icon: Package, colorClass: 'bg-red-600/30 text-red-300 border-red-500/40' },
};

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const getDisplayName = () => {
    switch (language) {
      case 'ar':
        return product.nameAr;
      case 'es':
        return product.nameEs;
      default:
        return product.name;
    }
  };

  const getTrendingReason = () => {
    switch (language) {
      case 'ar':
        return product.trendingReasonAr || 'رائج على تيك توك وأمازون';
      case 'es':
        return product.trendingReasonEs || 'Tendencia en TikTok y Amazon';
      default:
        return product.trendingReason || 'Trending on TikTok & Amazon';
    }
  };

  const handleGetDeal = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const badgeConfig = product.trustBadge ? trustBadgeConfig[product.trustBadge] : null;
  const BadgeIcon = badgeConfig?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border discovery-glow"
    >
      {/* Source Badge */}
      <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-10`}>
        <Badge
          variant="secondary"
          className={`${
            product.source === 'amazon'
              ? 'bg-[#FF9900]/20 text-[#FF9900] border-[#FF9900]/30'
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

      {/* Trust Badge */}
      {product.trustBadge && badgeConfig && BadgeIcon && (
        <div className={`absolute top-12 ${isRTL ? 'left-3' : 'right-3'} z-10`}>
          <Badge className={`${badgeConfig.colorClass} border font-medium text-xs`}>
            <BadgeIcon className="w-3 h-3 mr-1" />
            {t(`products.badges.${product.trustBadge}`)}
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={getDisplayName()}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Purple glow overlay on hover */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-500" />
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
          {getDisplayName()}
        </h3>

        {/* Why this is trending */}
        <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-500/20">
          <p className="text-xs text-purple-300 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span className="font-medium">{t('products.whyTrending')}:</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {getTrendingReason()}
          </p>
        </div>

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

        {/* CTA Button with pulse effect */}
        <Button
          className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-primary-foreground font-semibold group/btn transition-all duration-300 pulse-button"
          onClick={handleGetDeal}
        >
          {t('products.getDeal')}
          <ExternalLink className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'} group-hover/btn:translate-x-1 transition-transform`} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

