import { create } from 'zustand';
import { CartItem, Product } from '../types';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface StoreState {
  // Auth
  auth: AuthState;

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
  // Auth
  auth: {
    user: (() => {
      // Try to get user from localStorage on initialization
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('fruitbasket_user');
        return savedUser ? JSON.parse(savedUser) : null;
      }
      return null;
    })(),
    isAuthenticated: (() => {
      // Check if user exists in localStorage
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('fruitbasket_user');
        return !!savedUser;
      }
      return false;
    })(),
    isLoading: false,
    login: async (email: string, password: string) => {
      set((state) => ({ auth: { ...state.auth, isLoading: true } }));
      
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock customer login - replace with real authentication
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'customer'
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('fruitbasket_user', JSON.stringify(user));
      }
      
      set((state) => ({ 
        auth: { 
          ...state.auth, 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        } 
      }));
      
      return true;
    },
    loginWithGoogle: async () => {
      set((state) => ({ auth: { ...state.auth, isLoading: true } }));
      
      // Simulate Google login - replace with real Google Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: 'google-1',
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'customer',
        avatar: 'https://via.placeholder.com/40'
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('fruitbasket_user', JSON.stringify(user));
      }
      
      set((state) => ({ 
        auth: { 
          ...state.auth, 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        } 
      }));
      
      return true;
    },
    adminLogin: async (username: string, password: string) => {
      set((state) => ({ auth: { ...state.auth, isLoading: true } }));
      
      // Admin credentials check
      if (username === 'admin' && password === 'password') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: 'admin-1',
          email: 'admin@fruitbasket.com',
          name: 'Admin',
          role: 'admin'
        };
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('fruitbasket_user', JSON.stringify(user));
        }
        
        set((state) => ({ 
          auth: { 
            ...state.auth, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          } 
        }));
        
        return true;
      }
      
      set((state) => ({ auth: { ...state.auth, isLoading: false } }));
      return false;
    },
    logout: () => {
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fruitbasket_user');
      }
      
      set((state) => ({ 
        auth: { 
          ...state.auth, 
          user: null, 
          isAuthenticated: false 
        } 
      }));
    }
  },

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