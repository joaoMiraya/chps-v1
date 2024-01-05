import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchPedidosAndamento } from "@services/redux/pedidos/pedidosSlice";
import { print } from "@javascript/print";
import { getMotoboys } from "@services/redux/users/usersSlice";
import { setPedidosImpressos } from "../../../services/redux/pedidos/pedidosSlice";

const Loading = lazy(() => import('@components/partials/Loading'));
const CancelPedido = lazy(() => import('./utils/CancelPedido'));
const InfoPedido = lazy(() => import('./detalhes/InfoPedido'));
const InfoGeral = lazy(() => import('./detalhes/InfoGeral'));
const Endereço = lazy(() => import('./detalhes/Endereço'));


function PedidoDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchPedidosAndamento());
        dispatch(getMotoboys());
    }, [dispatch]);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    };

    const { pedidos, pedidos_impressos } = useSelector((state) => state.pedidos);

    const pedido = pedidos.find((pedido) => pedido.numero_pedido == id);


    const handlePrintOrder = (order) => {
        return new Promise((resolve, reject) => {
            try {
                print(order);
                toast.success('Imprimindo...')
                dispatch(setPedidosImpressos(id))
                resolve("Order printed successfully")
            } catch (error) {
                toast.error("Algo deu errado!")
                reject(error);
            }
        });
    };
    const pedidoImpresso = pedidos_impressos.includes(id);

    if (!pedido) {
        return <Loading />
    }
    return (
        <>
            <div className="flex justify-center  my-16">

                <div className="shadow-xl flex flex-col p-6 rounded-lg">
                    <InfoGeral pedido={pedido} />
                    {pedido.mesa ? '' : <Endereço pedido={pedido} />}

                    <InfoPedido pedido={pedido} />

                    <span className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-start">Total:</h2>
                        <p className="font-semibold">R$ {Number(pedido.total).toFixed(2).replace(".", ",")}</p>
                    </span>

                    <span className={`${pedido.mesa === true ? 'hidden' : 'flex'} justify-between`}>
                        <p className="font-semibold">Pagamento:</p>
                        {typeof pedido.pagamento != 'number'
                            ?
                            <p className="font-semibold">{pedido.pagamento}</p>
                            :
                            < p className="font-semibold">{`R$ ${Number(pedido.pagamento).toFixed(2).replace('.', ',')}`}</p>
                        }
                    </span>

                    <span className={`${typeof pedido.pagamento != 'number' ? 'hidden' : 'flex'}  justify-between`}>
                        <p className="font-semibold">Troco:</p>
                        <p className="font-semibold">{`R$ ${Number(pedido.pagamento - pedido.total).toFixed(2).replace('.', ',')}`}</p>
                    </span>

                    <div className="mt-4 flex justify-between">
                        <button onClick={() => handlePrintOrder(pedido)} className={` ${pedidoImpresso ? 'bg-yellow-600' : 'bg-green-500'}  shadow-xl py-2 px-4 rounded-md hover:scale-105 cursor-pointer`}>
                            {pedidoImpresso ? '2° Via' : 'Imprimir'}
                        </button>
                        <button onClick={handleOpenModal} className={`bg-red-900  shadow-xl py-2 px-4 rounded-md hover:scale-105 text-white cursor-pointer`}>
                            {openModal ? "Voltar" : "Cancelar"}
                        </button>
                    </div>

                </div>
                <div className={`${openModal ? 'flex' : 'hidden'} flex-col transition-all duration-300 self-end ml-4 rounded-lg pb-16 px-6 shadow-xl`}>
                    <h2 className="font-semibold">Descreva o motivo do cancelamento:</h2>
                    <CancelPedido pedido={pedido} />
                </div>
            </div >
        </>
    )
}

export default PedidoDetalhes;