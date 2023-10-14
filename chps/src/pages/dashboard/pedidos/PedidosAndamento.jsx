import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento } from "@services/redux/pedidos/pedidosSlice";
import { useEffect } from "react";
import { lazy } from "react";

const PedidosComp = lazy(() => import("./utils/PedidosComp"));

function PedidosAndamento() {
    const dispatch = useDispatch();

    const { pedidos } = useSelector((state) => state.pedidos);

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
            <div className="flex gap-4 flex-wrap items-center justify-center pt-6 relative">
                {pedidos.length > 0 ? < PedidosComp pedidos={pedidos} /> : <h2>Ainda não há pedidos em andamento</h2>}
            </div>
        </>
    )
}

export default PedidosAndamento;