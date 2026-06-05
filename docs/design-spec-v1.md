# 운동숙제 Design Spec v1

> Source: `Design Principles and Wireframes.zip` → `docs/design-export/`  
> Applied to Next.js app: `src/shared/ui/design-system/`

## Design Principles

1. **15초 완결** — 3탭 이내, 56px+ 터치, 스크롤 최소
2. **기억력 대체** — 컨텍스트 알럿, 회원 칩에 최근 세션 날짜
3. **Brutal but Not Broken** — `rounded-none`, border-2 black, neon CTA, yellow alert
4. **한 손 + 피로 모드** — 회원 SET 버튼 2열, 하단 CTA 고정
5. **White-Label Ready** — `--color-primary` CSS 변수

## Tokens (globals.css)

| Token | Value | Usage |
|-------|-------|--------|
| `--color-primary` | `#CCFF00` | CTA, SET 완료, 체크박스 |
| `--color-alert` | `#FFFF00` | 컨텍스트 알럿 |
| `--color-success` | `#00FF00` | 완료 상태 (예약) |
| Surface | `#FFFFFF` | 카드·패널 |
| Background | `#000000` | 앱 외곽 |

## Components

- `BrutalButton` — primary / secondary / set
- `BrutalChip` — 회원 선택 (이름 + sublabel)
- `BrutalCard` — 운동 카드
- `BrutalAlert` — 컨텍스트 알럿
- `BrutalProgressBar` — 회원 진행률
- `WorkspaceHeader` — 로고 + 트레이너 이니셜

## Screens

### Trainer (`/`)
- Header → 회원 칩 → (알럿) → 운동 추가/필터 → 선택 카드 → 추가 리스트 → 하단 CTA

### Member (`/h/[token]`)
- Header + 날짜 → 진행률 → 운동 카드 + SET 2열 → 마이크로 허들 → 완료 CTA

## Figma Frame Naming (reference)

```
운동숙제_Mobile_375px
├─ 01_Design_System
├─ 02_Trainer_Workspace
├─ 03_Member_Magic_Link
└─ 04_KakaoLink_OG
```

## White-Label

센터별 브랜딩 시 `globals.css`의 `--color-primary`만 변경.

```css
:root {
  --color-primary: #FF6B35; /* 예: 센터 A */
}
```
