import { useRecoilState } from "recoil";
import { useState } from "react";
import NavBar from "./NavBar";
import Lottie from "lottie-react"
import verifyAnimation from "../assets/1707746732769.json"
import OtpInput from "otp-input-react";
function ConfirmTransaction () {
    const [pin , setPin] = useState("");
    return(
        <div className="h-screen w-screen flex flex-col bg-slate-500">
            <NavBar></NavBar>
            <div className="h-full">
                <div className="flex w-screen h-[90%] items-center justify-center gap-24">
                    <div className="w-[250px] h-[250px]">
                        <Lottie animationData={verifyAnimation}></Lottie>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-10 bg-emerald-500 p-8 rounded-md">
                        <div className="font-bold text-white text-xl">Enter Transaction Pin</div>
                        <OtpInput OTPLength={6} otpType="number" disabled = {false} autoFocus value={[pin]} onChange={setPin}></OtpInput>
                        <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2 w-[260px] hover:scale-95 duration-200">
                            Verify Pin  
                        </button>
                    </div>
                </div>              
            </div>
        </div>
    )
}

export default ConfirmTransaction