const express = require("express");
const { createPaymentOrder, verifyPayment, getPayments } = require("../controller/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createPaymentOrder);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/history", getPayments);

module.exports = { paymentRouter };
