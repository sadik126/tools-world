import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import About from "../../Pages/Home/About/About";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Home/Home/Login/Login";
import Signup from "../../Pages/Home/Home/Signup/Signup";
import Purchase from "../../Pages/Home/Purchase/Purchase";
import Tools from "../../Pages/Tools/Tools";
import Toolsdetails from "../../Pages/Tools/Toolsdetails";

import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/tools',
                element: <Tools></Tools>
            },
            {
                path: '/purchase/:id',
                element: <Purchase></Purchase>,
                loader: ({ params }) => fetch(`http://localhost:4040/tools/${params.id}`)
            },
            {
                path: '/tools/:id',
                element: <Toolsdetails></Toolsdetails>,
                loader: ({ params }) => fetch(`http://localhost:4040/tools/${params.id}`)
            },

        ]


    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        children: [
            {

                path: '/dashboard',
                element: <Dashboard></Dashboard>


            }
        ]
    }

])


export default router;