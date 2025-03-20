import {getMenu} from "../../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
   const menu =useLoaderData()

    return <ul className="divide-y divide-stone-200 px-2 space-y-2">
        {menu.map(pizza=> <MenuItem key={pizza.id} pizza={pizza}/>)}
    </ul>;
}


export async function loader(){
  const menu = await getMenu()

  return menu
}


export default Menu;