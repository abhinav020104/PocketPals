import { useState } from "react"
import verificationAnimation from "../assets/Images/giphy.gif"
import NavBar from "./NavBar"
import OtpInput from "otp-input-react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { otpVerificationAtom, signUpAtom } from "../Store/Atoms/User";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast"
const OtpVerification = ()=>{
    const [otp , setOtp] =  useState("");
    const [OtpData , setOtpData] = useRecoilState(otpVerificationAtom);
    const signUpdata = useRecoilValue(signUpAtom);
    const navigate = useNavigate();
    async function clickHandler(){
        try{
            await OtpData.confirm(otp);
            const repsonse = await axios({
                method:"post",
                url:"https://pocketpals-server.codewithabhinav.online/api/v1/signup",
                data:signUpdata,
            })
            toast.success("SignUp successfull");
            navigate("/");
        }catch(error){
            console.log(error);
            console.log("error while otp verficication")
        }
    }
    return(
        <div  className="flex flex-col w-screen h-screen">
            <NavBar></NavBar>
            <div className="h-full bg-slate-500">
                <div className="flex w-screen h-[90%] items-center justify-center gap-24">
                    <img src={verificationAnimation} className="h-[200px] rounded-md"/>
                    <div className="flex flex-col items-center justify-center gap-10 bg-emerald-500 p-8 rounded-md">
                        <div className="text-slate-800 font-bold text-xl">
                            Verify OTP
                        </div>
                        <OtpInput OTPLength={6} otpType="number" disabled = {false} autoFocus value={otp} onChange={setOtp}>
                        </OtpInput>
                        <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2 w-[260px] hover:scale-95 duration-200" onClick={clickHandler}>
                            Verify And Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OtpVerification