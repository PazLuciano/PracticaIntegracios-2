const mongoose = require("mongoose");

const mongoDBconnection = async () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/practicaECOMMERCE");
        console.log("============CONNECTADO CORRECTAMENTE!===============");
    } catch (error) {
        console.log("Mongo.config error L7 => ", error.message);
    }
}

module.exports = mongoDBconnection;