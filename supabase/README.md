## Database

The versioned SQL in `migrations/` follows the hosted Ocean Project history. On 26 November 2026 the first fourteen version/name pairs and their statements were compared to `supabase_migrations.schema_migrations`. The group directory, report review and private photo migrations were subsequently tested in rollback transactions and applied individually.

On a **fresh, empty Supabase database** run `bootstrap.sql` once before replaying the migrations in version order. It defines the five original tables that predate hosted migration tracking. Supabase supplies the Auth and Storage schemas. On an existing database, compare the remote history first. Historical drafts are in `legacy/`, and `schema.sql` is the earlier snapshot.

Both `tests/sql/ownership.sql` and `tests/sql/community_moderation.sql` run as the migration role in transactions that roll back their fixtures.
