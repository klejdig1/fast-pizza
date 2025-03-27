
// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigate} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, getCart, getTotalCartPrice} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import {formatCurrency} from "../../utils/helpers.js";
import {useState} from "react";
import {fetchAddress} from "../user/userSlice.js";

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );


function CreateOrder() {
    const [withPriority,setWithPriority]=useState(false);
    const {username,status:addressStatus,position,address,error:errorAddress}=useSelector(state => state.user)
    const isLoadingAddress=addressStatus === 'loading';
    const navigate=useNavigate();
    const isSubmitting=navigate.state ==='submitting';
    const formError= useActionData();
    const dispatch=useDispatch();


    const cart = useSelector(getCart);
    const totalCartPrice=useSelector(getTotalCartPrice)
    const totalPriority= withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice=totalCartPrice + totalPriority;

    if (!cart.length)return <EmptyCart/>;

    return (
        <div className="px-4 py-6">
            <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input className="input grow" defaultValue={username}  type="text" name="customer" required />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input className="input w-full" type="tel" name="phone" required />
                        {formError?.phone && <p className="text-xs mt-2 text-red-600 bg-red-100 rounded-md inline-block p-2">{formError.phone}</p>}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input defaultValue={address} disabled={isLoadingAddress} className="input w-full" type="text" name="address" required />
                        {addressStatus ==='failed' && <p className="text-xs mt-2 text-red-600 bg-red-100 rounded-md block p-2">{errorAddress}</p>}
                    </div>
                    {!position.latitude && !position.longitude &&
                        <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-50">
                        <Button type="small" disabled={isLoadingAddress} onClick={(e) => {
                            e.preventDefault();
                            dispatch(fetchAddress())
                        }}>Get position</Button>
                    </span>}
                </div>

                <div className='flex items-center mb-12 gap-5'>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                         value={withPriority}
                         onChange={(e) => setWithPriority(e.target.checked)}
                        className="h-6 w-6 focus:ring focus:ring-yellow-400 focus:ring-offset-2 accent-yellow-400 focus:outline-none"
                    />
                    <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
                    <input type='hidden' name='position' value={position.latitude && position.longitude ?`${position.latitude},${position.longitude}`:''}/>
                    <Button type="primary" disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? "Place order..." : `Order now for ${formatCurrency(totalPrice)}`}</Button>
                </div>
            </Form>
        </div>
    );
}


export async function action({request}){
    const formData= await request.formData();
    const data = Object.fromEntries(formData)

    const order={
        ...data,
        cart:JSON.parse(data.cart),
        priority:data.priority === 'true',
        phone:Number(data.phone),

    }

    const errors={};
    if (!isValidPhone(order.phone)) errors.phone = "Please give as your correct number.";
    if (Object.keys(errors).length > 0)return errors;

    const newOrder=await createOrder(order)

    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;