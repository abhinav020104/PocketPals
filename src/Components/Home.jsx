import { useRecoilValue } from "recoil";
import { userAtom , tokenAtom, AccountAtom } from "../Store/Atoms/User";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Home(){
    const user = useRecoilValue(userAtom);
    const token = useRecoilValue(tokenAtom);
    const account = useRecoilValue(AccountAtom);
    const [SearchData , setSearchData] = useState("");
    const navigate = useNavigate();
    const changeHandler = (e)=>{
        console.log(e.value);
        setSearchData(e.value);
    }
    const searcHandler = ()=>{
    }
    const clickHandler = ()=>{
        navigate("/topup");
    }
    return(
        <div>
            {/* {
                token === null &&(
                    <Navigate to={"/login"}></Navigate>
                )
            } */}
            <div className="w-screen bg-slate-500 min-h-screen flex flex-col">
                <NavBar></NavBar>
                <div className="w-11/12 mx-auto mt-2 flex flex-col">
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
                                    <input type="text" name="" placeholder="Send Money To A Number" onChange={changeHandler} className="p-2 rounded-xl text-center w-[20%] outline-none select-none"/>
                                    <button className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2"> Search </button>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;