import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Home/Home/Login/Login";
import Purchase from "../../Pages/Home/Purchase/Purchase";
import Tools from "../../Pages/Tools/Tools";

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
                path: '/login',
                element: <Login></Login>
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

        ]


    }
])


export default router;