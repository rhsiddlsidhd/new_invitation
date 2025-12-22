import { HTTPError } from "./type";

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json();
    const { message, code, errors, path } = body.error;

    throw new HTTPError(message, code, errors, path);
  }
  return res.json() as Promise<T>;
}
