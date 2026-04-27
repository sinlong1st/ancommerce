# Security Rules

## Secrets

Never expose secrets in frontend code.

These must stay server-side only:

- DATABASE_URL
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

Public keys may use `NEXT_PUBLIC_` only when safe.

## Admin Protection

Admin pages must be protected by server-side role checks.

Frontend hiding is not enough.

## Checkout Security

Never trust:

- price from browser
- cart total from browser
- discount from browser
- user role from browser

Server must validate and recalculate.

## Auth

Use secure session handling.

Do not store password in plain text.

Use a trusted auth library.

## Validation

Validate all form input before database write.

Recommended later:
- zod

But do not add libraries without approval.
