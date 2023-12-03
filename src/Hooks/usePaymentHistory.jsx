import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePaymentHistory = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data: payments=[],refetch}=useQuery({
        queryKey:['payments',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments/${user?.email}`)
         return  res.data
        }
    })
    return [payments,refetch]
};

export default usePaymentHistory;