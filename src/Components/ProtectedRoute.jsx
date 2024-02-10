import { useRecoilValue } from "recoil"
import { tokenAtom } from "../Store/Atoms/User"
import  { Navigate } from "react-router-dom";
import Login from "./Login";
const ProtectedRoute = ({children})=>{
    const token = useRecoilValue(tokenAtom);
    if(token  === null)
    return <Navigate to= "/login"/>
    else{
        return children;
    }
}


export default ProtectedRoute