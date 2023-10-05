import { Link } from "react-router-dom";


function PedidosPlaceholder() {

    return (

        <>
            <div className="flex flex-col ">
                < span > Você ainda não fez nenhum pedido</span>
                <Link to={"/menu"} className='text-[#DB0007] underline self-center pl-4'>Peça agora!</Link>
            </div>
        </>
    )
}

export default PedidosPlaceholder;