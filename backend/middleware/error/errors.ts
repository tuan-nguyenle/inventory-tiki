import { ValidationError } from "express-validator";
import { ErrorMessage } from "./error-messages";

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

export class NotFoundError extends ErrorMessage {
  statusCode = 404;
  constructor() {
    super("Not Found this Route");

    // only have when you extends
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Not Found",
      },
    ];
  }
}

export class BadRequestError extends ErrorMessage {
  statusCode = 400;
  constructor(public message: string) {
    super(message);

    // only have when you extends
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export class MissingTokenError extends ErrorMessage {
  statusCode = 400;
  constructor(public message: string) {
    super(message);

    // only have when you extends
    Object.setPrototypeOf(this, MissingTokenError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
