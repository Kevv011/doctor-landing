# Testing Agent Instructions

## Scope

These instructions apply to automated tests under `tests/`.

## Rules

- Tests describe expected behavior and should not be weakened to make changes
  pass.
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

1. Run the smallest relevant test first.
2. Fix failures caused by the change.
3. Run a broader suite when local checks pass.
4. Report checks that could not run, especially when Sail/MySQL is unavailable.
