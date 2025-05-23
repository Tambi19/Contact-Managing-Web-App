const asyncHandler = require('express-async-handler');
const Contact=require("../models/contactmodel");


const getContacts=asyncHandler(async(req,res)=>{
  console.log("User info:", req.user);
  const contacts=await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);

  });
  const createContact=asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,phone,email}=req.body;
    if(!name||!phone||!email){
      res.status(400);
      throw new Error("all fields are mandataory");
    }
    const contact=await Contact.create({
      name,
      phone,
      email,
      user_id:req.user.id,
    })

    res.status(200).json(contact);

  });
  const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
      res.status(404);
      throw new Error("contact not found");
    }
    res.status(200).json(contact);

  });
  const updateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
      res.status(404);
      throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(401);
      throw new Error("User dont have permissiomn to update")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )
    res.status(200).json(updatedContact);

  });
  const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
      res.status(404);
      throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(401);
      throw new Error("User dont have permissiomn to update")
    }
    await Contact.deleteOne();
    res.status(200).json(contact);

  });
  module.exports={getContacts,createContact,updateContact,getContact,deleteContact};