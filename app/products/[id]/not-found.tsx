import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Product Not Found
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
