import { Role } from "../models/role.model";

const findOneRole = async (roleDescription: string) => {
  return await Role.findOne({
    description: roleDescription,
  });
};

export { findOneRole };
