import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTestBook = () => {
    const axiosPublic=useAxiosPublic()
    const {data:testBook=[],isloading:loading,refetch}=useQuery({
        queryKey:['tests'],
        queryFn:async ()=>{
            const res=await axiosPublic.get('/testBook')
            return res.data
        }
    })

    return[testBook,loading,refetch]
};

export default useTestBook;