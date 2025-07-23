# Next.js App Router 가이드

이 프로젝트는 Next.js 13+ App Router를 사용합니다.

## 📁 현재 라우팅 구조

```
src/app/
├── page.tsx                    # / (홈페이지)
├── layout.tsx                  # 전역 레이아웃
├── globals.css                 # 전역 스타일
├── auth/
│   ├── page.tsx               # /auth (인증 메인 페이지)
│   ├── login/
│   │   └── page.tsx          # /auth/login (로그인)
│   └── register/
│       └── page.tsx          # /auth/register (회원가입)
├── dashboard/
│   └── page.tsx              # /dashboard (대시보드)
└── api/
    ├── auth/
    │   ├── login/
    │   │   └── route.ts      # POST /api/auth/login
    │   └── register/
    │       └── route.ts      # POST /api/auth/register
    └── users/
        └── [id]/
            └── route.ts      # GET/PUT/DELETE /api/users/[id]
```

## 🚀 라우팅 방법

### 1. 페이지 라우팅 (파일 기반)

Next.js App Router는 파일 시스템 기반 라우팅을 사용합니다:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/[slug]` (동적 라우팅)

### 2. 클라이언트 사이드 네비게이션

```tsx
import { useRouter } from "next/navigation";
import Link from "next/link";

function MyComponent() {
  const router = useRouter();

  // 프로그래밍 방식 네비게이션
  const handleClick = () => {
    router.push("/dashboard");
    // 또는
    router.replace("/login"); // 히스토리 스택에 추가하지 않음
  };

  return (
    <div>
      {/* 선언적 네비게이션 */}
      <Link href="/about">About 페이지로 이동</Link>
      <button onClick={handleClick}>대시보드로 이동</button>
    </div>
  );
}
```

### 3. API 라우팅

API 엔드포인트는 `route.ts` 파일로 생성:

```tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

### 4. 동적 라우팅

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}

// app/shop/[...slug]/page.tsx (Catch-all routes)
export default function Shop({ params }: { params: { slug: string[] } }) {
  return <h1>Shop: {params.slug.join("/")}</h1>;
}
```

## 🔒 인증 상태 관리

현재 프로젝트에서는 `localStorage`를 사용하여 간단한 인증 상태를 관리합니다:

```tsx
// 로그인 상태 확인
const [user, setUser] = useState(null);

useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    setUser(JSON.parse(userData));
  }
}, []);

// 로그인
const handleLogin = async (credentials) => {
  const result = await loginUser(credentials);
  if (result.success) {
    localStorage.setItem("user", JSON.stringify(result.user));
    setUser(result.user);
    router.push("/dashboard");
  }
};

// 로그아웃
const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  router.push("/");
};
```

## 📄 페이지별 기능

### 홈페이지 (`/`)

- 로그인 상태에 따른 다른 UI 표시
- 네비게이션 바 포함
- 로그인/회원가입 링크

### 로그인 페이지 (`/auth/login`)

- 이메일/비밀번호 입력 폼
- API 호출을 통한 인증
- 성공시 홈페이지로 리다이렉트

### 회원가입 페이지 (`/auth/register`)

- 사용자 정보 입력 폼
- 비밀번호 확인 검증
- 성공시 로그인 페이지로 리다이렉트

### 대시보드 (`/dashboard`)

- 로그인 필요 (미로그인시 로그인 페이지로 리다이렉트)
- 사용자 정보 표시
- 다양한 기능 액세스 포인트

## 🔄 추가 가능한 라우트

미래에 추가할 수 있는 라우트들:

```
app/
├── profile/
│   └── page.tsx              # /profile (프로필 수정)
├── invitations/
│   ├── page.tsx             # /invitations (초대장 목록)
│   ├── create/
│   │   └── page.tsx        # /invitations/create (초대장 생성)
│   └── [id]/
│       ├── page.tsx        # /invitations/[id] (초대장 상세)
│       └── edit/
│           └── page.tsx    # /invitations/[id]/edit (초대장 수정)
└── admin/
    ├── page.tsx            # /admin (관리자 대시보드)
    └── users/
        └── page.tsx        # /admin/users (사용자 관리)
```

## 💡 Best Practices

1. **Client Component**: 상태나 이벤트 핸들러가 필요한 경우 `"use client"` 사용
2. **Server Component**: 기본값, 데이터 페칭에 유리
3. **Link 컴포넌트**: 클라이언트 사이드 네비게이션에 사용
4. **useRouter**: 프로그래밍 방식 네비게이션에 사용
5. **로딩 상태**: `loading.tsx` 파일로 로딩 UI 구현 가능
6. **에러 처리**: `error.tsx` 파일로 에러 UI 구현 가능
