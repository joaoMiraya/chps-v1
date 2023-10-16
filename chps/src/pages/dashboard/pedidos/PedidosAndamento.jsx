import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { lazy } from "react";
import { fetchPedidosAndamento } from "@services/redux/pedidos/pedidosSlice";
import { getEntregasAwaiting, getRetiradas, getPedidosMesa } from "@services/redux/pedidos/pedidosSlice";

const FiltroPedidos = lazy(() => import("./utils/FiltroPedidos"));
const PedidosComp = lazy(() => import("./utils/PedidosComp"));

function PedidosAndamento() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { pedidos } = useSelector((state) => state.pedidos);


    const [orderConfig, setOrderConfig] = useState(0);
    const [order, setOrder] = useState([]);

    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        dispatch(fetchPedidosAndamento());
    };
    fetchData();


    useEffect(() => {
        switch (orderConfig) {
            case 1:
                setOrder(getEntregasAwaiting(pedidos))
                break;
            case 2:
                setOrder(getPedidosMesa(pedidos))
                break;
            case 3:
                setOrder(getRetiradas(pedidos))
                break;
            default:
                break;
        }
    }, [orderConfig])




    return (
        <>
            <h2 className='text-2xl font-semibold'>Pedidos em Andamento</h2>
            <FiltroPedidos setOrderConfig={setOrderConfig} />
            <p className={`${orderConfig === 0 ? 'inline' : 'hidden'} text-red-400`}>Selecione um filtro!</p>
            <div className="flex justify-between w-full">
                <div className="flex gap-4 flex-wrap items-center pt-6 relative">

                    {order.length > 0 ? <PedidosComp entregas={order} /> : <h2>Ainda não há pedidos em andamento</h2>}
                </div>
            </div>
        </>
    )
}

export default PedidosAndamento;