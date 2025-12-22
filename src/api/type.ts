export class HTTPError extends Error {
  code: number;
  errors?: Record<string, string[] | undefined>;
  path?: string | null;
  constructor(
    message: string,
    code: number = 400,
    fieldErrors?: Record<string, string[] | undefined>,
    path?: string,
  ) {
    super(message);
    this.name = "HTTPError";
    this.code = code;
    this.errors = fieldErrors;
    this.path = path;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
