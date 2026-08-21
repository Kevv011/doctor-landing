# Testing Workflow

## Test Strategy

Use focused checks first, then broaden based on risk. In this project, do not
run database-backed tests, migrations, refreshes, or seeders unless the user
explicitly approves them for the current task.

For backend behavior, prefer static and route/code inspection unless DB checks
are approved:

```bash
composer lint:check
composer types:check
```

Database-backed tests require explicit approval:

```bash
php artisan test --filter=RelevantTestName
php artisan test
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
Also note that Laravel tests using database refresh traits can clear data in the
configured test database, so they must be treated as destructive unless the
target database is confirmed disposable.
