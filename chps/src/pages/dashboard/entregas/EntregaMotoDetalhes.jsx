import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento, getEntregasOnCourse, submitOrder } from "../../../services/redux/pedidos/pedidosSlice";
import { useEffect, useState } from "react";
import { getHours } from "../../../javascript/main";


function EntregaMotoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { entregas } = useSelector((state) => state.pedidos);

    const [userEntregas, setUserEntregas] = useState([]);


    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const fetchEntregas = async () => {
            const entregasOnCourse = await getEntregasOnCourse(entregas)
            setUserEntregas(entregasOnCourse.filter(pedido => pedido.motoboy == id));
        }
        fetchEntregas();
    }, [dispatch, entregas]);


    const handleSubmitOrder = (order) => {
        dispatch(submitOrder({ Order: order, Key: order.key, Time: getHours() }))
        window.history.back();
    };
    
    if (userEntregas.length <= 0){
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
                                <div>
                                    <button onClick={() => handleSubmitOrder(order)} className="bg-red-800 py-2 px-12 rounded-md font-semibold text-white hover:scale-105 my-6">Finalizar pedido</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
}

export default EntregaMotoDetalhes;