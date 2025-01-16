
const express = require("express");
const { submitData, getAllUserData, deleteUserData } = require("../controllers/sendData");

const router = express.Router();

// submit data
router.post("/submitData",submitData);

// fetch all the data 
router.get("/getAllUserData",getAllUserData);

// Delete the user Data
router.delete("/deleteUserData",deleteUserData);


module.exports=router;

