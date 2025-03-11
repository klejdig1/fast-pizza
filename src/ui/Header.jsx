import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header(){
    return(
        <header>
           <Link to="/">Fast Pizza Co.</Link>
            <SearchOrder/>
            <p>Klejdi</p>
        </header>
    )
}

export default Header;