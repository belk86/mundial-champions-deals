import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, TrendingUp, Package, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrendingSidebar = () => {
  const { t } = useTranslation();

  const trustBadges = [
    { 
      key: 'verified', 
      icon: ShieldCheck, 
      colorClass: 'bg-purple-600/30 text-purple-300 border-purple-500/40',
      description: 'Verified by our team'
    },
    { 
      key: 'hot', 
      icon: Flame, 
      colorClass: 'bg-orange-600/30 text-orange-300 border-orange-500/40',
      description: 'High demand right now'
    },
    { 
      key: 'trending', 
      icon: TrendingUp, 
      colorClass: 'bg-pink-600/30 text-pink-300 border-pink-500/40',
      description: 'Rising in popularity'
    },
    { 
      key: 'limited', 
      icon: Package, 
      colorClass: 'bg-red-600/30 text-red-300 border-red-500/40',
      description: 'Limited availability'
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4 sticky top-24 space-y-6"
    >
      {/* Trust Badges Legend */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          Trust Badges
        </h3>
        <div className="space-y-3">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.key} className="flex items-start gap-2">
                <Badge className={`${badge.colorClass} border text-xs shrink-0`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {t(`products.badges.${badge.key}`)}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Trust Us */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-gold" />
          Why Trust Us
        </h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-gold">✓</span>
            Curated by World Cup experts
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">✓</span>
            All products manually verified
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">✓</span>
            Real affiliate partnerships
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">✓</span>
            Price tracking & alerts
          </li>
        </ul>
      </div>

      {/* Purple Code Badge */}
      <div className="pt-4 border-t border-border">
        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
          <p className="text-xs text-purple-300 font-medium mb-1">
            🟣 Purple Code Active
          </p>
          <p className="text-xs text-muted-foreground">
            Trust-first product curation powered by psychological triggers
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

export default TrendingSidebar;
