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
            <p>Seu carrinho está vazio!<Link aria-label="Ir para o cardápio" tabIndex={0} className='text-red-400 underline relative text-md' to={"/menu"}> Peça agora</Link></p>
        </div>
    )
}


export default CartPlaceholder;