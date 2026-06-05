-- Weekly routine upgrade: appointment_time + 7-day exercises_json

alter table public.records
  add column if not exists appointment_time timestamptz,
  add column if not exists routine_start_date date,
  add column if not exists day_completions jsonb not null default '[]'::jsonb;

-- exercises_json: [{ "day": 1, "exercises": [...] }, ...]
alter table public.records
  drop constraint if exists chk_exercises_json_is_array;

alter table public.records
  add constraint chk_exercises_json_is_array
  check (jsonb_typeof(exercises_json) = 'array');

create index if not exists idx_records_appointment_time
  on public.records (appointment_time);

create index if not exists idx_records_routine_start_date
  on public.records (routine_start_date);
