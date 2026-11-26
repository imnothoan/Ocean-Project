drop policy if exists "authenticated can update own reports" on public.reports;

create policy "authenticated can update own reports" on public.reports
for update to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());
