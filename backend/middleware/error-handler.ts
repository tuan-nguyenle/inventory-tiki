import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "./error/custom-error";
export const errorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorMessage) {
    res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }
  res.status(400).send({
    msg: err.message,
  });
};
