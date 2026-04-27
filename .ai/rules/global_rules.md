# Global AI Rules

These rules apply to every AI task in this project.

## General Behavior

- Always follow the existing project structure.
- Do not modify unrelated files.
- Do not introduce new libraries unless approved.
- Do not rewrite the whole project unless specifically requested.
- Prefer small, safe changes.
- Explain what files are created or updated.
- Ask for confirmation before major architecture changes.
- If something is unclear, make a reasonable assumption and clearly state it.

## Coding Rules

- Use TypeScript.
- Avoid `any` unless absolutely necessary.
- Prefer explicit types for important data structures.
- Keep functions small and readable.
- Use clear variable names.
- Avoid clever code that is hard to maintain.
- Prefer composition over large components.
- Keep business logic out of UI components when possible.

## Next.js Rules

- Use App Router.
- Use Server Components by default.
- Use Client Components only when needed.
- Put reusable UI in `src/components`.
- Put shared utilities in `src/lib`.
- Put reusable types in `src/types`.
- Do not put secrets in client components.
- Do not import server-only code into client components.

## UI Rules

- Use Tailwind CSS.
- Use shadcn/ui when helpful.
- Keep UI clean and simple.
- Mobile responsiveness is required.
- Use loading, empty, and error states when appropriate.
- Avoid over-designing MVP screens.

## Database Rules

- Use Prisma for database access.
- Do not write raw SQL unless approved.
- Never trust client-side price values.
- Calculate order totals on the server.
- Validate input before saving to database.
- Use relations properly.
- Avoid deleting important business records; prefer soft delete or `isActive` for products.

## Security Rules

- Never expose secrets in frontend code.
- Never expose Stripe secret key in client-side code.
- Protect admin routes.
- Validate user role on the server.
- Do not rely only on frontend checks for authorization.
- Sanitize and validate form input.
- Use environment variables for secrets.
- Do not commit `.env` files.

## Git Rules

- Work on feature branches.
- Make small commits.
- Commit only working code when possible.
- Do not commit generated junk files.
- Do not commit credentials.

## AI Output Rules

When giving code, AI must include:

1. Files to create.
2. Files to update.
3. Why the change is needed.
4. Full code for each changed file, unless asked for patch only.
5. Commands to run, if needed.
6. Manual testing checklist.

## Forbidden AI Behavior

AI must not:

- Randomly change architecture.
- Install packages without approval.
- Change naming conventions without reason.
- Hide assumptions.
- Skip security checks.
- Skip explanation.
- Generate unrelated features.
- Replace existing working code unnecessarily.
