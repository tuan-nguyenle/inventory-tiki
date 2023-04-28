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
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

const Department = mongoose.model<Department & Document>(
  "Department",
  DepartmentSchema
);

export { Department };
