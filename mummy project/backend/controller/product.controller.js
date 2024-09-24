const { productModel } = require("../model/product.model");

const addProduct = async (req, res) => {
    const payload = req.body;
    try {
        const newProdut = new productModel(payload)
        newProdut.save()
        res.status(200).json({ "Message": "New product added successfully" })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}

const getAllProduct = async (req, res) => {
    
    try {
        const allproduct = await productModel.find({})
        res.status(200).json({ "Message": "List of all product", allproduct })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}

const getsingleProduct = async (req, res) => {
    const {id} = req.params

    try {
        const Singleproduct = await productModel.findOne({_id:id})
        res.status(200).json({ "Message": "Single product", Singleproduct })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}




const updateProduct = async (req, res) => {
    const {id} = req.params
    const payload = req.body
    try {
        const newProdut = await productModel.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({ "Message": "Product update successfully" , newProdut })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}

const updateProductwithPatch = async (req, res) => {
    const {id} = req.params
    const payload = req.body
    try {
        const newProdut = await productModel.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({ "Message": "Product update successfully" , newProdut })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const newProdut = await productModel.findByIdAndDelete({_id:id})
        res.status(200).json({ "Message": "Product delete successfully" })
    } catch (error) {
        res.status(200).json({"Message":error.message})
    }
}

module.exports = {
 addProduct ,
 getAllProduct,
 updateProduct, 
 deleteProduct, 
 updateProductwithPatch, 
 getsingleProduct
}

