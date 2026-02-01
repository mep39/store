import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

export default router;
