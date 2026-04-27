# Project Context

## Project Name

ShopGenie

## Project Type

Production-style e-commerce website.

## Main Goal

Build a real online store with customer shopping flow, admin product management, order management, checkout, database, authentication, and deployment.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM
- Auth.js / NextAuth
- Stripe later
- Vercel deployment

## Architecture Decision

Use Next.js App Router.

Use Server Components by default.

Use Client Components only when needed for:
- user interaction
- browser state
- localStorage
- forms that need client-side state
- cart UI interactions

## Current MVP Scope

The first MVP should include:

1. Homepage
2. Product listing page
3. Product detail page
4. Cart using localStorage
5. Basic checkout form
6. Create order in database
7. Admin product CRUD
8. Admin order list
9. Deployment

## Current Project Decisions

- Use localStorage cart for MVP.
- Use Prisma for all database operations.
- Use PostgreSQL.
- Add Stripe after basic order creation works.
- Admin pages must be protected.
- Do not trust frontend-calculated prices.
- Server must calculate final order total.

## Long-Term Features

Later improvements may include:

- Stripe payment
- Product image upload
- Coupon codes
- Email confirmation
- Inventory alerts
- Product reviews
- Wishlist
- Guest checkout
- Better analytics
- SEO improvements
