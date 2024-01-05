import { useDispatch, useSelector } from 'react-redux';
import CartPlaceholder from './utils/CartPlaceholder';
import { removeFromCart, clearCart } from '../../services/redux/cart/cartSlice';
import { lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NextStepForm = lazy(() => import("./utils/NextStepForm"));

function Cart() {

    const { cartItems } = useSelector((state) => state.cart);

    const [total, setTotal] = useState(0);
    const [nextStep, setNextStep] = useState(false);

    const handleNextStep = () => {
        setNextStep(true)
    };
    const handleBackStep = () => {
        setNextStep(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Calcula o total inicial
        const initialTotal = cartItems.reduce((accumulator, cartItem) => {
            return accumulator + cartItem.valor;
        }, 0);
        setTotal(initialTotal);
    }, [cartItems]);

    const dispatch = useDispatch();

    const handleDeleteFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    };
    const handleclearCart = () => {
        dispatch(clearCart())
        toast.error(`Seu carrinho está vazio`, {
            position: "top-left"
        });
    };

    return (


        <div className="flex items-center flex-col">
            <div className="mt-16 shadow-xl w-[20rem] rounded-lg ">
                <h1 className="text-2xl font-semibold text-center">{nextStep ? 'Finalize seu pedido' : 'Carrinho de compras'}</h1>
                <div className="flex flex-col items-center  gap-4 h-full mt-4">
                    <div className={`${cartItems >= 0 ? 'block' : 'hidden'}`}>
                        <CartPlaceholder />
                    </div>
                    <div className={`${nextStep ? 'flex' : 'hidden'}`}>
                        <NextStepForm
                            total={total}
                            cartItems={cartItems}
                            handleBackStep={handleBackStep}
                        />
                    </div>
                    <div className={`${nextStep ? 'hidden' : 'flex'} flex-col`}>
                        <div className='max-h-[15rem] min-h-[6rem] pt-6 border-b-2 border-solid border-gray-300 overflow-y-auto'>
                            {cartItems.map((cartItem) => {
                                const { idPedido } = cartItem;
                                return (
                                    <div className='relative' key={idPedido}>

                                        <div className=' rounded-full w-6 h-6 flex justify-center items-center bg-red-400 absolute top-[-10px] right-0'>
                                            <span className='text-white font-semibold' tabIndex={0} aria-label='Remover item do carrinho' onClick={() => handleDeleteFromCart(cartItem)}>X</span>
                                        </div>

                                        <div className="w-[16rem] h-[4rem] flex justify-between items-center rounded-lg shadow-md p-2 border-solid border-[1px] border-gray-200">
                                            <p>{cartItem.qnt + ' ' + cartItem.nome}</p>
                                            <p>R$ {Number(cartItem.valor).toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`${cartItems >= 0 ? 'hidden' : 'flex'} justify-between w-full my-12`} >
                            <span onClick={handleclearCart} aria-label='Limpar o carrinho' tabIndex={0} className='underline cursor-pointer text-gray-400'>Limpar Carrinho</span>
                            <span className={`font-semibold `}>Total: R$ {Number(total).toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <div className={`${cartItems >= 0 ? 'hidden' : 'flex'} w-full justify-end mb-4 `}>
                        <button onClick={handleNextStep}
                            aria-label='Avançar com o pedido'
                            tabIndex={0}
                            className={`${nextStep ? 'hidden' : 'flex'} py-2 px-6 mr-6 font-semibold bg-[#292929] text-white rounded-lg drop-shadow-md hover:scale-105`}>
                            Avançar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart;