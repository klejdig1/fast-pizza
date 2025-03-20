import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

function AppLayout(){

   const navigate=useNavigation();
   const isLoading=navigate.state === "loading";

    return(
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        {isLoading && <Loader/>}
     <Header/>

        <div className="overflow-y-scroll ">
        <main className='max-w-3xl mx-auto '>
            <Outlet/>
        </main>
        </div>

        <CartOverview/>
        </div>
    )
}

export default AppLayout;