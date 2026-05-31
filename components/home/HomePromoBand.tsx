import Link from "next/link";

export default function HomePromoBand() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -left-8 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-100">
                Members save more
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Get 10% off your first order
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
                Join the ShopGenie club for early access to weekly drops and members-only offers.
              </p>
            </div>

            <form className="relative rounded-2xl bg-white/10 p-4 backdrop-blur" action="/products" method="get">
              <label htmlFor="promo-email" className="sr-only">
                Email address
              </label>
              <input
                id="promo-email"
                name="email"
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-md border border-white/30 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-950 transition-colors"
              >
                Join and save
              </button>
              <p className="mt-2 text-center text-xs text-blue-100">
                Prefer browsing? <Link href="/products" className="font-semibold text-white underline underline-offset-2">Shop now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
