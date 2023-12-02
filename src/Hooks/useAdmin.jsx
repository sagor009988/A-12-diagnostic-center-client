import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user}=useAuth()
    // console.log(user?.email);
    const axiosSecure=useAxiosSecure()
    const {data:isAdmin,isLoading:isAdminLoding}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`)
            // console.log(res.data);
            return res.data?.admin
        },
        
        

    })
    return [isAdmin,isAdminLoding,user]
};


export default useAdmin;