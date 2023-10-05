import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../../services/firebase/firebase';
import { fetchPedidosAndamento } from '../../../services/redux/pedidos/pedidosSlice';
import PedidosPlaceholder from './PedidosPlaceholder';
import PedidoEmAndamento from './PedidoEmAndamento';


function Pedidos() {

    const [pedidos, setPedidos] = useState([]);
    const pedidosAndamento = useSelector((state) => state.pedidos.entregas);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const fetchOrders = () => {
            setTimeout(() => {
                const { uid } = auth.currentUser;
                const pedidosFiltrados = pedidosAndamento?.filter((pedido) => pedido.uid == uid);
                setPedidos(pedidosFiltrados);
            }, 500);
        };
        fetchOrders();
    }, [pedidosAndamento]);



    return (
        <div className="flex flex-col items-center bg-gray-200 flex-grow-1 p-4 justify-center rounded-md max-w-[24rem] mx-6">
            {pedidos.length > 0 ? <PedidoEmAndamento pedidos={pedidos} /> : <PedidosPlaceholder />}
        </div >
    )
}

export default Pedidos;