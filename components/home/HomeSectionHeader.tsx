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
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            {kicker}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
      </div>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-600 transition-colors"
        >
          {actionLabel}
          <span className="ml-1" aria-hidden="true">{"->"}</span>
        </Link>
      ) : null}
    </div>
  );
}
