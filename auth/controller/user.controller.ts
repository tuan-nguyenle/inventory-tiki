import * as User from "../services/user.services";
import { Request, Response } from "express";
import {
  RequestValidationError,
  BadRequestError,
} from "@microservies-inventory/common/build";
import { Password } from "../config/cryto";
import { validationResult } from "express-validator";
import "express-async-errors";
import * as jwt from "../config/jwt";
import dotenv from "dotenv";
dotenv.config();

export const addNewUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const user = await User.addNewUser(req.body);

  res.status(200).send({ msg: "register success", user: user });
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { username, password } = req.body;
  const user = await User.checkUser(username);

  if (!user) {
    throw new BadRequestError("Not User Exited");
  }

  const matchPassword = await Password.comparePassword(password, user.password);

  if (!matchPassword) {
    throw new BadRequestError("Password not matches");
  }

  const userJwt = jwt.signJwt(
    {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      phone: user.phone,
      Role: user.roles,
      Department: user.departments,
    },
    {}
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send({ user: user });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.send({ user: req.currentUser || null });
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  res.send({ message: "Logout success" });
};

export const getUsers = async (req: Request, res: Response) => {
  const listUser = await User.getAllUser();
  res.send({
    data: listUser,
  });
};
