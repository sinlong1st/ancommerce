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
            className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-600 transition-colors"
          >
            View full catalog
            <span className="ml-1" aria-hidden="true">{"->"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
