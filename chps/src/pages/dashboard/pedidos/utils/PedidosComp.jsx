import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function PedidosComp({ entregas }) {
    PedidosComp.propTypes = {
        entregas: PropTypes.array.isRequired
    };

    return (
        <>
            {entregas.map((order) => {
                return (

                    <Link to={`/dashboard/pedidos/${order.numero_pedido}`} key={order.numero_pedido} className=" hover:scale-105 flex h-[26rem]: cursor-pointer bg-white drop-shadow-lg border-[1px] border-gray-300 border-solid p-4 ">
                        <div>
                            <p>Pedido número: {order.numero_pedido}</p>
                            <p className="text-start">Feito às: {order.hora_pedido}</p>
                            <span className="flex items-center gap-2">
                                <p className="font-semibold">Cliente:</p>{order.nome}
                            </span>
                        </div>

                    </Link>

                )
            })}
        </>

    )
}

export default PedidosComp;