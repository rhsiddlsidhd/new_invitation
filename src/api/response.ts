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

export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

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
