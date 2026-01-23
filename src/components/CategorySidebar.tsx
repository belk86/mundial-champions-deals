import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shirt, Footprints, Headphones, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCategories, type ProductCategory } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

interface CategorySidebarProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

const categoryIcons: Record<string, typeof Shirt> = {
  national_jerseys: Shirt,
  football_gear: Footprints,
  stadium_accessories: Trophy,
  exclusive_tech: Headphones,
};

const CategorySidebar = ({ selectedCategory, onCategoryChange }: CategorySidebarProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: categories, isLoading } = useCategories();

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
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        {t('products.categories')}
      </h3>
      
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
    </motion.aside>
  );
};

export default CategorySidebar;
