# Doctor Landing Agent Instructions

## Purpose

Doctor Landing is a Laravel/Inertia/React application for a public medical
landing page with a simple private admin panel.

Primary goals:

- Serve a polished public landing page at `/`.
- Keep the starter-kit authenticated experience as the admin foundation under
  `/admin`.
- Provide an admin CRUD module for blog posts that can be published to the
  public landing/blog pages.

## Stack

- Backend: Laravel 13, PHP 8.3+, Fortify, Inertia Laravel.
- Frontend: React 19, TypeScript, Inertia React, Tailwind CSS 4.
- UI foundation: existing starter-kit components, Radix primitives, lucide-react.
- Database: MySQL through Laravel Sail.
- Testing: PHPUnit, Larastan/PHPStan, Laravel Pint, ESLint, TypeScript.
- Runtime: Laravel Sail/Docker for full local services.

## Repository Map

- `app/`: Laravel application code, controllers, models, middleware, providers.
- `routes/`: HTTP and console route definitions.
- `resources/js/`: Inertia pages, layouts, React components, hooks, route helpers.
- `resources/css/`: Tailwind and global styling.
- `database/`: migrations, factories, seeders.
- `tests/`: feature and unit tests.
- `docs/`: architecture, features, workflows, decisions, and project knowledge.
- `SKILL.md`: source guidance for maintaining this agent-friendly structure.
- `SKILL_Design.md`: landing-page design language and UI rules.
- `docs/workflows/agent-procedures.md`: project-specific recurring procedures
  until `.agents/skills/` is writable in this workspace.

Detailed map: `docs/architecture/repository-map.md`.

## Product Boundaries

- Public landing pages are unauthenticated and belong under `/`.
- Admin pages are authenticated and should live under `/admin`.
- The current starter-kit dashboard/settings UI is the desired admin foundation.
- Blog management is the first admin business module.
- Published blog content should be visible publicly without requiring login.

## Architecture Rules

- Preserve existing Laravel/Inertia starter-kit patterns unless there is a clear
  reason to diverge.
- Keep public landing components separate from admin components.
- Keep page components focused on composition; move reusable UI into components.
- Keep controllers thin and place non-trivial business behavior in requests,
  models, actions, services, or policies as appropriate.
- Validate input at the request boundary.
- Do not expose admin-only routes, props, or actions to unauthenticated users.
- Store blog article body content as structured data suitable for block rendering.
- Use `SKILL_Design.md` as fallback design guidance for public landing pages;
  newer Figma screenshots or explicit user direction override it.
- Avoid unrelated refactors while completing a task.

## Discovery Workflow

Before non-trivial implementation:

1. Read this file.
2. Read relevant local instructions such as `app/AGENTS.md`,
   `resources/js/AGENTS.md`, or `tests/AGENTS.md`.
3. Inspect relevant docs under `docs/`.
4. Search for similar patterns in existing code.
5. Inspect related tests.
6. Trace the current route/controller/page/data flow.
7. Plan and implement the smallest focused change.

## Documentation Map

- Architecture: `docs/architecture/`.
- Domain: `docs/domain/`.
- Features: `docs/features/`.
- Workflows: `docs/workflows/`.
- Decisions: `docs/decisions/`.
- Agent procedures: `docs/workflows/agent-procedures.md`.

## Validation Commands

Use the smallest relevant command first, then broaden when the change warrants
it. Do not run database-touching commands such as `php artisan test`,
`vendor/bin/sail artisan test`, migrations, refreshes, or seeders unless the
user explicitly authorizes them for the current task.

```bash
# Frontend development server
npm run dev

# Frontend checks
npm run lint:check
npm run format:check
npm run types:check
npm run build

# Backend static checks
composer lint:check
composer types:check

# Database-backed tests only with explicit user approval
php artisan test
composer test
```

When using Sail services:

```bash
vendor/bin/sail up -d
vendor/bin/sail npm run build

# Database-backed tests only with explicit user approval
vendor/bin/sail artisan test
```

## Definition of Done

A task is complete when:

- requested behavior is implemented;
- public and admin boundaries remain intact;
- relevant tests/checks pass or blocked checks are clearly reported;
- database-touching checks are skipped unless explicitly approved;
- no unrelated user work was overwritten;
- documentation is updated when behavior, architecture, or workflow changed;
- the final diff is focused and reviewable.

## Safety Rules

- Do not modify `.env` secrets or production configuration unless requested.
- Do not run migrations, seeders, database refreshes, or database-backed tests
  without explicit approval for the current task.
- Do not delete or weaken tests to make implementation pass.
- Do not introduce dependencies without explaining why they fit the project.
- Do not replace the starter-kit admin foundation unless explicitly requested.
- Do not treat scaffold code as business intent without verifying docs or user
  direction.

## Communication Rules

When reporting results, include:

- what changed;
- what was verified;
- assumptions made;
- anything risky, incomplete, or needing human review.
