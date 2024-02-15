const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginHandler = async(req , res)=>{
    try{
        const {UserName , Password} = req.body;
        const userDetails = await User.findOne({UserName:UserName}).populate("AccountDetails").exec();
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User doesnot exist !",
            })
        }
        if(await bcrypt.compare(Password , userDetails.Password)){
            const token =  jwt.sign({UserName:UserName , Password:Password , id:userDetails._id} , JWT_SECRET);
            userDetails.token =  token;
            return res.status(200).json({
                success:true,
                message:"Login sucessfull !",
                data:userDetails,
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid password",
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while logging in !",
        })
    }
}

module.exports = loginHandler;