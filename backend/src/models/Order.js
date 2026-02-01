import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  email: String,
  phone: String,

  items: [{
    title: String,
    price: Number,
    qty: Number
  }],

  total: Number,

  status: {
    type: String,
    enum: ["new", "paid", "sent"],
    default: "new"
  },

  delivery: {
    city: String,
    warehouse: String,
    price: Number
  },

  payment: {
    method: String,
    status: String
  },

  ttn: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
