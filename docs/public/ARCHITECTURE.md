# 📁 File & Folder Convention

## 1. 최상위 폴더 구조 및 역할

| 폴더명        | 역할            | 상세 설명                                                      |
| :------------ | :-------------- | :------------------------------------------------------------- |
| `app/`        | Routing & Views | URL 경로, 레이아웃, 페이지 정의 (Next.js 핵심 디렉토리)        |
| `components/` | UI Components   | Atomic Design 원칙에 따라 UI 요소를 계층적으로 관리.           |
| `models/`     | Data Models     | 데이터베이스 엔티티 및 스키마 정의 (Prisma, Mongoose 등)       |
| `services/`   | Business Logic  | 실제 DB 접근 및 비즈니스 로직 처리 (백엔드 핵심)               |
| `actions/`    | Server Actions  | 클라이언트가 호출하는 서버 측 함수 (`use server`)              |
| `schemas/`    | Validation      | Zod 스키마 및 타입 추출 (프런트/백 공통 검증)                  |
| `store/`      | Global State    | Client-side 전역 상태 관리 (Zustand 등)                        |
| `hooks/`      | Custom Hooks    | React 커스텀 훅 (재사용 가능한 UI/데이터 로직)                 |
| `context/`    | React Context   | Provider를 통한 하위 컴포넌트 상태 공유                        |
| `utils/`      | Utilities       | 순수 함수 및 헬퍼 함수 (날짜 계산, 포맷팅 등)                  |
| `lib/`        | Libraries       | 외부 라이브러리 설정/초기화 (Prisma Client, Axios 인스턴스 등) |
| `constants/`  | Constants       | 앱 내 변하지 않는 상수 (에러 메시지, 환경 변수 키 등)          |
| `types/`      | Global Types    | 공통 interface 및 전역 타입 정의                               |

## 2. 네이밍 규칙

### 2.1 파일 및 폴더

- **Components**
  - 모든 UI 컴포넌트는 PascalCase를 사용합니다.
  - 예: `Button.tsx`, `Input.tsx`, `UserCard.tsx`
- **Logic Files**: `kebab-case.ts` (예: `auth-service.ts`, `user-schema.ts`)
- **Folders**: `kebab-case` (예: `user-profile`, `api-handler`)
- **Next.js Routes**: `(grouping)`, `[id]` 등 프레임워크 예약 규칙 준수

### 2.2 Next.js Actions && Services

1. **HTTP 메서드는 포함하지 않는다**
   - 1-1. 의미 계층(도메인)에만 집중
   - 예: `createTemplate` ✅, `postCreateTemplate` ❌
2. **비즈니스 이벤트를 설명한다**
   - 2-1. "무슨 일이 일어나는가?"를 나타내야 함
   - 예: `createPremium` ✅, `setPremium` ❌
3. **동사 + 명사 + 도메인 구조를 따른다**
   - Auth / 세션 관련 Action은 3-2를 따른다
   - 예: `createPremiumAction` ✅, `createPremium` ❌

#### 3-1. 권장 동사 그룹 (Core)

- **create** : 생성
- **delete** : 삭제
- **update** : 변경
- **request** : 요청
- **find** : 조회

#### 3-2. 인증 / 세션 그룹 (Auth & Session)

- **loginUser** : 로그인
- **logoutUser** : 로그아웃
- **signupUser** : 회원가입

### 2.3 코드 내부

- **Variables/Functions**: `camelCase` (예: `const userData = ...`, `function getPost()`)
- **Constants**: `SCREAMING_SNAKE_CASE` (예: `const MAX_RETRY_COUNT = 5`)
- **Schemas**: `~Schema` 접미사 사용 (예: `loginSchema`)
- **Stores**: `use~Store` 접두사 사용 (예: `useAuthStore`)

### 3. Atomic Design 적용 가이드

모든 컴포넌트는 원소(Atoms)로부터 쌓아 올려 템플릿(Templates)을 구성하는 Bottom-up 방식으로 제작합니다.

Atoms (원자): UI의 최소 단위 (예: Button, Input, Label, Icon).

Molecules (분자): 원자들의 결합으로 하나의 기능을 수행 (예: FormField = Label + Input).

Organisms (유기체): 분자+원자의 조합으로 구성된 독립적인 섹션 (예: Header, UserCardList).

Templates (템플릿): 데이터가 주입되기 전의 레이아웃 골격. 실제 데이터 대신 'Slot'을 배치함.

Pages (페이지): 템플릿에 실제 데이터(State, API)가 결합된 최종 형태. (app/ 폴더 내 page.tsx)

## 4. 개발 팁

- **No Barrel Exports**: `store/index.ts` 등을 만들어 모든 파일을 몰아서 export 하지 마세요. Tree-shaking 효율과 코드 추적 속도를 위해 직접 파일을 참조하는 것이 좋습니다.
- **Zod Inference**: 타입을 수동으로 만들지 말고 Zod 스키마로부터 추출하세요.
