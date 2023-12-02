import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserTest = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data: test=[],refetch}=useQuery({
        queryKey:['test',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/userTest?email=${user?.email}`)
         return  res.data
        }
    })
    return [test,refetch]
};

export default useUserTest;