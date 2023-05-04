// Create an express server for the backend API

const express = require("express");
const authRouter = express.Router();

const { userLogin, signUp } = require("../controller/login.controller");

authRouter.post("/api/signup", signUp);
authRouter.post("/api/login", userLogin);

module.exports = authRouter;