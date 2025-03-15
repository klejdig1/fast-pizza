import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header(){
    return(
        <header className="bg-yellow-100 uppercase flex px-4 py-3 justify-between border-b border-stone-200 sm:px-6">
           <Link to="/" className="tracking-widest">Fast Pizza Co.</Link>
            <SearchOrder/>
            <Username/>
        </header>
    )
}

export default Header;