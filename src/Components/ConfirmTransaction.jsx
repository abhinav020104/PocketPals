import { useRecoilState } from "recoil";
import { useState } from "react";
import NavBar from "./NavBar";
import Lottie from "lottie-react"
import verifyAnimation from "../assets/1707746732769.json"
import OtpInput from "otp-input-react";
import axios from "axios";
import { AccountAtom, PaymentAtom, userAtom } from "../Store/Atoms/User";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast"
function ConfirmTransaction () {
    const [pin , setPin] = useState("");
    const [PaymentData , setPaymentData] = useRecoilState(PaymentAtom); 
    const [user , setUser] = useRecoilState(userAtom);
    const [Account , setAccount] = useRecoilState(AccountAtom);
    const navigate = useNavigate();
    const clickHandler = async() =>{
        try{
            toast.loading("Verification in progress !");
            const response = await axios({
                method:"post",
                url:"https://paytm-backend-bv0y.onrender.com/api/v1/account/transfer",
                data:{
                    userId:user.AccountDetails.userId,
                    to:PaymentData.data.data.AccountDetails.userId,
                    amount:PaymentData.amountValue,
                    TransactionPin:pin
                },
            })
            toast.dismiss();
            toast.success("Transaction Sucessfull");
            setAccount(response.data.data);
            navigate("/");
        }catch(error){
            toast.error(error.response.data.message);
            console.log("Error While Transfering Funds");
            console.log(error);
        }
    }
    const ForgotPinHandler = ()=>{
        navigate("/forgot-pin"); 
    }
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
                        <OtpInput OTPLength={4} otpType="number" disabled = {false} autoFocus value={pin} onChange={setPin}></OtpInput>
                        <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2 w-[260px] hover:scale-95 duration-200" onClick={clickHandler}>
                            Verify Pin  
                        </button>
                        <div className="underline font-bold text-l cursor-pointer" onClick={ForgotPinHandler}>
                            Forgot Pin ?    
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    )
}

export default ConfirmTransaction