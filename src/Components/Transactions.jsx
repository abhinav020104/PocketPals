import constructionImage from "../assets/Images/UnderConstruction.jpg";
import NavBar from "./NavBar";
import { useRecoilValue } from "recoil";
import { loadingAtom, userAtom } from "../Store/Atoms/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import transactionAnimation from "../assets/1707738011983.json";
import toast from "react-hot-toast"
function Transactions() {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [Transactions, setTransactions] = useState([]);
    const [loading , setLoading] = useState(true);
    const fetchData = async () => {
        toast.loading("Fetching Transactions")
        try {
            const response = await axios.post("https://pocketpals-server.codewithabhinav.in/api/v1/fetchtransactions", {
                userId: user._id,
            });
            setTransactions(response.data.data);
            setLoading(false);
            toast.dismiss();
            toast.success("Transactions Fetched ");
        } catch (error) {
            toast.dismiss();
            console.error("Error fetching transactions:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-500">
            <NavBar />
            <div className="h-full">
                <div className="text-center font-bold text-white text-2xl mt-2">Your Transactions</div>
                <div className="flex w-screen min-h-full items-center justify-center">
                    <div className="w-[400px] h-[400px]">
                        <Lottie animationData={transactionAnimation}></Lottie>
                    </div>
                    {
                        loading !== true && (
                            <div className={Transactions.length === 0 ? `flex flex-col items-center justify-center h-[400px] gap-3 w-[600px] bg-emerald-500 rounded-md overflow-y-scroll p-2` : `flex flex-col items-center h-[400px] gap-3 w-[600px] bg-emerald-500 rounded-md overflow-y-scroll p-2`}>
                            {Transactions.length === 0 ? (
                                <div className=" text-white text-xl font-bold">No transactions available</div>
                            ) : (
                                Transactions.map((transaction, index) => (
                                <div key={index} className="text-white font-bold text-xl">
                                    {transaction}
                                </div>
                            ))
                            )}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Transactions;
