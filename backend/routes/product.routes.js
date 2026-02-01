import express from "express";
import Product from "../models/Product.js";
import { auth, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await Product.find());
});

router.post("/", auth, admin, async (req, res) => {
  res.json(await Product.create(req.body));
});

router.put("/:id", auth, admin, async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
