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
        return await Shelf.find(data).exec();
    } catch (error) {
    }
};