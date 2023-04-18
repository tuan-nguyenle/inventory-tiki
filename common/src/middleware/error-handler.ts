import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "./error/error-messages";

export const errorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorMessage) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }
  res.status(400).send({
    msg: err.message,
  });
};
