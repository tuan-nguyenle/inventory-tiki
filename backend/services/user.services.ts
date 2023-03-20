import "express-async-errors";
import { User } from "../models/user.model";
import { Password } from "../config/cryto";
// export const findOneDepartment = async (DepartmentDescription: string) => {
//   return await Department.findOne({
//     description: DepartmentDescription,
//   });
// };

export const addNewUser = async (user: User) => {
  console.log(user);
};
