import NavBar from "./NavBar"
import Lottie from "lottie-react"
import forgotAnimations from "../assets/1707755795567.json"
import { useRecoilState, useRecoilValue } from "recoil"
import { otpVerificationAtom, userAtom } from "../Store/Atoms/User"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../../firebase.config"
import  toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
function ForgotPin(){
    const  user = useRecoilValue(userAtom);
    const [otpVerificationAtomData , setotpVerificatonData] = useRecoilState(otpVerificationAtom);
    const navigate = useNavigate();
    const clickHandler = async ()=>{
        try{
            const phone = "+91" + user.MobileNumber;
            console.log(phone);
            const recaptcha = new RecaptchaVerifier(auth , "recaptcha" , {});   
            toast.loading("Verifying Captcha");
            const confirmation = await signInWithPhoneNumber(auth , phone , recaptcha);
            setotpVerificatonData(confirmation);
            toast.dismiss();
            toast.success("Otp Sent");
            navigate("/reset-pin");
        }catch(error){
            console.log(error);
            console.log("forgot password otp error");
            toast.error("Failed to send otp")
        }
    }
    return(
        <div className="flex flex-col h-screen w-screen bg-slate-500">
            <NavBar/>
            <div className="h-full flex w-screen items-center justify-center gap-24">
                <Lottie animationData={forgotAnimations} className="w-[400px]"></Lottie>
                <div>
                    <div className="flex flex-col bg-emerald-500 h-[300px] w-[400px] rounded-md items-center">
                        <div className=" text-white font-bold text-[18px] mt-20">
                            Send OTP on Registered Mobile Number
                        </div>
                        <button className="border-2 w-[150px] border-black text-center text-white bg-slate-800 rounded-md font-bold p-1 mb-6 mt-8 hover:scale-95 duration-200" onClick={clickHandler}>
                            Send OTP
                        </button>
                    <div id="recaptcha"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPin