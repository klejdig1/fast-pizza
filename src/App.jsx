import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home";
import Menu,{loader as menuLoader} from "./features/menu/ Menu";
import Cart from "./features/cart/Cart.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import CreateOrder, {action as orderAction} from "./features/order/CreateOrder.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";
import {action as updateOrderAction} from './features/order/UpdateOrder.jsx'



const router =createBrowserRouter([

        {
            element:<AppLayout/>,
            errorElement:<Error/>,

            children:[

                {
                    path:"/",
                    element:<Home />,
                },

                {
                    path:"/menu",
                    element:<Menu />,
                    loader:menuLoader,
                    errorElement:<Error/>,

                },

                {
                    path:"/cart",
                    element:<Cart/>,
                },

                {
                    path:"/order/new",
                    element:<CreateOrder/>,
                    action:orderAction,

                },

                {
                    path:"/order/:orderId",
                    element:<Order/>,
                    loader:orderLoader,
                    errorElement:<Error/>,
                    action:updateOrderAction

                },


            ],
        },

],
    {
        basename:"/fast-pizza",
    }

);

function App(){

    return <RouterProvider future={{v7_startTransition: true,v7_relativeSplatPath: true,}} router={router}></RouterProvider>
}
export default App;