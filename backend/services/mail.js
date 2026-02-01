import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASS
  }
});

export function sendPaidEmail(order) {
  return transporter.sendMail({
    from: "shop@example.com",
    to: order.user.email,
    subject: "Замовлення оплачено",
    html: `
      <h2>Дякуємо за оплату</h2>
      <p>Замовлення №${order._id}</p>
      <p>Сума: ${order.total} грн</p>
    `
  });
}
