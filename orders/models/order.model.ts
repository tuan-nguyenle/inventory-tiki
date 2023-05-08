import mongoose, { Document, ObjectId, Schema } from "mongoose";
// gui den nhiu xe / khong du hang thi stack car
// sau do thi tra lai phieu missing and warehouse repack
enum OrderType {
  WAREHOUSE_EXPORT = "Warehouse Export",
  WAREHOUSE_ORDER = "Warehouse Order",
  WAREHOUSE_ORDER_REPACK = "Warehouse Orders Repack",
}

enum StatusType {
  UNCHECK = "Unchecked",
  MISSING = "Not Enough Stock",
  STOCKED = "Stocked",
}

interface Order {
  container_code: string;
  deliverer: string; //nguoi gui hang
  license_plates: string; // Bien So Xe
  store_keeper: string;
  order_type: string;
  status: string;
  packages: {
    package_code: string;
    products: {
      product_name: string;
      category: string;
      bar_code: string;
      sku: string;
      unit: string;
      quantity: number;
      supplier_name: string;
    }[];
  }[];
  stack_car: boolean;
  parentID: Order;
  childID: [];
}

const OrderSchema = new Schema<Order, Document>(
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
            quantity: { type: Number, default: 0 },
            sku: { type: String, required: true },
            unit: {
              type: String,
            },
            supplier_name: { type: String, required: true },
          },
        ],
      },
    ],
    order_type: {
      type: String,
      required: true,
      enum: Object.values(OrderType),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(StatusType),
    },
    stack_car: {
      type: Boolean,
      required: true,
    },
    parentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null
    },
    childID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null,
      }
    ],
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

const Order = mongoose.model<Order & Document>("Order", OrderSchema);

export { Order };
