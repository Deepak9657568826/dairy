
const express = require("express");
const { placeorder, getOrderList, updateOrder, deleteOrder, updateOrderwithPatch } = require("../controller/order.controller");
const { authmiddleware } = require("../middleware/authmiddleware");
const { accesmiddleware } = require("../middleware/accessmiddleware");

const orderRouter = express.Router();

orderRouter.post("/", authmiddleware,  accesmiddleware('admin', 'user'), placeorder)
orderRouter.put("/:id",authmiddleware,  accesmiddleware('admin'), updateOrder)
orderRouter.patch("/:id",authmiddleware,  accesmiddleware('admin'), updateOrderwithPatch)

orderRouter.delete("/:id",authmiddleware,  accesmiddleware('admin'), deleteOrder)

orderRouter.get("/",authmiddleware,  accesmiddleware('admin'), getOrderList)


module.exports = {
    orderRouter
}

