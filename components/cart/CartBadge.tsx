"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { itemCount } = useCart();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center rounded-full bg-[#F4E9DD] px-3 py-2 text-[15px] font-bold text-[#2A1E14] transition-colors hover:bg-[#C2683C] hover:text-white"
    >
      Cart
      {mounted && itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-[21px] min-w-[21px] items-center justify-center rounded-full border-2 border-white bg-[#E8A93C] px-1 text-xs font-extrabold text-[#241133]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
