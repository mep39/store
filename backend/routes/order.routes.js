import express from "express";
import Order from "../models/Order.js";
import { auth, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// создать заказ
router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    total: req.body.total
  });
  res.json(order);
});

// мои заказы
router.get("/my", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

// все заказы (admin)
router.get("/", auth, admin, async (_, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
});

// смена статуса
router.put("/:id", auth, admin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

export default router;
