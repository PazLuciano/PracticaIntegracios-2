const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    description : {
        type : String,
        required : true
    },
    section : {
        type: String,
        required: true,
        enum: ["material", "sanitarios", "ferreteria"]
    },
    price : {
        type : Number,
        required : true
    },
    code : {
        type : Number,
        required : true,
        unique : true 
    },
    stock : {
        type : Number,
        required : true
    },
    thumbanail : {
        type: Array,
        default: []
    }
    
})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productsSchema);

module.exports = { productsModel } ;