# 운동숙제 (Exercise Homework)

B2B 피트니스 CRM MVP — 트레이너가 **15초 안에** 회원 숙제를 만들고 카카오 링크로 보내고, 회원은 앱 없이 매직 링크로 완료합니다.

## 핵심 플로우

```
트레이너: 회원 선택 → 운동·큐잉 → 저장 및 카카오 전송
회원:     /h/{token} → SET 체크 → 가장 힘든 운동 → 완료
```

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + Brutal Design System
- Zustand (워크스페이스) + TanStack Query (API)
- Supabase PostgreSQL

## 로컬 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수

`.env.example`을 복사해 `.env.local` 생성:

```bash
cp .env.example .env.local   # Windows: copy .env.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service role (API 전용, **클라이언트 노출 금지**) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (로컬) |

### 3. Supabase DB

Supabase Dashboard → **SQL Editor**에서 순서대로 실행:

1. `supabase/migrations/0001_init_clients_records.sql`
2. `supabase/seed.sql`

### 4. 개발 서버

```bash
npm run dev
```

- 트레이너 워크스페이스: http://localhost:3000
- 회원 매직 링크: http://localhost:3000/h/{magic_token}

### 5. 빌드 확인

```bash
npm run build
npm start
```

## Vercel 배포

### 방법 A — Vercel Dashboard (추천)

1. GitHub에 repo push
2. [vercel.com](https://vercel.com) → **Add New Project** → repo import
3. **Environment Variables** 추가 (Production + Preview):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service role key |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

4. Deploy → 배포 URL을 `NEXT_PUBLIC_APP_URL`에 다시 설정 후 **Redeploy**

### 방법 B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# env는 vercel.com 대시보드에서 설정
vercel --prod
```

> `SUPABASE_SERVICE_ROLE_KEY`는 **Server** 환경 변수로만 등록하세요.

## 프로젝트 구조

```
src/
  app/
    (workspace)/page.tsx    # 트레이너 워크스페이스
    h/[token]/page.tsx      # 회원 매직 링크
    api/records/            # 생성·완료·최근 피드백
  features/                 # clients, records, magic-link, ...
  shared/ui/design-system/  # BrutalButton, Chip, Card, ...
lib/constants/exercises.ts  # 운동 50종 (한국어)
supabase/migrations/        # DB 스키마
docs/                       # design-spec, demo-script
```

## API

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/records` | 숙제 생성 → `{ id, magic_token }` |
| POST | `/api/records/complete` | 회원 완료 처리 |
| GET | `/api/records/latest?clientId=` | 컨텍스트 알럿용 최근 완료 |

## 3분 데모 스크립트

상세: [`docs/demo-script.md`](docs/demo-script.md)

1. **0:00** — 「트레이너는 회원 기억 안 해도 됩니다」→ 김민수 선택 → **노란 알럿**
2. **0:30** — 스콰트 검색 → 큐잉 `#호흡유지` → **저장 및 카카오 전송**
3. **1:30** — 휴대폰 링크 → SET 전부 탭 → **완료하기**
4. **2:30** — Supabase `records` → `completed` 확인
5. **3:00** — 같은 회원 재선택 → 알럿에 방금 답변 반영

## 문서

- [TASKS.md](./TASKS.md) — 72h 스프린트 체크리스트
- [docs/design-spec-v1.md](./docs/design-spec-v1.md) — 디자인 토큰·컴포넌트
- [docs/demo-script.md](./docs/demo-script.md) — 데모 대본

## Phase 2 (미구현)

Admin 대시보드, 멀티 센터, B2B2C 회원 네트워크 — `TASKS.md` 하단 참고.

## License

Private — MVP internal use.
