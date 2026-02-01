import crypto from "crypto";
import { WAYFORPAY } from "../config/wayforpay.js";

export const createWayForPayForm = (order) => {
  const data = {
    merchantAccount: WAYFORPAY.merchantAccount,
    merchantDomainName: WAYFORPAY.merchantDomainName,
    orderReference: order._id.toString(),
    orderDate: Math.floor(Date.now() / 1000),
    amount: order.total,
    currency: "UAH",
    productName: order.items.map(i => i.title),
    productPrice: order.items.map(i => i.price),
    productCount: order.items.map(i => i.qty),
    serviceUrl: WAYFORPAY.serviceUrl
  };

  const signString = [
    data.merchantAccount,
    data.merchantDomainName,
    data.orderReference,
    data.orderDate,
    data.amount,
    data.currency,
    ...data.productName,
    ...data.productCount,
    ...data.productPrice
  ].join(";");

  data.merchantSignature = crypto
    .createHmac("md5", WAYFORPAY.merchantSecret)
    .update(signString)
    .digest("hex");

  return data;
};
