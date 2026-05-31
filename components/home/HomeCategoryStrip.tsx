import { HomeCategory } from "@/lib/home-data";
import HomeCategoryCard from "@/components/home/HomeCategoryCard";
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-[14px]">
          {categories.map((category) => (
            <HomeCategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
