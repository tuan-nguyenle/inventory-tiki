import "express-async-errors";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuthor,
  userAuthor,
} from "@microservies-inventory/common/build";
import * as userController from "../controller/user.controller";
import * as departmentController from "../controller/department.controller";
import { Role } from "../models/account/role.model";

const router = express.Router();

// Add new New Department
router.post(
  "/api/auth/department",
  [body("department").trim().isLength({ min: 4, max: 25 })],
  departmentController.addNewDepartment
);

// Add new New Role
router.post(
  "/api/auth/role", (req: Request, res: Response) => {
    new Role({
      description: req.body.role || null,
    }).save();
    res.send("new role success");
  }
);

// Login

// login
router.post(
  "/api/auth/login",
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
  userController.login
);

// Add New User
router.post(
  "/api/auth/user",
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
    body("role").trim(),
  ],
  userController.addNewUser
);

// Logout
router.post("/api/auth/users/logout", userController.logout);
router.get("/api/auth/users", userController.getUsers);

// getProfile
router.get(
  "/api/auth/users/profile",
  userAuthor,
  requireAuthor,
  userController.getCurrentUser
);

export { router as authentication };
