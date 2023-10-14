import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento, setOnCourse } from "@services/redux/pedidos/pedidosSlice";
import { getUser } from "@services/redux/users/usersSlice";
import { lazy } from "react";

const Mapa = lazy(() => import("./utils/Mapa"));
const GoBackBtn = lazy(() => import("@components/utils/buttons/GoBackBtn"));

function EntregaDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { pedidos } = useSelector(state => state.pedidos);
    const entrega = pedidos?.find((entrega) => entrega.numero_pedido == id);

    const address = 'Rua ' + entrega?.rua + ', ' + entrega?.numero_casa + ' - Álvares Machado, SP, 19160-000';

    const handleSetOnCourse = async () => {
        const { uid } = await getUser();
        dispatch(setOnCourse({ Key: entrega.key, Order: entrega, Motoboy: uid }));
        window.history.back();
    };

    return (

        <>
            <GoBackBtn />
            <div className="px-6 flex flex-col mt-12">
                <Mapa address={address} />
                <div className="my-6">
                    <ul className="text-xl flex flex-col gap-2">
                        <li>Cliente: {entrega?.nome}</li>
                        {entrega?.itens.map((item, i) => {
                            return (
                                <li key={i}>
                                    {item.nome}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <h2 className="text-2xl text-center ">{address}</h2>
                <button onClick={handleSetOnCourse} className="py-2 bg-red-900 rounded-xl text-white font-semibold mt-12">Entregar</button>
            </div>
        </>

    )
};

export default EntregaDetalhes;