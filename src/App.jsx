import './App.css'
import {Routes , Route , useNavigate} from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import { useRecoilState , useRecoilValue  } from 'recoil';
import { userAtom , tokenAtom , AccountAtom } from './Store/Atoms/User';
import { useEffect } from 'react';
import axios from  "axios";
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Components/Dashboard';
import Transactions from './Components/Transactions';
import TopUp from './Components/TopUp';
import Transfer from './Components/Transfer';
import {Toaster} from "react-hot-toast"
import OtpVerification from './Components/OtpVerification';
import ConfirmTransaction from './Components/ConfirmTransaction';
import ForgotPin from './Components/ForgotPin';
import ResetPin from './Components/ResetPin';
import SetPin from './Components/SetPin';
function App() {
  const token = useRecoilValue(tokenAtom);
  const [user , setUser] = useRecoilState(userAtom);
  const [Account , setAccount] =  useRecoilState(AccountAtom);
  const fetchData = async () =>{
    try{
      const userDetails = await axios({
        method:"post",
        url:"https://paytm-backend-bv0y.onrender.com/api/v1/getUserDetails",
        data:{
          token:token
        }})
      setUser(userDetails.data.data);
      setAccount(userDetails.data.data.AccountDetails);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[Account]);
  return (
    <div>
      <Toaster></Toaster>
      <Routes>
        <Route path = '/' element = {<Home></Home>} ></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route path='/dashboard/profile' element={<Profile/>}></Route>
          <Route path='/dashboard/transactions' element={<Transactions/>}></Route>
        </Route>
        <Route path='/topup' element={<TopUp/>}></Route>
        <Route path='/transfer' element={<Transfer></Transfer>}></Route>
        <Route path='verification' element={<OtpVerification></OtpVerification>}></Route>
        <Route path='/verify' element={<ConfirmTransaction/>}></Route>
        <Route path='forgot-pin' element={<ForgotPin/>}></Route>
        <Route path='/reset-pin' element={<ResetPin/>}></Route>
        <Route path='/set-pin' element={<SetPin/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
