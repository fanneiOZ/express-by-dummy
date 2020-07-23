export class HttpException extends Error {
  errorCause: Error;

  constructor(
    public errorCode: number,
    public errorName: string,
    public errorMessage: string
  ) {
    super(errorMessage);
    this.name = errorName;
  }

  withCause(errorCause: Error): HttpException {
    this.errorCause = errorCause;

    return this;
  }
}
