create table public.volunteer_applications (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  full_name text not null check(char_length(trim(full_name)) between 1 and 100),
  birth_date date not null,
  email text not null check(char_length(email) between 3 and 254 and position('@' in email)>1),
  phone text not null default '' check(char_length(phone)<=30),
  location text not null check(char_length(trim(location)) between 2 and 150),
  motivation text not null check(char_length(trim(motivation)) between 3 and 300),
  hours text not null check(hours in ('2-4 hours','4-8 hours','8+ hours')),
  terms_accepted boolean not null check(terms_accepted),
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  lessons integer not null default 0 check(lessons between 0 and 3),
  quiz_score integer check(quiz_score between 0 and 10)
);
alter table public.volunteer_applications enable row level security;
revoke all on public.volunteer_applications from public,anon,authenticated;
grant select,insert(full_name,birth_date,email,phone,location,motivation,hours,terms_accepted), update(status)
 on public.volunteer_applications to authenticated;
create policy "applicants and reviewers read applications" on public.volunteer_applications for select to authenticated
  using(user_id=(select auth.uid()) or (select auth.jwt())->'app_metadata'->>'role'='admin');
create policy "eligible members submit application" on public.volunteer_applications for insert to authenticated
  with check(user_id=(select auth.uid()) and birth_date<=current_date-interval '18 years'
    and (select count(*) from public.reports where owner_id=(select auth.uid()) and status='resolved')>=3);
create policy "reviewers decide pending applications" on public.volunteer_applications for update to authenticated
  using(status='pending' and (select auth.jwt())->'app_metadata'->>'role'='admin')
  with check(status in ('approved','rejected') and (select auth.jwt())->'app_metadata'->>'role'='admin');
create index volunteer_queue on public.volunteer_applications(status,submitted_at);
create function private.volunteer_review_notice() returns trigger language plpgsql security definer set search_path='' as $$
begin
  new.reviewed_at:=now();
  insert into public.notifications(user_id,title,body) values(new.user_id,'Volunteer application','Application '||new.status);
  return new;
end $$;
create trigger volunteer_decision before update of status on public.volunteer_applications
 for each row when (old.status is distinct from new.status) execute function private.volunteer_review_notice();
revoke all on function private.volunteer_review_notice() from public,anon,authenticated;

create function private.advance_training(lesson integer, answers integer[]) returns integer language plpgsql security definer set search_path='' as $$
declare current_lesson integer; grade integer;
begin
  select lessons into strict current_lesson from public.volunteer_applications
    where user_id=auth.uid() and status='approved' for update;
  if answers is null then
    if lesson is null or lesson not between 1 and 3 or lesson>current_lesson+1 then raise exception 'Complete the previous lesson first.'; end if;
    update public.volunteer_applications set lessons=greatest(lessons,lesson) where user_id=auth.uid();
    return greatest(current_lesson,lesson);
  end if;
  if current_lesson<>3 or cardinality(answers)<>10 then raise exception 'Complete three lessons and answer all ten questions.';end if;
  select count(*) into grade from unnest(answers,array[2,1,3,2,1,3,1,2,3,2]) as response(choice,correct) where choice=correct;
  update public.volunteer_applications set quiz_score=greatest(coalesce(quiz_score,0),grade) where user_id=auth.uid();
  return grade;
end $$;
create function public.advance_volunteer_training(lesson integer,answers integer[] default null) returns integer
 language sql security invoker set search_path='' as $$select private.advance_training(lesson,answers)$$;
revoke all on function private.advance_training(integer,integer[]),public.advance_volunteer_training(integer,integer[]) from public,anon;
grant execute on function private.advance_training(integer,integer[]),public.advance_volunteer_training(integer,integer[]) to authenticated;
