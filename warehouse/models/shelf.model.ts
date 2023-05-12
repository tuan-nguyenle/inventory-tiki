import mongoose, { Document, Schema } from "mongoose";

interface Shelf {
    shelf_code: string;
    // location: any;
    parentID: Shelf;
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
}

const ShelfSchema = new Schema<Shelf, Document>(
    {
        shelf_code: { type: String, required: true, unique: true },
        parentID: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shelf"
            }
        ],
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

const Shelf = mongoose.model<Shelf & Document>("Shelf", ShelfSchema);

export { Shelf };
