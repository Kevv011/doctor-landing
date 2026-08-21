# Admin

## Purpose

The admin is a private authenticated surface for managing site content. The
current Laravel React starter-kit dashboard, auth, and settings UI should be
preserved as the admin foundation.

## Users / Actors

- Admin user.

## Main Flow

```text
Admin visits /admin
  -> signs in if needed
  -> lands in starter-kit admin shell
  -> manages blog posts
  -> publishes content to public blog pages
```

## Rules

- Admin routes should live under `/admin`.
- Admin routes must require authentication.
- Keep starter-kit account/security/settings behavior unless explicitly changed.
- Use the existing app layout/sidebar/header patterns for admin screens.
- Public landing design rules do not automatically apply to admin UI.

## Initial Modules

- Dashboard.
- Profile settings.
- Security settings.
- Appearance settings.
- Blog CRUD.

## Entry Points

- `routes/web.php`: expected `/admin` route group.
- `routes/settings.php`: current settings routes to eventually move or mount
  under the admin boundary.
- `resources/js/pages/dashboard.tsx`: current starter dashboard.
- `resources/js/pages/settings/`: current starter settings pages.

## Open Decisions

- Whether login remains at `/login` or is moved/aliased to `/admin/login`.
- Whether the first admin version needs roles or assumes a single admin user.
