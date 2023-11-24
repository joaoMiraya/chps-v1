
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import { MdOutlineFastfood } from 'react-icons/md';
import { toast } from 'react-toastify';

import { getUser } from '@services/redux/users/usersSlice';
import { removeFromMesa, clearMesa } from '@services/redux/mesa/mesaSlice';
import { getDate, getHours, numberGenerator } from '@javascript/main';
import { setPedidosMesa } from '@services/redux/pedidos/pedidosSlice';

const MesaPlaceholder = lazy(() => import("@components/utils/cards/MesaPlaceholder"));

function MesaItems() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [total, setTotal] = useState(0);

    const { mesaItems } = useSelector((state) => state.mesa);
    const mesa = mesaItems?.filter((mesa) => mesa.numero_mesa === id);


    useEffect(() => {
        // Calcula o total inicial
        const initialTotal = mesa.reduce((accumulator, cartItem) => {
            return accumulator + parseFloat(cartItem.valor);
        }, 0);
        setTotal(initialTotal);
    }, [mesa]);


    const handleDeleteFromCart = (mesaPedido) => {
        dispatch(removeFromMesa(mesaPedido))
    };

    const handleSetOrder = async () => {
        let order = {
            itens: mesa,
            numero_mesa: id,
            mesa: true,
            total: total,
            numero_pedido: await numberGenerator(),
            atendente: await getUser(),
            data: await getDate(),
            hora_pedido: await getHours(),
        };
        try {
            dispatch(setPedidosMesa(order));
        } catch (err) {
            console.log(err);
        }
        dispatch(clearMesa(order));
        toast.success(`Pedido da mesa ${id} enviado com sucesso!`);
        setInterval(() => {
            window.location.reload();
        }, 300)
    };

    return (


        <div className="flex items-center flex-col h-screen">
            <div className='flex justify-end w-full pr-6 py-6'>
                <Link to={`pedidos`} className='shadow-inner border-[1px] border-solid bg-red-900 border-red-600 hover:scale-95  p-2 rounded-full text-white'>
                    <MdOutlineFastfood size={30} />
                </Link>
            </div>
            <h1 className="text-2xl font-semibold text-center">{`Pedidos da Mesa ${id}`}</h1>
            <div className="flex flex-col items-center  gap-4 h-full mt-4">
                <div className={`${mesa >= 0 ? 'block' : 'hidden'}`}>
                    <MesaPlaceholder id={id} />
                </div>

                <div className={`flex flex-col`}>
                    <div className='max-h-[15rem] border-b-2 border-solid border-gray-300 overflow-y-auto'>
                        {mesa.map((mesaPedido) => {
                            const { idPedido, classe } = mesaPedido;
                            return (
                                <div className='relative' key={idPedido}>
                                    <Link aria-label='Ver detalhes do item' tabIndex={0} to={`/mesas/${id + '/' + classe + '/' + idPedido}`}>
                                        <div className="w-[16rem] flex justify-between items-center rounded-lg h-[3rem] shadow-md p-2 border-solid border-[1px] border-gray-200">
                                            <p>{mesaPedido.qnt + ' ' + mesaPedido.nome}</p>
                                            <p>R$ {(mesaPedido.valor).replace(".", ",")}</p>
                                        </div>
                                    </Link>
                                    <div className='flex justify-end'>
                                        <span tabIndex={0} aria-label='Remover item do carrinho' onClick={() => handleDeleteFromCart(mesaPedido)} className='underline text-red-400'>Remover</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${mesa >= 0 ? 'hidden' : 'flex'} justify-end w-full my-12`} >
                        <span className={`font-semibold `}>Total: R$ {(total).toFixed(2).replace(".", ",")}</span>
                    </div>
                </div>
                <div className={`${mesa >= 0 ? 'hidden' : 'flex'} w-full justify-evenly mb-4 `}>
                    <Link to={`/mesas/${id}/pedir`} tabIndex={0} className={`flex py-2 px-6 mr-6 font-semibold bg-orange-600 text-white rounded-lg drop-shadow-md hover:scale-105`}>
                        Pedir Mais
                    </Link>
                    {/* Adicionar o redux para enviar o pedido ao realtiem database */}
                    <button onClick={() => handleSetOrder()} aria-label='Avançar com o pedido' tabIndex={0} className={`flex py-2 px-6 font-semibold bg-[#292929] text-white rounded-lg drop-shadow-md hover:scale-105`}>
                        Enviar
                    </button>
                </div>
            </div>

        </div >
    )
}

export default MesaItems;