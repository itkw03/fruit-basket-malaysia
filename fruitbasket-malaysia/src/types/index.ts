export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  priceRange?: {
    min: number;
    max: number;
  };
  size?: 'Small' | 'Regular' | 'Grand';
  tags: string[];
  availability: boolean;
  category: string;
  isExpress: boolean;
}

export interface ColorMood {
  name: string;
  colors: string[];
  mood: string;
}

export interface Flower {
  id: string;
  name: string;
  seasonal: number[];
  allergyTags?: string[];
  image: string;
}

export interface Fruit {
  id: string;
  name: string;
  seasonal: number[];
  allergyFlags?: string[];
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  customizations?: {
    colors: string[];
    flowers: string[];
    fruits: { id: string; quantity: number }[];
    budget: number;
    message: string;
  };
}

export interface CustomOrder {
  id: string;
  customerId: string;
  deliveryDate: string;
  deliveryTime: string;
  colors: string[];
  flowerTypes: string[];
  fruitSelections: { id: string; quantity: number }[];
  budget: number;
  addons: string[];
  delivery: {
    address: string;
    phone: string;
    recipientName: string;
  };
  note: string;
  depositStatus: 'pending' | 'paid' | 'failed';
  status: 'draft' | 'confirmed' | 'in-progress' | 'delivered';
}