# Testing Agent Instructions

## Scope

These instructions apply to automated tests under `tests/`.

## Rules

- Tests describe expected behavior and should not be weakened to make changes
  pass.
- Do not run database-backed tests, migrations, refreshes, or seeders unless the
  user explicitly approves them for the current task.
- Prefer feature tests for public routes, admin route protection, CRUD behavior,
  publication visibility, and form validation.
- Prefer unit tests for isolated domain logic or formatting behavior.
- Add regression coverage for bugs when practical.
- Keep test data expressive enough to communicate the scenario.
- If a test appears obsolete, explain why before changing it.

## Blog Testing Priorities

- Guests can view published blog posts.
- Guests cannot access admin blog CRUD routes.
- Authenticated admins can create, update, publish, unpublish, and delete posts.
- Draft posts are not visible on public blog pages.
- Slugs are unique and stable according to the chosen implementation.
- Blog body JSON persists and renders through the expected public path.

## Verification Flow

1. Prefer static checks and code inspection when DB state may be valuable.
2. Ask for explicit approval before database-backed tests.
3. If approved, run the smallest relevant test first.
4. Fix failures caused by the change.
5. Run a broader suite only when approved and appropriate.
6. Report checks that were skipped to protect local data.
