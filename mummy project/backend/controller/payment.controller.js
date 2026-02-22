const crypto = require("crypto");
const orderModel = require("../model/order.model");
const paymentModel = require("../model/payment.model");
const { razorpay } = require("../utils/razorpay");

const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // rupees → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Fetch full payment details from Razorpay and save to Payment model
    try {
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      const newPayment = new paymentModel({
        razorpay_payment_id,
        razorpay_order_id,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        status: paymentDetails.status,
        method: paymentDetails.method,
        email: paymentDetails.email,
        contact: paymentDetails.contact,
        productname: orderData.productname,
      });
      await newPayment.save();
    } catch (err) {
      console.log("Payment details fetch error:", err.message);
    }

    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
};

// Razorpay webhook handler — requires raw body (registered separately in index.js)
const handleWebhook = async (req, res) => {
  const rawBody = req.body; // Buffer from express.raw()
  const signature = req.headers["x-razorpay-signature"];

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const event = JSON.parse(rawBody.toString());
  const paymentEntity = event.payload?.payment?.entity;

  if (!paymentEntity) {
    return res.status(200).json({ received: true });
  }

  const { id, order_id, amount, currency, status, method, email, contact } = paymentEntity;

  // Update existing record or insert new one
  await paymentModel.findOneAndUpdate(
    { razorpay_payment_id: id },
    { status, method, email, contact, amount, currency, razorpay_order_id: order_id },
    { upsert: true, new: true }
  );

  res.status(200).json({ received: true });
};

const getPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find().sort({ createdAt: -1 });
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPaymentOrder, verifyPayment, handleWebhook, getPayments };
