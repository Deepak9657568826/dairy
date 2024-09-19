const  orderModel = require("../model/order.model")


const placeorder = async(req, res)=>{
    const payload = req.body
    try {
        const newOrder = new orderModel(payload)
        await newOrder.save()
        res.status(200).json({Message:"New order place successfuly"});
    } catch (error) {
        res.status(200).json({Message:error});
    }
}

const getOrderList = async(req, res)=>{
    try {
        const orderList = await orderModel.find({})
        res.status(200).json({Message:"OrderList", orderList});
    } catch (error) {
        res.status(200).json({Message:error});
    }
}

const updateOrder = async(req, res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        const orderList = await orderModel.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({Message:"Order update successfully"});
    } catch (error) {
        res.status(200).json({Message:error});
    }
}

const updateOrderwithPatch = async(req, res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        const orderList = await orderModel.findByIdAndUpdate({_id:id}, payload)
        res.status(200).json({Message:"Order update successfully"});
    } catch (error) {
        res.status(200).json({Message:error});
    }
}


const deleteOrder = async(req, res)=>{
    const {id} = req.params
    try {
        const orderList = await orderModel.findByIdAndDelete({_id:id})
        res.status(200).json({Message:"Order delete successfully"});
    } catch (error) {
        res.status(200).json({Message:error});
    }
}

module.exports ={
    placeorder, 
    getOrderList , 
    updateOrder , 
    deleteOrder, 
    updateOrderwithPatch
}