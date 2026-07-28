# Design Spec — Todo List ("do it")

Figma file: `8f3n0VpsCnyc2nQkXHXs0v`
Figma MCP 조회는 Starter/View 시트 월 6회 한도로 인해 중단됨. 이후 스펙은 사용자가 직접 export한 스크린샷/SVG를 기준으로 확정.

## 1. Color System

| Token | HEX | 용도 |
|---|---|---|
| `slate-900` | `#0F172A` | 기본 텍스트, 보더, 버튼 진한 배경 |
| `slate-800` | `#1E293B` | 진한 텍스트 |
| `slate-500` | `#64748B` | 보조 텍스트, 아이콘 |
| `slate-400` | `#94A3B8` | placeholder |
| `slate-300` | `#CBD5E1` | 보더 |
| `slate-200` | `#E2E8F0` | 연한 보더/배경 |
| `slate-100` | `#F1F5F9` | 입력창 배경 |
| `violet-600` | `#7C3AED` | Primary |
| `violet-100` | `#EDE9FE` | Primary 연한 배경 |
| `rose-500` | `#F43F5E` | 삭제/경고(삭제하기 버튼) |
| `amber-800` | `#92400E` | 경고 텍스트 |
| `lime-300` | `#BEF264` | TO DO 배지 배경 |
| `green-700` | `#15803D` | TO DO 배지 텍스트 / DONE 배지 배경 |
| `amber-300` | `#FCD34D` | DONE 배지 텍스트 |
| `purple-600` (로고 전용) | `#6500C3` | 로고 SVG 내부 색상 (SVG에 내장, 별도 토큰화 불필요) |
| `yellow-50` | `#FEFCE8` | 메모 배경 |
| `amber-100` | `#FEF3C7` | 메모 줄무늬 라인 |
| white | `#FFFFFF` | — |
| black | `#000000` | — |

## 2. Typography

폰트: `NanumSquare` (웹폰트, `next/font/local`로 `public/fonts/*.woff2` 로드). Text Style로 등록되어 있지 않음 — 개별 노드 적용값 기준.

| 크기 | 굵기 |
|---|---|
| 20px | Bold (700) |
| 18px | Bold (700) |
| 16px | ExtraBold (800) |
| 16px | Bold (700) |
| 16px | Regular (400) |

line-height/letter-spacing 커스텀 값 없음(기본값 사용).
로고("do it")는 텍스트가 아니라 완전 벡터 SVG 에셋 — 폰트 종속성 없음.

## 3. Spacing / Radius / Border

- 공통 border: `2px solid`
- 버튼(Large) radius: `24px`
- 리스트 아이템(할일 행) radius: `27px` (높이 50px 기준, pill)
- 배지(TO DO/DONE) radius: `18px` (높이 36px 기준, pill — SVG 실측값. 초기 추정 23px는 오차였음, 18px가 정확)
- 버튼 내부 gap(아이콘-텍스트): `4px`
- 리스트 아이템 내부 gap(체크박스-텍스트): `16px`
- 체크박스 아이콘 32px, 버튼 아이콘 16px
- GNB 높이 `60px`, 하단 border `1px solid slate-200`

**버튼/아이템 공통 "하드 섀도우" 패턴**: `box-shadow` 미사용. `slate-900` 배경 사각형을 뒤에 깔고, 앞面 요소를 4px 오프셋(우하단)으로 배치하는 이중 레이어 방식.

## 4. Image / Search / Memo 컴포넌트 기준 (SVG 실측)

**Search / Input** (`figma/reference/search-reference.svg`, 정적 이미지로 사용 금지 — 실제 input 컴포넌트로 구현):
- 크기 1000×56 (반응형 시 100% width)
- 뒷면 사각형: `bg-slate-900` `border-2 border-slate-900` `rounded-[23px]`, 4px 아래/오른쪽 오프셋
- 앞면 사각형: `bg-slate-100` `border-2 border-slate-900` `rounded-[23px]`

**Memo 배경** (`public/images/backgrounds/memo-paper.svg`, 696×426):
- 배경색 `#FEFCE8`
- 가로 라인 `#FEF3C7` 2px, 32px 간격(y=22부터 시작) — textarea `line-height: 32px`로 맞추면 줄과 정렬됨
- 라운드 없음(직각) — 컨테이너 자체는 상위 카드에서 radius 적용 여부 스크린샷 기준 재확인 필요시 질문

## 5. 이미지 에셋 (public/images/)

| 파일 | 원본 노드 | 크기 | 용도 |
|---|---|---|---|
| `logo/logo-large.svg` | img Size=Large | 151×40 | GNB 로고 (Tablet/Desktop) |
| `logo/logo-small.svg` | img Size=Small | 71×40 | GNB 로고 (Mobile) |
| `favicon.svg` (public 루트) | img/favicon | 16×16 | 브라우저 파비콘 |
| `icons/icon-check.svg` | ic/check | 16×16 | 체크 표시 |
| `icons/icon-checkbox-checked.svg` | ic Property1=Variant2 | 24×24 | 완료 상태 체크박스 글리프 (⚠️ 정확한 사용처는 렌더링 후 스크린샷으로 재확인 필요) |
| `icons/icon-close.svg` | ic/X | 16×16 | 닫기/삭제 |
| `icons/icon-edit.svg` | ic/edit | 24×24 | 이미지 수정(연필) 버튼 |
| `icons/icon-plus.svg` | ic Property1=plus | 16×16 | 추가 |
| `icons/icon-image-placeholder.svg` | ic/img | 64×64 | 이미지 미첨부 placeholder |
| `badges/badge-todo.svg` | img/todo | 101×36 | "진행 중" 섹션 TO DO 스탬프 |
| `badges/badge-done.svg` | img/done | 97×36 | "완료" 섹션 DONE 스탬프 |
| `backgrounds/memo-paper.svg` | img/memo | 696×426 | 메모 영역 배경 (textarea 아래 배치) |
| `illustrations/empty-todo-large.svg` | img/empty Todo Large | 240×240 | 진행 중 빈 상태 (Desktop/Tablet) |
| `illustrations/empty-todo-small.svg` | img/empty Todo Small | 120×120 | 진행 중 빈 상태 (Mobile) |
| `illustrations/empty-done-large.svg` | img/empty Done Large | 240×240 | 완료 빈 상태 (Desktop/Tablet) |
| `illustrations/empty-done-small.svg` | img/empty Done Small | 120×120 | 완료 빈 상태 (Mobile) |

PNG/@2x/@3x는 사용하지 않음(SVG만 사용, 사용자 지시).

## 6. 상세 페이지 레이아웃 (사용자 제공 스크린샷 기준)

- 헤더: 로고만 좌측 상단, 하단 얇은 보더
- 체크박스+제목 바: 전체 너비 pill, 완료 시 배경 `violet-100`, 텍스트 취소선 + 보라 텍스트, 체크박스 `violet-600` 채움 + 흰 체크
- Desktop: 이미지 업로드 박스(좌) + 메모 박스(우) 2컬럼 / Mobile·Tablet: 세로 1컬럼(이미지 위, 메모 아래)
- 이미지 미첨부: 점선 테두리 박스 + 중앙 회색 placeholder 아이콘 + 우하단 원형 `+` 버튼
- 이미지 첨부됨: 사진이 박스를 채움(object-cover), 우하단 원형 연필(수정) 버튼
- 메모 박스: `memo-paper.svg` 배경 + 상단 "Memo" 라벨(주황/브라운 텍스트) + textarea, 최대 높이 도달 시 내부 스크롤
- 하단 버튼: `수정 완료`(연한 배경, 완료 상태면 `lime-300`/`violet-100` 계열로 변함 — 스크린샷상 진행중일 때 slate-200, 완료 시 lime 그린) / `삭제하기`(`rose-500` 배경, 흰 텍스트) — 둘 다 하드섀도우 패턴, pill 버튼

## 7. 미해결 항목 (구현 중 재확인 필요)

- 홈페이지(`/`) 전체 레이아웃은 Figma 스크린샷을 받지 못해 컴포넌트 스펙(버튼/리스트아이템/배지/GNB/검색창) 조합으로 추정 구현 → 완성 후 실제 시안과 대조 필요
- `icon-checkbox-checked.svg`의 정확한 배치(체크박스 안 아이콘인지, 별도 장식인지)는 렌더링 후 확인
