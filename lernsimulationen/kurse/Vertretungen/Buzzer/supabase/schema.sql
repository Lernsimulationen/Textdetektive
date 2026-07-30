-- Classroom Buzzer: im Supabase SQL Editor ausführen.
-- Es werden keine Namen über drei Zeichen oder anderen personenbezogenen Daten benötigt.
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (char_length(code) = 6),
  active boolean not null default false,
  mode text not null default 'buzzer' check (mode in ('buzzer', 'truefalse', 'poll', 'speed')),
  group_mode boolean not null default false,
  settings jsonb not null default '{"animations":true,"multipleWinners":false,"pollOptions":["A","B","C","D"]}'::jsonb,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '12 hours'
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 20),
  color text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  value text not null check (char_length(value) between 1 and 20),
  created_at timestamptz not null default now()
);

alter table public.sessions enable row level security;
alter table public.participants enable row level security;
alter table public.responses enable row level security;

-- Anonyme Schüler dürfen nur diese kurzlebigen, pseudonymen Sitzungsdaten lesen/schreiben.
create policy "anon reads classroom sessions" on public.sessions for select to anon using (expires_at > now());
create policy "anon creates classroom sessions" on public.sessions for insert to anon with check (expires_at <= now() + interval '12 hours');
create policy "anon updates classroom sessions" on public.sessions for update to anon using (expires_at > now()) with check (expires_at > now());
create policy "anon reads classroom participants" on public.participants for select to anon using (true);
create policy "anon joins classroom session" on public.participants for insert to anon with check (true);
create policy "anon reads classroom responses" on public.responses for select to anon using (true);
create policy "anon submits classroom response" on public.responses for insert to anon with check (true);

grant select, insert, update on public.sessions to anon;
grant select, insert on public.participants to anon;
grant select, insert on public.responses to anon;

alter publication supabase_realtime add table public.sessions, public.participants, public.responses;
