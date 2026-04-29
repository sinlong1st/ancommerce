"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
    >
      Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-4 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
