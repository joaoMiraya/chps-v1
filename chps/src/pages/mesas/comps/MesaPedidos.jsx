import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import CardItemMesa from "../utils/CardItemMesa";
import { fetchLanches } from "../../../services/redux/items/lanchesSlice";
import PedidosPlaceholder from "../../profile/comps/PedidosPlaceholder";
import EntregaPlaceholder from "../../entregadores/utils/EntregaPlaceholder";

function MesaPedidos() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        dispatch(fetchLanches());
    }, [dispatch]);

    const { pedidos_mesa } = useSelector(state => state.pedidos);
    const pedido = pedidos_mesa?.filter(pedido => pedido.numero_mesa == id);


    if (!pedido) {
        return (<EntregaPlaceholder />)
    };
    return (
        <>
            {pedido?.length > 0 ? <div className="px-6 min-h-screen">
                <h2 className="text-2xl text-center font-semibold py-6">{`Pedidos da mesa ${id}`}</h2>
                {pedido?.map((pedido) => {
                    return (
                        <span key={pedido.numero_pedido}>
                            {pedido.itens?.map((order) => {
                                return (
                                    <CardItemMesa key={order.idPedido}
                                        urlImage={order.url_image}
                                        itemId={order.idPedido}
                                        itemNome={order.nome}
                                    />
                                )
                            })}

                        </span>
                    )
                })}
            </div> : <h2 className="text-center text-2xl font-semibold text-red-800">Não há pedidos</h2>}
        </>
    )
}

export default MesaPedidos;