# 📁 File & Folder Convention (GRMINI)

## 목적

본 문서는 GRMINI 프로젝트 전반에서 사용하는  
**파일 / 폴더 구조, 도메인 분리 기준, index.ts(x) 사용 규칙**을 정의한다.

- import 경로의 일관성 유지
- 도메인 중심 구조를 통한 코드 응집도 향상
- Atomic UI 와 비즈니스 로직의 명확한 분리
- 리팩토링 및 확장에 강한 구조 지향

---

## 네이밍 규칙

- **React 컴포넌트 / 컴포넌트 폴더 / use 훅**: `PascalCase`
- 그 외 모든 파일 및 폴더: `camelCase`

---

## 1. 최상위 폴더 구조

```txt
src/
├─ app/
├─ components/
├─ domains/
├─ shared/
└─ styles/
```

## 2. 최상위 폴더 역할 정의

### /src/app

- Next.js App Router 엔트리
- 라우트, 레이아웃, 페이지 단위 컴포넌트 위치
- 비즈니스 로직을 포함하지 않는다
- 도메인 모듈을 조립(composition)하는 역할만 수행

---

### /src/components

- Atomic Design 패턴 적용
- 도메인에 의존하지 않는 순수 UI 컴포넌트
- 재사용을 목적으로 설계
- ⚠️ API 호출, 상태 관리, 비즈니스 규칙 정의 금지

---

### /src/domains

- 비즈니스 로직의 핵심
- 기능(도메인) 단위로 코드 응집
- 도메인 내부에서 역할 기준으로 세분화

````txt
domains/
├─ template/
│  ├─ actions/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  ├─ services/
│  ├─ store/
│  ├─ models.ts
│  ├─ types.ts
│  └─ index.ts
│
└─ auth/
   ├─ actions/
   ├─ constants/
   ├─ hooks/
   └─ index.ts

### /src/shared

- 특정 도메인에 속하지 않는 공통 코드
- 여러 도메인에서 재사용 가능

```txt
shared/
├─ constants/
├─ utils/
├─ types/
└─ lib/


## 3. 도메인 설계 원칙

- 도메인은 **“무엇에 대한 규칙인가”**를 기준으로 정의한다
- 역할(actions, hooks, services 등)은 **도메인 내부에서만** 구분한다
- 도메인 삭제 시, 해당 폴더 제거만으로 기능이 제거되어야 한다

---

### ❌ 역할 중심 구조 (금지)
- hooks / services / models 가 역할 기준으로 흩어져 있는 구조

---

### ✅ 도메인 중심 구조 (권장)
- `domains/template` 내부에 template 관련 모든 코드가 존재



## 4. index.ts / index.tsx 규칙

### 4.1 공통 규칙
- `index.ts` / `index.tsx`는 폴더의 **Public Entry Point**
- 외부에서는 **파일명이 아닌 폴더 경로로만 import** 한다

```ts
// ✅ Good
import { useTemplateFilter } from "@/domains/template";

// ❌ Bad
import { useTemplateFilter } from "@/domains/template/hooks/useTemplateFilter";


### 4.2 index.ts 규칙

- JSX가 없는 경우 사용
- **barrel export 전용**
- 로직, 상수, 규칙 정의 금지

```ts
// domains/template/index.ts
export * from "./hooks";
export * from "./actions";
export * from "./constants";


### 4.3 index.tsx 규칙

- React 컴포넌트의 **진입점으로만 사용**
- JSX 반환 필수
- **barrel export 용도로 사용하지 않는다**

## 5. React 컴포넌트 규칙

### 5.1 Atomic 컴포넌트 구조 (`/components`)

```txt
Button/
├─ index.tsx
├─ Button.styles.ts   // 선택
├─ Button.types.ts    // 선택
└─ Button.test.tsx    // 선택


**규칙**
- 컴포넌트 이름 = 폴더 이름
- JSX 반환 시 `index.tsx` 필수
- 상태 최소화, props 기반 설계


## 6. 비(非) 컴포넌트 모듈 규칙

### 대상
- utils
- constants
- types
- services
- config

```txt
constants/common/
├─ index.ts
├─ pagination.ts
└─ regex.ts

```
// constants/common/index.ts
export * from "./pagination";
export * from "./regex";
```



## 7. Import 규칙

- 파일 단위 import 금지
- 항상 **폴더 기준 import** 사용

```ts
// ✅ 권장
import { DEFAULT_PAGE_SIZE } from "@/shared/constants";

// ❌ 금지
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/common/pagination";

## 8. 설계 철학 요약

- UI는 **Atomic Design**
- 비즈니스 로직은 **Domain 중심**
- 역할 분리는 **도메인 내부에서만** 수행
- `index`는 **Public API 경계**
- `app`은 **조립자 역할**

본 규칙은 **GRMINI 프로젝트 전반에 동일하게 적용**한다.
````
