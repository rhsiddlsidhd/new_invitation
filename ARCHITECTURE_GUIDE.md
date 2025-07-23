# Next.js 아키텍처 구조 설명

## 🎯 각 계층의 역할과 책임

### 1. API Routes (`/api/*.../route.ts`) = Controller + Router

**역할**: HTTP 요청 처리, 검증, 응답 반환

```typescript
// src/app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 데이터 파싱
    const formData = await request.formData();

    // 2. 입력 검증
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 3. Service 계층 호출
    const result = await loginService(credentials);

    // 4. HTTP 응답 반환
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // 5. 에러 처리
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

**책임**:

- ✅ HTTP 요청/응답 처리
- ✅ 요청 데이터 파싱 및 검증
- ✅ 적절한 HTTP 상태 코드 반환
- ✅ 에러 처리 및 로깅
- ❌ 비즈니스 로직 작성 (Service에 위임)

---

### 2. Services (`/_services/*.ts`) = Service Layer

**역할**: 비즈니스 로직, 데이터 처리, 외부 API 호출

```typescript
// src/app/_services/userServices.ts
export const createUser = async ({ formData }) => {
  try {
    // 1. 데이터베이스 연결
    await dbConnect();

    // 2. 비즈니스 로직 (중복 체크)
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return { success: false, message: "이미 존재하는 사용자" };
    }

    // 3. 데이터 변환 (비밀번호 해싱)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. 데이터베이스 작업
    const newUser = await User.create({ ... });

    // 5. 결과 반환
    return { success: true, user: newUser };
  } catch (error) {
    // 6. 에러 처리
    return { success: false, message: "생성 실패" };
  }
};
```

**책임**:

- ✅ 비즈니스 로직 구현
- ✅ 데이터 검증 및 변환
- ✅ 데이터베이스 작업
- ✅ 외부 서비스 호출
- ✅ 트랜잭션 관리
- ❌ HTTP 관련 처리 (Route에 위임)

---

### 3. Models (`/_models/*.ts`) = Data Layer

**역할**: 데이터 구조 정의, 스키마 관리

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

### 4. Utils (`/_utils/*.ts`) = Utility Layer

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

## 🔄 데이터 흐름

```
Frontend Page/Component
    ↓ (사용자 액션)
API Client (_utils/apiClient.ts)
    ↓ (HTTP 요청)
API Route (/api/.../route.ts)
    ↓ (비즈니스 로직 호출)
Service (_services/*.ts)
    ↓ (데이터베이스 작업)
Model (_models/*.ts)
    ↓ (MongoDB 작업)
Database
```

## 📊 실제 예시: 로그인 플로우

### 1. Frontend에서 시작

```typescript
// 페이지 컴포넌트
const handleLogin = async () => {
  const result = await loginUser(credentials); // API Client 호출
};
```

### 2. API Client

```typescript
// _utils/apiClient.ts
export const loginUser = async (credentials) => {
  const response = await fetch("/api/auth/login", {
    // API Route 호출
    method: "POST",
    body: formData,
  });
  return await response.json();
};
```

### 3. API Route (Controller 역할)

```typescript
// api/auth/login/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // 입력 검증
  if (!email || !password) {
    return NextResponse.json({...}, { status: 400 });
  }

  // Service 호출
  const userResult = await getUserByEmail(email); // Service 계층
  const isValid = await verifyPassword(password, userResult.user.password);

  return NextResponse.json(result);
}
```

### 4. Service (비즈니스 로직)

```typescript
// _services/userServices.ts
export const getUserByEmail = async (email) => {
  await dbConnect(); // DB 연결

  const user = await User.findOne({ email, isDelete: false }); // Model 사용

  if (!user) {
    return { success: false, message: "사용자를 찾을 수 없습니다." };
  }

  return { success: true, user };
};
```

### 5. Model (데이터 접근)

```typescript
// _models/userSchema.ts
const User = mongoose.model<User>("User", userSchema);
// MongoDB와 직접 상호작용
```

## 🎯 핵심 차이점

| 전통적인 구조 | Next.js 구조 | 설명                            |
| ------------- | ------------ | ------------------------------- |
| Router        | API Route    | URL 경로 정의 + Controller 역할 |
| Controller    | API Route    | HTTP 요청 처리                  |
| Service       | \_services   | 비즈니스 로직                   |
| Model         | \_models     | 데이터 스키마                   |

## 💡 Best Practices

1. **API Route는 얇게**: 검증, Service 호출, 응답만 담당
2. **Service는 두껍게**: 모든 비즈니스 로직을 담당
3. **Model은 단순하게**: 데이터 구조와 기본 검증만
4. **Utils는 재사용**: 공통 로직을 유틸리티로 분리
