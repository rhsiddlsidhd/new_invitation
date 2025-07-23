# Next.js 간소화된 아키텍처 구조

## 🎯 Next.js 스타일 계층 분리

### 📁 간소화된 디렉터리 구조

```
src/app/
├── api/                    # 🛣️  API Routes (라우팅 + HTTP 처리)
│   ├── auth/
│   │   ├── login/route.ts     # POST /api/auth/login
│   │   └── register/route.ts  # POST /api/auth/register
│   └── users/
│       └── [id]/route.ts      # GET/PUT/DELETE /api/users/[id]
├── _services/              # 💼 Services (비즈니스 로직)
│   └── userServices.ts
├── _models/                # 🗃️  Models (데이터 구조)
│   └── userSchema.ts
└── _utils/                 # 🔧 Utils (유틸리티)
    ├── mongodb.ts
    └── apiClient.ts
```

## 🔄 데이터 흐름

```
Frontend Component
    ↓ (사용자 액션)
API Client (_utils/apiClient.ts)
    ↓ (HTTP 요청)
API Route (/api/.../route.ts) ← 📍 라우팅 + HTTP 처리
    ↓ (Service 호출)
Service (_services/*.ts) ← 📍 비즈니스 로직
    ↓ (Model 사용)
Model (_models/*.ts) ← 📍 데이터 접근
    ↓ (DB 작업)
Database (MongoDB)
```

## 🏗️ 각 계층의 역할과 책임

### 1. **API Routes** (`/api/*.../route.ts`) - 라우팅 + HTTP 처리

**역할**: URL 경로 매핑 + HTTP 요청/응답 처리

```typescript
// src/app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 데이터 파싱
    const formData = await request.formData();
    const email = formData.get("email") as string;

    // 2. 입력 검증
    if (!email || !password) {
      return NextResponse.json({...}, { status: 400 });
    }

    // 3. Service 계층 호출
    const userResult = await getUserByEmail(email);
    const isValid = await verifyPassword(password, userResult.user.password);

    // 4. HTTP 응답 반환
    return NextResponse.json({...}, { status: 200 });
  } catch (error) {
    // 5. 에러 처리
    return NextResponse.json({...}, { status: 500 });
  }
}
```

**책임**:

- ✅ HTTP 메소드 매핑 (GET, POST, PUT, DELETE)
- ✅ HTTP 요청 파싱 (formData, JSON, params)
- ✅ 입력 검증 (필수 필드, 형식 검증)
- ✅ HTTP 응답 형식 결정
- ✅ HTTP 상태 코드 설정
- ✅ 에러 처리 및 로깅
- ❌ 복잡한 비즈니스 로직 (Service에 위임)

---

### 2. **Services** (`/_services/*.ts`) - 비즈니스 로직

**역할**: 핵심 비즈니스 로직, 데이터 처리

```typescript
// src/app/_services/userServices.ts
export const createUser = async ({ formData }) => {
  try {
    await dbConnect();

    // 비즈니스 로직: 중복 체크
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return { success: false, message: "이미 존재하는 사용자" };
    }

    // 비즈니스 로직: 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12);

    // 데이터베이스 작업
    const newUser = await User.create({...});

    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, message: "생성 실패" };
  }
};
```

**책임**:

- ✅ 비즈니스 규칙 구현
- ✅ 데이터 변환 및 가공
- ✅ 데이터베이스 작업
- ✅ 외부 서비스 호출
- ✅ 트랜잭션 관리
- ❌ HTTP 관련 처리 (API Route에 위임)

---

### 3. **Models** (`/_models/*.ts`) - 데이터 구조

**역할**: 데이터 스키마, 검증 규칙

```typescript
// src/app/_models/userSchema.ts
interface User {
  _id: Types.ObjectId;
  email: string;
  userId: string;
  password: string;
  isDelete: boolean;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
  isDelete: { type: Boolean, required: true },
});

export default mongoose.model<User>("User", userSchema);
```

**책임**:

- ✅ 데이터 스키마 정의
- ✅ 데이터 검증 규칙
- ✅ 관계 정의
- ✅ 인덱스 설정

---

### 4. **Utils** (`/_utils/*.ts`) - 유틸리티

**역할**: 공통 유틸리티, 헬퍼 함수

```typescript
// src/app/_utils/mongodb.ts
export const dbConnect = async () => {
  // 데이터베이스 연결 로직
};

// src/app/_utils/apiClient.ts
export const registerUser = async (userData) => {
  // API 호출 로직
};
```

## 📊 실제 호출 예시

### 로그인 요청 플로우:

```typescript
// 1. Frontend에서 API 호출
fetch("/api/auth/login", { method: "POST", body: formData })

// 2. API Route - 라우팅 + HTTP 처리
// src/app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData(); // 요청 파싱

  if (!email || !password) { // 입력 검증
    return NextResponse.json({...}, { status: 400 });
  }

  const userResult = await getUserByEmail(email); // 서비스 호출
  return NextResponse.json({...}, { status: 200 }); // 응답 반환
}

// 3. Service - 비즈니스 로직
// src/app/_services/userServices.ts
export const getUserByEmail = async (email) => {
  await dbConnect(); // DB 연결
  const user = await User.findOne({ email }); // 모델 사용
  return { success: true, user };
}

// 4. Model - 데이터 접근
// src/app/_models/userSchema.ts
User.findOne({ email }) // MongoDB 쿼리
```

## 🎯 이 구조의 장점

### 1. **Next.js 네이티브**

- Next.js App Router의 파일 기반 라우팅 활용
- 불필요한 추상화 계층 제거
- 간단하고 직관적인 구조

### 2. **적절한 분리**

- API Route: 라우팅 + HTTP 처리
- Service: 비즈니스 로직
- Model: 데이터 구조
- Utils: 공통 기능

### 3. **유지보수성**

```typescript
// 비즈니스 로직 변경 → Service만 수정
// HTTP 응답 형식 변경 → API Route만 수정
// 데이터 구조 변경 → Model만 수정
```

### 4. **재사용성**

```typescript
// 같은 Service를 여러 API Route에서 사용 가능
// getUserByEmail을 login, profile 등에서 공통 사용
```

## 💡 Best Practices

1. **API Route는 적당히**: HTTP 처리 + 간단한 검증
2. **Service는 두껍게**: 모든 비즈니스 로직을 담당
3. **Model은 단순하게**: 데이터 구조와 기본 검증만
4. **Utils는 재사용**: 공통 로직을 유틸리티로 분리

## 🔍 Controller vs API Route 비교

| 측면               | Controller 분리  | API Route 통합   |
| ------------------ | ---------------- | ---------------- |
| **복잡도**         | 높음 (추가 계층) | 낮음 (직관적)    |
| **Next.js 스타일** | 전통적 MVC       | Next.js 네이티브 |
| **파일 수**        | 많음             | 적음             |
| **유지보수**       | 복잡함           | 간단함           |
| **학습곡선**       | 높음             | 낮음             |

**결론**: Next.js에서는 API Route에서 HTTP 처리까지 담당하는 것이 더 자연스럽고 효율적입니다!
