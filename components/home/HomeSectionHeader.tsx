import Link from "next/link";

interface HomeSectionHeaderProps {
  title: string;
  kicker?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function HomeSectionHeader({
  title,
  kicker,
  actionLabel,
  actionHref,
}: HomeSectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {kicker ? (
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#C2683C]">
            {kicker}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-[#2A1E14] sm:text-3xl">
          {title}
        </h2>
      </div>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#C2683C] transition-colors hover:text-[#AA5733]"
        >
          {actionLabel}
          <span className="inline-flex transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.4"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
