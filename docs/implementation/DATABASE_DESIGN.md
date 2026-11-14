# Database design

Verified tables in Supabase REST after running `supabase/schema.sql`:

- `reports`
- `events`
- `event_registrations`
- `donations`
- `impact_metrics`

The current schema has public read/insert policies for the personal prototype. This is not a production-ready authorization model: reports, registrations and donations need authenticated ownership columns and narrower RLS policies before release.

Not yet implemented:

- Supabase Auth user profile relation
- Storage bucket and upload policies for report evidence
- Donation payment provider/webhook
- Admin-only review policies
- Per-user ownership and audit history
