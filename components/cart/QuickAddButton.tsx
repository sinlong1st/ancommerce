"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface QuickAddButtonProps {
  product: Product;
}

export default function QuickAddButton({ product }: QuickAddButtonProps) {
  const { addItem } = useCart();

  function handleClick() {
    addItem({ id: product.id, name: product.name, price: product.price });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${product.name} to cart`}
      className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#C2683C] text-white shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)] transition-all hover:rotate-90 hover:brightness-105"
    >
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.4"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
}
