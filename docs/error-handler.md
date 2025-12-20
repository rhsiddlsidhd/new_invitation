Error 객체 및 중앙 에러 핸들러

baseURL = /src/shared

1️⃣ 에러 객체 (`${baseURL}/types/error.ts`)
ServerError

- 용도: 서버 내부 에러 (DB, 외부 API, 의도치 않은 예외)

- 필드
  - message (string, required): 클라이언트에 표시할 메시지

  - code (number, required): HTTP 상태 코드 (500~599 등)

ClientError (`${baseURL}/types/error.ts`)

- 용도: 클라이언트 입력값 검증, 인증/권한 실패 등

- 필드

- message (string, required)

- code (number, required, 400~499)

fieldErrors (optional, Record<string,string>): 폼 필드별 에러 정보

2️⃣ 중앙 에러 핸들러

handleActionError (`${baseURL}/utils/error/index.ts`)

- 용도: Server Action에서 사용

- 특징: 객체 기반 반환, HTTP status 코드 없음

`handleActionError(e: unknown) => APIRESPONSE`

handleMethodError (`${baseURL}/utils/error/index.ts`)

- 용도: route.ts HTTP 메서드에서 사용

- 특징: NextResponse + HTTP status 반환, 클라이언트 fetch용

`handleMethodError(e: unknown) => NextResponse`

3️⃣ 유효성 검사

validationAndFlatten (`/src/shared/lib/validation/index.ts`)

- schema: z.ZodSchema<T>,
- data: unknown,
