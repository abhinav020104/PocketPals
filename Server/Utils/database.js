const mongoose =  require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
const dbConnect = ()=>{
    mongoose.connect(DB_URL).then(()=>{
        console.log("Connection established with database sucessfully !");
    }).catch(()=>{
        console.log("Failed to establish connection with database !");
    })
}
module.exports =  dbConnect;