import { User } from "../models/user.model";
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
  // return await User.aggregate([
  //   {
  //     $match: {
  //       username: username,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "roles",
  //       localField: "roles",
  //       foreignField: "_id",
  //       as: "Role",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "departments",
  //       localField: "departments",
  //       foreignField: "_id",
  //       as: "Department",
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       username: 1,
  //       fullname: 1,
  //       phone: 1,
  //       password: 1,
  //       "Role.description": 1,
  //       "Department.description": 1,
  //     },
  //   },
  // ]);
};
