import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../middleware/error/errors";
import { addNewDepartment } from "../controller/department.controller";
import "express-async-errors";
import { addNewUser } from "../controller/user.controller";

const router = express.Router();

// Add new New Department
router.post(
  "/api/department",
  [body("department").trim().isLength({ min: 4, max: 25 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    await addNewDepartment(req.body.department);

    res.status(200).send({ msg: "Add New Department Success" });
  }
);

// Login
router.post(
  "/api/login",
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

// Add New User
router.post(
  "/api/user/",
  [
    body("username")
      .trim()
      .isLength({ min: 4, max: 25 })
      .withMessage("please input password 4-25 character")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
      .withMessage(
        "Username must contain at least one digit, character not input special character"
      ),
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
    body("fullname")
      .trim()
      .matches(/^[a-zA-Z\s]{2,30}$/i)
      .withMessage("Please input like Example : Tuan2512"),
    body("phone")
      .trim()
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g)
      .withMessage("Example 09|03|07|08|05 12345678"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    addNewUser(req.body);

    res.status(200).send({ msg: "register success" });
  }
);
export { router as authentication };
