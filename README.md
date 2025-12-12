# 💌 NEW_INVITATION

You can check the deployed app here:

➡️[https://new-invitation-pi.vercel.app/](https://new-invitation-pi.vercel.app/)

청첩장 만들기 서비스

`가족 결혼식에 청첩장을 배포하여 제공해줘볼까? 하는 생각으로부터 프로젝트 시작`

📁 Project Architecture

-Atomic design 적용 중

```
new_invitation/
├─ README.md
├─ package.json
├─ public/
│ └─ ...
├─ src/
│ ├─ app/
│ │ ├─ api/
│ │ │ └─ ... # route handlers
│ │ ├─ profile/
│ │ │ └─ page.tsx
│ │ ├─ layout.tsx
│ │ └─ ... # other Next.js pages/segments
│ ├─ actions/ # Server Actions ("use server")
│ │ └─ ...
│ ├─ components/
│ │ ├─ atoms/ # 가장 작은 단위의 컴포넌트
│ │ │ ├─ Btn # 버튼 UI
│ │ │ │ └─ index.tsx
│ │ │ ├─ Icon # 아이콘 UI
│ │ │ │ └─ index.tsx
│ │ │ └─ ...
│ │ ├─ molecules/ # 2개 이상의 Atom 으로 구성된 UI 컴포넌트
│ │ │ ├─ btns/
│ │ │ │ ├─ MusicBtn
│ │ │ │ │ └─ index.tsx # 버튼 + Icon + 이벤트 핸들러
│ │ │ │ └─ ...
│ │ │ │
│ │ │ └─ ...
│ │ ├─ organisms/ # 페이지 내 블록 단위 컴포넌트
│ │ │ ├─ panel/
│ │ │ │ ├─ ParentInfoPanel
│ │ │ │ │ ├─ constant.ts # 해당 컴포넌트 전용 상수 모음
│ │ │ │ │ ├─ type.d.ts # 해당 컴포넌트 전용 타입 모음
│ │ │ │ │ ├─ variants.ts # 해당 컴포넌트 전용 motion variants
│ │ │ │ │ └─ index.tsx # Input + Btn 등 블록 단위 컴포넌트
│ │ │ │ └─ ...
│ │ │ │
│ │ │ └─ ...
│ │ └─ layout/ # Header, Footer 등 레이아웃 관련 컴포넌트
│ ├─ hooks/ # React 훅 (클라이언트 전용 로직)
│ ├─ store/ # zustand 등 전역 상태관리
│ ├─ services/ # 외부 API / 비즈니스 로직 (user, invitation 등)
│ ├─ lib/ # jose, cloudinary 설정 등 외부 라이브러리 설정/유틸 모음
│ ├─ utils/ # 유틸 함수, validation 등
│ ├─ types/ # 전역 타입 정의
│ ├─ constants/ # 전역 상수
│ └─ styles/ # 전역 스타일, motion variants (공용)
│
└─ ...

```

📁 App Directory Routing Guide

```
app
├─ api
│  ├─ auth
│  │ └─ route.ts
│  ├─ invitation
│  │ └─ [userId]
│  │   └─ route.ts
│  └─...
├─ dashboard
│ ├─ edit
│ │ └─ page.tsx     # /dashboard/edit (대시보드 수정)
│ └─page.tsx        # /dashboard (대시보드)
├─ products/
│ ├─ mobile-invitation
│ │ └─ [productId]
│ │   └─ page.tsx       # /products/mobile-invitation/[productId] (모바일 청첩장 상세 페이지)
│ └─ page.tsx       # /products (상품 페이지)
├─ profile
│ ├─ verify
│ │ ├─ delete
│ │ │ └─ page.tsx   # /profile/verify/delete (프로필 계정 삭제)
│ │ ├─ edit
│ │ │ └─ page.tsx   # /profile/verify/edit (프로필 수정)
│ │ ├─ password
│ │ │ └─ page.tsx   # /profile/verify/password (패스워스 변경)
│ │ └─ page.tsx     # /profile/verify (인증/검증)
│ └─ page.tsx       # /profile (프로필)
├─ preview
│ └─ mobile-invitation
│   └─ [productId]
│     └─ page.tsx   # /preview/mobile-invitation/[productId] (모바일 청첩장 미리보기)
├─ layout.tsx
├─ page.tsx             # / (홈페이지)
└─ sitemap.ts

middlewaer.ts

```

### 홈페이지 (`/`)

- 랜딩 페이지로 프로젝트 소개
- 서버에서 받아오는 데이터가 없고 페이지 소개와 함께 Navigate 와 Animation만을 담당하는 페이지는 Static Page

### 프로필 (`/profile`)

- 사용자 정보 조회 및 관리
- 사용자의 데이터에 따른 페이지로 SSR

### 대시보드 (`/dashboard`)

- 청첩장 데이터 작성 및 관리
- 사용자의 데이터에 따른 페이지로 SSR

### 상품 페이지 (`/products`)

- 상품 목록을 보여주는 페이지
- 정적 데이터 PRODUCT_LIST 를 바탕으로 보여주는 페이지로 Static Page

### 상품 상세 페이지 (`/products/[id]`)

- 특정 상품의 상세 페이지
- 모든 유저가 접속해도 상품 데이터가 변하지 않으므로, 모든 상품 상세 페이지는 SSG로 생성

### 미리보기 (`/preview/카테고리/[productId]`)

- 특정 상품(productId)을 기반으로 한 미리보기 페이지
- 상품 정보는 SSG로 미리 렌더링
- 사용자별 정보(userId)는 쿼리 파라미터를 통해 받아 서버 사이드 렌더링(SSR) 방식으로 처리

## 🛠 Tech Stack

- TypeScript
- React
- Next.js
- Tailwind, Framer Motion
- zustand
- vercel(배포)

## ☠️ Bug

- The Subway Input field is missing in the user wedding information data.
- Music button has no sound assigned.
- The Contact component is not yet published.

## Update

09.16

- Generate Sample Invitation SSG Page
- Generate Sitemap.ts
- Added Metadata to index Page
- Updated Footer UI

  09.17

- Route change
- Create a product page and a product detail page
- Add different styling based on the invitation ID

  09.18

- resolve Kakao Map API Bug
- Envirments variants update
