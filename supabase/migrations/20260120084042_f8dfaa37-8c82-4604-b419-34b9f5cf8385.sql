-- Create products table for affiliate links
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_es TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image_url TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('amazon', 'aliexpress')),
  rating DECIMAL(2, 1) NOT NULL DEFAULT 4.5,
  reviews INTEGER NOT NULL DEFAULT 0,
  affiliate_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (products are public)
CREATE POLICY "Products are publicly viewable" 
ON public.products 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster filtering by source
CREATE INDEX idx_products_source ON public.products (source);
CREATE INDEX idx_products_is_active ON public.products (is_active);