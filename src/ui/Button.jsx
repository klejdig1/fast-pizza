import {Link} from "react-router-dom";

function Button({children,disabled,to,type,onClick}){

    const base="text-sm inline-block disabled:cursor-not-allowed bg-yellow-400 rounded-full font-semibold tracking-wide  text-stone-800 transition-colors duration-300 focus:outline-none focus:ring-offset-2 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 uppercase"


    const styles={
        primary:base + " px-4 py-3 sm:px-6 sm:py-4",
        round:base + " md:px-5 md:py-2.5 py-2 text-xs px-4",
        small:base + " md:px-3.5 md:py-2 py-1 text-xs px-2.5",
        secondary:"text-sm px-4 py-2.5 sm:px-6 sm:py-3.5 inline-block disabled:cursor-not-allowed bg-transparent rounded-full border-2 border-stone-300 font-semibold tracking-wide  text-stone-400 transition-colors duration-300 focus:outline-none focus:ring-offset-2 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:ring focus:ring-stone-300 uppercase"
    }

    if (to)return <Link className={styles[type]} to={to}>{children}</Link>

   if (onClick) return(
        <button onClick={onClick}  disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )

    return(
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button;