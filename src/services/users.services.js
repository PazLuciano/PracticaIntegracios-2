
const { userModel } = require("../models/usuario.model");



class UsuarioManager {
    async agregarUsuario(usuario) {
        try {
            const user = await userModel.create(usuario);
            
            return user
        } catch (error) {
            console.log("12",error.message);
            return 0
        }
    }
    async getUserByMail(mail){
        try {
           const user = await userModel.find({mail : mail});
           return user
        } catch (error) {
            console.log("serviceUser23", error.message);
        }
    }
}


module.exports = UsuarioManager