import mongoose, { Schema } from "mongoose";
import { Role } from "./role.model";
import { Department } from "./department.model";

interface User {
  username: string;
  fullname: string;
  password: string;
  phone: string;
  actived: true;
  roles: Role;
  departments: Department;
}

const UserSchema = new Schema<User, Document>(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    actived: { type: Boolean, required: true, default: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User & Document>("User", UserSchema);

export { User };
