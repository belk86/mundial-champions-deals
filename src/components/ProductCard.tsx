import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Star, ShieldCheck, Flame, TrendingUp, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackProductClick, type Product, type TrustBadge } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  index: number;
}

const trustBadgeConfig: Record<TrustBadge, { icon: typeof ShieldCheck; colorClass: string }> = {
  verified: { icon: ShieldCheck, colorClass: 'bg-purple-600/30 text-purple-300 border-purple-500/40' },
  hot: { icon: Flame, colorClass: 'bg-orange-600/30 text-orange-300 border-orange-500/40' },
  trending: { icon: TrendingUp, colorClass: 'bg-pink-600/30 text-pink-300 border-pink-500/40' },
  limited: { icon: Package, colorClass: 'bg-red-600/30 text-red-300 border-red-500/40' },
};

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  const getDisplayName = () => {
    switch (language) {
      case 'es': return product.name_es;
      default: return product.name;
    }
  };

  const getTrendSignal = () => {
    switch (language) {
      case 'es': return product.trend_signal_es || product.trend_signal;
      default: return product.trend_signal;
    }
  };

  const handleGetDeal = () => {
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}&tag=mundialgear26-20`;
    window.open(amazonSearchUrl, '_blank', 'noopener,noreferrer');
    trackProductClick(product.id).catch(() => {});
  };

  const badgeConfig = product.trust_badge ? trustBadgeConfig[product.trust_badge] : null;
  const BadgeIcon = badgeConfig?.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border discovery-glow">
      <div className="absolute top-3 right-3 z-10">
        <Badge variant="secondary"
          className={`${product.source === 'amazon' ? 'bg-[#FF9900]/20 text-[#FF9900] border-[#FF9900]/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} border font-medium`}>
          {product.source === 'amazon' ? 'Amazon US' : 'AliExpress'}
        </Badge>
      </div>

      {discount && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gold text-primary-foreground font-bold">-{discount}%</Badge>
        </div>
      )}

      <div className="absolute top-12 right-3 z-10 max-w-[140px]">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border-l-4 border-primary shadow-lg">
          <p className="text-[10px] font-bold text-foreground flex items-center gap-1">
            🔥 <span>{language === 'es' ? 'Viral en TikTok' : language === 'fr' ? 'Viral sur TikTok' : 'Viral on TikTok'}</span>
          </p>
          <p className="text-[9px] text-muted-foreground">
            📍 {language === 'es' ? 'Más vendido en' : language === 'fr' ? 'Meilleur vendeur à' : 'Top Seller in'}{' '}
            <span className="text-primary font-bold">{language === 'es' ? 'Tánger' : language === 'fr' ? 'Tanger' : 'Tangier'}</span>
          </p>
        </div>
      </div>

      {product.trust_badge && product.trust_badge !== 'hot' && badgeConfig && BadgeIcon && (
        <div className="absolute top-12 right-3 z-10">
          <Badge className={`${badgeConfig.colorClass} border font-medium text-xs`}>
            <BadgeIcon className="w-3 h-3 mr-1" />
            {t(`products.badges.${product.trust_badge}`)}
          </Badge>
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img src={product.image_url} alt={getDisplayName()} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-500" />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
        </div>

        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors">{getDisplayName()}</h3>

        {getTrendSignal() && (
          <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-500/20">
            <p className="text-xs text-purple-300 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">{t('products.whyTrending')}:</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{getTrendSignal()}</p>
          </div>
        )}

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-gold">${product.price.toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">${product.original_price.toFixed(2)}</span>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border-l-4 border-gold shadow-lg">
          <p className="text-[11px] font-bold text-foreground flex items-center gap-1 mb-1">
            🏆 {language === 'es' ? 'Oferta Mundial Limitada - Termina en:' : language === 'fr' ? 'Offre limitée Coupe du Monde - Se termine dans:' : 'Limited World Cup Offer - Ends in:'}
          </p>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-base font-bold text-gold tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Button className="w-full bg-amazon hover:bg-amazon-dark text-black font-bold group/btn transition-all duration-300" onClick={handleGetDeal}>
          {t('products.getDeal')}
          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
