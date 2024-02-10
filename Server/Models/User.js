const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
    },
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    AccountDetails:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account',
    },
    MobileNumber:{
        type:Number,
        required:true,
    },
    token:{
        type:String,
    }
})

module.exports =  mongoose.model("User",userSchema);