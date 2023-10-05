import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCancelOrder, deleteOrder, fetchPedidosAndamento } from "../../../services/redux/pedidos/pedidosSlice";
import Loading from "../../../components/partials/Loading";
import { print } from "../../../javascript/print";
import { toast } from "react-toastify";
import { getMotoboys } from "../../../services/redux/users/usersSlice";
import { getHours } from "../../../javascript/main";

const InfoPedido = lazy(() => import('./detalhes/InfoPedido'));
const InfoGeral = lazy(() => import('./detalhes/InfoGeral'));
const Endereço = lazy(() => import('./detalhes/Endereço'));


function PedidoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const [reason, setReason] = useState('');


    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        dispatch(getMotoboys());
    }, [dispatch]);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    };


    const [orderPrinted, setOrderPrinted] = useState(localStorage.getItem("PedidoImpresso") || []);
    const pedidosAndamento = useSelector((state) => state.pedidos.entregas);

    const pedido = pedidosAndamento.find((pedido) => pedido.numero_pedido == id);



    const handleCancelOrder = (e) => {
        e.preventDefault();
        if (reason.length > 3) {
            dispatch(addCancelOrder({ Reason: reason, Order: pedido, Time: getHours() }));
            dispatch(deleteOrder(pedido.key));
            window.history.back();
        } else {
            toast.error("Insira um motivo para o cancelamento do pedido")
        }
    };

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

                    <div className="mt-4 flex justify-between">
                        <button onClick={() => handlePrintOrder(pedido)} className={` ${pedidoEncontrado ? 'bg-yellow-600' : 'bg-green-500'}  shadow-xl py-2 px-4 rounded-md hover:scale-105 cursor-pointer`}>
                            {pedidoEncontrado ? '2° Via' : 'Imprimir'}
                        </button>
                        <button onClick={handleOpenModal} className={`bg-red-900  shadow-xl py-2 px-4 rounded-md hover:scale-105 text-white cursor-pointer`}>
                            {openModal ? "Voltar" : "Cancelar"}
                        </button>
                    </div>

                </div>
                <div className={`${openModal ? 'flex' : 'hidden'} flex-col transition-all duration-300 self-end ml-4 rounded-lg pb-16 px-6 shadow-xl`}>
                    <h2 className="font-semibold">Descreva o motivo do cancelamento:</h2>
                    <div className="flex flex-col">

                        <form onSubmit={(e) => handleCancelOrder(e)}>
                            <input
                                className=" border-b-[1px] w-full border-slod border-gray-300"
                                type="text"
                                name="cancelamento"
                                id="cancelamento"
                                onChange={(e) => setReason(e.target.value)}
                                value={reason}
                            />
                            <div className="flex flex-col pt-12">
                                <button className="bg-red-900 text-white py-2 rounded-md shadow-lg hover:scale-105" type="submit">Cancelar pedido</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PedidoDetalhes;