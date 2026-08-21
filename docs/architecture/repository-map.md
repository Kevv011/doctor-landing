# Repository Map

## Root

- `AGENTS.md`: operating instructions for coding agents.
- `SKILL.md`: source guidance for designing agent-friendly repository context.
- `SKILL_Design.md`: landing-page UX/UI design system.
- `docs/workflows/agent-procedures.md`: local agent procedures currently stored
  in docs because `.agents/` is read-only in this workspace.
- `composer.json`: PHP dependencies and backend scripts.
- `package.json`: frontend dependencies and scripts.
- `compose.yaml`: Laravel Sail services.
- `.env.example`: environment template.

## Backend

- `app/Actions/Fortify/`: Fortify account actions.
- `app/Concerns/`: shared validation rules.
- `app/Http/Controllers/`: Laravel controllers.
- `app/Http/Middleware/`: request and Inertia middleware.
- `app/Http/Requests/`: form request validation.
- `app/Models/`: Eloquent models.
- `app/Providers/`: Laravel service providers.
- `routes/web.php`: web routes and primary route groups.
- `routes/settings.php`: current starter-kit settings routes.

## Frontend

- `resources/js/app.tsx`: Inertia React application bootstrap.
- `resources/js/pages/`: current Inertia pages.
- `resources/js/layouts/`: app, auth, and settings layouts.
- `resources/js/components/`: reusable React components.
- `resources/js/components/ui/`: shared UI primitives.
- `resources/js/hooks/`: shared React hooks.
- `resources/js/types/`: TypeScript types.
- `resources/css/app.css`: global Tailwind CSS entry point.

## Database

- `database/migrations/`: schema changes.
- `database/factories/`: test and seed factories.
- `database/seeders/`: seed data.

## Tests

- `tests/Feature/`: HTTP, auth, settings, and user-visible behavior tests.
- `tests/Unit/`: isolated unit tests.

## Future Expected Areas

- `app/Http/Controllers/Public/`: public landing and blog controllers.
- `app/Http/Controllers/Admin/`: admin controllers, including blog CRUD.
- `resources/js/pages/public/`: public landing and blog pages.
- `resources/js/pages/admin/`: admin pages based on the starter-kit shell.
- `resources/js/components/landing/`: public landing components.
- `resources/js/components/admin/`: admin-specific components.
- `resources/js/components/blog/`: blog rendering/editor support components.

## Important Entry Points

- `/`: public landing page.
- `/blog`: future public blog index.
- `/blog/{slug}`: future public blog detail.
- `/admin`: future authenticated admin dashboard.
- `/admin/blogs`: future authenticated blog CRUD module.
