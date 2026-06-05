-- Enable extension for UUID generation
create extension if not exists pgcrypto;

-- =========================
-- clients
-- =========================
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null, -- MVP: 소유 트레이너 식별자(추후 auth.users FK로 확장 가능)
  name text not null,
  phone text,               -- 카카오 공유 타겟(선택 입력)
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clients_trainer_id on public.clients(trainer_id);
create index if not exists idx_clients_created_at on public.clients(created_at desc);

-- updated_at 자동 갱신
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_clients_updated_at on public.clients;
create trigger trg_clients_updated_at
before update on public.clients
for each row
execute function public.set_updated_at();


-- =========================
-- records
-- sessions/homeworks 통합 모델
-- =========================
create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null,
  client_id uuid not null references public.clients(id) on delete cascade,

  -- 공유/접속
  magic_token text not null unique, -- /h/[token]
  share_url text,                   -- 생성 당시 URL 스냅샷(선택)

  -- 핵심 payload
  exercises_json jsonb not null,    -- [{id,name,default_desc,cue,sets,reps,...}] immutable snapshot
  note text,

  -- 상태
  status text not null default 'sent'
    check (status in ('draft','sent','viewed','completed','archived')),

  -- client 완료 경험(micro-hurdle)
  micro_hurdle_question text,
  micro_hurdle_answer text,
  completed_at timestamptz,

  -- 운영 로그 타임스탬프
  sent_at timestamptz,
  viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- 최소 유효성
  constraint chk_exercises_json_is_array check (jsonb_typeof(exercises_json) = 'array')
);

create index if not exists idx_records_trainer_id on public.records(trainer_id);
create index if not exists idx_records_client_id on public.records(client_id);
create index if not exists idx_records_status on public.records(status);
create index if not exists idx_records_created_at on public.records(created_at desc);
create index if not exists idx_records_magic_token on public.records(magic_token);

-- JSONB 탐색 성능(향후 분석/검색 확장 대비)
create index if not exists idx_records_exercises_json_gin
  on public.records
  using gin (exercises_json jsonb_path_ops);

drop trigger if exists trg_records_updated_at on public.records;
create trigger trg_records_updated_at
before update on public.records
for each row
execute function public.set_updated_at();
