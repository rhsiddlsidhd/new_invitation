import { NextResponse } from "next/server";

/**
 * Custom HTTP Error class for structured error handling
 */
export class HTTPError extends Error {
  code: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    code: number = 400,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "HTTPError";
    this.code = code;
    this.errors = fieldErrors;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

/**
 * Success response structure
 */
export type SuccessResponse<T> = {
  success: true;
  data: T;
};

/**
 * Error response structure (discriminated union by error code)
 */
export type ErrorResponse =
  | {
      success: false;
      error: {
        message: string;
        code: 400;
        errors: Record<string, string[]>;
      };
    }
  | {
      success: false;
      error: {
        message: string;
        code: 400 | 401 | 403 | 404 | 500;
      };
    };

/**
 * Generic API response (success or error)
 */
export type APIResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * API Route response type (NextResponse wrapper)
 */
export type APIRouteResponse<T = unknown> = NextResponse<APIResponse<T>>;
