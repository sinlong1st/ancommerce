# Code Review Checklist

## General

- [ ] Code follows project structure.
- [ ] No unrelated files changed.
- [ ] Naming is clear.
- [ ] Code is readable.
- [ ] No unnecessary library added.

## TypeScript

- [ ] No unnecessary `any`.
- [ ] Important data has types.
- [ ] Props are typed.
- [ ] Server action inputs are typed.

## Next.js

- [ ] Server components used by default.
- [ ] Client components only used when needed.
- [ ] No server-only imports in client components.
- [ ] Routes follow App Router structure.

## Database

- [ ] Prisma used properly.
- [ ] Relations make sense.
- [ ] No raw SQL unless approved.
- [ ] Order price history is preserved.

## Security

- [ ] Secrets are not exposed.
- [ ] Admin actions are protected.
- [ ] User input is validated.
- [ ] Checkout does not trust client total.

## UI

- [ ] Responsive layout.
- [ ] Loading state considered.
- [ ] Empty state considered.
- [ ] Error state considered.
- [ ] Accessibility basics are covered.
