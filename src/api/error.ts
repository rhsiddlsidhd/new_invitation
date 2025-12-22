import { error as createErrorResponse, ErrorResponse } from "@/api/response";
import { HTTPError } from "./type";
import { NextResponse } from "next/server";

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
  if (e instanceof HTTPError) {
    switch (e.code) {
      case 400:
        return NextResponse.json(
          { message: e.message, errors: e.errors ?? {} },
          { status: 400 },
        );
      case 401:
        return NextResponse.json(
          { message: e.message, path: e.path ?? undefined },
          { status: 401 },
        );
      case 403:
      case 404:
        return NextResponse.json({ message: e.message }, { status: e.code });
      default:
        return NextResponse.json({ message: e.message }, { status: e.code });
    }
  }

  console.error(e);
  return NextResponse.json(
    { message: "알 수 없는 오류가 발생했습니다." },
    { status: 500 },
  );
};

export const handleClientError = (e: unknown) => {
  if (e instanceof HTTPError) {
    switch (e.code) {
      case 400:
      //     if (e.errors) {
      //         showFormErrors(e.errors);
      //     } else {
      //         showToast(e.message);
      //     }
      //     break;
      case 401:
        if (e.path) {
          window.location.href = e.path;
        }
      //     break;
      default:
        console.error("HandleClientError", e);
    }
  }

  console.error(e);
};
