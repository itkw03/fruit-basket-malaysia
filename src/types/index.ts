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
  isDelisted?: boolean; // New field for soft delete/delist functionality
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

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  isGuest: boolean;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    state: string;
    specialInstructions?: string;
  };
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: 'bank_transfer';
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  orderStatus: 'payment_pending' | 'order_confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface OrderStatus {
  status: Order['orderStatus'];
  timestamp: string;
  note?: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  instagramPostUrl?: string;
  createdAt: string;
  isActive: boolean;
}