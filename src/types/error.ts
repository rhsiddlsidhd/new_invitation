export class CustomError extends Error {
  public readonly code: number;
  public readonly fieldErrors?: Record<string, string[] | undefined>;
  constructor(
    message: string,
    code: number,
    fieldErrors?: Record<string, string[] | undefined>,
  ) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}
