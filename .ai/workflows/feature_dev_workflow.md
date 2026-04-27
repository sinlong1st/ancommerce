# Workflow: Feature Development

Use this workflow for every new feature.

## Step 1: Understand the Feature

Clarify:

- What does the user need?
- Who uses this feature?
- Is it customer-facing or admin-facing?
- Does it need database changes?
- Does it need authentication?
- Does it affect checkout or money?

## Step 2: Plan First

Use:

`.ai/skills/feature_planning.md`

AI must produce a plan only.

No code yet.

## Step 3: Review the Plan

Human reviews:

- Is the scope too big?
- Are the files correct?
- Is the database change needed?
- Is the implementation order safe?

## Step 4: Generate Code in Small Pieces

Use:

`.ai/skills/code_generation.md`

Rules:

- One feature at a time.
- Prefer small file groups.
- Do not generate the whole app.

## Step 5: Run Locally

Run the app and check:

```bash
npm run dev
```

Also run:

```bash
npm run lint
```

If Prisma changed:

```bash
npx prisma generate
npx prisma migrate dev
```

## Step 6: Debug

Use:

`.ai/skills/debugging.md`

Fix one error at a time.

## Step 7: Manual Test

Use:

`.ai/skills/test_case_generation.md`

## Step 8: Commit

Commit after the feature works.

Example:

```bash
git add .
git commit -m "Add product listing page"
```
