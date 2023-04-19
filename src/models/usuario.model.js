const mongoose = require("mongoose");
const usuariosCollection = "users"
const usuariosSchema = new mongoose.Schema({

    nombre : {
        type : String,
        required : true,
    },
    apellido : {
        type : String,
        required : true,
    },
    edad : {
        type : Number,
        required : true
    },
    mail : {
        type : String,
        required : true,
        unique : true
    },
    password : { 
        type : String,
        required : true,
    },
    rol : {

        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    },
    carrito : {
        type : Array,
        // type: [
        //     // {
        //     //     cart : {
        //     //         type: mongoose.Schema.Types.ObjectId,
        //     //         ref: "carts",
        //     //     }
        //     // }
        // ],
        default : []
    }
})
const userModel = mongoose.model(usuariosCollection, usuariosSchema)
module.exports = {userModel}