const express = require("express");
const mongoDBconnection = require("./database/mongo.config");
const initializePassport = require("./config/passport.config");
const passport = require("passport");
const cookieParser = require("cookie-parser")
const handlebars = require("express-handlebars");
const path = require("path")

const routerProducts = require("./router/products.routes");
const routerCarts = require("./router/carts.routes");
const routerSession = require("./router/session.routes");
const routerViews = require("./router/views.routes")

const app = express();
const port = 5000;
const BASE = "api/v1"

const MONGODB = async () => {
    await mongoDBconnection()
}
MONGODB()

// HANDLEBARS CONFIGURACION
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use("/", routerViews)
app.use(`/${BASE}/products`, routerProducts)
app.use(`/${BASE}/carts` , routerCarts)
app.use(`/${BASE}/session`, routerSession)


app.listen(port, (req, res) => 
    console.log("API RUN PORT:",port)
)