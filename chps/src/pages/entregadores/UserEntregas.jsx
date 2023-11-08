import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento, getEntregasOnCourse, removeOnCourse } from "@services/redux/pedidos/pedidosSlice";


function UserEntregas() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { pedidos } = useSelector(state => state.pedidos);
    const [userEntregas, setUserEntregas] = useState([]);

    //PEGA AS ENTREGAS DO MOTOQUEIRO
    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const handleFetchUserEntregas = async () => {
            const entregasFiltered = await getEntregasOnCourse(pedidos);
            const filteredEntregas = entregasFiltered?.filter(entrega => entrega.motoboy === id);
            setUserEntregas(filteredEntregas);
        };
        handleFetchUserEntregas();
    }, [pedidos, id]);

    //REMOVE A ENTREGA DE CURSO
    const handleRemoveOnCourse = (entrega) => {
        dispatch(removeOnCourse({ Order: entrega, Key: entrega.key }))
    };

    return (

        <>
            <h2 className="text-2xl font-semibold text-center mt-6">Suas entregas</h2>
            <div className="flex flex-col gap-4 px-6">
                {userEntregas?.map((entrega, i) => {

                    return (
                        <div key={entrega.numero_pedido} className="flex flex-col">
                            <div className="bg-gray-100 py-2 rounded-xl shadow-md flex flex-col justify-center">
                                <span className="w-[2rem] h-[2rem] bg-red-900 text-gray-200 flex justify-center self-start ml-2 shadow-xl items-center font-semibold rounded-full text-lg">
                                    {i + 1}
                                </span>
                                <div className="px-4">
                                    <span className="flex justify-between items-center gap-4">
                                        <p className="font-semibold">Cliente:</p>
                                        <p>{entrega.nome}</p>
                                    </span>

                                    <span className="flex justify-between items-center gap-4">
                                        <p className="font-semibold selg">Total:</p>
                                        <p> R$ {entrega.total}</p>
                                    </span>
                                    <span className="flex justify-between items-center gap-4">
                                        <p className="font-semibold">Pagamento:</p>
                                        <p className="whitespace-nowrap"> {entrega.pagamento}</p>
                                    </span>
                                    <span className="flex justify-between items-center gap-4">
                                        <p className="font-semibold">Endereço:</p>
                                        <p> {entrega.rua + ', ' + entrega.numero_casa}</p>
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