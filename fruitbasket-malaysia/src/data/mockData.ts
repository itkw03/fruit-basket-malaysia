import { Product, ColorMood, Flower, Fruit } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Sunset Garden Basket',
    slug: 'sunset-garden-basket',
    description: 'A vibrant collection of seasonal fruits with warm orange and yellow blooms',
    images: [
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 89,
    priceRange: { min: 69, max: 149 },
    tags: ['bestseller', 'romantic', 'warm-tones'],
    availability: true,
    category: 'For Her',
    isExpress: true,
  },
  {
    id: '2',
    title: 'Tropical Paradise Collection',
    slug: 'tropical-paradise-collection',
    description: 'Fresh tropical fruits with exotic blooms in coral and peach tones',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 129,
    priceRange: { min: 99, max: 199 },
    tags: ['premium', 'tropical', 'exotic'],
    availability: true,
    category: 'Premium',
    isExpress: false,
  },
  {
    id: '3',
    title: 'Elegant White & Green',
    slug: 'elegant-white-green',
    description: 'Sophisticated arrangement with white florals and fresh green accents',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 109,
    priceRange: { min: 89, max: 169 },
    tags: ['elegant', 'corporate', 'clean'],
    availability: true,
    category: 'Corporate',
    isExpress: true,
  },
  {
    id: '4',
    title: 'Berry Bliss Basket',
    slug: 'berry-bliss-basket',
    description: 'Sweet berry selection with delicate pink and purple blooms',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 79,
    priceRange: { min: 59, max: 129 },
    tags: ['sweet', 'berries', 'delicate'],
    availability: true,
    category: 'Seasonal',
    isExpress: true,
  },
  {
    id: '5',
    title: 'Royal Golden Harvest',
    slug: 'royal-golden-harvest',
    description: 'Premium golden fruits with luxury gold and burgundy florals',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 189,
    priceRange: { min: 149, max: 249 },
    tags: ['luxury', 'premium', 'golden'],
    availability: true,
    category: 'Luxury',
    isExpress: false,
  },
  {
    id: '6',
    title: 'Fresh Morning Bouquet',
    slug: 'fresh-morning-bouquet',
    description: 'Crisp morning selection with white and yellow seasonal blooms',
    images: [
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 99,
    priceRange: { min: 79, max: 149 },
    tags: ['fresh', 'morning', 'bright'],
    availability: true,
    category: 'For Him',
    isExpress: true,
  },
];

export const colorMoods: ColorMood[] = [
  {
    name: 'Soft Blush',
    colors: ['#ffe9e6', '#ffd1d1', '#ffb3ba'],
    mood: 'Gentle and romantic'
  },
  {
    name: 'Warm Sunset',
    colors: ['#fd5a1e', '#ff5757', '#ff8c42'],
    mood: 'Bold and energetic'
  },
  {
    name: 'Fresh Garden',
    colors: ['#2fb380', '#7fb069', '#a7c957'],
    mood: 'Natural and refreshing'
  },
  {
    name: 'Monochrome',
    colors: ['#1f2328', '#a7a098', '#f7f6f4'],
    mood: 'Elegant and timeless'
  },
  {
    name: 'Ocean Breeze',
    colors: ['#4a90e2', '#7bb3f0', '#a8d5f2'],
    mood: 'Calm and serene'
  },
  {
    name: 'Golden Hour',
    colors: ['#f4d03f', '#f7dc6f', '#fbeaa7'],
    mood: 'Warm and luxurious'
  }
];

export const flowers: Flower[] = [
  {
    id: 'roses',
    name: 'Garden Roses',
    seasonal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'peonies',
    name: 'Peonies',
    seasonal: [4, 5, 6, 7],
    allergyTags: ['pollen-sensitive'],
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'eucalyptus',
    name: 'Eucalyptus',
    seasonal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const fruits: Fruit[] = [
  {
    id: 'strawberries',
    name: 'Fresh Strawberries',
    seasonal: [1, 2, 11, 12],
    image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'oranges',
    name: 'Premium Oranges',
    seasonal: [1, 2, 3, 4, 11, 12],
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'apples',
    name: 'Crisp Apples',
    seasonal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];