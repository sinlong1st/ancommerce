import Link from "next/link";
import { HomeCategory } from "@/lib/home-data";

interface HomeCategoryCardProps {
  category: HomeCategory;
}

function getCategoryAccent(categoryName: string): string {
  switch (categoryName.toLowerCase()) {
    case "electronics":
      return "bg-[#2E8B8B]/15 text-[#2E8B8B]";
    case "clothing":
      return "bg-[#C2683C]/15 text-[#C2683C]";
    case "home & garden":
      return "bg-[#5E8F58]/15 text-[#5E8F58]";
    case "books":
      return "bg-[#7A5AA7]/15 text-[#7A5AA7]";
    case "sports & outdoors":
      return "bg-[#C97E1E]/15 text-[#C97E1E]";
    case "toys & games":
      return "bg-[#4E7AC7]/15 text-[#4E7AC7]";
    default:
      return "bg-[#8A7A6A]/15 text-[#8A7A6A]";
  }
}

export default function HomeCategoryCard({ category }: HomeCategoryCardProps) {
  const accentClassName = getCategoryAccent(category.name);

  return (
    <Link
      href={category.href}
      className="group relative flex flex-col items-start gap-3 rounded-[26px] border border-[#ECDFD0] bg-white p-4 text-left transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)]"
    >
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-[14px] text-[13px] font-extrabold tracking-[0.02em] ${accentClassName}`}
        aria-hidden="true"
      >
        {category.icon}
      </span>

      <span className="pr-7 text-[15px] font-bold leading-tight text-[#2A1E14]">
        {category.name}
      </span>

      <span className="absolute right-4 top-4 inline-flex translate-x-1 text-[#C2683C] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.3"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
