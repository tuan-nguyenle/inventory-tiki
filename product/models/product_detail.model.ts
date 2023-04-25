import mongoose, { Schema } from "mongoose";
import { Supplier } from "./supplier.model";
import { Product } from "./product.model";

interface ProductDetail {
  bar_code: string;
  sku: string;
  quantity: number;
  available: number; // The quantity that is available on the stock.
  defective: number; // The total defective items either received at the inventory or returned by the customers.
  supplier: Supplier;
  product: Product;
  unit: string;
  reason: string;
}

const ProductDetailSchema = new Schema<ProductDetail, Document>(
  {
    bar_code: { type: String, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    defective: { type: Number, default: 0 },
    reason: { type: String },
    unit: {
      type: String,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
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

const ProductDetail = mongoose.model<ProductDetail & Document>(
  "ProductDetail",
  ProductDetailSchema
);

export { ProductDetail };
