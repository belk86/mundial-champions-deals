import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteLink {
  link_name: string;
  actual_url: string;
}

export const useSiteLinks = () => {
  return useQuery({
    queryKey: ['site-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_links')
        .select('link_name, actual_url');
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((row: SiteLink) => { map[row.link_name] = row.actual_url; });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });
};
