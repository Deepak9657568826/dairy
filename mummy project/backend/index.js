const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const cors = require("cors");
const { orderRouter } = require("./routes/order.route");
const { verifytoken } = require("./middleware/verifyToken");



const app = express();
app.use(express.json())
app.use(express.text())
app.use(cors())


app.use("/", userRouter)

app.use("/product", productRouter)

app.use("/order", orderRouter)

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
