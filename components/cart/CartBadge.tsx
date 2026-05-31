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
      aria-label="Open cart"
      className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#F4E9DD] text-[#2A1E14] transition-colors hover:bg-[#C2683C] hover:text-white"
    >
      <svg
        className="h-[22px] w-[22px]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {mounted && itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-[21px] min-w-[21px] items-center justify-center rounded-full border-2 border-white bg-[#E8A93C] px-1 text-xs font-extrabold text-[#241133]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
