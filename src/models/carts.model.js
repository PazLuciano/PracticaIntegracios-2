const mongoose = require("mongoose");

const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
    products: {
        type : Array,
        // type: [
        //     {
        //         product:{
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "products",
        //         },
        //         quantity : {
        //             type: Number,
        //             default: 1
        //         }
                
            
        //     }
        // ],
        default: []
    },
    user :  { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
})

const cartModel = mongoose.model(cartCollection,cartSchema);

module.exports = cartModel;