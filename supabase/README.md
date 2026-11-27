## Database

The versioned SQL in `migrations/` follows the hosted Ocean Project history. On 26 November 2026 the first fourteen version/name pairs and their statements were compared to `supabase_migrations.schema_migrations`. The group directory, report review and private photo migrations were subsequently tested in rollback transactions and applied individually.

On a **fresh, empty Supabase database** run `bootstrap.sql` once before replaying the migrations in version order. It defines the five original tables that predate hosted migration tracking. Supabase supplies the Auth and Storage schemas. On an existing database, compare the remote history first. Historical drafts are in `legacy/`, and `schema.sql` is the earlier snapshot.

On 27 November 2026 all twenty-one local migrations matched the hosted versions, names and normalized SQL. The latest changes cover event capacity and activity, private volunteer applications and training, learning credits, opt-in rankings and private timing for daily post support. Donation receipts and pending pledges are scoped to their owner.

Six regression scripts run as the migration role inside transactions that roll back their fixtures. They are `ownership.sql`, `community_moderation.sql`, `event_capacity.sql`, `volunteer_training.sql`, `learning_impact.sql` and `daily_post_support.sql`. [SQL tests](../tests/sql) · [Application verification](../docs/implementation/VERIFICATION.md)
