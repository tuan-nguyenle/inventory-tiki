import "express-async-errors";
import { BadRequestError } from "@microservies-inventory/common";
import { Shelf } from "../models/shelf.model";

export const findOneShelf = async (shelf_code: any): Promise<Shelf> => {
    const shelf = await Shelf.findOne({ shelf_code: shelf_code });

    if (!shelf) {
        throw new BadRequestError(`Shelf not found`);
    }

    return shelf;
};

export const findOneAndUpdate = async (data: Record<string, any>) => {
    const shelf = await Shelf.findOneAndUpdate({ _id: data._id }, data);

    return shelf;
};

export const findShelf = async (data: Record<string, any>) => {
    try {
        const query: any = {};
        if (data.product_name) {
            query["products.product_name"] = data.product_name;
        }
        if (data.bar_code) {
            query["products.bar_code"] = data.bar_code;
        }
        if (data.supplier) {
            query["products.supplier_name"] = data.supplier;
        }
        if (data.sku) {
            query["products.sku"] = data.sku;
        }

        if (Object.keys(query).length > 0) {
            return await Shelf.find(query,
                { shelf_code: 1, "products.$": 1 }
            ).exec();
        }

        return await Shelf.find(data).exec();
    } catch (error) {
    }
};