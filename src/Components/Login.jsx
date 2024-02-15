import { userAtom ,tokenAtom, AccountAtom } from "../Store/Atoms/User"
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios"
import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom"
import {Navigate}  from "react-router-dom"
import toast from "react-hot-toast"
import Lottie from "lottie-react"
import loginAnimation from "../assets/1707741206328.json"
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
const Login = () => {   
    const setUser = useSetRecoilState(userAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const setAccount = useSetRecoilState(AccountAtom);
    const token = useRecoilValue(tokenAtom);
    const navigate = useNavigate();
    const [loginData , setLoginData] = useState({});
    const [showPassword , setShowPassword] = useState(false);
    const changeHandler = (e)=>{
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value,
        })
    }
    const clickHandler = async()=>{
        try{
            const response = await axios({
                method:"post",
                url:"https://paytm-backend-bv0y.onrender.com/api/v1/login",
                data:loginData
            })
                navigate("/");
                console.log(response.data.data.AccountDetails);
                setAccount(response.data.data.AccountDetails);
                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                setUser(response.data.data);
                setToken(response.data.data.token);
                toast.success("Login Successfull")
        }catch(error){
            toast.error("Invalid Credentials")
            console.log("Login Error");
            console.log(error);
        }
    }
    return(
        <div>
            {
                token!==null&&(
                    console.log(token),
                    <Navigate to="/"></Navigate>
                )
            }
            <div className=" bg-slate-500 h-screen ">
            <NavBar></NavBar>
            <div className=" flex items-center justify-center w-screen h-[90%] bg-slate-500 ">
                <div className="w-[500px]">
                    <Lottie animationData={loginAnimation}></Lottie>
                </div>
                <div className="flex border-2 border-black w-[400px] flex-col gap-10 shadow-xl bg-white rounded-xl">
                    <div className=" bg-black text-white flex items-center justify-center shadow-xl">
                        <div className=" p-2 text-2xl">Login</div>
                    </div>
                    <form>
                        <div className="flex flex-col gap-3 p-3">
                            <div className=" flex justify-between">
                                <div>UserName</div> 
                                <input type="text" className=" border-black border  p-1" name="UserName" placeholder="User Name" onChange={changeHandler}/>
                            </div>
                            <div className=" flex justify-between">
                                <div>Password</div>
                                <div className="flex relative">
                                    <input type={showPassword ? `text` : `password`} className=" border-black border  p-1" placeholder="Password" name="Password" onChange={changeHandler} />
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
                            </div>
                        </div>
                    </form>
                    <div className=" flex  justify-center mb-6  hover:scale-95 transition-all duration-200 text-center text-[16px] font-bold">
                        <button className=" border-2 w-[150px] border-black text-center text-white bg-slate-400 p-1" onClick={clickHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Login;