import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntregasAwaiting, getEntregasOnCourse } from "../../services/redux/pedidos/pedidosSlice";


function UserEntregas() {

    const { id } = useParams();
    const { entregas } = useSelector(state => state.pedidos);
    const [userEntregas, setUserEntregas] = useState([]);


  
        const handleFetchUserEntregas = async () => {
            const entregasFiltered = await getEntregasOnCourse(entregas);
            const filteredEntregas = entregasFiltered?.filter(entrega => entrega.motoboy === id);
            setUserEntregas(filteredEntregas);
        };
        handleFetchUserEntregas();
  

    return (

        <>
            <h2 className="text-2xl font-semibold text-center mt-6">Suas entregas</h2>
            <div className="flex flex-col gap-4 p-12">
                {userEntregas?.map((entrega, i) => {

                    return (
                        <div key={entrega.numero_pedido} className="bg-gray-300 rounded-s-full shadow-md flex items-center">
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
                    )
                })}
            </div>
        </>
    )
}

export default UserEntregas;