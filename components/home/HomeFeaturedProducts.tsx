import Link from "next/link";
import HomeProductCard from "@/components/home/HomeProductCard";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeFeaturedBadges } from "@/lib/home-data";
import { Product } from "@/types/product";

interface HomeFeaturedProductsProps {
  products: Product[];
}

export default function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <HomeSectionHeader
          kicker="Handpicked for you"
          title="Featured products"
          actionLabel="Shop all"
          actionHref="/products"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <HomeProductCard
              key={product.id}
              product={product}
              badgeLabel={homeFeaturedBadges[product.id]}
            />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-1 text-sm font-bold text-[#C2683C] transition-colors hover:text-[#AA5733]"
          >
            View full catalog
            <span className="inline-flex transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
