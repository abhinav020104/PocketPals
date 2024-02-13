import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { userAtom , tokenAtom } from "../Store/Atoms/User";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";  
function Profile(){
    const [visible  , setVisible] = useState(false);
    const [profileData , setProfileData] = useState({});
    const user = useRecoilValue(userAtom)
    return(
        <div className="w-screen h-screen bg-slate-500 flex flex-col">
            <NavBar></NavBar>
            <div className="w-full flex items-center justify-center h-[50%] text-white font-bold text-xl select-none">
            <div className="w-[70%] flex flex-col gap-4 justify-center items-center">
                <div className=" flex ml-20 w-[80%] gap-12 justify-center items-center">
                    <div className="w-[105px]">First Name</div>
                    <div className="bg-slate-400 p-1 rounded-lg w-[40%] text-center select-none">{`${user.FirstName}`}</div>
                </div>
                <div className=" flex ml-20 w-[80%] gap-12 justify-center items-center">
                    <div className="w-[105px]">Last Name</div>
                    <div className="bg-slate-400 p-1 rounded-lg w-[40%] text-center select-none">{`${user.LastName}`}</div>
                </div>
                <div className=" flex ml-20 w-[80%]  gap-12 justify-center items-center">
                    <div className="w-[105px]">Mobile</div>
                    <div className="bg-slate-400 p-1 rounded-lg w-[40%] text-center select-none">{`${user.MobileNumber}`}</div>
                </div>
            </div>
        </div>
        </div>
    )
}


export default Profile;

