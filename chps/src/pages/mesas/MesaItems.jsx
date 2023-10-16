
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { removeFromMesa, clearMesa, decreaseMesa } from '@services/redux/mesa/mesaSlice';
import CartPlaceholder from '../cart/utils/CartPlaceholder';
import MesaPlaceholder from '../../components/utils/cards/MesaPlaceholder';


function MesaItems() {

    const { id } = useParams();

    const [total, setTotal] = useState(0);

    const { mesaItems } = useSelector((state) => state.mesa);
    const mesa = mesaItems?.filter((mesa) => mesa.numero_mesa === id);


    useEffect(() => {
        // Calcula o total inicial
        const initialTotal = mesa.reduce((accumulator, cartItem) => {
            return accumulator + parseFloat(cartItem.valor.replace(',', '.'));
        }, 0);
        setTotal(initialTotal);
    }, [mesa]);

    const dispatch = useDispatch();

    const handleDeleteFromCart = (cartItem) => {
        dispatch(removeFromMesa(cartItem))
    };
    const handleclearCart = () => {
        dispatch(clearMesa())
        toast.error(`Seu carrinho está vazio`, {
            position: "top-left"
        });
    };

    return (


        <div className="flex items-center flex-col">
            <div className="mt-16 shadow-xl w-[20rem] rounded-lg ">
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
                                        <Link aria-label='Ver detalhes do item' tabIndex={0} to={`/carrinho/${classe + '/' + idPedido}`}>
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
                        <div className={`${mesa >= 0 ? 'hidden' : 'flex'} justify-between w-full my-12`} >
                            <span onClick={handleclearCart} aria-label='Limpar o carrinho' tabIndex={0} className='underline cursor-pointer text-gray-400'>Limpar Carrinho</span>
                            <span className={`font-semibold `}>Total: R$ {(total).toFixed(2).replace(".", ",")}</span>
                        </div>
                    </div>
                    <div className={`${mesa >= 0 ? 'hidden' : 'flex'} w-full justify-end mb-4 `}>
                        <button aria-label='Avançar com o pedido' tabIndex={0} className={`flex py-2 px-6 mr-6 font-semibold bg-[#292929] text-white rounded-lg drop-shadow-md hover:scale-105`}>
                            Avançar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MesaItems;