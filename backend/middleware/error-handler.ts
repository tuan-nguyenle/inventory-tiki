import { Request, Response, NextFunction } from "express";
import {} from "./errors";

export const errorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Some errors was found", err);

  res.status(400).send({
    msg: err.message,
  });
};
