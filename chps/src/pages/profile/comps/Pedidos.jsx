import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '@services/firebase/firebase';
import { fetchPedidosAndamento } from '@services/redux/pedidos/pedidosSlice';

const PedidosPlaceholder = lazy(() => import("./PedidosPlaceholder"));
const PedidoEmAndamento = lazy(() => import("./PedidoEmAndamento"));

function Pedidos() {

    const [userOrder, setUserOrder] = useState([]);

    const { pedidos } = useSelector((state) => state.pedidos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        const fetchOrders = () => {
            setTimeout(async () => {
                const { uid } = await auth.currentUser;
                const pedidosFiltrados = pedidos?.filter((pedido) => pedido.uid == uid);
                setUserOrder(pedidosFiltrados);
            }, 500);
        };
        fetchOrders();
    }, [pedidos, dispatch]);



    return (
        <div className="flex flex-col items-center bg-stone-200 flex-grow-1 p-4 justify-center rounded-md max-w-[24rem] shadow-md mx-6">
            {userOrder.length > 0 ? <PedidoEmAndamento pedidos={userOrder} /> : <PedidosPlaceholder />}
        </div >
    )
}

export default Pedidos;