import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function PedidosAndamento() {
    const dispatch = useDispatch();

    const pedidosAndamento = useSelector((state) => state.pedidos.entregas);

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        dispatch(fetchPedidosAndamento());
    };
    fetchData();




    return (
        <>
            <div className="flex gap-4 flex-wrap items-center justify-center pt-6">
                {pedidosAndamento.map((order) => {


                    return (
                        <Link to={`/dashboard/pedidos/${order.numero_pedido}`} key={order.numero_pedido} className=" hover:scale-105 flex h-[26rem]: cursor-pointer bg-white drop-shadow-lg border-[1px] border-gray-300 border-solid p-4 ">
                            <div>
                                <p>Pedido número: {order.numero_pedido}</p>
                                <p className="text-start">{order.hora_pedido}</p>
                                <span className="flex items-center gap-2">
                                    <p className="font-semibold">Cliente:</p>{order.nome}
                                </span>
                            </div>

                        </Link>

                    )
                })}
            </div>
        </>
    )
}

export default PedidosAndamento;