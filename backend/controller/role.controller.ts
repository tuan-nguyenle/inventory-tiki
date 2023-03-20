import { findOneRole } from "../services/role.services";

const findRoleExists = async (roleDescription: string) => {
  return await findOneRole(roleDescription);
};

export { findRoleExists };
