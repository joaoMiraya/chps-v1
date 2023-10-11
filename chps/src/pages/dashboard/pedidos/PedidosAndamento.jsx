import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import { useEffect } from "react";
import PedidosComp from "./utils/PedidosComp";


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
            <div className="flex gap-4 flex-wrap items-center justify-center pt-6 relative">
                {pedidosAndamento.length > 0 ? < PedidosComp pedidosAndamento={pedidosAndamento} /> : <h2>Ainda não há pedidos em andamento</h2>}
            </div>
        </>
    )
}

export default PedidosAndamento;