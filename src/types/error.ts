export class CustomError extends Error {
  public readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "HttpError";
    this.code = code;
  }
}
