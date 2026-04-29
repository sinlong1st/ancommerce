"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";

export default function CartPage() {
  const { items, subtotal, updateItem, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Browse our products and add something you like.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="rounded-lg border border-gray-200 bg-white px-6">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4">
        <p className="text-base font-medium text-gray-900">Subtotal</p>
        <p className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/products"
          className="rounded-md border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
        {/* Checkout button placeholder — implement after order/payment system is ready */}
        <button
          type="button"
          disabled
          className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
        >
          Checkout (coming soon)
        </button>
      </div>
    </div>
  );
}
