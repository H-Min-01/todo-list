# do it — Todo List

할 일 목록을 관리하는 To Do 서비스입니다. Figma 디자인 시안을 기준으로 컬러 시스템, 타이포그래피, 컴포넌트 스펙을 그대로 재현했습니다 (자세한 추출 내역은 [design-spec.md](./design-spec.md) 참고).

배포 링크: _(배포 후 추가 예정)_

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [assignment-todolist-api](https://assignment-todolist-api.vercel.app/docs/) (Swagger 문서 기준 REST API)

## 주요 기능

**할 일 목록 페이지 (`/`)**
- 진행 중 / 완료 할 일을 구분해서 표시
- 입력창에 할 일을 입력 후 `추가하기` 버튼 클릭 또는 **Enter 키**로 새 할 일 생성
- 체크박스 클릭으로 진행 중 ↔ 완료 상태 토글
- 로고 클릭 시 `/`로 전체 새로고침 이동

**할 일 상세 페이지 (`/items/{itemId}`)**
- 이름 / 완료 상태 / 메모 수정
- 이미지 첨부 (최대 1개)
  - 파일 이름은 영문/숫자만 허용 (정규식 검증)
  - 파일 크기 5MB 이하만 허용
  - 조건 미충족 시 화면에 에러 메시지 표시
- `수정 완료` 클릭 시 저장 후 목록 페이지로 이동
- `삭제하기` 클릭 시 삭제 후 목록 페이지로 이동
- 재방문 시 저장된 메모/이미지가 그대로 표시됨 (서버에서 다시 조회)

**공통**
- 반응형 웹 디자인: 모바일(~375px) / 태블릿(376~744px) / 데스크탑(745px~)
- Figma 컬러 시스템 그대로 적용, 공용 컴포넌트(Button, TextField, Checkbox, Header 등) 재사용

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

### 환경 변수

`.env.example`을 복사해 `.env.local`을 만들고 본인의 tenantId를 지정합니다.

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_TENANT_ID=your-tenant-id
```

- API는 `https://assignment-todolist-api.vercel.app/api/{tenantId}` 형태로 호출되며, `tenantId`는 [src/lib/api.ts](./src/lib/api.ts)에서 `NEXT_PUBLIC_TENANT_ID` 값을 읽어 조립합니다.
- `tenantId`는 본인만의 식별자(닉네임 등)를 자유롭게 지정하면 되고, 같은 tenantId를 쓰는 동안에는 데이터가 계속 유지됩니다.

### 빌드

```bash
npm run build
npm start
```

## 폴더 구조

```
src/
  app/
    page.tsx                 # 할 일 목록 페이지 (서버 컴포넌트, 목록 조회)
    layout.tsx                # 루트 레이아웃, 폰트/메타데이터
    globals.css                # Tailwind 테마 토큰(컬러/브레이크포인트/폰트)
    items/[itemId]/
      page.tsx                # 할 일 상세 페이지 (서버 컴포넌트, 단건 조회 + 404 처리)
      not-found.tsx            # 상세 페이지 404 화면
  components/
    common/                   # 공용 컴포넌트 (Button, TextField, Checkbox, Header)
    todo/                     # 도메인 컴포넌트 (TodoItem, TodoInput, ImageUploadBox, MemoBox 등)
  lib/
    api.ts                    # API 호출 함수 (getItems/getItem/createItem/updateItem/deleteItem/uploadImage)
    types.ts                  # API 요청/응답 타입
    fonts.ts                  # NanumSquare 웹폰트(next/font/local) 설정
public/
  fonts/                      # NanumSquare 폰트 파일(.woff2)
  images/                     # Figma에서 export한 SVG 에셋 (logo, icons, badges, illustrations, backgrounds)
figma/
  reference/                  # 코드로 옮기지 않고 참고용으로만 남긴 원본 Figma export
design-spec.md                 # Figma에서 추출한 컬러/타이포/스페이싱/에셋 명세
```

## 로컬 화면 확인

1. `npm run dev` 실행 후 `http://localhost:3000` 접속
2. 브라우저 개발자 도구(F12) → 기기 툴바로 375 / 744 / 1280px 등 폭을 바꿔가며 반응형 확인 가능
3. 상세 페이지는 목록에서 항목을 클릭하거나 `http://localhost:3000/items/{itemId}`로 직접 접속
