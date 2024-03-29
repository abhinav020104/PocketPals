import { useEffect  , useState} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AccountAtom, PaymentAtom, userAtom } from "../Store/Atoms/User";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import animation from "../assets/Images/17076512559505.gif";
import axios from "axios"
import toast from "react-hot-toast"
const Transfer = () => {
    const [PaymentData, setPaymentData] = useRecoilState(PaymentAtom);
    const navigate = useNavigate();
    const [amountValue , setAmountValue] = useState("")
        // console.log(user)
        console.log(PaymentData);
    useEffect(() => {
        if (PaymentData === null) {
            navigate("/");
        }
    }, [PaymentData]);

    const clickHandler = () => {
        setPaymentData({
            ...PaymentData,
            amountValue:amountValue,
        })
        navigate("/verify");
    };

    const changeHandler = (e)=>{
        console.log(e.target.value); 
        setAmountValue(e.target.value);
    }
    return (
        <div className="flex flex-col h-screen w-screen">
            <NavBar />
            <div className="h-screen bg-slate-500">
                <div className="flex items-center justify-center h-full gap-24">
                    <div>
                        <img src={animation} alt="Animation" />
                    </div>
                    <div>
                        <div className=" border-[1px] border-black rounded-xl bg-white w-[600px] h-[250px] flex flex-col gap-8 items-center justify-center drop-shadow-2xl">
                            <div className=" font-bold text-xl">
                                {`Transferring Money to ${PaymentData?.data?.data?.MobileNumber}`}
                            </div>
                            <input
                                type="text" placeholder="Enter Amount to Transfer" className=" rounded-md bg-black text-white p-2 font-bold text-center " onChange={changeHandler}/>
                            <button
                                className="font-bold bg-slate-700 rounded-xl text-slate-300 p-2 w-[160px]"
                                onClick={clickHandler}
                            >
                                Transfer Amount
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
