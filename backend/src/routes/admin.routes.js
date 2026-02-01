import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getOrders, updateOrder } from "../controllers/admin.controller.js";

const router = Router();

router.get("/orders", auth(["admin"]), getOrders);
router.patch("/orders/:id", auth(["admin"]), updateOrder);

export default router;
