import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom , tokenAtom } from "../Store/Atoms/User";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
function NavBar(){
    const navigate = useNavigate();
    const [user , setUser] = useRecoilState(userAtom);
    const [token , setToken] = useRecoilState(tokenAtom);
    const clickHandler = ()=>{
        setUser(null);
        setToken(null);
        localStorage.clear();   
    }
    return(
    <div className="  bg-slate-500 h-20  border-b-2 border-blue-100 flex items-center justify-center">
        <div className=" w-[90%] h-full flex items-center justify-between mx-auto">
            <div className=" font-bold text-3xl text-white p-2 cursor-pointer"><a href="/">PocketPals</a></div>
            <div>
                {
                    token === null   && (
                        <div className="  text-white flex gap-5 items-center">
                            <button className=" border-2 border-slate-600 px-[16px] py-[8px]  text-center rounded-lg  bg-slate-800 hover:scale-95 transition-all duration-100"><Link to={"/login"}>Login</Link></button>
                            <button className=" border-2 border-slate-600 px-[16px] py-[8px]  text-center rounded-lg  bg-slate-800 hover:scale-95 transition-all duration-100"><Link to={"/signup"}>Sign Up</Link></button>
                        </div>
                    )
                }
                {
                    token !== null  && (
                        <div className=" flex justify-between items-center gap-10">
                            <div className=" font-bold text-slate-200 text-[15px]">
                                {`Welcome ! ${user.FirstName} ${user.LastName} `}
                            </div>
                            <div className=" text-white flex gap-2">
                                <button className=" border-2 border-slate-600 px-[16px] py-[8px] text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100" onClick={()=>{
                                    navigate("/transactions")
                                }}>Transactions</button>
                                <button className=" border-2 border-slate-600 px-[16px] py-[8px] text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100" onClick={()=>{
                                    navigate("/profile")
                                }}>Profile</button>
                                <button className=" border-2 border-slate-600 px-[16px] py-[8px] text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100" onClick={clickHandler}>Logout</button>      
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    )
}
export default NavBar;