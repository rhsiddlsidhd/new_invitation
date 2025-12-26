import { ErrorResponse, SuccessResponse } from "./response";
import { HTTPError } from "./type";

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body: ErrorResponse = await res.json();

    const { message, code, errors, path } = body.error;

    throw new HTTPError(message, code, errors, path);
  }
  const body: SuccessResponse<T> = await res.json();
  return body.data;
}
