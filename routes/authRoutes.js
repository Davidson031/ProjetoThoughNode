const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/AuthController");


authRouter.get("/login", AuthController.login);
authRouter.post("/login", AuthController.loginPost);
authRouter.get("/logout", AuthController.logout);
authRouter.post("/register", AuthController.registerPost);
authRouter.get("/register", AuthController.register);

module.exports = authRouter;


