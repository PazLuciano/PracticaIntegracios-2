const { Router } = require("express");
const { log } = require("handlebars/runtime");
const handlePolicies = require("../middleware/handle-policies.middleware");

const router = Router();


router.get("/register", async (req, res) => {
    res.render("register")
})

router.get("/login", handlePolicies([]) ,(req, res) => {
    // console.log("ha", req.user);
    if(req.user){
        const user = req.user
        return res.render("pagemain", user)
    }
    res.render("login")
})

router.get("/pagemain",handlePolicies(["USER"]), (req,res) => {
    // console.log(req.user);
    const user = req.user
    res.render("pagemain", user)
})








module.exports = router ;