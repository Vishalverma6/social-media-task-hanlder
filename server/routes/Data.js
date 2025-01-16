
const express = require("express");
const { submitData, getAllUserData } = require("../controllers/sendData");

const router = express.Router();

// submit data
router.post("/submitData",submitData);

// fetch all the data 
router.get("/getAllUserData",getAllUserData);


module.exports=router;

