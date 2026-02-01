import Order from "../models/Order.js";
import { createTTN } from "../services/novaposhta.service.js";

export const processOrders = async () => {
  const orders = await Order.find({ status: "paid" });

  for (const order of orders) {
    order.ttn = await createTTN(order);
    order.status = "sent";
    await order.save();
  }
};
