const express = require("express");
const router = express.Router();
const loginHandler = require("../Handlers/loginHandler");
const signUpHandler = require("../Handlers/signUpHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();
const JWT_SECRET =  process.env.JWT_SECRET;
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

// router.get("/bulk", async (req, res) => {
//     const filter = req.query.filter || "";

//     const users = await User.find({
//         $or: [{
//             FirstName: {
//                 "$regex": filter
//             }
//         }, {
//             LastName: {
//                 "$regex": filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             username: user.UserName,
//             firstName: user.FirstName,
//             lastName: user.LastName,
//             _id: user._id
//         }))
//     })
// })

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
module.exports = router; 