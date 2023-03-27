export abstract class ErrorMessage extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ErrorMessage.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
