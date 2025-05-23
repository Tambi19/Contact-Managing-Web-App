const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
    name:{
        type:String,
        required:[true,"please type your name "]
    },
    phone:{
        type:String,
        required:[true,"please type your number"]
    },
    email:{
        type:String,
        required:[true,"please add your email"]
    },
},
    {
    timestamps:true
    }

);
module.exports=mongoose.model("Contact",contactSchema);