'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, DigitalProduct } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: DigitalProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; product: DigitalProduct; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; cart: Cart };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.productId === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.productId === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { ...state, items: updatedItems, total };
      }

      const newItem: CartItem = {
        productId: action.product.id,
        product: action.product,
        quantity: action.quantity,
        price: action.product.price,
      };

      const updatedItems = [...state.items, newItem];
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return { ...state, items: updatedItems, total };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.productId !== action.productId);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total };
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }

      const updatedItems = state.items.map(item =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, currency: 'USD' };

    case 'LOAD_CART':
      return action.cart;

    default:
      return state;
  }
}

const initialCart: Cart = {
  items: [],
  total: 0,
  currency: 'USD',
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('avidity-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', cart: parsedCart });
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('avidity-cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: DigitalProduct, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 