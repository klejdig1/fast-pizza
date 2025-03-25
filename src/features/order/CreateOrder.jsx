
// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigate} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import {useSelector} from "react-redux";

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

const fakeCart = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function CreateOrder() {
    const username=useSelector(state => state.user.username)
    const navigate=useNavigate();
    const isSubmitting=navigate.state ==='submitting';
    const formError= useActionData();


    const cart = fakeCart;

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

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input className="input w-full" type="text" name="address" required />
                    </div>
                </div>

                <div className='flex items-center mb-12 gap-5'>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                        className="h-6 w-6 focus:ring focus:ring-yellow-400 focus:ring-offset-2 accent-yellow-400 focus:outline-none"
                    />
                    <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
                    <Button type="primary" disabled={isSubmitting}>{isSubmitting ? "Place order..." : 'Order now'}</Button>
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
        priority:data.priority === 'on',
        phone:Number(data.phone),

    }

    const errors={};
    if (!isValidPhone(order.phone)) errors.phone = "Please give as your correct number.";
    if (Object.keys(errors).length > 0)return errors;

    const newOrder=await createOrder(order)

    return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;