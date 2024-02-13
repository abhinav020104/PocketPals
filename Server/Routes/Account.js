const express = require("express"); 
const mongoose = require("mongoose");
const router = express.Router();
const Account = require("../Models/Account");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Razorpay =  require("razorpay");
const crypto = require("crypto")
require("dotenv").config();
router.post("/balance" , async(req , res)=>{
    const {id} = req.body;
    const details = await User.findOne({_id:id}).populate("AccountDetails");
    const balance = await Account.findOne({_id:details.AccountDetails})
    return res.status(200).json({
        success:true,
        message:"Balance Fetched successfully !",
        balance:balance.Balance,
    })
})

router.post("/transfer", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount , to , userId , TransactionPin} = req.body;
    const account = await Account.findOne({ userId: userId }).session(session);
    const userDetails = await User.findOne({_id:userId});
    console.log(userDetails); 
    if (!account || account.Balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    if(await bcrypt.compare(TransactionPin , userDetails.TransactionPin)){
        const updatedDetails = await Account.findOneAndUpdate({ userId: userId }, { $inc: { Balance: -amount } } , { new : true }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { Balance: amount } } , { new : true }).session(session);
        await session.commitTransaction();
        res.status(200).json({
            success:true,
            message:"Amount transfered sucessfully !",
            data:updatedDetails,
        })
    }else{
        return res.status(404).json({
            success:false,
            message:"Invalid Transaction Pin",
        })
    }
});

router.post("/search" , async(req , res)=>{
    const {MobileNumber} = req.body;
    try{
        const details = await User.findOne({MobileNumber}).populate("AccountDetails");
        console.log(details);
        if(!details){
            return res.status(200).json({
                success:true,
                message:"No User Found !",
                data:details
            })
        }else{
            return res.status(200).json({
                success:"Success",
                message:"User fetched successfully !",
                data:details,
            })
        }
    }catch(error){
        console.log(error);
        console.log("Error while searching the user !");
    }
})
router.put("/topup", async (req, res) => {
    const { userId, amount } = req.body;
    console.log(amount);
    try {
        const AccountDetails = await Account.findOne({ userId });
        if (!AccountDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid Account Details",
            })
        }
        let total = parseFloat(amount) + parseFloat(AccountDetails.Balance); 
        console.log(total);
        const UpdatedDetails = await Account.findOneAndUpdate(
            { userId }, { Balance : total} , {new:true} 
        );
        // console.log(UpdatedDetails);
        return res.status(200).json({
            success: true,
            message: "Top Up Successful!",
            data: UpdatedDetails,
        });
    } catch (error) {
        console.log(error);
        console.log("Error while top-up !");
        // alert("Failed to Top up !");
    }
});


router.post("/order" , async(req , res) =>{
    try{
        const razorpay = new Razorpay({
            key_id:process.env.key_id,
            key_secret:process.env.key_secret,
        })
        const options = req.body;
        const order =  await razorpay.orders.create(options);
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Failed to create order !",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Order created successfully !",
            data:order,
        })        
    }catch(error){
        console.log(error);
        console.log("razorpay order creation failed !");
    }
})

router.post("/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.key_secret);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });

module.exports = router;