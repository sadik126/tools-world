import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Addproduct from "../../Pages/Addproduct/Addproduct";
import Allorders from "../../Pages/Allorders/Allorders";
import Allproducts from "../../Pages/Allproducts/Allproducts";
import Contact from "../../Pages/Contact/Contact";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import About from "../../Pages/Home/About/About";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Home/Home/Login/Login";
import Signup from "../../Pages/Home/Home/Signup/Signup";
import Purchase from "../../Pages/Home/Purchase/Purchase";
import Payment from "../../Pages/Payment/Payment";
import Profile from "../../Pages/Profile/Profile";
import Reviews from "../../Pages/Reviews/Reviews";
import Tools from "../../Pages/Tools/Tools";
import Toolsdetails from "../../Pages/Tools/Toolsdetails";
import Users from "../../Pages/Users/Users";
import Adminroute from "../Adminroute/Adminroute";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Error from "../../Pages/Error/Error";
import Edititems from "../../Pages/EditItems/Edititems";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
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
                path: '/contact',
                element: <Contact></Contact>
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
                element: <PrivateRoute><Purchase></Purchase></PrivateRoute>,
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
                index: true,
                // path: '/dashboard',
                element: <Dashboard></Dashboard>


            },
            {

                path: '/dashboard/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>


            },
            {

                path: '/dashboard/reviews',
                element: <Reviews></Reviews>


            },
            {

                path: '/dashboard/users',
                element: <Adminroute><Users></Users></Adminroute>


            },
            {

                path: '/dashboard/manageorders',
                element: <Adminroute><Allorders></Allorders></Adminroute>


            },
            {

                path: '/dashboard/manageproducts',
                element: <Adminroute><Allproducts></Allproducts></Adminroute>


            },
            {
                path: '/dashboard/editproducts/:id',
                element: <Adminroute><Edititems></Edititems></Adminroute>,
                loader: ({ params }) => fetch(`http://localhost:4040/tools/${params.id}`)
            },
            {

                path: '/dashboard/addproducts',
                element: <Adminroute><Addproduct></Addproduct></Adminroute>


            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:4040/booking/${params.id}`)
            },
        ]
    }

])


export default router;