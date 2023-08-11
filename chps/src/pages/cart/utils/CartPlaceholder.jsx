import { Link } from "react-router-dom";


function CartPlaceholder() {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


            </div>
            <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


            </div>
            <div className="w-[16rem] rounded-lg h-[3rem] bg-gray-200 animate-pulse">


            </div>
            <Link className='text-red-400 underline relative text-md' to={"/menu"}>Seu carrinho está vazio! Mate sua fome</Link>
        </div>
    )
}


export default CartPlaceholder;