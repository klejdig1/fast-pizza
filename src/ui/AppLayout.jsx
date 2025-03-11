import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

function AppLayout(){

   const navigate=useNavigation();
   const isLoading=navigate.state === "loading";

    return(
    <div className="layout">
        {isLoading && <Loader/>}
     <Header/>

        <main>
            <Outlet/>
        </main>

        <CartOverview/>
        </div>
    )
}

export default AppLayout;