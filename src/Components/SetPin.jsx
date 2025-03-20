import NavBar from "./NavBar"
import { useRecoilState, useRecoilValue } from "recoil";
import SetPinanimation from "../assets/1707757910044.json"
import Lottie from "lottie-react"
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import { userAtom } from "../Store/Atoms/User";
import {useNavigate} from "react-router-dom";
function SetPin(){
    const [showPin , setShowPin] = useState("");
    const [showConfirmPin , setShowConfirmPin] = useState("");
    const [pinData , setPinData ] = useState({});
    const user  = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const changeHandler = (e)=>{
        e.preventDefault()
        setPinData({
            ...pinData,
            [e.target.name]:    e.target.value  ,
        })
    }
    const clickHandler = async()=>{
        try{
            toast.loading("Resetting Pin ")
            const response = await axios({
                method:"post",
                url:"https://pocketpals-server.codewithabhinav.in/api/v1/reset",
                data:{
                    TransactionPin:pinData.TransactionPin,
                    ConfirmTransactionPin:pinData.ConfirmTransactionPin,
                    userId:user._id,
                }
            })
            toast.dismiss();
            toast.success("Pin Reset Successfull !");
            navigate("/");
        }catch(error){
            toast.dismiss(); 
            console.log(error);
        }
    }
    return(
        <div className="h-screen w-screen flex flex-col bg-slate-500">
            <NavBar></NavBar>
            <div className="flex w-screen h-full justify-center items-center gap-24">
                <div className="w-[300px]">
                    <Lottie animationData={SetPinanimation}></Lottie>
                </div>
                <div className="flex flex-col w-[300px] h-[300px] bg-emerald-500 rounded-md items-center  gap-8">
                    <div className="text-white font-bold text-xl mt-6">
                        Reset Pin
                    </div>
                    <div className="flex relative"> 
                        <input type={showPin ? `text` : `password`} className=" p-1 border border-black text-center" placeholder="Transaction Pin"  name="TransactionPin" onChange={changeHandler}/>
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
                    <div className=" flex relative ">
                        <input type={showConfirmPin ? `text1` : `password`} className=" p-1 border border-black text-center" placeholder="Confirm Pin"  name="ConfirmTransactionPin" onChange={changeHandler}/>
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
                    <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2 w-[160px] hover:scale-95 duration-200 " onClick={clickHandler}>
                        Reset Pin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetPin