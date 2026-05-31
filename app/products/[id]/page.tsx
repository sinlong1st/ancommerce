import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import AddToCartButton from "@/components/cart/AddToCartButton";

type PageProps = {
  params: Promise<{ id: string }>;
};

function getCategoryTheme(category: string): {
  panelGradient: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
} {
  switch (category.toLowerCase()) {
    case "electronics":
      return {
        panelGradient: "from-[#DFF3F3] to-[#C9E4EF]",
        dotColor: "bg-[#2E8B8B]",
        badgeBg: "bg-[#2E8B8B]/15",
        badgeText: "text-[#2E8B8B]",
      };
    case "clothing":
      return {
        panelGradient: "from-[#FBE7D9] to-[#F6D0BB]",
        dotColor: "bg-[#C2683C]",
        badgeBg: "bg-[#C2683C]/15",
        badgeText: "text-[#C2683C]",
      };
    case "home & garden":
      return {
        panelGradient: "from-[#E9F6E5] to-[#D7EBD3]",
        dotColor: "bg-[#5E8F58]",
        badgeBg: "bg-[#5E8F58]/15",
        badgeText: "text-[#5E8F58]",
      };
    case "books":
      return {
        panelGradient: "from-[#EEE7F8] to-[#DDD0F0]",
        dotColor: "bg-[#7A5AA7]",
        badgeBg: "bg-[#7A5AA7]/15",
        badgeText: "text-[#7A5AA7]",
      };
    case "sports & outdoors":
      return {
        panelGradient: "from-[#FFEED9] to-[#F8D9AD]",
        dotColor: "bg-[#C97E1E]",
        badgeBg: "bg-[#C97E1E]/15",
        badgeText: "text-[#C97E1E]",
      };
    case "toys & games":
      return {
        panelGradient: "from-[#E4F0FF] to-[#CEE2FF]",
        dotColor: "bg-[#4E7AC7]",
        badgeBg: "bg-[#4E7AC7]/15",
        badgeText: "text-[#4E7AC7]",
      };
    default:
      return {
        panelGradient: "from-[#F2E7DA] to-[#E8D9C7]",
        dotColor: "bg-[#8A7A6A]",
        badgeBg: "bg-[#8A7A6A]/15",
        badgeText: "text-[#8A7A6A]",
      };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Await params (required in Next.js 15+)
  const { id } = await params;
  
  // Find product by id
  const product = mockProducts.find((p) => p.id === id);

  // Show 404 if product not found
  if (!product) {
    notFound();
  }

  const theme = getCategoryTheme(product.category);

  return (
    <div className="bg-[#FBF6F0]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back to Products Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#ECDFD0] bg-white px-4 py-2 text-sm font-semibold text-[#8A7A6A] shadow-[0_2px_0_rgba(42,30,20,.06)] transition-colors hover:text-[#C2683C]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.4"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Products
          </Link>
        </div>

        {/* Product Detail Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-[30px] border border-[#ECDFD0] bg-white shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)]">
            <div className={`relative aspect-square w-full bg-gradient-to-br ${theme.panelGradient}`}>
              <span
                className={`absolute left-4 top-4 z-10 inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold tracking-[0.01em] ${theme.badgeBg} ${theme.badgeText}`}
              >
                {product.category}
              </span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.5),transparent_52%),radial-gradient(circle_at_75%_80%,rgba(194,104,60,.16),transparent_58%)]" />
              <div className="relative flex h-full w-full items-center justify-center">
                <svg
                  className="h-32 w-32 text-[#8A7A6A]/45"
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
          </div>

          {/* Product Details Section */}
          <div className="rounded-[26px] border border-[#ECDFD0] bg-white p-6 shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)] sm:p-7">
            {/* Category Row */}
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-[0.02em] text-[#8A7A6A]">
              <span className={`h-2.5 w-2.5 rounded-full ${theme.dotColor}`} aria-hidden="true" />
              <span>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#2A1E14] sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-end gap-3">
              <p className="text-4xl font-extrabold leading-none text-[#2A1E14]">
                ${product.price.toFixed(2)}
              </p>
              <span className="pb-1 text-sm font-semibold text-[#8A7A6A]">
                incl. tax
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-full border border-[#ECDFD0] bg-[#F4E9DD] px-3 py-1 text-sm font-semibold text-[#2E8B8B]">
                  <svg
                    className="mr-1.5 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  In Stock
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-bold text-[#2A1E14]">
                Product Description
              </h2>
              <p className="text-base leading-7 text-[#8A7A6A]">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto border-t border-[#ECDFD0] pt-5 [&>button]:!rounded-full [&>button]:!bg-[#C2683C] [&>button]:!shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)] [&>button]:hover:!bg-[#B55F36] [&>button]:focus-visible:!outline-[#C2683C]">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
