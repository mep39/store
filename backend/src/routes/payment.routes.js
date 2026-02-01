import { Router } from "express";
import { getPaymentForm, wayforpayCallback } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create", getPaymentForm);
router.post("/callback", wayforpayCallback);

export default router;
