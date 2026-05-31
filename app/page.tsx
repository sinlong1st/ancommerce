import HomeCategoryStrip from "@/components/home/HomeCategoryStrip";
import HomeFeaturedProducts from "@/components/home/HomeFeaturedProducts";
import HomeHero from "@/components/home/HomeHero";
import HomePromoBand from "@/components/home/HomePromoBand";
import HomeValueProps from "@/components/home/HomeValueProps";
import {
  homeCategories,
  homeFeaturedProducts,
  homeHero,
  homeValueProps,
} from "@/lib/home-data";

export default function Home() {
  return (
    <div className="bg-white">
      <HomeHero {...homeHero} />
      <HomeCategoryStrip categories={homeCategories} />
      <HomeFeaturedProducts products={homeFeaturedProducts} />
      <HomeValueProps items={homeValueProps} />
      <HomePromoBand />
    </div>
  );
}
