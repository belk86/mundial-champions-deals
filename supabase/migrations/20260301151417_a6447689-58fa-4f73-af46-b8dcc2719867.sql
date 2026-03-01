
-- Create site_links table for dynamic link management
CREATE TABLE public.site_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_name TEXT NOT NULL UNIQUE,
  actual_url TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_links ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Site links are publicly viewable"
ON public.site_links FOR SELECT
USING (is_active = true);

-- Seed default links
INSERT INTO public.site_links (link_name, actual_url, description) VALUES
  ('Hotels_USA', 'https://www.booking.com/searchresults.html?ss=United+States&dest_type=country&selected_currency=USD', 'Main Hotels button'),
  ('Cars_USA', 'https://www.booking.com/cars/country/us.html?selected_currency=USD', 'Car rental button'),
  ('Flights', 'https://arangrant.com', 'Flight affiliate homepage'),
  ('Hotel_NewYork', 'https://www.booking.com/searchresults.html?ss=New+York+United+States&dest_type=city&selected_currency=USD', 'NY hotel link'),
  ('Hotel_LosAngeles', 'https://www.booking.com/searchresults.html?ss=Los+Angeles+United+States&dest_type=city&selected_currency=USD', 'LA hotel link'),
  ('Hotel_Miami', 'https://www.booking.com/searchresults.html?ss=Miami+United+States&dest_type=city&selected_currency=USD', 'Miami hotel link'),
  ('Hotel_Dallas', 'https://www.booking.com/searchresults.html?ss=Dallas+United+States&dest_type=city&selected_currency=USD', 'Dallas hotel link'),
  ('Hotel_Toronto', 'https://www.booking.com/searchresults.html?ss=Toronto+Canada&dest_type=city&selected_currency=USD', 'Toronto hotel link'),
  ('Hotel_MexicoCity', 'https://www.booking.com/searchresults.html?ss=Mexico+City+Mexico&dest_type=city&selected_currency=USD', 'Mexico City hotel link');

-- Trigger for updated_at
CREATE TRIGGER update_site_links_updated_at
BEFORE UPDATE ON public.site_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
