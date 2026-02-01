import express from "express";
import Order from "../models/Order.js";
import { verifySignature } from "../services/wayforpay.js";
import { sendPaidEmail } from "../services/mail.js";

const router = express.Router();

router.post("/callback", async (req, res) => {
  try {
    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      transactionStatus,
      merchantSignature
    } = req.body;

    const order = await Order.findById(orderReference).populate("user");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 1️⃣ перевірка суми
    if (Number(order.total) !== Number(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // 2️⃣ перевірка валюти
    if (currency !== "UAH") {
      return res.status(400).json({ error: "Invalid currency" });
    }

    // 3️⃣ перевірка підпису
    const signData = [
      merchantAccount,
      orderReference,
      amount,
      currency,
      transactionStatus
    ];

    const isValid = verifySignature(
      signData,
      merchantSignature,
      process.env.WFP_SECRET
    );

    if (!isValid) {
      return res.status(403).json({ error: "Invalid signature" });
    }

    // 4️⃣ ОБРОБКА УСПІШНОЇ ОПЛАТИ
    if (transactionStatus === "Approved") {

      // ⛔ захист від повторного callback
      if (order.status !== "paid") {
        order.status = "paid";
        order.payment = {
          method: "WayForPay",
          status: "paid"
        };

        await order.save();

        // 📧 email після оплати
        await sendPaidEmail(order);
      }
    }

    // 5️⃣ обовʼязкова відповідь WayForPay
    return res.json({
      orderReference,
      status: "accept",
      time: Math.floor(Date.now() / 1000)
    });

  } catch (err) {
    console.error("WayForPay callback error:", err);
    return res.status(500).json({ error: "Callback error" });
  }
});

export default router;


