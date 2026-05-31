import Link from "next/link";
import { Product } from "@/types/product";
import QuickAddButton from "@/components/cart/QuickAddButton";

interface ProductCardProps {
  product: Product;
  badgeLabel?: "Sale" | "New" | "Bestseller";
}

function getCategoryStyles(category: string): {
  gradientClassName: string;
  dotClassName: string;
} {
  switch (category.toLowerCase()) {
    case "electronics":
      return {
        gradientClassName: "from-[#DFF3F3] to-[#C9E4EF]",
        dotClassName: "bg-[#2E8B8B]",
      };
    case "clothing":
      return {
        gradientClassName: "from-[#FBE7D9] to-[#F6D0BB]",
        dotClassName: "bg-[#C2683C]",
      };
    case "home & garden":
      return {
        gradientClassName: "from-[#E9F6E5] to-[#D7EBD3]",
        dotClassName: "bg-[#5E8F58]",
      };
    case "books":
      return {
        gradientClassName: "from-[#EEE7F8] to-[#DDD0F0]",
        dotClassName: "bg-[#7A5AA7]",
      };
    case "sports & outdoors":
      return {
        gradientClassName: "from-[#FFEED9] to-[#F8D9AD]",
        dotClassName: "bg-[#C97E1E]",
      };
    case "toys & games":
      return {
        gradientClassName: "from-[#E4F0FF] to-[#CEE2FF]",
        dotClassName: "bg-[#4E7AC7]",
      };
    default:
      return {
        gradientClassName: "from-[#F2E7DA] to-[#E8D9C7]",
        dotClassName: "bg-[#8A7A6A]",
      };
  }
}

function getBadgeClassName(badgeLabel: "Sale" | "New" | "Bestseller") {
  if (badgeLabel === "New") return "bg-[#2E8B8B]";
  if (badgeLabel === "Bestseller") return "bg-[#C2683C]";
  return "bg-[#E8A93C] text-[#241133]";
}

export default function ProductCard({ product, badgeLabel }: ProductCardProps) {
  const styles = getCategoryStyles(product.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#ECDFD0] bg-white shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)] transition-transform duration-200 hover:-translate-y-1">
      <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${styles.gradientClassName}`}>
        {badgeLabel ? (
          <span
            className={`absolute left-3 top-3 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-[0.01em] text-white shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)] ${getBadgeClassName(
              badgeLabel
            )}`}
          >
            {badgeLabel}
          </span>
        ) : null}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.5),transparent_52%),radial-gradient(circle_at_75%_80%,rgba(194,104,60,.16),transparent_58%)]" />

        <div className="relative flex h-full w-full items-center justify-center">
          <svg
            className="h-14 w-14 text-[#8A7A6A]/45"
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
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[0.02em] text-[#8A7A6A]">
          <span className={`h-2 w-2 rounded-full ${styles.dotClassName}`} aria-hidden="true" />
          {product.category}
        </div>

        <h3 className="min-h-[2.5em] text-[16px] font-bold leading-[1.25] text-[#2A1E14]">
          <Link href={`/products/${product.id}`} className="transition-colors hover:text-[#C2683C]">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <p className="text-xl font-extrabold text-[#2A1E14]">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center justify-center rounded-full border border-[#ECDFD0] px-3 py-2 text-sm font-bold text-[#7A4A33] transition-colors hover:border-[#C2683C] hover:text-[#C2683C]"
            >
              View
            </Link>
            <QuickAddButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
