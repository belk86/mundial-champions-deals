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
    image: "https://m.media-amazon.com/images/I/71p0v2v8L7L.jpg",
    category: "Home Cinema",
    affiliateUrl: "https://amzn.to/45WGwnM",
    socialProof: "Viral on TikTok - 2M+ views",
    tag: 'viral'
  },
  {
    id: '2',
    name: "LED Fiber Optic Hat",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/71D9O+N1pFL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4rbLt4O",
    socialProof: "Top Seller in Tangier",
    tag: 'top_seller'
  },
  {
    id: '3',
    name: "Power Bank Travel Case",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/71yR3B-pPCL.jpg",
    category: "Travel",
    affiliateUrl: "https://amzn.to/4cjO9bO",
    socialProof: "Essential for 2026 Travelers"
  },
  {
    id: '4',
    name: "World Cup 2026 Coin Set",
    price: 18.99,
    image: "https://m.media-amazon.com/images/I/61NfT+77p2L.jpg",
    category: "Collectibles",
    affiliateUrl: "https://amzn.to/4bH2f6X",
    socialProof: "Limited World Cup Offer",
    tag: 'limited'
  },
  {
    id: '5',
    name: "Noise Cancelling Earplugs",
    price: 17.99,
    image: "https://m.media-amazon.com/images/I/61L9pXm5GCL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4bHPVU1",
    socialProof: "Stadium Must-Have"
  },
  {
    id: '6',
    name: "2026 Host Cities Map Poster",
    price: 8.48,
    image: "https://m.media-amazon.com/images/I/71-C7r7W7WL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3ZseL2U",
    socialProof: "Plan Your Journey"
  },
  {
    id: '7',
    name: "Soccer Ball Bottle Opener",
    price: 7.56,
    image: "https://m.media-amazon.com/images/I/61M6rA2iVpL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4tthEho",
    socialProof: "Perfect Party Gift"
  },
  {
    id: '8',
    name: "FIFA World Cup Mascot Toy",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/61-9pD7mRML.jpg",
    category: "Collectibles",
    affiliateUrl: "https://amzn.to/4r6IA4Z",
    socialProof: "Official Merchandise",
    tag: 'top_seller'
  },
  {
    id: '9',
    name: "National Team Scarf",
    price: 29.99,
    image: "https://m.media-amazon.com/images/I/81P8-qK2f2L.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4rKnDgr",
    socialProof: "Support Your Team"
  },
  {
    id: '10',
    name: "Desktop Nations Flag Set",
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/81T6m2Y9sHL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/45VPtOd",
    socialProof: "Top Seller"
  },
  {
    id: '11',
    name: "World Cup String Bunting",
    price: 9.99,
    image: "https://m.media-amazon.com/images/I/71qS7VvD+mL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/3MheexK",
    socialProof: "Viral Decor"
  },
  {
    id: '12',
    name: "Stadium Seat Cushion",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/81xH9BvY9-L.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4603dYi",
    socialProof: "Comfort in Stadiums"
  },
  {
    id: '13',
    name: "Travel Neck Pillow",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/71R2o5-L0jL.jpg",
    category: "Travel",
    affiliateUrl: "https://amzn.to/4r8YPih",
    socialProof: "Travel in Style"
  },
  {
    id: '14',
    name: "Reusable Water Bottle",
    price: 14.99,
    image: "https://m.media-amazon.com/images/I/61N-Fq8vEAL.jpg",
    category: "Fans Gear",
    affiliateUrl: "https://amzn.to/4kplt37",
    socialProof: "Eco-Friendly Fan"
  }
];
