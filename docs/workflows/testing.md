# Testing Workflow

## Test Strategy

Use focused checks first, then broaden based on risk.

For backend behavior:

```bash
php artisan test --filter=RelevantTestName
php artisan test
```

For Sail-backed database tests:

```bash
vendor/bin/sail artisan test --filter=RelevantTestName
vendor/bin/sail artisan test
```

For frontend behavior:

```bash
npm run types:check
npm run lint:check
npm run build
```

For full backend quality checks:

```bash
composer test
```

## What To Verify

- Public routes remain accessible without login.
- Admin routes redirect guests to authentication.
- Published blog posts appear publicly.
- Draft blog posts do not appear publicly.
- Blog validation and persistence work through feature tests.
- Landing UI changes work responsively and preserve accessibility.

## Known Local Caveat

If tests are run directly on the host while `.env` points to `DB_HOST=mysql`,
they can fail with a MySQL host resolution error. Use Sail or adjust the local
test database configuration before treating those failures as application bugs.
