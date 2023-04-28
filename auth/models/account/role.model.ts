import mongoose, { Document, Schema } from "mongoose";

export interface Role {
  description: string;
}

const RoleSchema = new Schema<Role & Document>(
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

export const Role = mongoose.model<Role & Document>("Role", RoleSchema);
