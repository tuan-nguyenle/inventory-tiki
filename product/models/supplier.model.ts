import mongoose, { Schema } from "mongoose";

interface Supplier {
  name_supplier: string;
  business: string; // loai doanh nghiep
  phone: string;
  location: string;
}

const SupplierSchema = new Schema<Supplier, Document>(
  {
    name_supplier: { type: String, required: true, unique: true },
    business: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
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

const Supplier = mongoose.model<Supplier & Document>(
  "Supplier",
  SupplierSchema
);

export { Supplier };
