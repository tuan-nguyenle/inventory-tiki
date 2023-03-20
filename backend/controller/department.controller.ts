import * as Department from "../services/department.services";

export const findDepartmentExists = async (DepartmentDescription: string) => {
  return await Department.findOneDepartment(DepartmentDescription);
};

export const addNewDepartment = async (DepartmentDescription: string) => {
  return await Department.addNewDepartment(DepartmentDescription);
};
