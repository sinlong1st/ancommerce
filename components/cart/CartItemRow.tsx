"use client";

import { CartItem } from "@/types/cart";

interface Props {
  item: CartItem;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({ item, onUpdate, onRemove }: Props) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={item.quantity <= 1}
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium text-gray-900">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <p className="w-20 text-right text-sm font-semibold text-gray-900">
        ${lineTotal.toFixed(2)}
      </p>

      {/* Remove */}
      <button
        type="button"
        aria-label={`Remove ${item.name}`}
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 transition-colors text-sm"
      >
        Remove
      </button>
    </div>
  );
}
