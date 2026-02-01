import express from "express";
import Order from "../models/Order.js";
import { createTTN } from "../services/novaposhta.js";
import { auth, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/orders/:id/ttn", auth, admin, async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) return res.status(404).json("Order not found");

  const ttn = await createTTN(order);

  order.status = "sent";
  order.delivery.ttn = ttn;
  await order.save();

  res.json({ ttn });
});

export default router;

