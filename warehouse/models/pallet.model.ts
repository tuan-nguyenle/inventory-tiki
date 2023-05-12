import mongoose, { Document, Schema } from "mongoose";

enum PalletType {
    Wood = "Wood",
    Metal = "Metal",
    Plastic = "Plastic",
}

enum Area {
    Inbound = "Inbound",
    Outbound = "Outbound",
}

interface Pallet {
    name_pallet: string;
    area: Area;
    type: PalletType;
    dimensions: {
        length: number,
        width: number,
        height: number,
    };
    weight: number;
    products: [
        product: {
            product_name: string;
            category: string;
            bar_code: string;
            sku: string;
            unit: string;
            quantity: number;
            supplier_name: string;
        }
    ];
    status: boolean;
}

const PalletSchema = new Schema<Pallet, Document>(
    {
        name_pallet: { type: String, required: true, unique: true },
        area: { type: String, required: true, enum: Object.values(Area) },
        type: { type: String, required: true, enum: Object.values(PalletType) },
        dimensions: {
            length: { type: Number, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
        weight: { type: Number, required: true },
        products: [
            {
                product_name: { type: String, required: true },
                category: { type: String, required: true },
                bar_code: { type: String, required: true },
                quantity: { type: Number, default: 0 },
                sku: { type: String, required: true },
                unit: { type: String, require: true },
                supplier_name: { type: String, required: true },
            },
        ],
        status: { type: Boolean, default: false },
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

const Pallet = mongoose.model<Pallet & Document>("Pallet", PalletSchema);

export { Pallet };
