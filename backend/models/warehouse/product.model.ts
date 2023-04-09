import mongoose, { Schema } from "mongoose";
import { Category } from "./category.model";
import { Supplier } from "./supplier.model";
import { ConditionProduct } from "./condition_product.model";

interface Product {
  product_name: string;
  bar_code: string;
  category: Category;
  suppiler: Supplier;
  quantity: number;
  condition: ConditionProduct;
}

const ProductSchema = new Schema<Product, Document>(
  {
    product_name: { type: String, required: true },
    bar_code: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    condition: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConditionProduct",
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    suppiler: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suppiler",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Product = mongoose.model<Product & Document>("Product", ProductSchema);

export { Product };
