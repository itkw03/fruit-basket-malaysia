import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface StoreState {
  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, updates: Partial<CartItem>) => void;
  toggleCart: () => void;
  clearCart: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;

  // UI State
  isMenuOpen: boolean;
  toggleMenu: () => void;
  
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cartItems: [],
  isCartOpen: false,
  addToCart: (item) => set((state) => ({ 
    cartItems: [...state.cartItems, item],
    isCartOpen: true 
  })),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.productId !== productId)
  })),
  updateCartItem: (productId, updates) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.productId === productId ? { ...item, ...updates } : item
    )
  })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearCart: () => set({ cartItems: [] }),

  // Favorites
  favorites: [],
  toggleFavorite: (productId) => set((state) => ({
    favorites: state.favorites.includes(productId)
      ? state.favorites.filter(id => id !== productId)
      : [...state.favorites, productId]
  })),

  // UI State
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  // Products
  products: [],
  setProducts: (products) => set({ products }),
}));