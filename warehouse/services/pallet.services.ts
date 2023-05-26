import "express-async-errors";
import { BadRequestError } from "@microservies-inventory/common";
import { Pallet } from "../models/pallet.model";

export const searchPallet = async (pallet_record: Record<string, any>) => {
    console.log(pallet_record);

    const { available, ...searchParams } = pallet_record;

    const query = available
        ? { ...searchParams, products: { $size: 0 } }
        : searchParams;

    const listPallet = await Pallet.find(query).exec();
    return listPallet;
};

export const insertPallet = async (pallet_record: Record<string, any>) => {
    if (Array.isArray(pallet_record)) {
        return Pallet.insertMany(pallet_record);
    }
    return new Pallet(pallet_record).save();
};

export const findOnePallet = async (name_pallet: any): Promise<Pallet> => {
    const pallet = await Pallet.findOne({ name_pallet: name_pallet });

    if (!pallet) {
        throw new BadRequestError(`pallet not found`);
    }

    return pallet;
};

export const findOneAndUpdate = async (data: Record<string, any>) => {
    if (data.finish) {
        const truncPallet = await Pallet.findOneAndUpdate(
            { _id: data._id }, // Filter: Find the document with the specified _id
            {
                $set: {
                    products: [] // Set the "products" field as an empty array
                }
            }
        );

        return truncPallet;
    }
    const pallet = await Pallet.findOneAndUpdate({ _id: data._id }, data);
    return pallet;
};

export const updateMany = async (data: Record<string, any>) => {
    return await Pallet.updateMany(
        { "products": { $elemMatch: { "quantity": 0 } } },
        { $pull: { "products": { "quantity": 0 } } }
    )
}