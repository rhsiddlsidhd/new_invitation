import { ClientError, ServerError } from "@/shared/types/error";

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
  };
};

export type APIResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

export const error = (e: unknown): ErrorResponse => {
  if (e instanceof ClientError) {
    return {
      success: false,
      error: {
        message: e.message,
        code: e.code,
        errors: e.errors,
      },
    };
  }

  if (e instanceof ServerError) {
    return {
      success: false,
      error: {
        message: e.message,
        code: e.code,
      },
    };
  }

  if (e instanceof Error) {
    return {
      success: false,
      error: {
        message: e.message || "An unexpected error occurred.",
        code: 500,
      },
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error occurred.",
      code: 500,
    },
  };
};
