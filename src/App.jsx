import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/ Menu";


const router =createBrowserRouter([
    {
        path:"/",
        element:<Home />,
    },

    {
        path:"/menu",
        element:<Menu />,
    },
    {
            path:"*",
            element:"error",
    },
],
    {
        basename:"/fast-pizza",
    }

);

function App(){

    return <RouterProvider future={{v7_startTransition: true,v7_relativeSplatPath: true,}} router={router}/>
}
export default App;