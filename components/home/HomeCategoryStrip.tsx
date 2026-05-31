import Link from "next/link";
import { HomeCategory } from "@/lib/home-data";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";

interface HomeCategoryStripProps {
  categories: HomeCategory[];
}

export default function HomeCategoryStrip({ categories }: HomeCategoryStripProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <HomeSectionHeader
          title="Shop by category"
          actionLabel="View all"
          actionHref="/products"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${category.toneClassName}`}
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] font-bold tracking-wide text-blue-700"
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <p className="mt-4 text-sm font-semibold text-gray-900">{category.name}</p>
              <p className="mt-2 inline-flex items-center text-xs font-semibold text-blue-700 group-hover:text-blue-600">
                Explore
                <span className="ml-1" aria-hidden="true">{"->"}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
