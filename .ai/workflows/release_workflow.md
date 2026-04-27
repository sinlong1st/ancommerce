# Workflow: Release / Deployment

Use this before deploying.

## Pre-Release Checklist

- App runs locally
- Lint passes
- Database migration works
- Seed data works
- No secrets committed
- Admin route protected
- Checkout total calculated server-side
- Mobile layout checked
- Basic manual test passed

## Commands

```bash
npm run lint
npm run build
```

If Prisma changed:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Deployment

Recommended:

- Vercel for app
- Supabase or Neon for PostgreSQL

## After Deployment

Test:

- Homepage loads
- Product listing loads
- Product detail loads
- Cart works
- Checkout works
- Admin login works
- Admin product page works
