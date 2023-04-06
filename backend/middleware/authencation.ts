import { Request, Response, NextFunction } from "express";
import * as jwt from "../config/jwt";
import { Role } from "../models/account/role.model";
import { Department } from "../models/account/department.model";
import { NotAuthorizedError } from "./error/errors";

interface UserPayload {
  id: string;
  username: string;
  fullname: string;
  phone: string;
  Role: Role;
  Department: Department;
  iat: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

export const userAuthor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    next();
  }

  try {
    const payload = jwt.verifyJwt(req.session?.jwt) as UserPayload;
    req.currentUser = payload;
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
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
