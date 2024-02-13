import { useRecoilState, useRecoilValue } from "recoil";
import { AccountAtom, tokenAtom } from "../Store/Atoms/User";
import axios from "axios";
import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const TopUp = () => {
    const token = useRecoilValue(tokenAtom);
    const [account, setAccount] = useRecoilState(AccountAtom);
    const [topUpdata, setTopUpdata] = useState({});
    const navigate = useNavigate();

    const clickHandler = async () => {
        try {
            const order = await axios({
                method: "post",
                url: "http://localhost:5000/api/v1/account/order",
                data: {
                    amount: topUpdata.amount*100,
                    currency: "INR",
                    receipt: "ab123",
                }
            });
            console.log(order);

            var options = {
                key: "rzp_test_QVPFTAZ7OOAQ1V",
                amount: topUpdata.amount*100, 
                currency: "INR",
                name: "PocketPals", 
                description: "TopUp",
                image: "https://i.pinimg.com/474x/85/8a/eb/858aeb459e4f2c0a69036912a743468d.jpg",
                order_id: order.data.data.id, 
                handler: async function (response) {
                    try{
                        const body = { ...response };
                    console.log(response);
                    const validateRes = await axios({
                        method:"post",
                        url:"http://localhost:5000/api/v1/account/validate",
                        data:response
                    }
                    );
                    toast.loading("Top Up In Process");
                    const updatedBalance = await axios({
                        method:"put",
                        url:"http://localhost:5000/api/v1/account/topup",
                        data:topUpdata,
                    })
                    toast.dismiss();
                    toast.success("Top Up successfull !");
                    setAccount(updatedBalance);
                    navigate("/");
                    console.log(validateRes);
                    }catch(error){
                        toast.dismiss();
                        console.log(error);
                    }
                }
            };
            var rzp1 = await new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.log(error);
            console.log("top up front end error !");
        }
    };

    const changeHandler = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        setTopUpdata({
            ...topUpdata,
            [e.target.name]: e.target.value,
            userId: account.userId,
        });
    };

    return (
        <div>
            {token === null && <Navigate to="/login" />}
            <div className="h-screen flex flex-col">
                <NavBar />
                <div className="h-full bg-slate-500 w-full flex items-center justify-center text-white select-none">
                    <div className="w-[300px] flex flex-col border-black border-[1px] rounded-md shadow-2xl bg-slate-100 h-[200px] items-center justify-between gap-10">
                        <input
                            type="text"
                            className="bg-slate-500 p-2 text-white rounded-md mt-10 w-[250px]"
                            placeholder="Enter Amount to TopUp"
                            onChange={changeHandler}
                            name="amount"
                        />
                        <button
                            className="border-2 border-slate-600 p-2 w-[100px] mb-14 text-center rounded-lg bg-slate-800 hover:scale-95 transition-all duration-100"
                            onClick={clickHandler}
                        >
                            TopUp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopUp;
