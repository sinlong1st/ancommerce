import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to ShopGenie
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover amazing products at unbeatable prices. Your favorite online shopping destination.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6">
          <Link
            href="/products"
            className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
