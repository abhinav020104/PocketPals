const express = require("express");
const router = express.Router();
const loginHandler = require("../handlers/loginHandler");
const signUpHandler = require("../handlers/signUpHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const JWT_SECRET =  process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
router.post("/login"   , loginHandler);

router.post("/signup" , signUpHandler);

router.post("/getUserDetails" , async(req ,res) =>{
    const {token} = req.body;
    // console.log(token);
    try{
        const decoded = jwt.verify(token , JWT_SECRET);
        const userDetails = await User.findOne({UserName:decoded.UserName}).populate("AccountDetails");
        return res.status(200).json({
            success:true,
            message:"Token verification sucessfull !",
            data:userDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to verify token ",
        })
    }
})

router.post("/fetchaccount" , async (req , res)=>{
    const number = req.body.number;
   try{
    const details = await User.findOne({Mobile:number});
    if(!details){
        return res.status(404).json({
            success:false,
            message:"No user found !",
        })
    }
    else{
        return res.status(200).json({
            success:true,
            message:"User fetched sucessfully !",
            data:details,
        })
    }
   }catch(error){
    console.log(error);
    return res.status(404).json({
        success:false,
        message:"Error occured while fetching details of searched user !"
    })
   }
}) 


router.post("/reset" , async(req , res)=>{
    const {TransactionPin , ConfirmTransactionPin , userId} = req.body;
    try{
        console.log(TransactionPin)
        if(TransactionPin !== ConfirmTransactionPin){
            return res.status(404).json({
                sucess:false,
                message:"Pins Donot Match !",
            })
        }
        console.log(TransactionPin)
        const hashedPin = await bcrypt.hash(TransactionPin , 10);
        const updatedDetails =  await User.findOneAndUpdate({_id:userId} , {TransactionPin:hashedPin}, {new:true});
        return res.status(200).json({
            success:true,
            message:"Transaction Pin Reset Successfull ",
            data:updatedDetails,
        })
    }catch(error){  
        console.log ("reset pin backend error ")
        console.log(error);
    }
})
router.post("/fetchtransactions" , async(req , res)=>{
    const {userId} =  req.body;
    try{
        const userDetails = await User.findOne({_id:userId});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Invalid User",
            })
        }
        console.log(userDetails.Transactions);
        return res.status(200).json({
            success:true,
            message:"Transactions fetched successfully !",
            data:userDetails.Transactions,
        })
    }catch(error){
        console.log(error);
        console.log("failed to fetch transactions !");
    }
})
module.exports = router; 