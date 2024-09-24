
const express = require("express");
const { deleteProduct, updateProduct, addProduct, getAllProduct, updateProductwithPatch, getsingleProduct } = require("../controller/product.controller");
const { accesmiddleware } = require("../middleware/accessmiddleware");
const { authmiddleware } = require("../middleware/authmiddleware");

const productRouter = express.Router();

productRouter.post("/", authmiddleware,  accesmiddleware('admin'), addProduct)
productRouter.put("/:id",authmiddleware,  accesmiddleware('admin'), updateProduct)

productRouter.patch("/:id",authmiddleware , updateProductwithPatch)

productRouter.delete("/:id",authmiddleware,  accesmiddleware('admin'), deleteProduct)

productRouter.get("/", getAllProduct)

productRouter.get("/:id", getsingleProduct)


module.exports = {
    productRouter
}



