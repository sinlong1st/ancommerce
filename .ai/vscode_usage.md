# Using This AI System in VS Code

## Option 1: GitHub Copilot Chat

In Copilot Chat, attach or paste:

1. `.ai/context/project_context.md`
2. `.ai/context/current_status.md`
3. `.ai/rules/global_rules.md`
4. A workflow file
5. A skill file

Then ask for a plan first.

## Option 2: Cursor

Cursor can read project files better.

Recommended:

1. Keep `.ai/` committed in your repo.
2. Ask Cursor to read specific `.ai/` files.
3. Use small prompts.
4. Use Composer only for controlled changes.
5. Review diffs carefully before accepting.

## Option 3: ChatGPT

Paste the relevant files and ask for:

- planning
- debugging
- review
- explanation

## Best Daily Prompt

```txt
Read:
- .ai/context/project_context.md
- .ai/context/current_status.md
- .ai/rules/global_rules.md

We are working on:
[FEATURE]

First, create a plan only. Do not code.
```

## Important Habit

After each finished feature, update:

```txt
.ai/context/current_status.md
```

This helps AI understand the real project status.
