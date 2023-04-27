import mongoose, { Document, Schema } from "mongoose";
// import { Package } from "./package.model";

// gui den nhiu xe / khong du hang thi stack car
// sau do thi tra lai phieu missing and warehouse repack
enum ReceiptType {
  WAREHOUSE_EXPORT = "Warehouse Export",
  WAREHOUSE_RECEIPT = "Warehouse Receipt",
  WAREHOUSE_RECEIPT_REPACK = "Warehouse Receipt Repack",
}

enum StatusType {
  UNCHECK = "Unchecked",
  MISSING = "Not Enough Stock",
  STOCKED = "Stocked",
  STACK_CAR = "Stack Car",
}

interface Receipt {
  container_code: string;
  deliverer: string; //nguoi gui hang
  license_plates: string; // Bien So Xe
  store_keeper: string;
  receipt_type: ReceiptType;
  status: StatusType;
  packages: {
    package_code: string;
    products: {
      product_name: string;
      category: string;
      bar_code: string;
      sku: string;
      unit: string;
      supplier_name: string;
    }[];
  }[];
}

const ReceiptSchema = new Schema<Receipt, Document>(
  {
    container_code: { type: String, required: true },
    deliverer: { type: String, required: true, default: "Qlo" },
    license_plates: { type: String, default: "79-N2 12345" },
    store_keeper: { type: String, required: true },
    packages: [
      {
        package_code: { type: String, required: true },
        products: [
          {
            product_name: { type: String, required: true },
            category: { type: String, required: true },
            bar_code: { type: String, required: true },
            sku: { type: String, required: true },
            unit: {
              type: String,
            },
            supplier_name: { type: String, required: true },
          },
        ],
      },
    ],
    receipt_type: {
      type: String,
      required: true,
      enum: Object.values(ReceiptType),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(StatusType),
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

const Receipt = mongoose.model<Receipt & Document>("Receipt", ReceiptSchema);

export { Receipt };
