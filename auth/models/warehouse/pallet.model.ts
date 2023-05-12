// import mongoose, { Schema } from "mongoose";

// enum PalletType {
//   Wood = "Wood",
//   Metal = "Metal",
//   Plastic = "Plastic",
// }

// interface Pallet {
//   bar_code: string;
//   location: string;
//   type: PalletType;
//   dimensions: {
//     length: number;
//     width: number;
//     height: number;
//   };
//   weight: number;
//   products: [];
//   status: boolean;
// }

// const PalletSchema = new Schema<Pallet, Document>(
//   {
//     namePallet: { type: String, required: true, unique: true },
//     description: { type: String, required: true },
//     location: { type: String, required: true },
//     type: { type: String, required: true, enum: Object.values(PalletType) },
//     bar_code: { type: String, required: true,unique:true },
//     dimensions: {
//       length: { type: Number, required: true },
//       width: { type: Number, required: true },
//       height: { type: Number, required: true },
//     },
//     weight: { type: Number, required: true },
//     products: [
//   {
//     product_name: { type: String, required: true },
//     category: { type: String, required: true },
//     bar_code: { type: String, required: true },
//     quantity: { type: Number, default: 0 },
//     sku: { type: String, required: true },
//     unit: {
//       type: String,
//     },
//     supplier_name: { type: String, required: true },
//   },
// ],
//     status: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform(doc, ret) {
//         delete ret.__v;
//       },
//     },
//   }
// );

// const Pallet = mongoose.model<Pallet & Document>("Pallet", PalletSchema);

// export { Pallet };
