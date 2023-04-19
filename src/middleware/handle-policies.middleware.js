const passport = require("passport");

function handlePolicies(policies) {
  return (req, res, next) => {
    // console.log(policies);
    if (policies.length === 1 && policies[0] === "PUBLIC") {
      return next();
    }
    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {

      if (err) {
        return next(err);
      }
      if (!userJWT) {
        console.log(info.message);
        return res
          .status(401)
          .send({ message: "Acceso denegado. Token inválido o expirado." });
      }
      if(policies.length === 0){
        req.user = userJWT;
        return next()
      }
      if (policies.includes(userJWT.user.role)) {
        req.user = userJWT;
        return next();
      } else {
        return res
          .status(403)
          .send({ message: "Acceso denegado. Rol no autorizado." });
      }
    })(req, res, next);
  };
}

module.exports = handlePolicies;