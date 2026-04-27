import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShopGenie
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
