const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productImage:{
        type:String
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    phoneNumber:{
        type:Number
    },
    discription:{
        type:String
    },
    unit:{
        type:String
    },
    state:{
        type:String
    },
    creatorname:{
        type: String
    }, 
    creatorid:{
        type: String
    }

}, {
    timestamps: true
});

const productModel = mongoose.model('Product', productSchema);

module.exports = {
    productModel
}
