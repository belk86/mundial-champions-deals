export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag: 'viral' | 'top_seller';
  category: string;
  affiliateUrl: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Native 1080P Projector 4K',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&h=400&fit=crop',
    tag: 'viral',
    category: 'Tech',
    affiliateUrl: 'https://amzn.to/3B77C2n',
  },
  {
    id: '2',
    name: 'Fiber Optic Cap LED Hat',
    price: 39.99,
    originalPrice: 54.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    tag: 'viral',
    category: 'Accessories',
    affiliateUrl: 'https://amzn.to/4qOiuUq',
  },
  {
    id: '3',
    name: 'Power Bank Travel Case',
    price: 18.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    tag: 'top_seller',
    category: 'Travel',
    affiliateUrl: 'https://amzn.to/4qKX1vq',
  },
  {
    id: '4',
    name: 'World Cup 2026 Commemorative Coin Set',
    price: 18.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=400&fit=crop',
    tag: 'top_seller',
    category: 'Collectibles',
    affiliateUrl: 'https://amzn.to/3Z3O9VK',
  },
  {
    id: '5',
    name: 'Noise Cancelling Earplugs',
    price: 11.97,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    tag: 'viral',
    category: 'Accessories',
    affiliateUrl: 'https://amzn.to/4k1n4fm',
  },
  {
    id: '6',
    name: '2026 Host Cities Map Poster',
    price: 13.95,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop',
    tag: 'top_seller',
    category: 'Fan Gear',
    affiliateUrl: 'https://amzn.to/4ka6DxC',
  },
];
