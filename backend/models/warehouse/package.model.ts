import mongoose, { Schema } from "mongoose";

interface Package {
  container_code: string; // Ma so hang van chuyen
  bar_code: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  package_types: string;
  //   products:
}

const PackageSchema = new Schema<Package, Document>(
  {
    container_code: { type: String, required: true },
    bar_code: { type: String, required: true },
    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    package_types: { type: String, required: true },
    // products
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

const Package = mongoose.model<Package & Document>("Package", PackageSchema);

export { Package };
