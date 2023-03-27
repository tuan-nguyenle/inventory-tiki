import { Department } from "../models/department.model";
import { BadRequestError } from "../middleware/error/errors";
import "express-async-errors";

export const findOneDepartment = async (DepartmentDescription: string) => {
  return await Department.findOne({
    description: DepartmentDescription,
  });
};

export const addNewDepartment = async (DepartmentDescription: string) => {
  if (await findOneDepartment(DepartmentDescription)) {
    throw new BadRequestError("Department Exist");
  }

  return new Department({ description: DepartmentDescription }).save();
};
