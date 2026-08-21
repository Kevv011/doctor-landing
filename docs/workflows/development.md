# Development Workflow

## Setup

Install PHP and Node dependencies:

```bash
composer install
npm install
```

Prepare the app:

```bash
cp .env.example .env
php artisan key:generate
```

When using Sail, start services before database-dependent commands:

```bash
vendor/bin/sail up -d
vendor/bin/sail artisan migrate
```

## Run Locally

With Sail:

```bash
vendor/bin/sail up -d
vendor/bin/sail npm run dev
```

Without Sail, when local PHP/MySQL services are configured:

```bash
php artisan serve
npm run dev
```

## Common Commands

```bash
npm run lint:check
npm run format:check
npm run types:check
npm run build
composer lint:check
composer types:check
php artisan test
```

## Before Completing a Task

1. Run the smallest relevant checks.
2. Run broader checks when the change touches shared behavior.
3. Inspect the diff.
4. Update docs when behavior, architecture, routes, or workflows change.
5. Report any checks blocked by missing services such as MySQL/Sail.

## Local Environment Notes

The default `.env` uses `DB_HOST=mysql`, which resolves inside Sail. Running
database-dependent commands directly on the host may fail unless Sail is running
or the database host is adjusted for local execution.
