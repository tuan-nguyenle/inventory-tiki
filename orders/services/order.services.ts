import { BadRequestError } from "@microservies-inventory/common";
import { Order } from "../models/order.model";

export const viewAllOrders = async () => {
  const listOrder = await Order.find({}).exec();
  return listOrder;
};

export const insertOrder = async (order_attributes: Order) => {
  const order = new Order(order_attributes);

  return order.save();
};

export const findOneOrder = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new BadRequestError(`Order not found: ${id}`);
  }

  return order;
};

export const findOneAndUpdate = async (id: string, dataObj: Record<string, unknown>) => {
  const order = await Order.findOneAndUpdate({ _id: id }, dataObj);

  if (order?.parentID !== null && order?.status === "Stocked") {
    await findOneAndUpdate(String(order?.parentID), { status: "Stocked" });
  }

  return order;
};