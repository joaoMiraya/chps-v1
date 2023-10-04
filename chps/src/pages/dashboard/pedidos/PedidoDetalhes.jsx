import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import Loading from "../../../components/partials/Loading";
import { print } from "../../../javascript/print";
import { toast } from "react-toastify";

const InfoPedido = lazy(() => import('./detalhes/InfoPedido'));
const InfoGeral = lazy(() => import('./detalhes/InfoGeral'));
const Endereço = lazy(() => import('./detalhes/Endereço'));


function PedidoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
    }, [dispatch]);

    const [orderPrinted, setOrderPrinted] = useState(localStorage.getItem("PedidoImpresso") || []);
    const pedidosAndamento = useSelector((state) => state.pedidos.entregas);

    const pedido = pedidosAndamento.find((pedido) => pedido.numero_pedido == id);

    console.log(pedido);
    const handlePrintOrder = (order) => {
        return new Promise((resolve, reject) => {
            try {
                print(order);
                toast.success('Imprimindo...')
                setOrderPrinted((prevOrderPrinted) => [...prevOrderPrinted, order.numero_pedido]);
                localStorage.setItem("PedidoImpresso", id)
                resolve("Order printed successfully")
            } catch (error) {
                toast.error("Algo deu errado!")
                reject(error);
            }
        });
    };
    const pedidoEncontrado = orderPrinted.includes(id);

    console.log(orderPrinted);

    if (!pedido) {
        return <Loading />
    }
    return (
        <>
            <div className="flex justify-center  my-16">
                <div className="shadow-xl flex flex-col p-6 rounded-lg">
                    <InfoGeral pedido={pedido} />
                    <Endereço pedido={pedido} />
                    <InfoPedido pedido={pedido} />

                    <span className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-start">Total:</h2>
                        <p className="font-semibold">R$ {pedido.total}</p>
                    </span>

                    <div className="mt-4">
                        <button onClick={() => handlePrintOrder(pedido)} className={` ${pedidoEncontrado ? 'bg-yellow-600' : 'bg-green-500'}  shadow-xl py-2 px-4 rounded-md hover:scale-105 cursor-pointer`}>
                            {pedidoEncontrado ? '2° Via' : 'Imprimir'}
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PedidoDetalhes;