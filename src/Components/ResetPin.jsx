import NavBar from "./NavBar";
import OtpInput from "otp-input-react";
import Lottie from "lottie-react"
import resetAnimation from "../assets/1707757910044.json"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { otpVerificationAtom } from "../Store/Atoms/User";
import {useNavigate} from "react-router-dom"
function ResetPin(){
    const [otp , setOtp] =  useState("");
    const otpVerificationData = useRecoilValue(otpVerificationAtom);
    const navigate = useNavigate();
    const clickHandler = async()=>{
        try{
            toast.loading("Verifying OTP");
            await otpVerificationData.confirm(otp);
            toast.dismiss();
            toast.sucess("OTP Verified Successfully ");
            navigate("/set-pin");
        }catch(error){
            console.log(error);
            toast.error("Failed to verify OTP");
            console.log("reset-pin error");
        }
    }
    return(
        <div className="flex flex-col w-screen h-screen bg-slate-500">
        <NavBar></NavBar>
        <div className=" flex w-screen h-full justify-center items-center gap-24">
            <div className=" w-[400px] h-[400px]">
                <Lottie animationData={resetAnimation}></Lottie>
            </div> 
            <div className="flex flex-col bg-emerald-500 h-[200px] w-[400px] items-center justify-center rounded-md gap-3">
                <div className=" text-white font-bold text-l">Enter OTP Sent On Registered Mobile Number</div>
                <OtpInput OTPLength={6} otpType="number" disabled = {false} autoFocus value={otp} onChange={setOtp} ></OtpInput>
                <button className="border-2 w-[150px] border-black text-center text-white bg-slate-800 rounded-md font-bold p-1 mb-6 mt-2 hover:scale-95 duration-200" onClick={clickHandler}> Verify Otp</button>
            </div>
        </div>  
    </div>
    )
}
export default ResetPin;