import "express-async-errors";
import express from "express";
import { body } from "express-validator";
import * as userController from "../controller/user.controller";
import * as departmentController from "../controller/department.controller";
import { Role } from "../models/role.model";

const router = express.Router();

// Add new New Department
router.post(
  "/api/department",
  [body("department").trim().isLength({ min: 4, max: 25 })],
  departmentController.addNewDepartment
);

// Add new New Role
// router.post(
//   "/api/roles",
//   // [body("department").trim().isLength({ min: 4, max: 25 })],
//   async () => {
//     await new Role({
//       description: "manager",
//     }).save();
//   }
// );

// Login

// login
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
  userController.login
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
    body("role").trim(),
  ],
  userController.addNewUser
);

export { router as authentication };
