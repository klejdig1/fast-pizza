import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {addItem, getCurrentQuantityId} from "../cart/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQuantityId(id));
    const isInCart =currentQuantity > 0;
    function handleAddToCart() {
        const newItem= {
            pizzaId:id,
            name,
            quantity:1,
            unitPrice,
            totalPrice:unitPrice * 1,
        }
        dispatch(addItem(newItem))
    }

    return (
        <li className="flex gap-4 py-2">
            <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" :""}`}/>
            <div className="flex flex-col flex-grow pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
                <div className="mt-auto flex justify-between items-center">
                    {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-400">Sold out</p>}

                    {isInCart && <div className="flex items-center gap-3 sm:gap-8">
                        <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
                        <DeleteItem pizzaId={id}>Remove</DeleteItem>
                    </div>}
                    {!soldOut && !isInCart && <Button onClick={handleAddToCart} type="small">Add to cart</Button>}

                </div>
            </div>

        </li>
    );
}

export default MenuItem;