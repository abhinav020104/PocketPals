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
    try{
        const details = await User.findOne({MobileNumber}).populate("AccountDetails");
        if(!details){
            return res.status(404).json({
                success:false,
                message:"No User Found !"
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

module.exports = router;