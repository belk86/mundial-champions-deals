export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  affiliateUrl: string;
  socialProof?: string;
  tag?: 'viral' | 'top_seller' | 'limited';
}

export const products: Product[] = [
  {
    id: '1',
    name: "Auto Focus Projector 1080P",
    price: 89.99,
    image: "https://m.media-amazon.com/images/I/71NnB+Ri+kL._AC_UF894,1000_QL80_FMwebp_.jpg",
    category: "Home Cinema",
    affiliateUrl: "https://amzn.to/3B77C2n",
    socialProof: "viral",
    tag: 'viral'
  },
  {
    id: '2',
    name: "LED Fiber Optic Cap",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/71SSISN8iHL._AC_SL1500_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4qOiuUq",
    socialProof: "topSeller",
    tag: 'top_seller'
  },
  {
    id: '3',
    name: "Power Bank Travel Case",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/81WdS0Baq1L._AC_UF350,350_QL80_FMwebp_.jpg",
    category: "Travel",
    affiliateUrl: "https://amzn.to/4qKX1vq",
    socialProof: "recommended"
  },
  {
    id: '4',
    name: "World Cup 2026 Coin Set",
    price: 18.99,
    image: "https://m.media-amazon.com/images/I/814z8oFlhdL._AC_UF1000,1000_QL80_FMwebp_.jpg",
    category: "Collectibles",
    affiliateUrl: "https://amzn.to/3Z3O9VK",
    socialProof: "limited",
    tag: 'limited'
  },
  {
    id: '5',
    name: "Noise Cancelling Earplugs",
    price: 17.99,
    image: "https://m.media-amazon.com/images/I/71fUNemtqhL._AC_UF350,350_QL80_FMwebp_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4k1n4fm",
    socialProof: "topSeller"
  },
  {
    id: '6',
    name: "2026 Host Cities Map Poster",
    price: 8.48,
    image: "https://m.media-amazon.com/images/I/81tJFl-0x7L._AC_UF1000,1000_QL80_FMwebp_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4ka6DxC",
    socialProof: "recommended"
  },
  {
    id: '7',
    name: "Soccer Ball Bottle Opener",
    price: 7.56,
    image: "https://m.media-amazon.com/images/I/61RMoclW7mL._AC_UL1500_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3B9D9o7",
    socialProof: "recommended"
  },
  {
    id: '8',
    name: "FIFA World Cup Mascot Toy",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/81a+GTgEVyL._AC_UF894,1000_QL80_FMwebp_.jpg",
    category: "Collectibles",
    affiliateUrl: "https://amzn.to/3Z5M7K8",
    socialProof: "topSeller",
    tag: 'top_seller'
  },
  {
    id: '9',
    name: "National Team Scarf",
    price: 29.99,
    image: "https://m.media-amazon.com/images/I/517X28DHnDL._AC_UY1000_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/49A8U0U",
    socialProof: "recommended"
  },
  {
    id: '10',
    name: "Desktop Nations Flag Set",
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/71wnE6TJq8L._AC_UF1000,1000_QL80_FMwebp_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3B4H9mN",
    socialProof: "viral"
  },
  {
    id: '11',
    name: "World Cup String Bunting",
    price: 9.99,
    image: "https://m.media-amazon.com/images/I/71XexGUTwbL._AC_UF1000,1000_QL80_FMwebp_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4k7B2mF",
    socialProof: "viral"
  },
  {
    id: '12',
    name: "Stadium Seat Cushion",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/71tjdn2HuXL._AC_UF1000,1000_QL80_FMwebp_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3Z6Y7X9",
    socialProof: "topSeller"
  },
  {
    id: '13',
    name: "Travel Neck Pillow",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/71xuYlE+-+L._AC_SL1500_.jpg",
    category: "Travel",
    affiliateUrl: "https://amzn.to/49B2Z1V",
    socialProof: "recommended"
  },
  {
    id: '14',
    name: "Reusable Water Bottle",
    price: 14.99,
    image: "https://m.media-amazon.com/images/I/71YP54MHXXL._AC_SL1500_.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3Z8R9W2",
    socialProof: "recommended"
  }
];
