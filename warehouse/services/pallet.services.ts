// import { BadRequestError } from "@microservies-inventory/common";
import { Pallet } from "../models/pallet.model";

export const searchPallet = async (pallet_record: Record<string, any>) => {
    const listPallet = await Pallet.find(pallet_record).exec();
    return listPallet;
};

export const insertPallet = async (pallet_record: Record<string, any>) => {
    if (Array.isArray(pallet_record)) {
        return Pallet.insertMany(pallet_record);
    }
    return new Pallet(pallet_record).save();
};

// export const findOrder = async (dataObj: Record<string, unknown>): Promise<Order> => {
//     const order = await Order.findOne({ _id: dataObj._id });

//     if (!order) {
//         throw new BadRequestError(`Order not found`);
//     }

//     if (dataObj.reback === true) {
//         return await findOrder({ _id: order?.childID.slice(-1)[0] });
//     }

//     return order;
// };

// export const findOneOrderAndUpdate = async (id: string, dataObj: Record<string, unknown>) => {
//     const order = await Order.findOneAndUpdate({ _id: id }, { $set: { status: dataObj.status }, $push: { childID: dataObj.childID } }, { returnOriginal: false });

//     if (order?.parentID !== null) {
//         await findOneOrderAndUpdate(String(order?.parentID), { status: "Stocked" });
//     }

//     if (order?.parentID === null && order?.status === "Stocked") {
//         await Order.updateMany({ _id: { $in: order.childID } }, { $set: { status: "Stocked" } });
//     }

//     return order;
// };