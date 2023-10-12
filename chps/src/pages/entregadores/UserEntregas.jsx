import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento, getEntregasAwaiting, getEntregasOnCourse, removeOnCourse } from "../../services/redux/pedidos/pedidosSlice";


function UserEntregas() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { entregas } = useSelector(state => state.pedidos);
    const [userEntregas, setUserEntregas] = useState([]);

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const handleFetchUserEntregas = async () => {
            const entregasFiltered = await getEntregasOnCourse(entregas);
            const filteredEntregas = entregasFiltered?.filter(entrega => entrega.motoboy === id);
            setUserEntregas(filteredEntregas);
        };
        handleFetchUserEntregas();
    }, [entregas, id]);

    //REMOVE A ENTREGA DE CURSO
    const handleRemoveOnCourse = (entrega) => {
        dispatch(removeOnCourse({ Order: entrega, Key: entrega.key }))
    };

    return (

        <>
            <h2 className="text-2xl font-semibold text-center mt-6">Suas entregas</h2>
            <div className="flex flex-col gap-4 p-12">
                {userEntregas?.map((entrega, i) => {

                    return (
                        <div key={entrega.numero_pedido} className="flex flex-col">
                            <div className="bg-gray-300 rounded-s-full shadow-md flex items-center">
                                <div className="flex">
                                    <span className="w-[2rem] flex justify-center shadow-xl items-center font-semibold h-[2rem] rounded-full bg-gray-200 text-lg">
                                        {i + 1}
                                    </span>
                                    <span className="flex items-center gap-4">
                                        <p className="ml-2">{entrega.nome}</p>
                                        <p>{entrega.rua + ', ' + entrega.numero_casa}</p>
                                    </span>
                                </div>
                            </div>
                            <button className="underline text-red-400 self-end mt-2" onClick={() => handleRemoveOnCourse(entrega)}>Remover</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UserEntregas;