import Link from "next/link";
import CartBadge from "@/components/cart/CartBadge";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#ECDFD0] bg-white/90 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-[10px] text-[#2A1E14]">
          <span className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#C2683C] text-white shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)]">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </span>
          <span className="text-[22px] font-extrabold leading-none tracking-[-0.03em] text-[#2A1E14]">
            Shop<span className="text-[#C2683C]">Genie</span>
          </span>
        </Link>

        <form
          action="/products"
          method="get"
          className="hidden max-w-[440px] flex-1 items-center gap-2.5 rounded-full border border-transparent bg-[#F4E9DD] px-[18px] py-2.5 text-[#8A7A6A] focus-within:border-[#C2683C]/35 focus-within:bg-white lg:flex"
        >
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full border-none bg-transparent text-[15px] text-[#2A1E14] placeholder:text-[#8A7A6A] outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-1">
            <Link
              href="/"
              className="rounded-full px-[14px] py-[9px] text-[15px] font-extrabold text-[#7A4A33] transition-colors hover:bg-[#F4E9DD] hover:text-[#C2683C]"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="rounded-full px-[14px] py-[9px] text-[15px] font-extrabold text-[#7A4A33] transition-colors hover:bg-[#F4E9DD] hover:text-[#C2683C]"
            >
              Products
            </Link>
            <CartBadge />
        </div>
      </div>
    </nav>
  );
}
