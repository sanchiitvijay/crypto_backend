const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database connection successful"))
    .catch((err)=>{
        console.log("Database connection issues")
        console.error(err);
        process.exit(1);
    })
}