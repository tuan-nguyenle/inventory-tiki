import mongoose, { Schema } from "mongoose";

enum PalletType {
  Wood = "Wood",
  Metal = "Metal",
  Plastic = "Plastic",
}

interface Pallet {
  namePallet: string;
  description: string;
  location: string;
  type: PalletType;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  status: boolean;
}

const PalletSchema = new Schema<Pallet, Document>(
  {
    namePallet: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(PalletType) },
    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    status: { type: Boolean, default: true },
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

const Pallet = mongoose.model<Pallet & Document>("Pallet", PalletSchema);

export { Pallet };
