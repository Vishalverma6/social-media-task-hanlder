
const express = require("express");
const { signUp, login } = require("../controllers/Auth");

const router = express.Router();



// signup
router.post("/signup",signUp);

// login
router.post("/login",login);
module.exports=router;