import mongoose, { Schema } from "mongoose";

interface Supplier {
  namesupplier: string;
  busines: string;
  phone: string;
  location: string;
  actived: number;
}

const SupplierSchema = new Schema<Supplier, Document>(
  {
    namesupplier: { type: String, required: true, unique: true },
    busines: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    actived: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.actived;
      },
    },
  }
);

const Supplier = mongoose.model<Supplier & Document>(
  "Supplier",
  SupplierSchema
);

export { Supplier };
