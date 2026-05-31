import Link from "next/link";

interface HeroStat {
  value: string;
  label: string;
}

interface HomeHeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: readonly HeroStat[];
}

export default function HomeHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  stats,
}: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#F4E9DD,#FBF6F0)]">
      <div className="pointer-events-none absolute -top-[90px] right-[8%] h-[280px] w-[280px] rounded-full bg-[#C2683C]/15 blur-[8px]" />
      <div className="pointer-events-none absolute -bottom-[80px] -left-[40px] h-[220px] w-[220px] rounded-full bg-[#2E8B8B]/20 blur-[8px]" />
      <div className="pointer-events-none absolute right-[42%] top-[40%] h-[160px] w-[160px] rounded-full bg-[#E8A93C]/25 blur-[8px]" />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1200px] grid-cols-[1.05fr_.95fr] items-center gap-12 px-6 pb-[72px] pt-16 max-[879px]:grid-cols-1 max-[879px]:text-left">
        <div>
          <span className="inline-flex items-center gap-[7px] rounded-full border border-[#ECDFD0] bg-white px-[14px] py-2 text-[13px] font-extrabold text-[#2A1E14] shadow-[0_2px_0_rgba(42,30,20,.06)]">
            <svg
              className="h-4 w-4 text-[#C2683C]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l1.95 4.05L18 9l-4.05 1.95L12 15l-1.95-4.05L6 9l4.05-1.95L12 3z"
              />
            </svg>
            {eyebrow}
          </span>

          <h1 className="mt-5 text-[clamp(38px,5.6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#2A1E14]">
            {title}
            <br />
            <span className="text-[#C2683C]">{highlight}</span>
          </h1>

          <p className="mt-[18px] max-w-[480px] text-[clamp(16px,1.4vw,19px)] font-medium leading-[1.55] text-[#8A7A6A]">
            {subtitle}
          </p>

          <div className="mt-[30px] flex flex-wrap gap-[14px]">
            <Link
              href={primaryCtaHref}
              className="inline-flex items-center justify-center gap-[9px] rounded-full bg-[#C2683C] px-7 py-4 text-[17px] font-bold text-white shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)] transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              {primaryCtaLabel}
              <svg
                className="h-[18px] w-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5l7.5 7.5-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#ECDFD0] bg-white px-7 py-4 text-[17px] font-bold text-[#2A1E14] transition-all hover:-translate-y-0.5 hover:border-[#2A1E14]"
            >
              {secondaryCtaLabel}
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-[22px] max-[560px]:gap-[14px]">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-[22px] max-[560px]:gap-[14px]">
                <div>
                  <strong className="block text-2xl font-extrabold leading-none text-[#2A1E14]">
                    {stat.value}
                  </strong>
                  <span className="text-[13px] font-semibold text-[#8A7A6A]">
                    {stat.label}
                  </span>
                </div>
                {index < stats.length - 1 ? (
                  <div className="h-[34px] w-px bg-[#ECDFD0]" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-[879px]:hidden">
          <div className="relative aspect-[10/11] overflow-hidden rounded-[30px] border border-[#ECDFD0] bg-white shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(46,139,139,.22),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(194,104,60,.22),transparent_55%)]" />
            <div className="absolute inset-0 p-6">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[#ECDFD0]/80 bg-[#FBF6F0]/85 p-6">
                <div className="h-16 w-16 rounded-2xl bg-[#C2683C]/20" />
                <div className="space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-[#2A1E14]/20" />
                  <div className="h-3 w-1/2 rounded-full bg-[#2A1E14]/15" />
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="h-16 rounded-xl bg-white/90" />
                    <div className="h-16 rounded-xl bg-white/90" />
                    <div className="h-16 rounded-xl bg-white/90" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-[18px] bottom-[46px] inline-flex items-center gap-2 rounded-2xl border border-[#ECDFD0] bg-white px-[15px] py-[11px] text-sm font-extrabold text-[#2A1E14] shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)]">
            <svg
              className="h-[18px] w-[18px] text-[#2E8B8B]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25"
              />
            </svg>
            Free shipping over $50
          </div>

          <div className="absolute -right-[14px] top-6 flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-[#E8A93C] text-2xl font-extrabold text-[#241133] shadow-[0_18px_40px_-22px_rgba(194,104,60,.5)]">
            -30%
            <small className="text-[10px] font-bold uppercase tracking-[0.04em]">
              this week
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
