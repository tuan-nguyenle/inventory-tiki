import { User } from "../models/account/user.model";
import { Password } from "../config/cryto";
import { findOneRole } from "./role.services";
import { findOneDepartment } from "./department.services";

export const addNewUser = async (userAttributes: any) => {
  const role = await findOneRole(userAttributes.roles);
  const department = await findOneDepartment(userAttributes.departments);
  const user = new User({
    username: userAttributes.username,
    fullname: userAttributes.fullname,
    phone: userAttributes.phone,
    password: await Password.hashedPassword(userAttributes.password),
    roles: role?._id,
    departments: department?._id,
  });
  return user.save();
};

export const checkUser = async (username: string) => {
  return User.findOne({ username }).populate("roles").populate("departments");
};
