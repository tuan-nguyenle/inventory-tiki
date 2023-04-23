// import mongoose, { Schema } from "mongoose";
// import { Package } from "./package.model";

// enum PalletType {
//   Wood = "Wood",
//   Metal = "Metal",
//   Plastic = "Plastic",
// }

// interface Pallet {
//   namePallet: string;
//   description: string;
//   location: string;
//   type: PalletType;
//   bar_code: string;
//   dimensions: {
//     length: number;
//     width: number;
//     height: number;
//   };
//   weight: number;
//   packages: Package;
//   status: boolean;
// }

// const PalletSchema = new Schema<Pallet, Document>(
//   {
//     namePallet: { type: String, required: true, unique: true },
//     description: { type: String, required: true },
//     location: { type: String, required: true },
//     type: { type: String, required: true, enum: Object.values(PalletType) },
//     bar_code: { type: String, required: true },
//     dimensions: {
//       length: { type: Number, required: true },
//       width: { type: Number, required: true },
//       height: { type: Number, required: true },
//     },
//     weight: { type: Number, required: true },
//     packages: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Package",
//       },
//     ],
//     status: { type: Boolean, default: true },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );

// const Pallet = mongoose.model<Pallet & Document>("Pallet", PalletSchema);

// export { Pallet };
