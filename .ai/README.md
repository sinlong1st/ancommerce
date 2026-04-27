# ShopGenie AI System

This folder contains the project rules, context, skills, workflows, and prompt templates for working with AI inside VS Code, Cursor, Copilot Chat, Claude, or ChatGPT.

The goal is to make AI behave like a disciplined engineering teammate, not a random code generator.

## How to use this folder

Before asking AI to code, give it:

1. `.ai/context/project_context.md`
2. `.ai/rules/global_rules.md`
3. The specific workflow you want to follow
4. The specific skill file for the task

Example prompt:

```txt
Read and follow these files:
- .ai/context/project_context.md
- .ai/rules/global_rules.md
- .ai/workflows/feature_dev_workflow.md
- .ai/skills/feature_planning.md

Task:
Build the product listing page.

Important:
Plan first. Do not write code yet.
```

## Golden Rule

Always ask AI to plan first before coding.

Recommended flow:

```txt
Requirement → Plan → Review → Code Small Piece → Test → Debug → Commit
```

Do not ask AI to generate the whole application at once.
