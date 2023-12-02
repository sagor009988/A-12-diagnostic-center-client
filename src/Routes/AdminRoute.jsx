import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoding]=useAdmin()
   const {user,loading}=useAuth()
    const location=useLocation()

   if(loading || isAdminLoding){
    return <progress></progress>
   }
   if(user && isAdmin){
    return children
   }
 return  <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoute;