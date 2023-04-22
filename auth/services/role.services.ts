import { Role } from "../models/account/role.model";

export const findOneRole = async (roleDescription: string) => {
  return await Role.findOne({
    description: roleDescription,
  });
};
