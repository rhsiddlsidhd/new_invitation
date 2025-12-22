import { NextResponse } from "next/server";
import { ClientError, ServerError } from "@/shared/types/error";
import { error as createErrorResponse, ErrorResponse } from "../response";

/**
 * Handles errors for Server Actions, returning a structured ErrorResponse object.
 * This function does not include HTTP status codes in the response body,
 * as it's designed for server-to-server communication or client-side logic
 * that processes a structured response.
 *
 * @param e - The error object, which can be of any type.
 * @returns An ErrorResponse object with `success: false` and error details.
 */
export const handleActionError = (e: unknown): ErrorResponse => {
  return createErrorResponse(e);
};

/**
 * Handles errors for API route handlers (e.g., in `route.ts`),
 * returning a `NextResponse` object with an appropriate HTTP status code.
 * This is suitable for traditional client-side `fetch` calls that rely on
 * HTTP status codes for error handling.
 *
 * @param e - The error object, which can be of any type.
 * @returns A `NextResponse` object containing the error details and status.
 */
export const handleMethodError = (e: unknown): NextResponse => {
  if (e instanceof ClientError) {
    return NextResponse.json(
      {
        message: e.message,
        errors: e.errors,
      },
      { status: e.code },
    );
  }

  if (e instanceof ServerError) {
    return NextResponse.json({ message: e.message }, { status: e.code });
  }

  if (e instanceof Error) {
    return NextResponse.json(
      { message: e.message || "An unexpected error occurred." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "An unknown error occurred." },
    { status: 500 },
  );
};
