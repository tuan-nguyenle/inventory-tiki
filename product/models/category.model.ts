import mongoose, { Schema } from "mongoose";

interface Category {
  category_name: string;
  category_description: string;
  parent_id: Category | null;
}

const CategorySchema = new Schema<Category, Document>(
  {
    category_name: { type: String, required: true, unique: true },
    category_description: { type: String, required: true },
    parent_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Category = mongoose.model<Category & Document>(
  "Category",
  CategorySchema
);

export { Category };
