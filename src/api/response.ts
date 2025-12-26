import { NextResponse } from "next/server";
import { HTTPError } from "./type";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code: number;
    errors?: Record<string, string[] | undefined>;
    path?: string | undefined;
  };
};

export type APIResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * API Route 응답 타입 (NextResponse용)
 *
 * 성공/실패 응답을 union 타입으로 정의
 *
 * @example
 * ```typescript
 * export const GET = async (): Promise<APIRouteResponse<User[]>> => {
 *   try {
 *     const users = await getUsers();
 *     return apiSuccess(users);
 *   } catch (error) {
 *     return apiError(error);
 *   }
 * };
 * ```
 */
export type APIRouteResponse<T> = NextResponse<
  | { data: T }
  | {
      error: {
        message: string;
        code: number;
        errors?: Record<string, string[] | undefined>;
        path?: string;
      };
    }
>;

/**
 * Server Action 성공 응답 헬퍼
 * @param data - 반환할 데이터
 * @returns SuccessResponse<T>
 */
export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

/**
 * Server Action 에러 응답 헬퍼
 * @param e - 에러 객체
 * @returns ErrorResponse
 */
export const error = (e: unknown): ErrorResponse => {
  if (e instanceof HTTPError) {
    switch (e.code) {
      case 400:
        return {
          success: false,
          error: {
            message: e.message,
            code: e.code,
            errors: e.errors ?? {},
          },
        };
      case 401:
        return {
          success: false,
          error: {
            message: e.message,
            code: e.code,
            path: e.path ?? undefined,
          },
        };
      case 403:
      case 404:
        return {
          success: false,
          error: {
            message: e.message,
            code: e.code,
          },
        };
      default:
        return {
          success: false,
          error: {
            message: e.message,
            code: e.code,
          },
        };
    }
  }

  console.error(e);
  return {
    success: false,
    error: {
      message: "알 수 없는 오류가 발생했습니다.",
      code: 500,
    },
  };
};

// ============================================
// API Route 전용 응답 헬퍼
// ============================================

/**
 * API Route 성공 응답 헬퍼
 *
 * 일관된 성공 응답 구조를 반환합니다.
 *
 * @param data - 반환할 데이터 (null/undefined는 빈 배열 또는 null로 처리)
 * @param status - HTTP 상태 코드 (기본값: 200)
 * @returns NextResponse<{ success: true, data: T }>
 *
 * @example
 * ```typescript
 * // 배열 반환
 * return apiSuccess(users);
 * // { success: true, data: [...] }
 *
 * // 빈 배열 처리
 * return apiSuccess(data ?? []);
 * // { success: true, data: [] }
 *
 * // 단일 객체 반환
 * return apiSuccess(user);
 * // { success: true, data: {...} }
 *
 * // 커스텀 상태 코드
 * return apiSuccess(newUser, 201);
 * // { success: true, data: {...} } with 201 status
 * ```
 */
export const apiSuccess = <T>(
  data: T,
  status: number = 200,
): NextResponse<{ data: T }> => {
  return NextResponse.json(
    {
      data,
    },
    { status },
  );
};

/**
 * API Route 에러 응답 헬퍼
 *
 * HTTPError 또는 일반 에러를 받아 일관된 에러 응답을 반환합니다.
 * handleMethodError와 동일한 기능이지만 더 명확한 네이밍으로 제공됩니다.
 *
 * @param e - 에러 객체
 * @returns NextResponse with error details
 *
 * @example
 * ```typescript
 * try {
 *   const data = await fetchData();
 *   return apiSuccess(data);
 * } catch (error) {
 *   return apiError(error);
 * }
 * ```
 */
export const apiError = (
  e: unknown,
): NextResponse<{
  error: {
    message: string;
    code: number;
    errors?: Record<string, string[] | undefined>;
    path?: string;
  };
}> => {
  if (e instanceof HTTPError) {
    return NextResponse.json(
      {
        error: {
          message: e.message,
          code: e.code,
          errors: e.errors ?? undefined,
          path: e.path ?? undefined,
        },
      },
      { status: e.code },
    );
  }

  console.error(e);

  return NextResponse.json(
    {
      error: {
        message: "알 수 없는 오류가 발생했습니다.",
        code: 500,
      },
    },
    { status: 500 },
  );
};
