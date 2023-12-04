import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTest from "../Pages/AllTest/AllTest";
import Details from "../Pages/Home/Details/Details";
import Login from "../Pages/Login/Login";
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register/Register";
import Secret from "../Pages/Secret";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layouts/DashBoard";
import Cart from "../Pages/DashBoard/Cart/Cart";
import AllUsers from "../Pages/DashBoard/AllUsers";
import AddTest from "../Pages/DashBoard/AddTest";
import AdminRoute from "./AdminRoute";

import ManageTestsByAdmin from "../Pages/DashBoard/ManageTestsByAdmin";
import UpdateATest from "../Pages/DashBoard/UpdateATest";
import AllReserVation from "../Pages/DashBoard/AllReserVation";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory";
import MyHome from "../Pages/DashBoard/MyHome";
import AdminHome from "../Pages/DashBoard/AdminHome";



export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/allTest',
          element:<AllTest></AllTest>
        },
        {
          path:'/details/:id',
          element:<Details></Details>,
          loader:({params})=>fetch(`https://diagonistic-center-server.vercel.app/tests/${params.id}`)
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/secret',
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path:'/dashBoard',
      element:<DashBoard></DashBoard>,
      children:[
        {
          path:'cart',
          element:<PrivateRoute><Cart></Cart></PrivateRoute>
        },
        {
          path:'payment',
          element:<Payment></Payment>

        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>

        },
        {
          path:'myHome',
          element:<MyHome></MyHome>

        },
        // admin pannel
        {
          path:'addTest',
          element:<AdminRoute><AddTest></AddTest></AdminRoute>
        },
        {
          path:'allUsers',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'/dashBoard/admin',
          element:<AdminRoute> <AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'allTest',
          element:<AdminRoute><ManageTestsByAdmin></ManageTestsByAdmin></AdminRoute>
        },
        {
          path:'updateTest/:id',
          element:<AdminRoute><UpdateATest></UpdateATest></AdminRoute>,
          loader:({params})=>fetch(`https://diagonistic-center-server.vercel.app/tests/${params.id}`)
        },
        {
          path:'reservation',
          element:<AdminRoute><AllReserVation></AllReserVation></AdminRoute>
        }
      ]
    }
  ]);