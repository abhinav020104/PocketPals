import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue } from "recoil";
import { userAtom , tokenAtom, AccountAtom } from "../Store/Atoms/User";
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
    const [SearchData , setSearchData] = useState("");
    const [searchVisible , setSearchVisible] = useState(false);
    const [searchResponse , setsearchResponse] = useState({});
    const navigate = useNavigate();
    const changeHandler = (e)=>{
        setSearchData({
            ...SearchData,
            [e.target.name]:e.target.value
        })
    }
    const searcHandler = async()=>{
        try{
            setLoading(true);
            const response = await axios({
                method:"post",
                url:"http://localhost:5000/api/v1/account/search",
                data:SearchData,
            })
            setsearchResponse(response);
            setLoading(false);
            setSearchVisible(true);
        }catch(error){
            console.log(error);
            console.log("Search error front end !");
        }
    }
    const clickHandler = ()=>{
        navigate("/topup");
    }
    return(
        <div>
            <div className="w-screen bg-slate-500 min-h-screen flex flex-col">
                <NavBar></NavBar>
                <div className="w-11/12 mx-auto mt-2 flex flex-col ">
                    <div className="">
                        {token !== null &&(
                            <div>
                                <div className="flex text-white text-2xl font-bold mb-[100px] items-center gap-4">
                                    {`Balance : ${account.Balance} $`} 
                                    <div>
                                        <button className=" border-2 border-slate-600 p-1 text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100 w-[150px]" onClick={clickHandler}>TopUp</button>
                                    </div>
                                </div>                        
                                <div className="flex justify-center gap-2">
                                    <input type="text" name="MobileNumber" placeholder="Send Money To A Number" onChange={changeHandler}  className="p-2 rounded-xl text-center w-[20%] outline-none select-none" />
                                    <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2" onClick={searcHandler}> Search </button>
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="w-full flex items-center justify-center ">
                        <div>
                            {
                                loading === true && (
                                    <div  className="mt-16">
                                        loading
                                    </div>
                                )
                            }
                        </div>
                        {
                            searchVisible === true &&(
                                <div className="w-full flex  mt-16">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex h-full w-full items-center justify-center mt-[150px]">
                             <img src={homeAnimation} className="w-[500px] "/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;