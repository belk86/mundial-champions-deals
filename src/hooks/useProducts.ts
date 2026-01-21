import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ProductCategory = 'national_jerseys' | 'football_gear' | 'stadium_accessories' | 'exclusive_tech';
export type TrustBadge = 'verified' | 'hot' | 'trending' | 'limited';
export type SortOption = 'default' | 'trust' | 'price_low' | 'price_high' | 'rating';

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  name_es: string;
  description: string | null;
  description_ar: string | null;
  description_es: string | null;
  price: number;
  original_price: number | null;
  image_url: string;
  affiliate_url: string;
  source: 'amazon' | 'aliexpress';
  rating: number;
  reviews: number;
  category: ProductCategory;
  trend_signal: string | null;
  trend_signal_ar: string | null;
  trend_signal_es: string | null;
  trust_badge: TrustBadge | null;
  trust_score: number;
  click_count: number;
  is_active: boolean;
}

export interface Category {
  id: string;
  key: string;
  name: string;
  name_ar: string;
  name_es: string;
  icon: string | null;
  display_order: number;
}

export const useProducts = (
  sourceFilter: 'all' | 'amazon' | 'aliexpress' = 'all',
  categoryFilter: ProductCategory | 'all' = 'all',
  sortBy: SortOption = 'default'
) => {
  return useQuery({
    queryKey: ['products', sourceFilter, categoryFilter, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      // Apply source filter
      if (sourceFilter !== 'all') {
        query = query.eq('source', sourceFilter);
      }

      // Apply category filter
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      // Apply sorting
      switch (sortBy) {
        case 'trust':
          query = query.order('trust_score', { ascending: false });
          break;
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        default:
          query = query.order('trust_score', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data as Product[];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data as Category[];
    },
  });
};

export const trackProductClick = async (productId: string) => {
  try {
    // Insert click record
    await supabase.from('product_clicks').insert({
      product_id: productId,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });

    // Increment click count using RPC
    await supabase.rpc('increment_product_click', { product_id: productId });
  } catch (error) {
    console.error('Error tracking click:', error);
    // Don't throw - tracking failure shouldn't break UX
  }
};
