const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String },
  amount: { type: Number }, // in paise
  currency: { type: String, default: "INR" },
  status: { type: String, default: "captured" },
  method: { type: String },
  email: { type: String },
  contact: { type: String },
  productname: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
