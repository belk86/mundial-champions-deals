import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shirt, Flag as FansGear, Tv, Trophy, Flag, Timer, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCategories, type ProductCategory } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

interface CategorySidebarProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

const categoryIcons: Record<string, typeof Shirt> = {
  football_gear: FansGear,        // Fans Gear
  exclusive_tech: Tv,             // Home Cinema & Tech
  national_jerseys: Shirt,        // Apparel
};

const CategorySidebar = ({ selectedCategory, onCategoryChange }: CategorySidebarProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: categories, isLoading } = useCategories();

  const getCategoryName = (cat: typeof categories extends (infer T)[] ? T : never) => {
    switch (language) {
      case 'es':
        return cat.name_es;
      default:
        return cat.name;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-secondary/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4 sticky top-24"
    >
      {/* Header with sports icon */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
          <Flag className="w-4 h-4 text-gold" />
        </div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {t('products.categories')}
        </h3>
      </div>
      
      <div className="space-y-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className={`w-full justify-start ${
            selectedCategory === 'all'
              ? 'bg-gold hover:bg-gold-light text-primary-foreground'
              : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
          }`}
        >
          <Trophy className="w-4 h-4 mr-2" />
          {t('products.filter.all')}
        </Button>
        
        {categories?.map((cat) => {
          const Icon = categoryIcons[cat.key] || Trophy;
          return (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCategoryChange(cat.key as ProductCategory)}
              className={`w-full justify-start ${
                selectedCategory === cat.key
                  ? 'bg-gold hover:bg-gold-light text-primary-foreground'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {getCategoryName(cat)}
            </Button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Timer className="w-3 h-3 text-orange-400" />
          <span>Updated: Live</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>5 Active Deals</span>
        </div>
      </div>

      {/* World Cup 2026 Banner */}
      <div className="mt-4 p-3 bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg border border-gold/20">
        <div className="text-center">
          <span className="text-2xl">🏆</span>
          <p className="text-xs font-semibold text-gold mt-1">
            World Cup 2026
          </p>
          <p className="text-xs text-muted-foreground">
            USA • Mexico • Canada
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;
