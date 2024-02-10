import { useRecoilValue } from "recoil";
import { userAtom , tokenAtom, AccountAtom } from "../Store/Atoms/User";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
function Home(){
    const user = useRecoilValue(userAtom);
    const token = useRecoilValue(tokenAtom);
    const account = useRecoilValue(AccountAtom);
    const [SearchData , setSearchData] = useState("");
    const changeHandler = (e)=>{
        console.log(e.value);
        setSearchData(e.value);
    }
    const searcHandler = ()=>{
    }
    console.log(account);
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
                                <div className=" text-white text-2xl font-bold mb-[100px]">
                                    {`Balance : ${account.Balance} $`}
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