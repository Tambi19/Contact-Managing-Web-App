const express=require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const errorHandler=require("./middleware/errorhandling.js")


const MONGO_URL = 'mongodb://127.0.0.1:27017/contact';
async function main() {
    try {
      await mongoose.connect(MONGO_URL);
      console.log("Connected to MongoDB successfully");md
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  }
  main();
  app.use(express.json());
  app.use("/api/contacts",require("./routes/controlroutes"));
  app.use("/api/users",require("./routes/userroutes"));

  app.use(errorHandler);

  app.listen(3001,(req,res)=>{
    console.log("app is listening to port ")
  });