"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { CartItem } from "@/types/cart";
import {
  getCart,
  saveCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  calcSubtotal,
} from "@/lib/cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => getCart());

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => addToCart(prev, { ...item, quantity: 1 }));
  }, []);

  const updateItem = useCallback((id: string, quantity: number) => {
    setItems((prev) => updateQuantity(prev, id, quantity));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => removeFromCart(prev, id));
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calcSubtotal(items);

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
