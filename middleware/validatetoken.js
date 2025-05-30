const asyncHandler = require('express-async-handler');
const jwt=require("jsonwebtoken");

validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];  
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if (err){
                res.status(401);
                throw new Error("user is not authorized");
            }
            req.user=decoded.user;
            next();

        });   
    } else {
        res.status(401);
        throw new Error("Token is missing or invalid");
    }
});
module.exports = validateToken;