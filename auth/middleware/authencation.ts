import { Request, Response, NextFunction } from "express";
import * as jwt from "../config/jwt";
import { Role } from "../models/role.model";
import { Department } from "../models/department.model";
import { NotAuthorizedError } from "./error/errors";

interface UserPayload {
  id: string;
  username: string;
  fullname: string;
  phone: string;
  roles: Role;
  departments: Department;
}

declare global {
  namespace Express {
    interface Request {
      userAuthor: UserPayload;
    }
  }
}

export const userAuthor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    next();
  }

  try {
    const payload = jwt.verifyJwt(req.session?.jwt) as UserPayload;
    res.send({ user: payload });
  } catch (error) {
    console.log(error);
  }

  next();
};

export const requireAuthor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.userAuthor) {
    throw new NotAuthorizedError();
  }

  next();
};
