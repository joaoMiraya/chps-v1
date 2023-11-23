import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPedidosAndamento } from "@services/redux/pedidos/pedidosSlice";


function EncerrarMesa() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { pedidos_mesa } = useSelector((state) => state.pedidos);
    const pedido = pedidos_mesa?.filter(pedido => pedido.numero_mesa == id);

    return (

        <>
            <h1 className="text-2xl text-center my-6">Visão geral da mesa {id}</h1>
            <div>
                
            </div>
        </>
    )
}

export default EncerrarMesa;