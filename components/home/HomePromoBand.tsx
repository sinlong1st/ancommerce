import Link from "next/link";

export default function HomePromoBand() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#3A2C22] bg-gradient-to-r from-[#2A1E14] to-[#3A2A1F] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-14 -top-20 h-[360px] w-[360px] rounded-full bg-[#C2683C]/35 blur-[10px]" />
          <div className="pointer-events-none absolute -left-10 -bottom-16 h-52 w-52 rounded-full bg-[#E8A93C]/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E8A93C]">
                Members save more
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Get 10% off your first order
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
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
                className="w-full rounded-full border border-[#ECDFD0] bg-white px-4 py-2.5 text-sm text-[#2A1E14] placeholder:text-[#8A7A6A] focus:outline-none focus:ring-2 focus:ring-[#C2683C]/50"
              />
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#C2683C] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-105 transition-colors"
              >
                Join and save
              </button>
              <p className="mt-2 text-center text-xs text-white/75">
                Prefer browsing? <Link href="/products" className="font-semibold text-white underline underline-offset-2">Shop now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
