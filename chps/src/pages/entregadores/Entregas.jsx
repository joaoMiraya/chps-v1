import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAndamento } from "../../services/redux/pedidos/pedidosSlice";

function Entregas() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const { entregas } = useSelector(state => state.pedidos);

    console.log(entregas);


    return (
        <>
            <h2 className="text-2xl font-semibold text-center">Selecione suas entregas</h2>
            <div className="flex justify-center items-center flex-wrap">
                {entregas?.map((entrega) => {
                    return (
                        <div key={entrega.key} className="flex flex-col shadow-xl p-4 rounded-xl hover:scale-105 cursor-pointer">
                            {entrega.itens.map((item) => {
                                return (
                                    <ul key={item.id}>
                                        <li className="font-semibold">{item.nome}</li>
                                    </ul>
                                )
                            })}
                            <p>Cliente: {entrega.nome}</p>
                            <p>Bairro: {entrega.bairro}</p>
                            <p>Rua: {entrega.rua + ',' + ' ' + entrega.numero_casa}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Entregas;