---
name: agentic-project-structure
version: 1.0.0
description: >
  Design, audit, or refactor a software repository so it can be used efficiently
  by coding agents. Use this skill for new projects, existing projects, or
  project migrations when the goal is to improve agent context, repository
  instructions, documentation structure, workflows, verification, and long-term
  maintainability across multiple AI coding agents.
tags:
  - agentic-programming
  - context-engineering
  - repository-architecture
  - coding-agents
  - agents-md
  - project-documentation
  - skills
  - workflows
  - verification
---

# Agentic Project Structure

## 1. Purpose

Use this skill to prepare a software project so AI coding agents can understand,
navigate, modify, test, and maintain it with higher reliability.

This skill is not tied to one specific agent, provider, IDE, CLI, or framework.
It can be used with Codex, Claude Code, Cursor, Gemini CLI, Devin-like agents,
custom internal agents, or future coding agents that support repository context,
instructions, tools, file editing, command execution, or workflow automation.

The objective is to turn a repository into an **agent-friendly development
harness**:

```text
Requirement
   ↓
Agent instructions
   ↓
Context discovery
   ↓
Project documentation
   ↓
Existing code and tests
   ↓
Implementation
   ↓
Verification
   ↓
Reviewable result
```

This skill should help the agent avoid guessing, reduce repeated explanation,
standardize context, preserve architectural intent, and improve implementation
quality across both new and existing projects.

---

## 2. When to Use This Skill

Use this skill when any of the following are true:

- A new software project is being initialized and should be designed for agentic
  development from the beginning.
- An existing project lacks clear instructions for AI coding agents.
- The project has scattered documentation and agents often need repeated
  explanations.
- The project has grown and now requires better context organization.
- Multiple AI tools or coding agents may be used on the same repository.
- A project needs a standard `/docs` structure for architecture, features,
  workflows, decisions, and domain knowledge.
- A project needs one or more `AGENTS.md` files or equivalent agent instruction
  files.
- The developer wants reusable project-level workflows, local skills, or SOPs
  for recurring tasks.
- The repository needs clearer verification rules, testing expectations, and a
  definition of done.

Do not use this skill to implement a business feature directly. Use this skill to
prepare, audit, or refactor the **context system** around the codebase.

---

## 3. Core Principle

Do not give agents more context by default.

Give agents the **minimum correct context**, in the **right place**, with a clear
path to discover the rest.

The project should not depend on massive prompts. Instead, the repository should
explain itself through durable files:

```text
AGENTS.md          → instructions, rules, navigation, workflow
/docs              → project knowledge
.agents/skills     → repeatable procedures
ADRs               → architectural intent and decisions
code               → current implementation truth
tests              → executable behavior and verification
```

---

## 4. Mental Model

A coding agent works best when the repository separates five concerns:

```text
1. Instructions
   How should the agent behave in this repository?

2. Knowledge
   What is this project, domain, architecture, and feature behavior?

3. Procedures
   How should recurring tasks be performed?

4. Source of truth
   What does the code and tests currently do?

5. Verification
   How does the agent know the task is complete and safe?
```

Never mix these concerns into one huge document.

---

## 5. Recommended Repository Structure

For a medium or large project, prefer this structure:

```text
project/
│
├── AGENTS.md
├── README.md
├── .env.example
├── package.json / composer.json / pyproject.toml / csproj / etc.
│
├── docs/
│   │
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── repository-map.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   ├── database.md
│   │   └── security.md
│   │
│   ├── domain/
│   │   ├── domain-map.md
│   │   ├── glossary.md
│   │   └── business-rules.md
│   │
│   ├── features/
│   │   ├── feature-name.md
│   │   └── another-feature.md
│   │
│   ├── integrations/
│   │   ├── external-provider.md
│   │   └── api-contracts.md
│   │
│   ├── workflows/
│   │   ├── development.md
│   │   ├── testing.md
│   │   ├── deployment.md
│   │   └── troubleshooting.md
│   │
│   └── decisions/
│       ├── ADR-001-example.md
│       └── ADR-002-example.md
│
├── .agents/
│   └── skills/
│       ├── implement-feature/
│       │   └── SKILL.md
│       ├── debug-bug/
│       │   └── SKILL.md
│       ├── database-change/
│       │   └── SKILL.md
│       ├── external-integration/
│       │   └── SKILL.md
│       └── code-review/
│           └── SKILL.md
│
├── src/ or app/
│   └── AGENTS.md
│
├── frontend/ or resources/js/
│   └── AGENTS.md
│
└── tests/
    └── AGENTS.md
```

For small projects, do not overbuild. Start with:

```text
project/
├── AGENTS.md
├── docs/
│   ├── architecture.md
│   ├── features.md
│   └── workflows.md
└── tests/
```

Grow the structure only when the project complexity requires it.

---

## 6. File Responsibility Rules

### 6.1 `AGENTS.md`

`AGENTS.md` is the agent's operating manual for the repository.

It should contain:

- project purpose;
- stack summary;
- repository map;
- architectural rules;
- discovery workflow;
- verification commands;
- definition of done;
- important warnings;
- links to deeper documentation.

It should not contain:

- full business domain documentation;
- long feature explanations;
- complete API documentation;
- every historical decision;
- framework tutorials;
- content that belongs in `/docs`.

Think of `AGENTS.md` as:

```text
control + navigation + durable rules
```

not as:

```text
complete project encyclopedia
```

### 6.2 `/docs`

`/docs` is project knowledge.

It should explain:

- architecture;
- domain model;
- feature behavior;
- workflows;
- integrations;
- business rules;
- terminology;
- important decisions;
- known constraints.

It should focus on what the code does not make obvious:

- why something exists;
- business rules;
- boundaries;
- state transitions;
- external system behavior;
- historical decisions;
- intentional tradeoffs.

Avoid documenting every class or method unless there is a business or
architectural reason.

### 6.3 `.agents/skills`

`.agents/skills` contains repeatable procedures.

A skill should answer:

```text
How should this recurring task be performed?
```

Examples:

- how to implement a feature;
- how to debug a bug;
- how to make a database change;
- how to add an external integration;
- how to perform a code review;
- how to safely refactor a module.

Do not use skills as generic documentation. If the file mainly explains what the
system is, place it under `/docs`. If it explains how to repeatedly perform a
workflow, place it under `.agents/skills`.

### 6.4 ADRs

Architecture Decision Records preserve intent.

Use `/docs/decisions` for important architectural decisions:

```text
docs/decisions/ADR-001-use-actions.md
docs/decisions/ADR-002-use-inertia.md
docs/decisions/ADR-003-service-layer.md
```

Each ADR should explain:

- context;
- decision;
- alternatives considered;
- consequences;
- current status.

ADRs are especially useful because coding agents can see not only what the
architecture is, but why it exists.

### 6.5 Code and Tests

The code and tests are the current implementation truth.

Documentation describes intent. Tests describe executable behavior. Code shows
what currently exists.

If documentation conflicts with code or tests, the agent must investigate before
changing behavior.

---

## 7. Context Priority Order

When working in a repository, use this precedence order:

```text
1. Explicit user task
2. Current repository instructions: AGENTS.md or equivalent
3. Local directory instructions: nested AGENTS.md or equivalent
4. Existing tests and executable behavior
5. Current implementation
6. Project documentation under /docs
7. ADRs and architectural decisions
8. General framework conventions
9. Agent assumptions
```

If there is a meaningful conflict between these sources, do not silently choose
one. Stop, investigate, and report the discrepancy.

---

## 8. Recommended Root `AGENTS.md` Template

Use this as a starting point.

```md
# Project Agent Instructions

## Purpose

This repository contains [PROJECT NAME], a [SHORT DESCRIPTION].

Primary goals:

- [Goal 1]
- [Goal 2]
- [Goal 3]

## Stack

- Backend: [Laravel / .NET / Node / Python / etc.]
- Frontend: [React / Vue / Nuxt / Angular / etc.]
- Database: [MySQL / PostgreSQL / SQL Server / etc.]
- Testing: [Pest / PHPUnit / xUnit / Jest / etc.]
- Runtime: [Docker / WSL / local / cloud / etc.]

## Repository Map

- `app/` or `src/`: application code
- `resources/js/` or `frontend/`: frontend code
- `database/`: migrations, seeders, schema files
- `tests/`: automated tests
- `docs/`: architecture, domain, features, workflows, decisions
- `.agents/skills/`: project-specific agent procedures

Detailed map: `docs/architecture/repository-map.md`

## Architecture Rules

- Prefer existing project patterns before introducing new ones.
- Keep entry points thin.
- Place business logic in the appropriate domain/application layer.
- Isolate external integrations behind dedicated services or adapters.
- Keep database changes explicit and documented.
- Avoid unrelated refactors while completing a task.

## Discovery Workflow

Before implementing non-trivial changes:

1. Read this file.
2. Inspect the relevant `/docs` files.
3. Search for similar implementations.
4. Inspect related tests.
5. Trace the current execution flow.
6. Identify architectural constraints.
7. Then plan and implement.

## Documentation Map

- Architecture: `docs/architecture/`
- Domain: `docs/domain/`
- Features: `docs/features/`
- Integrations: `docs/integrations/`
- Workflows: `docs/workflows/`
- Decisions: `docs/decisions/`

## Validation Commands

Use the commands that apply to this project:

```bash
# Backend tests
[command]

# Frontend checks
[command]

# Build
[command]

# Static analysis / lint
[command]
```

## Definition of Done

A task is complete only when:

- the requested behavior is implemented;
- relevant tests pass;
- no unrelated behavior was changed;
- lint/type/build checks pass when applicable;
- documentation is updated when behavior or architecture changed;
- the final diff is focused and reviewable.

## Safety Rules

- Do not run destructive commands without explicit approval.
- Do not modify secrets or production configuration unless requested.
- Do not remove tests to make a task pass.
- Do not overwrite unrelated user work.
- Do not introduce new dependencies without justification.

## Communication Rules

When reporting results, include:

- what changed;
- what was verified;
- what assumptions were made;
- what remains risky, incomplete, or needs human review.
```

---

## 9. Recommended Nested `AGENTS.md` Files

Use nested instruction files when a subdirectory has different rules.

### Backend Example

Location:

```text
app/AGENTS.md
src/AGENTS.md
backend/AGENTS.md
```

Template:

```md
# Backend Agent Instructions

## Scope

These instructions apply to backend application code.

## Rules

- Keep controllers, handlers, or route entry points thin.
- Put business use cases in application/domain services, actions, commands, or
  equivalent project patterns.
- Keep external API calls isolated in integration services/adapters.
- Validate input at the boundary.
- Enforce authorization close to the application boundary.
- Prefer dependency injection over hidden global access.
- Update tests when behavior changes.

## Investigation Checklist

Before changing backend behavior:

1. Locate the entry point.
2. Identify the domain model.
3. Inspect the persistence layer.
4. Inspect existing tests.
5. Search for similar use cases.
6. Identify side effects and integrations.
```

### Frontend Example

Location:

```text
resources/js/AGENTS.md
frontend/AGENTS.md
client/AGENTS.md
```

Template:

```md
# Frontend Agent Instructions

## Scope

These instructions apply to frontend code.

## Rules

- Prefer existing component patterns.
- Keep page-level components focused on composition.
- Move reusable UI into shared components.
- Keep API or server communication consistent with existing patterns.
- Avoid introducing new state management unless justified.
- Preserve accessibility and responsive behavior.
- Run frontend checks after UI changes.

## Investigation Checklist

Before changing UI behavior:

1. Locate the page or route.
2. Inspect related components.
3. Inspect existing props/data flow.
4. Check validation and error states.
5. Check loading and empty states.
6. Verify responsive behavior when relevant.
```

### Tests Example

Location:

```text
tests/AGENTS.md
```

Template:

```md
# Testing Agent Instructions

## Rules

- Tests document expected behavior.
- Add regression tests for bug fixes when practical.
- Prefer feature/integration tests for user-visible behavior.
- Prefer unit tests for isolated domain logic.
- Do not delete or weaken tests to make implementation pass.
- If a test appears obsolete, report why before changing it.

## Verification Flow

1. Run the smallest relevant test first.
2. Fix failures caused by the change.
3. Run a broader suite when the local suite passes.
4. Report any tests that could not be run.
```

---

## 10. Recommended `/docs` Structure

### 10.1 `docs/architecture/overview.md`

Use this file to explain the high-level architecture.

Template:

```md
# Architecture Overview

## Purpose

[Explain what this system does.]

## High-Level Architecture

```text
Client
  ↓
Application/API
  ↓
Domain/Application Layer
  ↓
Persistence / External Services
```

## Main Layers

- Presentation/UI:
- Application/use cases:
- Domain/business logic:
- Infrastructure/integrations:
- Persistence:

## Important Architectural Rules

- [Rule 1]
- [Rule 2]
- [Rule 3]

## Tradeoffs

- [Tradeoff 1]
- [Tradeoff 2]
```

### 10.2 `docs/architecture/repository-map.md`

Use this file to help agents navigate the codebase.

Template:

```md
# Repository Map

## Root

- `AGENTS.md`: repository instructions for agents
- `docs/`: project documentation
- `.agents/skills/`: project-specific procedures

## Backend

- `[path]`: [purpose]
- `[path]`: [purpose]

## Frontend

- `[path]`: [purpose]
- `[path]`: [purpose]

## Database

- `[path]`: [purpose]

## Tests

- `[path]`: [purpose]

## Important Entry Points

- `[path]`: [purpose]
- `[path]`: [purpose]
```

### 10.3 `docs/domain/domain-map.md`

Use this file to describe domain entities and relationships.

Template:

```md
# Domain Map

## Core Entities

```text
Entity A
  ↓
Entity B
  ↓
Entity C
```

## Entity Responsibilities

### Entity A

- [Responsibility]
- [Important rules]

### Entity B

- [Responsibility]
- [Important rules]

## Important State Transitions

```text
draft → active → completed
          ↓
       cancelled
```

## Domain Invariants

- [Rule that must always be true]
- [Rule that must never be violated]
```

### 10.4 `docs/features/<feature>.md`

Use one file per significant feature.

Template:

```md
# [Feature Name]

## Purpose

[Explain the business/user purpose.]

## Users / Actors

- [Actor 1]
- [Actor 2]

## Main Flow

```text
Step 1
  ↓
Step 2
  ↓
Step 3
```

## Rules

- [Business rule]
- [Validation rule]
- [Authorization rule]

## Data Model

- `[Model/Table]`: [purpose]
- `[Model/Table]`: [purpose]

## Entry Points

- `[route/controller/page/command]`: [purpose]

## Side Effects

- [Email sent]
- [External API called]
- [Job dispatched]

## Tests

- `[test path]`: [behavior covered]

## Related Files

- `[path]`: [purpose]
```

### 10.5 `docs/integrations/<provider>.md`

Use this for external APIs, services, SDKs, queues, payment providers, ad
platforms, or internal services.

Template:

```md
# [Integration Name]

## Purpose

[Explain why this integration exists.]

## Ownership Boundary

This project controls:

- [Local responsibility]

The external provider controls:

- [External responsibility]

## Authentication

[Describe auth mechanism without storing secrets.]

## Main Flows

```text
Local action
  ↓
External request
  ↓
External response
  ↓
Local persistence/update
```

## Failure Handling

- [Timeout behavior]
- [Retry behavior]
- [Partial failure behavior]
- [Reconciliation behavior]

## Important Endpoints / Operations

- `[operation]`: [purpose]
- `[operation]`: [purpose]

## Testing Strategy

- [Mock/fake strategy]
- [Contract testing]
- [Manual verification]
```

### 10.6 `docs/workflows/development.md`

Use this to document local development.

Template:

```md
# Development Workflow

## Setup

```bash
[setup commands]
```

## Run Locally

```bash
[local commands]
```

## Common Commands

```bash
[test command]
[lint command]
[build command]
```

## Before Opening a PR / Completing a Task

1. Run tests.
2. Run lint/type/build checks.
3. Inspect diff.
4. Update docs if behavior changed.
```

### 10.7 `docs/decisions/ADR-000-template.md`

Template:

```md
# ADR-000: [Decision Title]

## Status

Proposed | Accepted | Deprecated | Superseded

## Context

[What problem or constraint led to this decision?]

## Decision

[What was decided?]

## Alternatives Considered

- [Alternative 1]
- [Alternative 2]

## Consequences

Positive:

- [Benefit]

Negative:

- [Tradeoff]

## Related Files

- `[path]`
```

---

## 11. Recommended Project Skills

Create project-specific skills only for workflows repeated often in that
repository.

Recommended starting set:

```text
.agents/skills/
├── implement-feature/
├── debug-bug/
├── database-change/
├── external-integration/
└── code-review/
```

### 11.1 Skill Template

```md
---
name: skill-name
description: >
  Use this skill when [specific trigger]. It helps the agent [specific outcome].
---

# Skill Name

## Purpose

[Explain what this skill helps accomplish.]

## When to Use

Use this skill when:

- [Condition 1]
- [Condition 2]

## Inputs

- [Required context]
- [Relevant files]
- [Expected outcome]

## Workflow

1. [Step]
2. [Step]
3. [Step]

## Validation

- [Command or check]
- [Command or check]

## Output

The agent should report:

- what changed;
- what was verified;
- risks or assumptions;
- files modified.
```

### 11.2 `implement-feature` Skill Summary

Use for new behavior.

Core workflow:

```text
understand requirement
  ↓
read AGENTS.md
  ↓
inspect docs/features
  ↓
inspect similar implementations
  ↓
inspect tests
  ↓
plan
  ↓
implement
  ↓
test
  ↓
review diff
  ↓
update docs if needed
```

### 11.3 `debug-bug` Skill Summary

Use for failures or unexpected behavior.

Core workflow:

```text
reproduce
  ↓
locate expected behavior
  ↓
trace execution
  ↓
identify root cause
  ↓
add regression coverage if practical
  ↓
apply minimal fix
  ↓
verify
```

### 11.4 `database-change` Skill Summary

Use for schema, migration, model, or persistence changes.

Core workflow:

```text
inspect current schema
  ↓
inspect affected models
  ↓
inspect feature rules
  ↓
plan migration
  ↓
update code
  ↓
update tests
  ↓
verify rollback/compatibility when applicable
```

### 11.5 `external-integration` Skill Summary

Use for APIs, SDKs, webhooks, background jobs, or external providers.

Core workflow:

```text
read integration docs
  ↓
identify auth and boundary
  ↓
inspect existing service/adapters
  ↓
implement isolated integration layer
  ↓
handle failures/retries
  ↓
add tests/fakes
  ↓
update integration documentation
```

### 11.6 `code-review` Skill Summary

Use before finalizing work.

Core workflow:

```text
inspect diff
  ↓
check scope
  ↓
check architecture
  ↓
check tests
  ↓
check security
  ↓
check docs
  ↓
report issues and recommendations
```

---

## 12. Applying This Skill to a New Project

When starting a new project, follow this process.

### Step 1: Identify Project Basics

Collect:

- project name;
- purpose;
- target users;
- stack;
- expected modules;
- database choice;
- frontend/backend structure;
- deployment target;
- testing approach.

### Step 2: Create Minimal Agent Harness

Create:

```text
AGENTS.md
docs/architecture/overview.md
docs/architecture/repository-map.md
docs/domain/domain-map.md
docs/workflows/development.md
docs/workflows/testing.md
docs/decisions/ADR-000-template.md
```

### Step 3: Add Project-Specific Instructions

Customize root `AGENTS.md` with:

- stack;
- architecture rules;
- repository map;
- validation commands;
- discovery workflow;
- definition of done;
- safety rules.

### Step 4: Add Local Instructions Only Where Needed

Add nested `AGENTS.md` files only when a directory has meaningful different
rules.

Examples:

```text
backend/AGENTS.md
frontend/AGENTS.md
tests/AGENTS.md
```

Do not create nested instruction files that merely repeat the root file.

### Step 5: Document First Features

For each major feature, create:

```text
docs/features/<feature-name>.md
```

Focus on:

- purpose;
- actors;
- main flow;
- business rules;
- data model;
- side effects;
- tests;
- related files.

### Step 6: Add Only Necessary Skills

Start with one or two project-specific skills if needed.

Do not create skills prematurely. Add a skill when the same workflow is repeated
several times.

### Step 7: Establish Verification

Make sure the repository has explicit commands for:

- tests;
- linting;
- type checking;
- build;
- formatting;
- static analysis if applicable.

Add those commands to `AGENTS.md` and `docs/workflows/testing.md`.

---

## 13. Applying This Skill to an Existing Project

When applying this skill to an existing project, do not rewrite the project
immediately.

Audit first.

### Step 1: Inspect Current State

Look for:

- README;
- existing docs;
- test structure;
- build/test commands;
- architecture patterns;
- framework conventions;
- domain modules;
- integrations;
- existing agent instruction files.

### Step 2: Build a Repository Map

Create or update:

```text
docs/architecture/repository-map.md
```

Describe actual structure, not ideal structure.

### Step 3: Identify Current Architecture

Create or update:

```text
docs/architecture/overview.md
```

Document the current architecture honestly.

Do not invent an architecture that the code does not follow.

### Step 4: Identify Domain Areas

Create:

```text
docs/domain/domain-map.md
```

and one feature document per important area:

```text
docs/features/<feature>.md
```

### Step 5: Create Root `AGENTS.md`

Add a concise root instruction file that tells agents how to work in the current
repository.

Start small. Prefer accurate and short over large and speculative.

### Step 6: Add Verification Commands

Inspect the real project commands from files such as:

- `package.json`;
- `composer.json`;
- `Makefile`;
- `docker-compose.yml`;
- CI configuration;
- framework-specific config.

Place real commands in `AGENTS.md`.

Do not invent commands.

### Step 7: Add ADRs for Important Existing Decisions

If the project already follows a pattern, document why it exists.

Examples:

- why Actions are used;
- why Inertia is used;
- why certain modules are separated;
- why an external integration is isolated;
- why a table structure exists.

### Step 8: Refactor Context, Not Code

The first pass should organize context and documentation.

Avoid changing application behavior unless explicitly requested.

### Step 9: Validate Agent Usability

Ask an agent to perform a dry-run investigation:

```text
Read the project instructions and explain how this repository is structured,
where feature documentation lives, how validation is performed, and what files
you would inspect before implementing [example feature]. Do not modify files.
```

If the agent cannot answer clearly, improve the context structure.

---

## 14. Agentic Development Workflow

After the structure exists, agents should follow this workflow for non-trivial
work:

```text
1. Receive task
2. Read root instructions
3. Read local instructions if working inside a specific directory
4. Locate relevant docs
5. Inspect existing implementation
6. Inspect tests
7. Search for similar patterns
8. Plan changes
9. Implement focused changes
10. Run targeted verification
11. Run broader verification when needed
12. Inspect final diff
13. Update docs if behavior changed
14. Report result
```

This workflow should be described in `AGENTS.md` and reinforced by reusable
skills.

---

## 15. Definition of Done

A repository prepared for agentic programming is ready when:

- there is a root `AGENTS.md` or equivalent instruction file;
- instructions are short, accurate, and actionable;
- `/docs` explains architecture, domain, features, workflows, and decisions;
- project-specific procedures live under `.agents/skills` when useful;
- code and tests remain the source of truth for current behavior;
- verification commands are documented and executable;
- agents know how to investigate before implementing;
- agents know when to update documentation;
- destructive or risky actions require explicit approval;
- final work is reviewable by a human developer.

---

## 16. Anti-Patterns

Avoid these patterns:

### 16.1 One Giant Context File

Do not place all architecture, features, workflows, API docs, and procedures in a
single huge `AGENTS.md`.

Problem:

```text
Too much context
  ↓
Poor navigation
  ↓
Agent misses important rules
```

### 16.2 Documentation That Repeats the Code

Do not document every class and method unless necessary.

Prefer documenting:

- why;
- rules;
- flows;
- constraints;
- decisions;
- side effects.

### 16.3 Skills That Are Actually Docs

If a file explains what a system is, place it in `/docs`.

If a file explains how to perform a recurring task, place it in `.agents/skills`.

### 16.4 Creating Too Many Nested Instruction Files

Only create nested `AGENTS.md` files where local rules differ.

Do not duplicate root instructions everywhere.

### 16.5 Trusting Documentation Over Tests Without Investigation

If docs and tests conflict, investigate.

Do not silently rewrite behavior based only on stale documentation.

### 16.6 Over-Automating Without Verification

More agent autonomy requires stronger verification.

If the project has no tests, linting, type checks, or builds, keep agent changes
smaller and require more human review.

---

## 17. Maintenance Rules

Agent context must be maintained like code.

Update project context when:

- architecture changes;
- new major features are added;
- business rules change;
- external integrations change;
- verification commands change;
- project setup changes;
- recurring workflows become stable enough to become skills;
- old documentation becomes misleading.

Recommended maintenance cadence:

```text
After each meaningful feature:
  update related docs if behavior changed

After each architectural change:
  add or update an ADR

After repeated manual prompting:
  consider creating or improving a skill

Before major agent-driven work:
  audit AGENTS.md and relevant docs
```

---

## 18. Final Output Expected From This Skill

When this skill is used, the agent should produce one of the following outputs.

### For a New Project

- proposed agent-friendly repository structure;
- initial `AGENTS.md`;
- initial `/docs` skeleton;
- suggested project-specific skills;
- validation command placeholders;
- next steps to complete setup.

### For an Existing Project

- audit of current context structure;
- missing instruction/documentation areas;
- proposed `AGENTS.md` changes;
- proposed `/docs` structure;
- suggested ADRs;
- suggested project-specific skills;
- risks and inconsistencies found;
- prioritized implementation plan.

### For a Context Refactor

- files to create/update;
- content migration plan;
- instructions to keep, remove, or split;
- documentation hierarchy;
- skill candidates;
- verification checklist.

---

## 19. Default Agent Response Format

When completing this skill, report:

```md
## Summary

[What was prepared, audited, or proposed.]

## Files Created or Recommended

- `[path]`: [purpose]

## Key Decisions

- [Decision]

## Verification

- [What was checked]
- [What still needs to be checked]

## Risks / Notes

- [Risk or assumption]

## Next Steps

1. [Step]
2. [Step]
3. [Step]
```

---

## 20. Practical Rule

The best agentic project structure is not the largest one.

The best structure is the one that makes this possible:

```text
A new agent can enter the repository,
understand how to work,
find the right context,
modify the right files,
verify the result,
and explain the final diff
without needing repeated manual guidance.
```

