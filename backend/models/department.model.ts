import mongoose, { Document, Schema } from "mongoose";

export interface Department {
  description: string;
}

const DepartmentSchema = new Schema<Department & Document>(
  {
    description: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model<Department & Document>(
  "Department",
  DepartmentSchema
);

export { Department };
