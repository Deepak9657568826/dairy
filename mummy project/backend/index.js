const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const cors = require("cors");
const { orderRouter } = require("./routes/order.route");
const { verifytoken } = require("./middleware/verifyToken");
const { paymentRouter } = require("./routes/payment.routes");
const { handleWebhook } = require("./controller/payment.controller");

const app = express();

// Webhook route must use raw body BEFORE express.json() so signature verification works
app.post("/payment/webhook", express.raw({ type: "application/json" }), handleWebhook);

app.use(express.json())
app.use(express.text())
app.use(cors())


app.use("/", userRouter)

app.use("/product", productRouter)

app.use("/order", orderRouter)

app.use("/payment", paymentRouter);


app.use("/verifyToken",verifytoken)

app.get("/home", (req, res)=>{
res.send("THis is home page")
})

const PORT = process.env.PORT || 8080 ;

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on port ${PORT}`);
        console.log("Conneted to server");

    } catch (error) {
        console.log(error.message);
    }
})
