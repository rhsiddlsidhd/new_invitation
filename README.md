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

## 🛠 Tech Stack

- TypeScript
- React
- Next.js
- Tailwind, Framer Motion
- zustand
- vercel(배포)

## ☠️ Bug

- The Subway Input field is missing in the user wedding information data
- Music button has no sound assigned
