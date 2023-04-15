import mongoose, { Schema } from "mongoose";

interface ConditionProduct {
  description: string;
}

const ConditionProductSchema = new Schema<ConditionProduct, Document>(
  {
    description: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const ConditionProduct = mongoose.model<ConditionProduct & Document>(
  "ConditionProduct",
  ConditionProductSchema
);

export { ConditionProduct };
