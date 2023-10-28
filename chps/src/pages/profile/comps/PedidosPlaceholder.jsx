import { Link } from "react-router-dom";


function PedidosPlaceholder() {

    return (

        <>
            <div className="flex text-center flex-col ">
                <span > Você não tem nenhum pedido em andamento</span>
                <Link to={"/menu"} className='text-[#DB0007] underline self-center pt-2'>Peça agora!</Link>
            </div>
        </>
    )
}

export default PedidosPlaceholder;