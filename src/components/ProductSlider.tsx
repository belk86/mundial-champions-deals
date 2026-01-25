import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import type { Product } from '@/hooks/useProducts';

interface ProductSliderProps {
  products: Product[];
  title?: string;
}

const ProductSlider = ({ products, title }: ProductSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScrollability);
      return () => ref.removeEventListener('scroll', checkScrollability);
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative group">
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      )}

      {/* Left Navigation Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full
          bg-card/95 backdrop-blur-sm border border-border
          shadow-lg transition-all duration-300
          ${canScrollLeft 
            ? 'opacity-0 group-hover:opacity-100 hover:bg-gold/20 hover:border-gold/50' 
            : 'opacity-0 cursor-not-allowed'}
        `}
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </Button>

      {/* Right Navigation Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full
          bg-card/95 backdrop-blur-sm border border-border
          shadow-lg transition-all duration-300
          ${canScrollRight 
            ? 'opacity-0 group-hover:opacity-100 hover:bg-gold/20 hover:border-gold/50' 
            : 'opacity-0 cursor-not-allowed'}
        `}
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </Button>

      {/* Touch-Responsive Scrollable Container */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth pb-4 -mx-2 px-2
          snap-x snap-mandatory
          touch-pan-x
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: Math.min(5, Math.ceil(products.length / 2)) }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-colors"
          />
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <p className="text-center text-xs text-muted-foreground mt-2 md:hidden">
        ← Swipe to explore →
      </p>
    </div>
  );
};

export default ProductSlider;
