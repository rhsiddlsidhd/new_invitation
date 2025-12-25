import { error as createErrorResponse, ErrorResponse } from "@/api/response";
import { HTTPError } from "./type";

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
