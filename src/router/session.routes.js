const { Router } = require("express");
const UsuarioManager = require("../services/users.services");
const { isValidPasswd, createHashValue } = require("../utils/encrypt");
const { generateJWT } = require("../utils/jwt");
const handlePolicies = require("../middleware/handle-policies.middleware");
const { log } = require("handlebars/runtime");
const CartManager = require("../services/carts.services");
const router = Router();
const manager = new UsuarioManager()
const cartManager =  new CartManager()

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(email, password);
      const findUser = await manager.getUserByMail(email)
      // console.log("USER", findUser);
      if (!findUser) {
        return res
          .status(401)
          .json({ message: `este usuario no esta registrado` });
      }
      const isValidComparePsw = await isValidPasswd(password, findUser[0].password);
      if (!isValidComparePsw) {
        return res.status(401).json({ message: `contraseña incorrecta` });
      }
  
      const user = {
        email,
        role: findUser[0].rol,
        id: findUser[0]._id,
      }; 
      const token = await generateJWT({ ...user });
      
      return res.cookie(
        "cookieToken", token, {
          maxAge : 60 * 60 * 1000,
          httpOnly : true,
        }
      )
      .render("pagemain", user );
    } catch (error) {
      console.log(error.message);
    }
  });
  
router.post("/register", async (req, res) => {
    try {
      const { nombre, apellido, mail, edad, password, rol } = req.body;
      const pswHashed = await createHashValue(password);
      // const cart = await cartManager.addCart();
      // console.log("cart", cart);
      const userAdd = {
        mail,
        password,
        nombre,
        apellido,
        edad,
        password: pswHashed,
        rol,
        // carrito : cart 
      };
      // console.log("USERADDD", userAdd);
      const newUser = await manager.agregarUsuario(userAdd);
      console.log(newUser);
      return res.render("login")
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:64 ~ router.post ~ error:",
        error
      );
      return res.json({ message: `${error}` });
    }
  });


router.get("/current", handlePolicies(["ADMIN"]), async (req, res) => {
    // console.log(" VALIDANDO REQ", req.user);
    return res.json({ message: `jwt en las cookies` });
  });
  

  router.get("/currentUser", handlePolicies(["USER"]), async (req, res) => {
    console.log(" VALIDANDO REQ", req.user);
    return res.json({ message: `jwt en las cookies` });
  });






module.exports = router