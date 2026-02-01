import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true }
    }
  ],

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "new",
    enum: ["new", "paid", "sent", "delivered", "closed", "cancelled"]
  },

  delivery: {
    city: { type: String },
    warehouse: { type: String },
    price: { type: Number, default: 0 }
  },

  payment: {
    method: { type: String },
    status: { type: String }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", OrderSchema);

