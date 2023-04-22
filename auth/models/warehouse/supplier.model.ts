import mongoose, { Schema } from "mongoose";

interface Supplier {
  name_supplier: string;
  business: string; // loai doanh nghiep
  phone: string;
  location: string;
  actived: number;
}

const SupplierSchema = new Schema<Supplier, Document>(
  {
    name_supplier: { type: String, required: true, unique: true },
    business: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    actived: { type: Number, default: 1 },
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

const Supplier = mongoose.model<Supplier & Document>(
  "Supplier",
  SupplierSchema
);

export { Supplier };
