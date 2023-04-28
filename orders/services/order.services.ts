import { Order } from "../models/order.model";

export const viewAllOrders = async () => {
  const listOrder = await Order.find({}).exec();
  return listOrder;
};

export const insertOrder = async (order_attributes: Order) => {
  const order = new Order(order_attributes);

  return order.save();
};

export const viewDetailOrders = async (id: string) => {
  const order = await Order.findById(id);
  return order;
};
