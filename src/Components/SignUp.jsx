import { useEffect, useState } from "react";
import axios from  "axios"
import {useNavigate} from "react-router-dom"
import NavBar from "./NavBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { signUpAtom, tokenAtom , otpVerificationAtom} from "../Store/Atoms/User";
import toast from "react-hot-toast"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../../firebase.config"
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Lottie from "lottie-react"
import signUpAnimation from "../assets/1707740516213.json"
function SignUp(){
    const [signUpData , setSignUpData] = useState({});
    const [signUp , setSignUp] =  useRecoilState(signUpAtom);
    const [otpVerificationData , setotpVerificatonData]= useRecoilState(otpVerificationAtom);
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [showPin , setShowPin] = useState(false);
    const [showConfirmPin , setShowConfirmPin] = useState(false);
    const naviagte  = useNavigate();
    const token = useRecoilValue(tokenAtom)
    const changeHandler = (e)=>{
        setSignUpData({
            ...signUpData,
            [e.target.name]:e.target.value,
        })
    }
    const signUpHandler = async()=>{
        try{
            const phone = "+91" + signUpData.MobileNumber;
            console.log(phone);
            const recaptcha = new RecaptchaVerifier(auth , "recaptcha" , {});   
            toast.loading("Verifying Captcha");
            const confirmation = await signInWithPhoneNumber(auth , phone , recaptcha);
            setSignUp(signUpData);
            setotpVerificatonData(confirmation);
            toast.dismiss();
            toast.success("Otp Sent");
            naviagte("/verification");
        }catch(error){
            console.log(error);
            console.log("SignUp FrontEnd Error");
            toast.error("Sign Up Failed")
        }
    }
    return(
        <div>
            {
                token !== null &&(
                    naviagte("/dashboard/profile")
                )
            }
            <div className=" bg-slate-500 h-screen flex flex-col">
            <NavBar></NavBar>
            <div className=" w-screen h-[60%] flex items-center justify-center bg-slate-500 overflow-y-hidden mt-24 gap-24">
                <div className="w-[500px]">
                    <Lottie animationData={signUpAnimation}></Lottie>
                </div>
                <div className=" w-[500px] flex flex-col border-2 border-black gap-10  items-center shadow-xl bg-white rounded-xl">
                    <div className=" text-white bg-black flex items-center justify-center w-full shadow-xl">
                        <div className=" p-2 text-2xl">Sign Up</div>
                    </div>
                    <form className= "">
                        <div className=" flex gap-5 justify-around mb-5 w-full">
                            <input type="text" className=" p-1 border border-black text-center" placeholder="First Name" onChange={changeHandler} name="FirstName"/>
                            <input type="text" className=" p-1 border border-black text-center" placeholder="Last Name" onChange={changeHandler} name="LastName"/>
                        </div>
                        <div className=" flex flex-col gap-5">
                            <div className="flex justify-between items-center">
                                <input type="text" className=" p-1 border border-black text-center " placeholder="User Name" onChange={changeHandler} name="UserName"/>
                                <input type="text" className=" p-1 border border-black text-center " placeholder="Mobile Number" onChange={changeHandler} name="MobileNumber"/>
                            </div>
                            <div className=" flex gap-5 items-center justify-around">
                                <div className="flex relative">
                                     <input type={showPassword ? `text` : `password`} className=" p-1 border border-black text-center" placeholder="Password" onChange={changeHandler} name="Password"/>
                                     <div>
                                        {
                                            !showPassword ? (<IoEyeOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20} onClick={()=>{
                                                setShowPassword(!showPassword);
                                            }}></IoEyeOutline>) : (<IoEyeOffOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20}onClick={()=>{
                                                setShowPassword(!showPassword);
                                            }}></IoEyeOffOutline>)
                                        }
                                     </div>
                                </div>
                                <div className="flex relative">
                                <input type={showConfirmPassword ? `text` : `password`} className=" p-1 border border-black text-center" placeholder="Confirm Password" onChange={changeHandler} name="ConfirmPassword"/>
                                <div>
                                        {
                                            !showConfirmPassword ? (<IoEyeOutline className="cursor-pointer absolute left-[164px] top-[7px]" size={20} onClick={()=>{
                                                setShowConfirmPassword(!showConfirmPassword )
                                            }}></IoEyeOutline>) : (<IoEyeOffOutline className="cursor-pointer absolute left-[164px] top-[7px]" size={20} onClick={()=>{
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }}></IoEyeOffOutline>)
                                        }
                                </div>
                                </div>
                            </div>
                            <div className=" flex gap-5 items-center justify-around">
                                <div className="flex relative"> 
                                    <input type={showPin ? `text` : `password`} className=" p-1 border border-black text-center" placeholder="Transaction Pin" onChange={changeHandler} name="TransactionPin"/>
                                    <div>
                                        {
                                            !showPin ? (<IoEyeOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20} onClick={()=>{
                                                setShowPin(!showPin);
                                            }}></IoEyeOutline>) : (<IoEyeOffOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20}onClick={()=>{
                                                setShowPin(!showPin);
                                            }}></IoEyeOffOutline>)
                                        }
                                     </div>
                                </div>
                                <div className=" flex relative">
                                <input type={showConfirmPin ? `text1` : `password`} className=" p-1 border border-black text-center" placeholder="Confirm Pin" onChange={changeHandler} name="ConfirmTransactionPin"/>
                                <div>
                                        {
                                            !showConfirmPin ? (<IoEyeOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20} onClick={()=>{
                                                setShowConfirmPin(!showConfirmPin);
                                            }}></IoEyeOutline>) : (<IoEyeOffOutline className="cursor-pointer absolute left-[163px] top-[7px]" size={20}onClick={()=>{
                                                setShowConfirmPin(!showConfirmPin);
                                            }}></IoEyeOffOutline>)
                                        }
                                </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className=" hover:scale-95 transition-all duration-200 text-center text-[16px] font-bold ">
                        <button className="border-2 w-[150px] border-black text-center text-white bg-slate-400 p-1 mb-6 " onClick={signUpHandler}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div id="recaptcha" className="mt-[-50px] mx-auto rounded-md"></div>

        </div>
        </div>
    )
}

export default SignUp;