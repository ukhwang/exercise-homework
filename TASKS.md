# TASKS.md — 운동숙제 72시간 MVP

> **마지막 업데이트:** 2026-06-03  
> **전체 진행률:** ~78% (Day 1·2 핵심 완료 / Day 3·운영 미착수)

## 목표

- KPI: 트레이너가 `클라이언트 선택 → 운동 선택 → 큐잉 수정 → 카카오 링크 전송`을 **15초 내** 완료
- 범위: Phase 1만 (B2B 생산성 도구)
- 비범위: Admin 분석, 멀티센터, 결제, 복잡 권한, 회원 앱 설치

---

## Day 1 — Foundation + Core Flow

### 1) 프로젝트/설계 고정

- Next.js(App Router) + TypeScript + Tailwind 초기화
- `/features` 중심 폴더 구조 생성
- Zustand + TanStack Query Provider 세팅
- `.env.local` 템플릿 및 환경변수 로딩
- shadcn/ui 초기화 (미사용 — Brutal Design System으로 대체)

### 2) 데이터 계층 구축

- Supabase 프로젝트 연결 (`.env.local` 설정됨)
- `clients`, `records` 마이그레이션 SQL (`0001_init_clients_records.sql`)
- **RLS 최소 정책** (트레이너 본인 데이터만) — **미구현**
- 데모 seed (`supabase/seed.sql` — 회원 5명)
- Supabase 저장 동작 확인 (`records` 4건+ 적재 확인됨)

### 3) 핵심 정적 데이터/타입

- `/lib/constants/exercises.ts` — 50개 운동 **한국어** 하드코딩
- exercise/record Zod 스키마 (`record.schema.ts`)
- API payload 타입 통일 (`entities/`*, `features/*/model`)

### 4) 단일 워크스페이스 UI

- 한 화면 4단계 패널 (회원 / 검색·운동 / 큐잉 / 전송)
- 버튼·칩 hitbox **56px+** (`h-14` / `h-16`)
- 키보드 최소 입력 (태그형 큐잉, +/- 스테퍼)
- **추가:** 텍스트 검색, 커스텀 운동/태그, Figma DS 반영

### 5) API 골격

- `POST /api/records` — 생성 + `magic_token` 반환
- `GET /api/records?clientId=` — 전체 이력 조회 (**미구현**, `latest`만 있음)
- `POST /api/share` — 공유 메시지 빌드 (**501 스텁**)

### Day 1 완료 기준

- 트레이너 화면 end-to-end 클릭 플로우 동작
- DB insert/조회 실제 동작

---

## Day 2 — Real Workflow + Magic Link

### 1) 트레이너 15초 플로우 최적화

- client selector (최근순 + 이름 칩)
- exercise 빠른 검색 + 다중 선택
- cue chip 프리셋 + **커스텀 태그 직접 추가**
- TanStack Query mutation + 전송 중 중복 방지
- **15초 KPI 실측** (p50/p90) — **미측정**

### 2) 공유/링크

- `magic_token` URL 생성 (`/h/[token]`)
- Web Share API + 클립보드 폴백 토스트
- 전송 성공 시 Zustand 워크스페이스 reset
- 카카오 OG 메타/썸네일 — **미구현**

### 3) 클라이언트 페이지

- 로그인 없는 homework 조회 (Server Component + Supabase)
- 운동 리스트 + 큐잉 가독성 (모바일)
- **세트별 SET 버튼** 완료 체크 (2열, 5세트↑ 1열)
- Micro-Hurdle (가장 힘든 운동 선택) → `completed` 처리
- `completed_at` + `micro_hurdle_answer` DB 저장

### 4) Aha-moment (플랜 후반 추가)

- `GET /api/records/latest?clientId=` — 최근 완료 피드백
- `useLatestCompletedRecord` + **컨텍스트 알럿** (노란 배너)

### 5) 품질/안전장치

- Zod 입력 검증 (records create/complete)
- API 에러 응답 + UI 에러 문구
- 로딩 상태 (저장 중..., 처리 중...)
- 빈/에러 상태 **전 화면** 표준화 — **부분 완료**

### Day 2 완료 기준

- 실제 URL 공유 → 타 기기에서 조회/완료 가능
- 핵심 KPI 경로 끊김 없이 동작
- 15초 목표 **수치 검증** — **미완**

---

## Day 3 — Polish, Metrics, Launch

### 1) KPI 계측

- `workspace_start → share_success` 구간 시간 측정
- 10회 반복 p50/p90 확인
- 15초 초과 병목 개선

### 2) UX 마감

- Brutalism DS 1차 적용 (Figma ZIP → `design-system/`)
- CSS 변수 `--color-primary` (화이트라벨 준비)
- 터치 영역 QA 체크리스트 문서화
- 키보드 없는 시나리오 최종 검증 기록

### 3) 운영 준비

- README (로컬 실행 / env / Supabase migration)
- 3분 데모 스크립트 (`docs/demo-script.md`)
- `.env.example` 템플릿
- Supabase migration/rollback 절차 (README에 간략 포함됨, rollback 상세 미작성)
- `docs/design-spec-v1.md` ↔ Figma 동기화 확인

### 4) 버그배시 + 배포

- 크리티컬 버그 triage (P0/P1)
- **Vercel 배포** — [https://exercise-homework.vercel.app](https://exercise-homework.vercel.app)
- 카카오 공유/접속/완료 E2E 최종 리허설

### Day 3 완료 기준

- 72시간 MVP **배포 완료**
- KPI(15초) 측정 결과 확보
- Phase 2 확장 포인트 문서화

---

## 플랜 외 추가 완료 (보너스)

- 운동명 한국어 패치 (스콰트 등)
- 커스텀 운동 추가 (`exercise.store` + localStorage)
- 카테고리 필터: 근력 / 유산소 / 스트레칭
- 회원 진행률 바 + 완료 화면 통계
- `docs/figma-design-prompt.md`, `docs/design-spec-v1.md`

---

## 남은 작업 우선순위 (추천)


| 순위  | 작업                         | 예상   |
| --- | -------------------------- | ---- |
| P0  | Vercel 배포 + README         | 1~2h |
| P0  | 3분 데모 스크립트 작성              | 30m  |
| P1  | RLS 최소 정책                  | 1h   |
| P1  | 15초 KPI 간단 계측              | 1h   |
| P2  | 회원 칩 `lastSession` 실데이터 연동 | 2h   |
| P2  | 카카오 OG / `/api/share`      | 2h   |
| P3  | `GET /api/records` 이력 API  | 1h   |
| P3  | 운동 **무게(kg)** 필드           | 2h   |


---

## 데모 시나리오 (현재 가능)

1. 워크스페이스 → **김민수** 선택 → 노란 컨텍스트 알럿 확인
2. **스콰트** 검색 → 추가 → 큐잉 `#호흡유지` → **저장 및 카카오 전송**
3. 링크 열기 → SET 버튼 전부 탭 → 가장 힘든 운동 선택 → **완료하기**
4. Supabase `records` 테이블에서 `status=completed` 확인
5. 워크스페이스에서 같은 회원 재선택 → 알럿 갱신 확인

---

## Phase 2+ (지금 하지 않음)

- Center Admin Dashboard
- 멀티 트레이너 워크스페이스
- `sessions` / `homeworks` 테이블 분리
- 커스텀 운동 Supabase 동기화 (센터 공유 DB)
- B2B2C 회원 네트워크

