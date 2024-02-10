import { useRecoilState, useRecoilValue } from "recoil";
import { AccountAtom } from "../Store/Atoms/User";
import axios from "axios"
import NavBar from "./NavBar";
import { useState } from "react";
const TopUp = ()=>{
    const [account , setAccount] = useRecoilState(AccountAtom);
    const [topUpdata , settopUpdata] = useState({});
    const clickHandler = async()=>{
        settopUpdata({
            ...topUpdata,
            userId:account.userId,
        })
        try{
            const response = await axios({
                method:"put",
                url:"https://paytm-backend-bv0y.onrender.com/api/v1/account/topup",
                data:topUpdata,
            })
            setAccount(response.data.data);
            navigate("/");
            alert("TopUp Successfull");
        }catch(error){
            console.log(error);
            console.log("top up front end error !");
        }
    }
    const changeHandler = (e)=>{
        console.log(e.target.value);
        settopUpdata({
            ...topUpdata,
            [e.target.name]:e.target.value
        })
    }
    return(
        <div className="h-screen flex flex-col">
            <NavBar></NavBar>
            <div className="h-full bg-slate-500 w-full flex items-center justify-center text-white select-none">
                <div className="w-[300px] flex flex-col border-black border-[1px] rounded-md shadow-2xl bg-slate-100 h-[200px] items-center justify-between gap-10">
                    <input type="number" className="bg-slate-500 p-2 text-white rounded-md mt-10 w-[250px]" placeholder="Enter Amount to TopUp" onChange={changeHandler} />
                    <button className=" border-2 border-slate-600 p-2 w-[100px] mb-14 text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100" onClick={clickHandler} name="amount">TopUp</button>
                </div>  
            </div>
        </div>
    )
}

export default TopUp;