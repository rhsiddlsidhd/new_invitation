import { NextResponse } from "next/server";
import {
  HTTPError,
  SuccessResponse,
  ErrorResponse,
  APIResponse,
  APIRouteResponse,
} from "@/types/error";

// Re-export types for convenience
export type {
  HTTPError,
  SuccessResponse,
  ErrorResponse,
  APIResponse,
  APIRouteResponse,
};

export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

export const createErrorResponse = (e: unknown): ErrorResponse => {
  if (e instanceof HTTPError) {
    // 400 with validation errors
    if (e.code === 400 && e.errors) {
      return {
        success: false,
        error: {
          message: e.message,
          code: 400,
          errors: e.errors,
        },
      };
    }

    // All other cases (400 without errors, 401, 403, 404, 500)
    return {
      success: false,
      error: {
        message: e.message,
        code: e.code as 400 | 401 | 403 | 404 | 500,
      },
    };
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

export const apiSuccess = <T>(
  data: T,
  status: number = 200,
): NextResponse<SuccessResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
};

export const createApiErrorResponse = (
  e: unknown,
): NextResponse<ErrorResponse> => {
  if (e instanceof HTTPError) {
    // 400 with validation errors
    if (e.code === 400 && e.errors) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: e.message,
            code: 400,
            errors: e.errors,
          },
        },
        { status: 400 },
      );
    }

    // All other cases (400 without errors, 401, 403, 404, 500)
    return NextResponse.json(
      {
        success: false,
        error: {
          message: e.message,
          code: e.code as 400 | 401 | 403 | 404 | 500,
        },
      },
      { status: e.code },
    );
  }

  console.error(e);

  return NextResponse.json(
    {
      success: false,
      error: {
        message: "알 수 없는 오류가 발생했습니다.",
        code: 500,
      },
    },
    { status: 500 },
  );
};

// 1. 반환 타입을 명확히 하기 위해 별도로 정의합니다.
export type ClientFieldErrors = { fieldErrors: Record<string, string[]> };
export type ClientMessageError = { message: string };

export const createClientErrorResponse = (
  e: unknown,
): ClientFieldErrors | ClientMessageError | void => {
  let errorData: ErrorResponse["error"] | null = null;

  if (e instanceof HTTPError) {
    errorData = {
      message: e.message,
      code: e.code as 400 | 401 | 403 | 404 | 500,
      ...(e.errors && { errors: e.errors }),
    };
  } else if (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    "code" in e
  ) {
    errorData = e as ErrorResponse["error"];
  }

  if (!errorData) {
    console.error("Unknown error:", e);

    return { message: "알 수 없는 오류가 발생했습니다." };
  }

  switch (errorData.code) {
    case 400:
      if ("errors" in errorData && errorData.errors) {
        return { fieldErrors: errorData.errors as Record<string, string[]> };
      }

      return { message: errorData.message };

    case 401:
      console.error(
        `401 Unauthorized: ${errorData.message}. Redirecting to login.`,
      );
      // 인증 오류
      return;

    case 403:
    case 404:
    case 500:
      console.error(`Error ${errorData.code}: ${errorData.message}`);

      return {
        message: "예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };

    default:
      console.error(`알 수 없는 오류가 발생했습니다.`);
  }
};
