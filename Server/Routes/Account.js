const express = require("express"); 
const router = express.Router();
const Account = require("../Models/Account");
const User = require("../Models/User");
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
    const { amount , to , userId } = req.body;
    const account = await Account.findOne({ userId: userId }).session(session);
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
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } } , { new : true }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } } , { new : true }).session(session);
    await session.commitTransaction();
    res.status(200).json({
        success:true,
        message:"Amount transfered sucessfully !",
    })
});

router.post("/search" , async(req , res)=>{
    const {MobileNumber} = req.body;
    
})
module.exports = router;