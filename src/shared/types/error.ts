export class ClientError extends Error {
  public readonly code: number;
  public readonly errors?: Record<string, string[] | undefined>;

  constructor(
    message: string,
    code: number = 400,
    fieldErrors?: Record<string, string[] | undefined>,
  ) {
    super(message);
    this.name = "ClientError";
    this.code = code;
    this.errors = fieldErrors;
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}

export class ServerError extends Error {
  public readonly code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.name = "ServerError";
    this.code = code;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
