const express = require("express");
const router = express.Router()
const{getUser,currentUser,loginUser}=require("../controllers/controluser.js");
const validateToken=require("../middleware/validatetoken.js")

router.post("/register",getUser);
router.post("/login",loginUser);
router.post("/current", validateToken,currentUser);
module.exports=router;