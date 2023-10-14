import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lazy } from "react";

import { fetchPedidosAndamento, getEntregasOnCourse, submitOrder } from "@services/redux/pedidos/pedidosSlice";
import { getHours } from "@javascript/main";

const CancelPedido = lazy(() => import("../pedidos/utils/CancelPedido"));

function EntregaMotoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { pedidos } = useSelector((state) => state.pedidos);

    const [userEntregas, setUserEntregas] = useState([]);


    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const fetchEntregas = async () => {
            const entregasOnCourse = await getEntregasOnCourse(pedidos)
            setUserEntregas(entregasOnCourse.filter(pedido => pedido.motoboy == id));
        }
        fetchEntregas();
    }, [dispatch, pedidos]);


    const handleSubmitOrder = (order) => {
        dispatch(submitOrder({ Order: order, Key: order.key, Time: getHours() }))
        window.history.back();
    };

    if (userEntregas.length <= 0) {
        return <p className="text-center">Motoqueiro sem entregas</p>
    }
    return (

        <>
            <div className="flex gap-4 justify-center py-12">
                {userEntregas?.map((order) => {
                    return (
                        <div key={order?.numero_pedido} className="flex items-center flex-col shadow-lg rounded-lg p-4">
                            <p className="font-semibold">{order?.numero_pedido}</p>
                            <p>{order?.nome}</p>
                            <p>{order?.bairro + ' ' + order?.rua + ', ' + order?.numero_casa}</p>

                            <p>Total: {order.total}</p>
                            <p>Pagamento: {order.pagamento}</p>
                            <div className="flex flex-col">
                                <button onClick={() => handleSubmitOrder(order)} className="bg-green-600 py-2 px-12 rounded-md font-semibold text-white hover:scale-105 my-6">Finalizar pedido</button>
                                <CancelPedido pedido={order} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default EntregaMotoDetalhes;