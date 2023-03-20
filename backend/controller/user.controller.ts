import * as User from "../services/user.services";

export const addNewUser = async (user: any) => {
  return await User.addNewUser(user);
};
