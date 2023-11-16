import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function PedidosComp({ pedidos }) {
    PedidosComp.propTypes = {
        pedidos: PropTypes.array.isRequired
    };

    return (
        <>
            {pedidos.map((order) => {
                return (

                    <Link to={`/dashboard/pedidos/${order.numero_pedido}`} key={order.numero_pedido} className=" hover:scale-105 flex rounded-2xl cursor-pointer bg-white drop-shadow-lg border-[1px] border-gray-300 border-solid p-4 ">
                        <div>
                            <p>Pedido número: {order.numero_pedido}</p>
                            <p className="text-start">Feito às: {order.hora_pedido}</p>
                            <span className="flex items-center gap-2">
                                {order.nome ? <p className="font-semibold">Cliente:{order.nome}</p> :
                                    <p className="font-semibold">Mesa: {order.numero_mesa}</p>}
                            </span>
                        </div>

                    </Link>

                )
            })}
        </>

    )
}

export default PedidosComp;