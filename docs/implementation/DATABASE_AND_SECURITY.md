# Database and security

## Local migration source

- Canonical prototype schema: `supabase/schema.sql`
- Incremental hardening migration: `supabase/migrations/20261114000000_secure_reports.sql`

The migration adds owner-scoped report/evidence/history/notification access, a private evidence bucket, and authenticated-only event registration and donation writes. Remote application is **UNVERIFIED** in this workspace.

## Client rules

- Expo receives only the public Supabase URL and publishable/anon key through environment variables.
- Service-role keys, secret keys, and database passwords must remain server-side or in the Supabase dashboard.
- Report, event registration, and donation operations require an authenticated Supabase session.
- Donation notes are persisted with a 500-character database constraint and are written only during final confirmation.

## Verification status

Local SQL was inspected; remote RLS and Storage behavior require authenticated staging users and have not been claimed as verified.
