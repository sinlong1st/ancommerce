# Workflow: Database Change

Use this whenever changing Prisma schema.

## Step 1: Explain Business Need

Example:

```txt
We need orders to store shipping address because customer checkout requires delivery information.
```

## Step 2: Design Schema

Use:

`.ai/skills/database_design.md`

## Step 3: Review Migration Risk

Check:

- Will this break existing data?
- Is the field required or optional?
- Does seed data need updates?
- Does UI need updates?

## Step 4: Update Prisma Schema

Update:

```txt
prisma/schema.prisma
```

## Step 5: Run Migration

```bash
npx prisma migrate dev --name describe_change_here
npx prisma generate
```

## Step 6: Test

Check affected pages and server actions.

## Step 7: Commit

```bash
git add .
git commit -m "Update database schema for orders"
```
