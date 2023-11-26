import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTest from "../Pages/AllTest/AllTest";
import Details from "../Pages/Home/Details/Details";
import Login from "../Pages/Login/Login";
import Error from "../Pages/Error/Error";


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
          path:'/details',
          element:<Details></Details>
        },
        {
          path:'/login',
          element:<Login></Login>
        }
      ]
    },
  ]);