import "express-async-errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as Department from "../services/department.services";
import { RequestValidationError } from "@microservies-inventory/common/build";

export const findDepartmentExists = async (DepartmentDescription: string) => {
  return await Department.findOneDepartment(DepartmentDescription);
};

export const addNewDepartment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const department = await Department.addNewDepartment(req.body.department);

  res
    .status(200)
    .send({ msg: "Add New Department Success", department: department });
};
