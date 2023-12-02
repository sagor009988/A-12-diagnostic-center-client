

import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {
    const axiosPublic=useAxiosPublic()
    // const [tests,setTests]=useState([]);
    // useEffect(()=>{
    //     // setLoading(true)
    //     fetch('http://localhost:5000/tests')
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