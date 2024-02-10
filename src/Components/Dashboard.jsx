import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom"
import {Outlet} from "react-router-dom"
function Dashboard(){
    const navigate = useNavigate();
    return(
        <div className=" flex flex-col h-screen">
        <NavBar></NavBar>
        <div className=" flex h-full">
                <div className=" bg-slate-500 w-[250px] border-r-2 border-slate-400 flex flex-col items-center text-white  font-bold  text-[18px] cursor-pointer">
                    <div className=" h-[50px] bg-slate-400 w-full text-center border-b-[1px] border-slate-100 flex items-center justify-center"><p onClick={()=>{
                        navigate("/dashboard/profile");
                    }}>Profile</p></div>
                    <div className=" h-[50px] bg-slate-400 w-full text-center border-b-[1px] border-slate-100 flex items-center justify-center"><p onClick={()=>{
                        navigate("/dashboard/transactions");
                    }}>Transactions</p></div>
                </div>
                <div className=" w-screen bg-slate-500">
                    <Outlet></Outlet>
                </div>
            </div>
    </div>
    )
}

export default Dashboard;
