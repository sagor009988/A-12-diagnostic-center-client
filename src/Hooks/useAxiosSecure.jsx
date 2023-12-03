import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure=axios.create({
    baseURL:'http://localhost:5000/'
})
const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {logout}=useAuth()
    axiosSecure.interceptors.request.use(
        
        function (config) {
            
          // Do something before request is sent
          const token = localStorage.getItem("access-token");
          // console.log('req stop',token)
        //   console.log("request stopped bty inceptor", token);
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        })

        // interCeptor 401 and 403 status
        axiosSecure.interceptors.response.use(function(response){
            return response
        }, async(err)=>{
           const status=err.response?.status;
           console.log("new",status);

           if(status==401 || status == 403){
           await logout()
            navigate('/login')
           }

            return Promise.reject(err)
        })

        return axiosSecure
};

export default useAxiosSecure;