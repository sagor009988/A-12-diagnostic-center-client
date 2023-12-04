

import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {
    const axiosPublic=useAxiosPublic()
    // const [tests,setTests]=useState([]);
    // useEffect(()=>{
    //     // setLoading(true)
    //     fetch('https://diagonistic-center-server.vercel.app/tests')
    //     .then(res=>res.json())
    //     .then(data=>setTests(data))
    // },[])

    const {data:tests=[],isloading:loading,refetch}=useQuery({
        queryKey:['tests'],
        queryFn:async ()=>{
            const res=await axiosPublic.get('/tests')
            return res.data
        }
    })

    return[tests,loading,refetch]
};

export default useTest;