const express = require("express");
const AuthController = require("./AuthController");
const checkCustomer = require("../../middlewares/checkCustomer");
const authRouter = express.Router();

authRouter.post("/login_customer", AuthController.loginCustomer);



module.exports = authRouter;
