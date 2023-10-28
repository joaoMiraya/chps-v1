import { fetchPedidosFeitos } from "@services/redux/pedidos/pedidosSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function PedidosFeitos() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosFeitos());
    }, [dispatch]);

    const { pedidos_user } = useSelector(state => state.pedidos);


    return (
        <>
            <div className={`${pedidos_user.length > 0 ? 'flex' : 'hidden'} bg-stone-200 gap-2 p-4 flex-col w-full rounded-md shadow-md`}>
                <h3 className="font-semibold pb-4 text-xl text-center">Seus últimos pedidos</h3>
                {pedidos_user?.map((pedido) => {
                    const order = pedido.pedido
                    const id = order.numero_pedido

                    return (
                        <ul key={id} className="flex flex-col bg-stone-100 drop-shadow-md rounded-xl ">
                            <li className="py-2 px-6 flex flex-col ">
                                <span className="text-center font-semibold">Data: {order.data}</span>
                                <span>
                                    {order.itens.map((item, i) => {
                                        return (
                                            <ul key={i} className="">
                                                <li className="">{item.qnt + ' ' + item.nome}</li>
                                                {item.acrescimos?.map((acr) => {
                                                    return (
                                                        <li key={acr.id}>+ {acr.nome}</li>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })}
                                </span>
                            </li>
                        </ul>
                    )
                })}
                <p className="text-center mt-4">Esses foram os seus 3 últimos pedidos feitos pelo app</p>
            </div>
        </>
    )
}

export default PedidosFeitos;