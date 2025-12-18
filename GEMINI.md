@./docs/structure-convention.md

# 프로젝트: 디지털 상품 EC 서비스

- 사용자의 데이터를 받아 커스텀 마이징 한 상품을 제작 및 배포해주는 EC 사이트

## 기술 스택

- tailwind + shadcn/ui 라이브러리
- Typescript
- Nextjs (App 디렉토리)
- mongoose + Mongo DB

##2 상태 관리 규약

> 원칙
>
> - 로컬 → Context API → Zustand 순으로 **상태 범위를 확장**한다.
> - **서버에서 받은 데이터는 useSWR**, 사용자 인터랙션으로 발생한 상태는 **클라이언트 상태 관리 도구**를 사용한다.

---

### Context API

- **컴포넌트 트리 내부에서만 공유되는 상태**에 사용한다.
- 특정 도메인(UI, 필터 등)에 한정된 상태 관리에 적합하다.
- 페이지 또는 기능 단위로 **범위가 명확히 제한된 경우**에만 사용한다.
- 전역 상태처럼 남용하지 않는다.

---

### Zustand

- **여러 컴포넌트 또는 여러 페이지에서 공통으로 사용되는 상태**에 사용한다.
- 페이지 이동과 무관하게 **유지되어야 하는 상태**에 적합하다.
- Context API로 관리하던 상태가 **범위를 벗어나는 경우** Zustand로 승격한다.
- **비즈니스 로직(클라이언트 관점: 서비스 흐름·상태 규칙)** 이 포함된 경우 Zustand를 우선 고려한다.

---

### useSWR

- **서버 상태(Server State)** 관리에 사용한다.
- 동일한 API 요청의 **중복 호출 방지 및 캐싱**을 위해 사용한다.
- 데이터 패칭, 리페치, 캐시 동기화가 필요한 경우에 적합하다.
- 클라이언트 UI 상태와 혼용하지 않는다.

## API & Data Convention

- **Server Actions**: `src/actions` 혹은 `domains/*/actions`에 위치하며, 반드시 `"use server"` 지시어를 상단에 선언한다.
- **Data Validation**: `zod` 라이브러리를 사용하여 Schema를 정의하고, 클라이언트(Form)와 서버(API/Action)에서 동일한 스키마를 공유한다.
- **Mongoose**:
  - DB 모델은 `src/models`에 정의한다.
  - Lean 쿼리(`.lean()`)를 적극 사용하여 성능을 최적화하고 POJO(Plain Old JavaScript Object) 형태로 클라이언트에 전달한다.

## Error & Loading Handling

- **Loading**: Next.js의 `loading.tsx`를 기본으로 하되, 컴포넌트 내부의 부분 로딩은 `shadcn/ui`의 Skeleton을 사용한다.
- **Error**: 비즈니스 에러와 시스템 에러를 구분하며, 유저 피드백은 `sonner` (Toast) 라이브러리를 우선 사용한다.
