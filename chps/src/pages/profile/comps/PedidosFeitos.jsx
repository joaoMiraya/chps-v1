import { fetchPedidosFeitos } from "@services/redux/pedidos/pedidosSlice";
import { useDispatch } from "react-redux";


function PedidosFeitos() {

    const dispatch = useDispatch();

    const handleFetch = () => {
        dispatch(fetchPedidosFeitos());
    }

    return (
        <>
            <button onClick={() => handleFetch()}>clicaaa</button>
        </>
    )
}

export default PedidosFeitos;