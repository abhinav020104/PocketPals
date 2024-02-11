const Account = require("../Models/Account")
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const signUpHandler =  async(req , res)=>{
    try{
        const {FirstName , LastName  , UserName ,  Password , ConfirmPassword , MobileNumber} =  req.body;
        const existing = await User.findOne({UserName:UserName , MobileNumber:MobileNumber});
        if(existing){
            return res.status(401).json({
                success:false,
                message:"User Already Exists ! Kindly Login",
            })
        }
        if(Password !== ConfirmPassword){
            return res.status(404).json({
                success:false,
                message:"Passwords do-not match !",
            })
        }
        const hashedPassword = await bcrypt.hash(Password,10);
        const newUser = await User.create({FirstName , LastName , UserName , Password : hashedPassword , MobileNumber});
        const AccountInfo = await Account.create({userId:newUser._id , Balance:0});
        const updatedUserDetails = await User.findOneAndUpdate({_id:newUser._id} , {AccountDetails:AccountInfo._id}  ,{new : true}).populate("AccountDetails");
        return res.status(200).json({
            success:true,
            message:"User SignUp Successfull",
            data:updatedUserDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while user SignUp !",
        })
    }
}


module.exports = signUpHandler;