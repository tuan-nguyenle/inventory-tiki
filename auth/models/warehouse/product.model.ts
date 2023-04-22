import mongoose, { Schema } from "mongoose";
import { Category } from "./category.model";
import { Supplier } from "./supplier.model";
import { ConditionProduct } from "./condition_product.model";

interface Product {
  product_name: string;
  quantity: number;
  condition: ConditionProduct;
  image: string;
  unit: string;
}

const ProductSchema = new Schema<Product, Document>(
  {
    product_name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    image: {
      type: String,
      default:
        "https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/319679335_537631668262888_5340863634551239276_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TEm6Fxwd6L0AX9vz5nw&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfA2Vehl2Rb1OaSOsNtmsdLK8mH1I1XKdvqZpV8IUfVFzg&oe=6440213A",
    },
    unit: {
      type: String,
    },
    condition: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConditionProduct",
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
