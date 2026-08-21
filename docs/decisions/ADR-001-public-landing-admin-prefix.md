# ADR-001: Public Landing and Admin Prefix

## Status

Accepted

## Context

The project needs two different surfaces:

- a public landing page that visitors can access without logging in;
- a private admin panel for managing site content.

The current starter-kit authenticated pages are useful for the admin and should
not be discarded.

## Decision

Use `/` for the public landing page and `/admin` for the private admin panel.
Preserve the starter-kit dashboard, layout, authentication, and settings
experience as the admin foundation. Authentication routes use the `/admin`
prefix, so login is available at `/admin/login`.

## Alternatives Considered

- Keep the starter dashboard at `/dashboard` and add public pages separately.
- Build a custom admin from scratch immediately.
- Split landing and admin into separate applications.

## Consequences

- Public and private routes have clear ownership.
- The starter-kit work remains useful and becomes the admin shell.
- Future route changes should migrate dashboard/settings behavior under the
  `/admin` boundary.
- Existing route names may remain stable while paths move under `/admin`, which
  keeps starter-kit tests and generated frontend route helpers easier to
  migrate.
