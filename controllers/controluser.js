const asyncHandler = require('express-async-handler');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/usermodel");


const getUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(404);
        throw new Error("All thr fields are mandatory");
    }
    const registereduser=await User.findOne({email})
    if(registereduser){
        res.status(404);
        throw new Error("user already exists")
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,email,password:hashedpassword,
    })
    if (user) {
        console.log(`User created: ${user}`);
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(500);
        throw new Error("Failed to create user");
      }
});
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("enter a valid email")
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        }, process.env.ACCESS_TOKEN,
        {expiresIn:"15m"}
      );
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("email or passowrd is not")
    }
});
const currentUser=asyncHandler(async(req,res)=>{
    console.log(req.user);
    res.json(req.user);
});

module.exports={getUser,loginUser,currentUser}