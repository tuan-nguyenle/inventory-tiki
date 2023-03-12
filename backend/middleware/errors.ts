import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
  constructor() {
    super("Error not connecting to database");

    // only have when you extends
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

export class RequestValidationErrors extends Error {
  constructor(private errors: ValidationError[]) {
    super();

    // only have when you extends
    Object.setPrototypeOf(this, RequestValidationErrors.prototype);
  }
}
