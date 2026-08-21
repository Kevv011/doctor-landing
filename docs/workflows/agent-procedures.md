# Agent Procedures

These procedures are the project-specific workflows that would normally live in
`.agents/skills/`. The `.agents/` directory is currently read-only in this
workspace, so they are kept here until that directory can accept project files.

## Implement Landing Section

Use this when adding or changing a public landing page section.

1. Read `AGENTS.md`, `resources/js/AGENTS.md`, and `SKILL_Design.md`.
2. Inspect the current public page and nearby landing components.
3. Identify the section's content, CTA, responsive behavior, and image needs.
4. Build the section as a reusable component under
   `resources/js/components/landing/`.
5. Compose it from the page instead of placing large markup directly in the page
   file.
6. Use design tokens and existing UI primitives where practical.
7. Verify desktop, tablet, and mobile behavior.

Relevant checks:

```bash
npm run types:check
npm run lint:check
npm run build
```

## Modify Admin Feature

Use this when working on authenticated admin functionality.

1. Read `AGENTS.md`, `app/AGENTS.md`, and `resources/js/AGENTS.md`.
2. Confirm the route belongs under `/admin` and requires authentication.
3. Reuse the starter-kit admin layout and UI patterns.
4. Keep controllers thin and use form requests for meaningful validation.
5. Add or update feature tests for access control and behavior.
6. Keep admin components separate from public landing components.

Relevant checks:

```bash
php artisan test --filter=RelevantTestName
php artisan test
npm run types:check
```

## Blog CRUD

Use this when creating or changing blog post persistence, admin CRUD, editor
behavior, or public blog rendering.

1. Read `docs/features/blogs.md`.
2. Confirm whether the change affects admin editing, public rendering, or both.
3. Preserve the rule that only published posts are public.
4. Store body content as structured block JSON.
5. Validate title, slug, status, image metadata, and body shape at the boundary.
6. Add or update tests for CRUD, auth protection, and publication visibility.
7. Keep public blog components styled through the landing design language.

Relevant checks:

```bash
php artisan test --filter=Blog
npm run types:check
npm run build
```

## Test And Verify

Use this before closing implementation work.

1. Identify the smallest relevant backend or frontend check.
2. Run that check first.
3. Run broader checks when the change touches shared code, routes, layouts, or
   persistence.
4. If MySQL fails because `DB_HOST=mysql` is unavailable, try the Sail equivalent
   when Sail is available.
5. Report exactly which checks passed, failed, or were blocked.

Common commands:

```bash
npm run types:check
npm run lint:check
npm run build
php artisan test
composer test
vendor/bin/sail artisan test
```
