import * as User from "../services/user.services";
import { Request, Response } from "express";
import {
  BadRequestError,
  RequestValidationError,
} from "../middleware/error/errors";
import { Password } from "../config/cryto";
import { validationResult } from "express-validator";
import "express-async-errors";
import jwt from "jsonwebtoken";
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

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { username, password } = req.body;
  const user = await User.checkUser(username);

  if (!user) {
    throw new BadRequestError("Not User Exited");
  }

  const matchPassword = await Password.comparePassword(
    password,
    user[0].password
  );

  if (!matchPassword) {
    throw new BadRequestError("Password not matches");
  }

  const userJwt = jwt.sign(
    {
      id: user[0]._id,
      username: user[0].username,
      fullname: user[0].fullname,
      phone: user[0].phone,
      Role: user[0].Role[0],
      Department: user[0].Department[0],
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  console.log(req.session);
  

  return res.status(201).send({ user: user[0] });
}
