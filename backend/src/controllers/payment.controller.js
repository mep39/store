import Order from "../models/Order.js";
import { createWayForPayForm } from "../services/wayforpay.service.js";
import crypto from "crypto";

export const getPaymentForm = async (req, res) => {
  const order = await Order.findById(req.body.orderId);
  res.json(createWayForPayForm(order));
};

export const wayforpayCallback = async (req, res) => {
  const { orderReference, transactionStatus, merchantSignature } = req.body;

  const sign = crypto
    .createHmac("md5", process.env.WFP_SECRET)
    .update([
      req.body.merchantAccount,
      orderReference,
      transactionStatus,
      req.body.amount,
      req.body.currency
    ].join(";"))
    .digest("hex");

  if (sign !== merchantSignature) {
    return res.status(403).end();
  }

  if (transactionStatus === "Approved") {
    const order = await Order.findById(orderReference);
    order.status = "paid";
    order.payment.status = "paid";
    await order.save();
  }

  res.json({ status: "accept" });
};
