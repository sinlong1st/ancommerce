# Global AI Rules

## Coding Rules
- Always use TypeScript
- Do not use `any` unless explicitly allowed
- Follow existing folder structure
- Do not modify unrelated files
- Keep functions small and readable
- Prefer server-side logic for sensitive operations

## Database Rules
- Never trust client input for price or totals
- Always calculate totals on the server
- Use Prisma for all DB operations
- Do not write raw SQL unless necessary

## Security Rules
- Never expose secrets in frontend
- Always validate inputs
- Protect admin routes

## Project Rules
- Follow the blueprint document
- Do not introduce new libraries unless approved
- Keep code consistent with existing patterns

## Communication Rules
- Always explain:
  - what files are created
  - what files are updated
- Do not generate unnecessary files