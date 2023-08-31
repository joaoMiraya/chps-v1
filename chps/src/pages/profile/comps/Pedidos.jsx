import { Link } from 'react-router-dom';


function Pedidos() {

    return (
        <div className="flex flex-col items-center bg-gray-200 p-4 justify-center rounded-md max-w-[24rem] mx-6">
            <span>Você ainda não fez nenhum pedido</span>
            <Link to={"/menu"} className='text-[#DB0007] underline self-start pl-4'>Peça agora!</Link>
        </div>
    )
}

export default Pedidos;