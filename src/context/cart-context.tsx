
'use client';

import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import type { Product, CartItem } from '@/types';

type CartState = {
  cartItems: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { item: CartItem } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { cartItems: CartItem[] } };

const initialState: CartState = {
  cartItems: [],
};

const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item } = action.payload;
      const existingItem = state.cartItems.find(i => i.id === item.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== productId),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'LOAD_CART':
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('newsun_cart');
      if (storedCart) {
        dispatch({ type: 'LOAD_CART', payload: { cartItems: JSON.parse(storedCart) } });
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('newsun_cart', JSON.stringify(state.cartItems));
    } catch (error) {
       console.error("Failed to save cart to localStorage", error);
    }
  }, [state.cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    const itemToAdd: CartItem = {
      ...product,
      quantity,
      price: product.salePrice, // Ensure price is set correctly
    }
    dispatch({ type: 'ADD_TO_CART', payload: { item: itemToAdd } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
