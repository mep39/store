import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoice = (order) =>
  new Promise(resolve => {
    const path = `uploads/invoices/${order._id}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path));
    doc.text(`Рахунок №${order._id}`);
    doc.text(`Сума: ${order.total} грн`);
    doc.end();
    resolve(path);
  });
