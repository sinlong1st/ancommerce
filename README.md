# ShopGenie

**A production-style e-commerce web application built with Next.js 16, TypeScript, and Tailwind CSS.**

ShopGenie is a full-stack e-commerce project designed to reflect real-world engineering practices — clean component architecture, thoughtful UI implementation from design references, and a scalable foundation ready for database, auth, and payment integrations.

> Built as a portfolio-quality project demonstrating full-stack architecture thinking, component-driven development, and AI-assisted engineering workflows.

---

## Screenshots

> _Screenshots will be added once the app is deployed._

| Homepage | Product Listing | Product Detail | Cart |
|---|---|---|---|
| — | — | — | — |

---

## Features

### Implemented
- **Responsive homepage** — hero section, featured products, category strip, value props, promo band
- **Product listing page** — grid layout with category filters and quick-add buttons
- **Product detail page** — per-category theming, rich product info panel
- **Shopping cart** — persistent via `localStorage`, accessible from any page
- **Quick add-to-cart** — circular `+` button on product cards, cart badge updates instantly
- **Warm design system** — implemented from a custom design reference (Claude-inspired e-commerce palette)
- **Hydration-safe cart badge** — uses `useSyncExternalStore` to prevent SSR/client mismatch

### Planned
- [ ] PostgreSQL + Prisma ORM — persistent product catalog and order storage
- [ ] Authentication — NextAuth.js with credential and OAuth providers
- [ ] Admin dashboard — product and order management UI
- [ ] Checkout flow — multi-step with address, shipping, and review steps
- [ ] Stripe payment integration
- [ ] Order history and user accounts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (utility-only, no CSS files) |
| State | React Context API + `localStorage` |
| Runtime | React 19 |
| Linting | ESLint with `eslint-config-next` |

---

## Architecture Highlights

### Server / Client component boundary
`ProductCard` and all page-level components are Server Components by default. Interactive islands — cart badge, quick-add button — are isolated as small `"use client"` leaf components. This keeps the JS bundle lean while allowing full interactivity where needed.

```
app/products/page.tsx        ← Server Component (zero JS for layout)
  └─ ProductCard.tsx         ← Server Component (static markup)
       └─ QuickAddButton.tsx ← Client Component (isolated interactive island)
```

### Cart state architecture
Cart state lives in a React Context backed by `localStorage`. The `CartContext` exposes a stable `addItem` interface. Components never manipulate storage directly — all mutations go through context.

```
CartContext (Provider)
  ├─ state: CartItem[]
  ├─ addItem({ id, name, price })
  └─ itemCount (derived)

CartBadge.tsx   ← reads itemCount, hydration-safe via useSyncExternalStore
QuickAddButton  ← calls addItem
AddToCartButton ← calls addItem (detail page)
```

### Design system from reference
The UI was implemented by translating a custom design reference (HTML/JSX mockups) into Tailwind utilities. No CSS files were added to the project. All spacing, colors, and radii use Tailwind arbitrary values mapped from the design token set (e.g. `bg-[#C2683C]`, `rounded-[26px]`).

### Per-category theming
Product cards and the detail page derive gradient backgrounds, icon colors, and badge chips from the product's `category` field at render time — no extra data fields required.

---

## AI-Assisted Development Workflow

This project was built using an AI-assisted engineering workflow with GitHub Copilot (Claude Sonnet).

The workflow followed a disciplined pattern:

1. **Plan first** — each feature was described and a plan was generated before any code was written
2. **Approve, then implement** — implementation only proceeded after plan review
3. **Validate each step** — `npm run lint` and `npm run build` were run after every change
4. **No over-engineering** — changes were scoped strictly to the task at hand; no unsolicited refactors

This approach was used throughout: porting the design system, building interactive cart islands, implementing the product detail page, and wiring the quick-add button.

The `.ai/prompts/` directory contains the prompt history used across each implementation session.

---

## Local Development

### Prerequisites
- Node.js 20+
- npm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/shopgenie.git
cd shopgenie

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
shopgenie/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (CartProvider, Navbar, Footer)
│   ├── page.tsx                # Homepage
│   ├── products/
│   │   ├── page.tsx            # Product listing
│   │   └── [id]/
│   │       ├── page.tsx        # Product detail
│   │       └── not-found.tsx
│   └── cart/
│       └── page.tsx            # Cart page
├── components/
│   ├── cart/
│   │   ├── CartBadge.tsx       # Hydration-safe cart count badge
│   │   └── QuickAddButton.tsx  # Client island for quick add
│   ├── home/
│   │   ├── HomeHero.tsx
│   │   ├── HomeFeaturedProducts.tsx
│   │   ├── HomeCategoryStrip.tsx
│   │   ├── HomeValueProps.tsx
│   │   └── HomePromoBand.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── product/
│       └── ProductCard.tsx     # Shared server-compatible product card
├── context/
│   └── CartContext.tsx         # Cart state + localStorage persistence
├── lib/
│   ├── mock-data.ts            # Product seed data (replaces DB until Prisma)
│   └── home-data.ts            # Homepage-specific data
├── types/
│   └── product.ts              # Shared TypeScript types
└── .ai/
    └── prompts/                # AI prompt history (per-feature)
```

---

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| Phase 1 | Core UI — homepage, listing, detail, cart | ✅ Complete |
| Phase 2 | Database — PostgreSQL + Prisma, replace mock data | Planned |
| Phase 3 | Auth — NextAuth.js, user accounts | Planned |
| Phase 4 | Admin — product and order management | Planned |
| Phase 5 | Checkout + Stripe | Planned |

---

## Future Improvements

- **Search and filtering** — full-text product search, multi-facet filters (category, price range, rating)
- **Optimistic UI** — instant cart feedback with rollback on failure
- **Image handling** — real product images via Next.js `<Image>` with CDN optimization
- **Accessibility audit** — WCAG 2.1 AA pass across all interactive components
- **E2E tests** — Playwright test suite covering the core purchase path
- **CI/CD pipeline** — GitHub Actions: lint → type-check → build → deploy to Vercel on merge to `main`
- **API routes** — migrate cart logic to server-side for multi-device sync once auth is in place

---

## License

MIT
