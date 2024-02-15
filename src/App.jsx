import './App.css'
import {Routes , Route , useNavigate} from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import { useRecoilState , useRecoilValue  } from 'recoil';
import { userAtom , tokenAtom , AccountAtom  , loadingAtom} from './Store/Atoms/User';
import { useEffect } from 'react';
import axios from  "axios";
import Profile from './Components/Profile';
import Transactions from './Components/Transactions';
import TopUp from './Components/TopUp';
import Transfer from './Components/Transfer';
import {Toaster} from "react-hot-toast"
import OtpVerification from './Components/OtpVerification';
import ConfirmTransaction from './Components/ConfirmTransaction';
import ForgotPin from './Components/ForgotPin';
import ResetPin from './Components/ResetPin';
import SetPin from './Components/SetPin';
import toast from "react-hot-toast";
function App() {
  const token = useRecoilValue(tokenAtom);
  const [user , setUser] = useRecoilState(userAtom);
  const [Account , setAccount] =  useRecoilState(AccountAtom);
  const [loading , setLoading] = useRecoilState(loadingAtom);
  const fetchData = async () =>{
    try{
      toast.loading("fetching user details");
      setLoading(true);
      const userDetails = await axios({
        method:"post",
        url:"https://paytm-backend-bv0y.onrender.com/api/v1/getUserDetails",
        data:{
          token:token
        }})
        toast.dismiss();
        setLoading(false);
        toast.success("User Fetched ");
      setUser(userDetails.data.data);
      setAccount(userDetails.data.data.AccountDetails);
    }catch(error){
      toast.dismiss();
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div className=' overflow-hidden '>
      <Toaster></Toaster>
      <Routes>
        <Route path = '/' element = {<Home></Home>} ></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/topup' element={<TopUp/>}></Route>
        <Route path='/transfer' element={<Transfer></Transfer>}></Route>
        <Route path='verification' element={<OtpVerification></OtpVerification>}></Route>
        <Route path='/verify' element={<ConfirmTransaction/>}></Route>
        <Route path='forgot-pin' element={<ForgotPin/>}></Route>
        <Route path='/reset-pin' element={<ResetPin/>}></Route>
        <Route path='/set-pin' element={<SetPin/>}></Route>
        <Route path='transactions' element={<Transactions/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
