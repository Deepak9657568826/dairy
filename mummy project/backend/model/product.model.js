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
        type: String,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    phoneNumber:{
        type:Number
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
