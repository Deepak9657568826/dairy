const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

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
    creatorname:{
        type: String
    }, 
    creatorid:{
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Canceled'],
        default: 'Pending'
    },
    phoneNumber:{
        type:Number
    }

},
    {
        timestamps: true

    });

module.exports = mongoose.model('Order', orderSchema);
