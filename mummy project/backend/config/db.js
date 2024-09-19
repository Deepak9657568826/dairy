
const mongoose =require("mongoose")

require('dotenv').config()


const connection  = mongoose.connect(process.env.monngoDB_URL)

module.exports ={
    connection
}