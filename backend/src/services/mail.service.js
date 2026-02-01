import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendClientEmail = async (order, pdf) => {
  await transporter.sendMail({
    to: order.email,
    subject: "Замовлення оплачено",
    text: "Ваше замовлення прийнято",
    attachments: [{ path: pdf }]
  });
};

export const sendAdminEmail = async (order) => {
  await transporter.sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: "Нове замовлення",
    text: `Замовлення ${order._id}`
  });
};
