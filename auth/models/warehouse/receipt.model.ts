// import mongoose, { Schema } from "mongoose";
// import { Package } from "./package.model";

// // gui den nhiu xe / khong du hang thi stack car
// // sau do thi tra lai phieu missing and warehouse repack
// enum ReceiptType {
//   WAREHOUSE_EXPORT = "Warehouse Export",
//   WAREHOUSE_RECEIPT = "Warehouse Receipt",
//   WAREHOUSE_RECEIPT_REPACK = "Warehouse Receipt Repack",
// }

// enum StatusType {
//   MISSING = "Not Enough Stock",
//   STOCKED = "Stocked",
//   STACK_CAR = "Stack Car",
// }

// interface Receipt {
//   deliverer: string; //nguoi gui hang
//   license_plates: string; // Bien So Xe
//   store_keeper: string;
//   packages: Package;
//   receipt_type: ReceiptType;
//   status: StatusType;
// }

// const ReceiptSchema = new Schema<Receipt, Document>(
//   {
//     deliverer: { type: String, required: true, default: "Qlo" },
//     license_plates: { type: String, default: "79-N2 12345" },
//     store_keeper: { type: String, required: true },
//     packages: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Package",
//       },
//     ],
//     receipt_type: {
//       type: String,
//       required: true,
//       enum: Object.values(ReceiptType),
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: Object.values(StatusType),
//     },
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

// const Receipt = mongoose.model<Receipt & Document>("Receipt", ReceiptSchema);

// export { Receipt };
