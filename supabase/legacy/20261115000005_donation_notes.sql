alter table public.donations
  add column if not exists note text not null default '';

alter table public.donations
  drop constraint if exists donations_note_length;

alter table public.donations
  add constraint donations_note_length check (char_length(note) <= 500);
