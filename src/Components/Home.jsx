import { useRecoilState, useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue } from "recoil";
import { userAtom , tokenAtom, AccountAtom, PaymentAtom } from "../Store/Atoms/User";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import homeAnimation from "../assets/Images/2d309422090869.5630c7463fc41.gif"
function Home(){
    const [loading , setLoading] = useState(false);
    const user = useRecoilValue(userAtom);
    const token = useRecoilValue(tokenAtom);
    const account = useRecoilValue(AccountAtom);
    const [paymentData , setPaymentData] = useRecoilState(PaymentAtom);
    const [SearchData , setSearchData] = useState("");
    const [searchVisible , setSearchVisible] = useState(false);
    const [searchResponse , setsearchResponse] = useState({});
    const [notFound , setNotFound] = useState(false);
    const [searchBarValue , setSearchBarValue] = useState("");
    const navigate = useNavigate();
    const changeHandler = (e)=>{
        setSearchData({
            ...SearchData,
            [e.target.name]:e.target.value
        })
        setSearchBarValue(e.target.value);
    }
    const searcHandler = async()=>{
        try{
            setLoading(true);
            setSearchVisible(false);
            setNotFound(false);
            const response = await axios({
                method:"post",
                url:"https://paytm-backend-bv0y.onrender.com/api/v1/account/search",
                data:SearchData,
            })
            if(response.data.data !== null){
                setsearchResponse(response);
                setLoading(false);
                setSearchVisible(true);
                setSearchBarValue("");
                setPaymentData(response);
            }else{
                setNotFound(true);
                setLoading(false);
                setSearchBarValue("");
            }
        }catch(error){
            console.log(error);
            console.log("Search error front end !");
        }
    }
    const clickHandler = async()=>{
        navigate("/topup");
    }
    return(
        <div>
            <div className="w-screen bg-slate-500 h-screen flex flex-col">
                <NavBar></NavBar>
                <div className="w-11/12 mx-auto mt-2 flex flex-col ">
                    <div className="">
                        {token !== null &&(
                            <div>
                                <div className="flex text-white text-2xl font-bold  items-center gap-4">
                                    {`Balance : ${account.Balance} ₹`} 
                                    <div>
                                        <button className=" border-2 border-slate-600 p-1 text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100 w-[150px]" onClick={clickHandler}>TopUp</button>
                                    </div>
                                </div>                        
                                <div className="flex justify-center gap-2">
                                    <input type="text" name="MobileNumber" placeholder="Send Money To A Number" onChange={changeHandler}  className="p-2 rounded-xl text-center w-[20%] outline-none select-none" value={searchBarValue}/>
                                    <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2" onClick={searcHandler}> Search </button>
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="w-full">
                        <div>
                            {
                                loading === true && (
                                    <div  className="w-full flex  mt-16 h-[50px] border-[1px] border-black items-center justify-center rounded-md">    
                                        <div className="text-xl text-white font-bold">
                                            Loading....
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full">
                        {
                            searchVisible === true &&(
                                <div className="w-full flex  mt-8 h-[50px] border-[1px] border-black items-center justify-around rounded-md">
                                    <div className=" flex gap-3 text-white font-bold font-xl">
                                        <div>Frist Name : </div>
                                        <div>
                                            {
                                                `${searchResponse.data.data.FirstName}`
                                            }
                                        </div>
                                    </div>
                                    <div className=" flex gap-3 text-white font-bold font-xl">
                                        <div>Last Name : </div>
                                        <div>
                                            {
                                                `${searchResponse.data.data.LastName}`
                                            }
                                        </div>
                                    </div>
                                    <div className=" flex gap-3 text-white font-bold font-xl">
                                        <div>Mobile Number : </div>
                                        <div>
                                            {
                                                `${searchResponse.data.data.MobileNumber}`
                                            }
                                        </div>
                                    </div>
                                    <button className="border-2 border-slate-600 p-1 text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100 w-[150px] text-white font-bold" onClick={()=>{
                                        navigate("/transfer");
                                    }}>
                                        Pay
                                    </button>
                                </div>
                            )
                        }
                        {
                            notFound === true && (
                                <div className="w-full flex  mt-8 h-[50px] border-[1px] border-black items-center justify-around rounded-md">
                                    <div className="text-white font-bold text-xl">
                                        No User Found
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div className="flex h-full w-full items-center justify-center mt-[30px]">
                             <img src={homeAnimation} className="w-[500px] "/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;