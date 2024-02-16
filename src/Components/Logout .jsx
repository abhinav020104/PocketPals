import { useRecoilState, useSetRecoilState } from "recoil"
import NavBar from "./NavBar"
import { AccountAtom, tokenAtom, userAtom } from "../Store/Atoms/User"
import {useNavigate , Navigate} from "react-router-dom"
import { useEffect } from "react"
const Logout = ()=>{
    const [user , setUser] =  useRecoilState(userAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const setAccount = useSetRecoilState(AccountAtom);
    const navigate = useNavigate();
    const yesHandler = ()=>{
        setToken(null);
        setUser({});
        setAccount({});
        localStorage.clear();
        navigate("/");
    }
    const noHandler = ()=>{
        navigate("/");
    }
    return(
        <div className="w-screen h-screen flex flex-col bg-slate-500">
            {
                Object.keys(user).length === 0 &&(
                    <Navigate to={"/"}></Navigate>
                )
            }
            <NavBar></NavBar>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-[350px] h-[250px] bg-slate-900  border-slate-300 rounded-xl flex flex-col p-2 items-center gap-24">
                    <div className="text-white font-bold text-xl mt-12">
                        Are You Sure You Want To Logout ?
                    </div>
                    <div className="flex w-full justify-around">
                        <button className="text-center font-bold text-slate-900 bg-slate-300 w-[100px] px-2 text-xl rounded-md hover:scale-95 duration-200" onClick={yesHandler}>Yes</button>
                        <button className="text-center font-bold text-slate-900 bg-slate-300 w-[100px] px-2 text-xl rounded-md hover:scale-95 duration-200" onClick={noHandler}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout