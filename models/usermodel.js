const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please type your username "]
    },
    email:{
        type:String,
        required:[true,"please add your email"],
        unique:[true,"the email is already taken"]
    },
    password:{
        type:String,
        required:[true,"please enter a valid email"],
    },

},
    {
    timestamps:true
    }

);
module.exports=mongoose.model("User",userSchema);