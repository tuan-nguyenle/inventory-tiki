import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../middleware/error/errors";
import { Role } from "../models/role.model";

const router = express.Router();

router.get("/create-role", (req, res) => {
  Role.create({ description: "staff" }, { description: "manager" });
  res.status(200).send({ msg: "Role add success" });
  console.log("test login");
});

router.post(
  "/login",
  [
    body("username").trim(),
    body("password")
      .trim()
      .isLength({ min: 6, max: 25 })
      .withMessage("please input password 6-25 character")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\;:'",.<>/?])/
      )
      .withMessage(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
      ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    res.status(200).send({ msg: "login success" });
  }
);

export { router as authentication };
