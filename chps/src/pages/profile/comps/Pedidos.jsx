import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '@services/firebase/firebase';
import { fetchPedidosAndamento } from '@services/redux/pedidos/pedidosSlice';
import PedidosFeitos from './PedidosFeitos';

const PedidosPlaceholder = lazy(() => import("./PedidosPlaceholder"));
const PedidoEmAndamento = lazy(() => import("./PedidoEmAndamento"));

function Pedidos() {

    const [userOrder, setUserOrder] = useState([]);

    const { pedidos } = useSelector((state) => state.pedidos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const fetchOrders = () => {
            setTimeout(() => {
                const { uid } = auth.currentUser;
                const pedidosFiltrados = pedidos?.filter((pedido) => pedido.uid == uid);
                setUserOrder(pedidosFiltrados);
            }, 500);
        };
        fetchOrders();
    }, [pedidos]);



    return (
        <div className="flex flex-col items-center bg-gray-200 flex-grow-1 p-4 justify-center rounded-md max-w-[24rem] mx-6">
            {userOrder.length > 0 ? <PedidoEmAndamento pedidos={userOrder} /> : <PedidosPlaceholder />}
            <PedidosFeitos />
        </div >
    )
}

export default Pedidos;