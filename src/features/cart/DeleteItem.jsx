import Button from "../../ui/Button.jsx";
import {removeItem} from "./cartSlice.js";
import {useDispatch} from "react-redux";

function DeleteItem({pizzaId}){
    const dispatch =useDispatch();

    return <Button onClick={()=>dispatch(removeItem(pizzaId))} type="small">Remove</Button>
}

export default DeleteItem;