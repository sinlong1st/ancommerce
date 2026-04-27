# Workflow: Debugging

Use this workflow when something breaks.

## Step 1: Capture Error

Collect:

- Error message
- Screenshot if helpful
- Terminal output
- Browser console error
- Related code
- What you expected
- What actually happened

## Step 2: Ask AI for Root Cause

Use:

`.ai/skills/debugging.md`

Prompt:

```txt
Follow .ai/skills/debugging.md.

Error:
[paste error]

Related code:
[paste code]

Explain root cause and smallest safe fix.
```

## Step 3: Apply Small Fix

Do not refactor everything.

## Step 4: Verify

Run:

```bash
npm run dev
npm run lint
```

If DB related:

```bash
npx prisma generate
```

## Step 5: Document

Update `.ai/context/current_status.md` if the issue was important.
