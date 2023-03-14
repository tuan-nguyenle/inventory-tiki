import { ValidationError } from "express-validator";
import { ErrorMessage } from "./custom-error";

export class DatabaseConnectionError extends ErrorMessage {
  statusCode = 500;
  error = "Failed connect to database";
  constructor() {
    super("Failed connect to database");

    // only have when you extends
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.error,
      },
    ];
  }
}

export class RequestValidationError extends ErrorMessage {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
