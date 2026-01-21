-- Create categories enum
CREATE TYPE public.product_category AS ENUM (
  'national_jerseys',
  'football_gear',
  'stadium_accessories',
  'exclusive_tech'
);

-- Create trust badge enum
CREATE TYPE public.trust_badge AS ENUM (
  'verified',
  'hot',
  'trending',
  'limited'
);

-- Add new columns to products table
ALTER TABLE public.products
ADD COLUMN description TEXT,
ADD COLUMN description_ar TEXT,
ADD COLUMN description_es TEXT,
ADD COLUMN category product_category NOT NULL DEFAULT 'football_gear',
ADD COLUMN trend_signal TEXT,
ADD COLUMN trend_signal_ar TEXT,
ADD COLUMN trend_signal_es TEXT,
ADD COLUMN trust_badge trust_badge,
ADD COLUMN click_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN trust_score INTEGER NOT NULL DEFAULT 0;

-- Create categories reference table for UI
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_es TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Categories are publicly viewable"
ON public.categories
FOR SELECT
USING (is_active = true);

-- Create click tracking table
CREATE TABLE public.product_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS on click tracking
ALTER TABLE public.product_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for click tracking
CREATE POLICY "Anyone can track clicks"
ON public.product_clicks
FOR INSERT
WITH CHECK (true);

-- Create function to increment click count
CREATE OR REPLACE FUNCTION public.increment_product_click(product_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.products
  SET click_count = click_count + 1
  WHERE id = product_id;
END;
$$;

-- Insert initial categories
INSERT INTO public.categories (key, name, name_ar, name_es, icon, display_order) VALUES
  ('national_jerseys', 'National Jerseys', 'القمصان الوطنية', 'Camisetas Nacionales', 'shirt', 1),
  ('football_gear', 'Football Gear', 'معدات كرة القدم', 'Equipamiento de Fútbol', 'goal', 2),
  ('stadium_accessories', 'Stadium Accessories', 'إكسسوارات الملعب', 'Accesorios de Estadio', 'flag', 3),
  ('exclusive_tech', 'Exclusive Tech Gadgets', 'أجهزة تقنية حصرية', 'Gadgets Tecnológicos', 'smartphone', 4);

-- Insert sample products with full data
INSERT INTO public.products (
  name, name_ar, name_es, description, description_ar, description_es,
  price, original_price, image_url, affiliate_url, source, rating, reviews,
  category, trend_signal, trend_signal_ar, trend_signal_es, trust_badge, trust_score
) VALUES
  (
    'Morocco Home Jersey 2026',
    'قميص المغرب الأساسي 2026',
    'Camiseta Local Marruecos 2026',
    'Official Atlas Lions home kit with breathable fabric',
    'طقم أسود الأطلس الرسمي بقماش قابل للتنفس',
    'Kit oficial de los Leones del Atlas con tela transpirable',
    89.99, 129.99,
    'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500&q=80',
    '#', 'amazon', 4.9, 3456,
    'national_jerseys',
    'Viral on TikTok - 5.2M views this week',
    'فيروسي على تيك توك - 5.2 مليون مشاهدة هذا الأسبوع',
    'Viral en TikTok - 5.2M vistas esta semana',
    'verified', 95
  ),
  (
    'USA Away Jersey 2026',
    'قميص أمريكا البديل 2026',
    'Camiseta Visitante USA 2026',
    'Premium USMNT away kit with stadium quality',
    'طقم المنتخب الأمريكي البديل بجودة الملعب',
    'Kit de visitante premium USMNT calidad estadio',
    94.99, 139.99,
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80',
    '#', 'amazon', 4.8, 2891,
    'national_jerseys',
    'Amazon Best Seller - Top 10 Sports',
    'الأكثر مبيعاً على أمازون - ضمن أفضل 10 رياضية',
    'Más vendido Amazon - Top 10 Deportes',
    'hot', 88
  ),
  (
    'World Cup 2026 Official Match Ball',
    'كرة المباراة الرسمية لكأس العالم 2026',
    'Balón Oficial del Mundial 2026',
    'FIFA certified official match ball with premium grip',
    'كرة المباراة الرسمية المعتمدة من الفيفا بقبضة ممتازة',
    'Balón oficial certificado FIFA con agarre premium',
    149.99, 179.99,
    'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&q=80',
    '#', 'amazon', 4.9, 5672,
    'football_gear',
    'Featured on ESPN - Most wanted item',
    'مميز على ESPN - الأكثر طلباً',
    'Destacado en ESPN - Artículo más deseado',
    'verified', 98
  ),
  (
    'Pro Football Boots Elite',
    'أحذية كرة القدم الاحترافية إليت',
    'Botas de Fútbol Pro Elite',
    'Professional grade boots worn by top players',
    'أحذية احترافية يرتديها أفضل اللاعبين',
    'Botas profesionales usadas por jugadores top',
    199.99, 249.99,
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80',
    '#', 'amazon', 4.7, 4123,
    'football_gear',
    'Same model as Mbappe - Sold 50K+ units',
    'نفس موديل مبابي - بيعت أكثر من 50 ألف قطعة',
    'Mismo modelo de Mbappe - 50K+ vendidos',
    'trending', 92
  ),
  (
    'Championship Trophy Replica',
    'نسخة طبق الأصل من كأس البطولة',
    'Réplica del Trofeo del Campeonato',
    'High-quality metal replica with authentic details',
    'نسخة معدنية عالية الجودة بتفاصيل أصلية',
    'Réplica metálica de alta calidad con detalles auténticos',
    59.99, 89.99,
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&q=80',
    '#', 'aliexpress', 4.6, 1892,
    'stadium_accessories',
    'Only 200 left - High demand from Al Hoceima',
    'متبقي 200 فقط - طلب عالي من الحسيمة',
    'Solo quedan 200 - Alta demanda de Al Hoceima',
    'limited', 85
  ),
  (
    'Fan Scarf Collection Pack',
    'حزمة مجموعة شال المشجعين',
    'Pack Colección de Bufandas',
    'Set of 3 premium scarves with team colors',
    'مجموعة من 3 شالات فاخرة بألوان الفريق',
    'Set de 3 bufandas premium con colores del equipo',
    34.99, 49.99,
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80',
    '#', 'aliexpress', 4.5, 2341,
    'stadium_accessories',
    'TikTok trend - Perfect for stadium selfies',
    'ترند تيك توك - مثالي لسيلفي الملعب',
    'Tendencia TikTok - Perfecto para selfies',
    'hot', 82
  ),
  (
    'Smart Football Tracker Watch',
    'ساعة تتبع كرة القدم الذكية',
    'Reloj Inteligente Rastreador de Fútbol',
    'GPS tracking with match stats and heart rate monitor',
    'تتبع GPS مع إحصائيات المباراة ومراقبة نبضات القلب',
    'GPS con estadísticas de partido y monitor cardíaco',
    129.99, 179.99,
    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&q=80',
    '#', 'amazon', 4.8, 1567,
    'exclusive_tech',
    'Tech influencers favorite - 1M+ sold',
    'مفضل مؤثري التقنية - بيعت أكثر من مليون',
    'Favorito de influencers tech - 1M+ vendidos',
    'verified', 90
  ),
  (
    'Portable Stadium Speaker',
    'مكبر صوت الملعب المحمول',
    'Altavoz Portátil de Estadio',
    'Waterproof Bluetooth speaker with LED lights',
    'مكبر صوت بلوتوث مقاوم للماء مع أضواء LED',
    'Altavoz Bluetooth impermeable con luces LED',
    49.99, 79.99,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    '#', 'aliexpress', 4.4, 3892,
    'exclusive_tech',
    'Festival essential - 500K views on Reels',
    'أساسي للمهرجانات - 500 ألف مشاهدة على ريلز',
    'Esencial festival - 500K vistas en Reels',
    'trending', 78
  );