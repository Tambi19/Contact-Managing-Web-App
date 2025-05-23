const express = require("express");
const router = express.Router()
const {getContacts,createContact,updateContact,getContact,deleteContact}=require("../controllers/controlcontact");
const validateToken=require("../middleware/validatetoken");


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
  router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
  module.exports=router;