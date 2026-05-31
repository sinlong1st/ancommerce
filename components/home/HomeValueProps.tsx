import { HomeValueProp } from "@/lib/home-data";

interface HomeValuePropsProps {
  items: HomeValueProp[];
}

function ValueIcon({ icon }: { icon: HomeValueProp["icon"] }) {
  if (icon === "truck") {
    return (
      <svg className="h-6 w-6 text-[#2E8B8B]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25" />
      </svg>
    );
  }

  if (icon === "lock") {
    return (
      <svg className="h-6 w-6 text-[#C2683C]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V11.25a.75.75 0 01.75-.75z" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 text-[#C2683C]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export default function HomeValueProps({ items }: HomeValuePropsProps) {
  return (
    <section className="bg-[#FBF6F0] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[26px] border border-[#ECDFD0] bg-white p-6 shadow-[0_24px_48px_-30px_rgba(42,30,20,.3)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F4E9DD]">
                <ValueIcon icon={item.icon} />
              </div>
              <h3 className="text-[17px] font-bold text-[#2A1E14]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8A7A6A]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
