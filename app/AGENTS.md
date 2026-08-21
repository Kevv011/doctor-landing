# Backend Agent Instructions

## Scope

These instructions apply to Laravel backend code under `app/`, plus related
routes, requests, migrations, factories, seeders, policies, and tests.

## Rules

- Keep route definitions and controllers thin.
- Use form requests for validation when an endpoint accepts meaningful input.
- Put reusable business behavior in actions, services, model methods, policies,
  or query scopes according to existing Laravel patterns.
- Keep public controllers separate from admin controllers when behavior differs.
- Protect admin routes with authentication and verification where appropriate.
- Use policies or explicit authorization for admin CRUD operations once roles or
  ownership are introduced.
- Keep database changes explicit through migrations and update factories/tests
  alongside model changes.
- Prefer Eloquent relationships and scopes over repeated query fragments.

## Admin Boundary

The starter-kit authenticated dashboard/settings experience is the admin base.
Future admin routes should be grouped under `/admin` and named with an `admin.`
prefix unless a framework package requires otherwise.

## Public Boundary

Public landing and blog routes must not require authentication. Public blog
queries should only expose published content.

## Investigation Checklist

Before changing backend behavior:

1. Locate the route entry point.
2. Inspect the controller/request/model involved.
3. Check migrations and model casts/fillable fields.
4. Search for similar route/controller patterns.
5. Inspect related feature tests.
6. Identify side effects such as file uploads, emails, queues, or published
   content visibility.
