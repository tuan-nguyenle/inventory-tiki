import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  RequestValidationErrors,
  DatabaseConnectionError,
} from "../middleware/errors";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("api login");
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationErrors(errors.array());
    }

    console.log("test login success");
    throw new DatabaseConnectionError();

    res.status(200).send({ msg: "login success" });
  }
);

router.get("/change-password", () => {
  console.log("test-changed");
});

export { router as authentication };
