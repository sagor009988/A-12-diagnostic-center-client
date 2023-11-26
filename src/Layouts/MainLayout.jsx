import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";


const MainLayout = () => {
    const location=useLocation();
   
    const islogin=location.pathname.includes('/login')
    return (
        <div>
            {islogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {islogin || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;