const router = require("express").Router();
const {
  SignupHandler,
  LoginHandler,
} = require("../controller/auth.controller");
const validateAuth = require("../middleware/validateAuth");
router.post("/register", validateAuth, SignupHandler);
router.post("/login", validateAuth, LoginHandler);
// router.get("/logout", validateAuth, LogoutHandler);
module.exports = router;
