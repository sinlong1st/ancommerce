import { CartItem } from "@/types/cart";

const CART_KEY = "shopgenie_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(
  current: CartItem[],
  incoming: CartItem
): CartItem[] {
  const existing = current.find((item) => item.id === incoming.id);
  if (existing) {
    return current.map((item) =>
      item.id === incoming.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...current, { ...incoming, quantity: 1 }];
}

export function updateQuantity(
  current: CartItem[],
  id: string,
  quantity: number
): CartItem[] {
  if (quantity < 1) return current;
  return current.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
}

export function removeFromCart(current: CartItem[], id: string): CartItem[] {
  return current.filter((item) => item.id !== id);
}

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
