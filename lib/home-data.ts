import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/types/product";

export interface HomeCategory {
  name: string;
  href: string;
  toneClassName: string;
  icon: string;
}

export interface HomeValueProp {
  title: string;
  description: string;
  icon: "shield" | "truck" | "lock";
}

export type HomeFeaturedBadge = "Sale" | "New" | "Bestseller";

export const homeHero = {
  eyebrow: "New season drops every week",
  title: "Everything you love,",
  highlight: "all in one place.",
  subtitle:
    "From headphones to houseplants, discover quality products at prices that make you smile.",
  primaryCtaLabel: "Shop now",
  primaryCtaHref: "/products",
  secondaryCtaLabel: "Browse categories",
  secondaryCtaHref: "/products",
  stats: [
    { value: "12k+", label: "happy shoppers" },
    { value: "2k+", label: "products" },
    { value: "4.8/5", label: "avg rating" },
  ],
} as const;

export const homeValueProps: HomeValueProp[] = [
  {
    title: "Quality, guaranteed",
    description:
      "Carefully curated items from trusted brands, backed by a 30-day promise.",
    icon: "shield",
  },
  {
    title: "Fast, free shipping",
    description: "Free delivery on orders over $50 with quick 2-4 day arrival.",
    icon: "truck",
  },
  {
    title: "Secure checkout",
    description: "Your payment is encrypted end-to-end so you can shop confidently.",
    icon: "lock",
  },
];

export const homeFeaturedProducts: Product[] = mockProducts.slice(0, 8);

export const homeFeaturedBadges: Record<string, HomeFeaturedBadge> = {
  "1": "Bestseller",
  "2": "Sale",
  "3": "New",
  "6": "Bestseller",
  "8": "Sale",
};

function iconForCategory(category: string): string {
  switch (category.toLowerCase()) {
    case "electronics":
      return "EL";
    case "clothing":
      return "CL";
    case "home & garden":
      return "HG";
    case "books":
      return "BK";
    case "sports & outdoors":
      return "SP";
    case "toys & games":
      return "TG";
    default:
      return "CT";
  }
}

function toneClassForIndex(index: number): string {
  const tones = [
    "bg-blue-50 border-blue-100",
    "bg-sky-50 border-sky-100",
    "bg-indigo-50 border-indigo-100",
    "bg-cyan-50 border-cyan-100",
  ];
  return tones[index % tones.length];
}

export const homeCategories: HomeCategory[] = Array.from(
  new Set(mockProducts.map((product) => product.category))
).map((category, index) => ({
  name: category,
  href: `/products?category=${encodeURIComponent(category)}`,
  toneClassName: toneClassForIndex(index),
  icon: iconForCategory(category),
}));
