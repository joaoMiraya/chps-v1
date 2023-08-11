import { useDispatch, useSelector } from 'react-redux';
import CartPlaceholder from './utils/CartPlaceholder';
import { CiCircleRemove } from 'react-icons/ci';
import { removeFromCart } from '../../services/redux/cart/cartSlice';

function Cart() {

    const cart = useSelector((state) => state.cart);
    const cartItems = cart.cartItems
    console.log(cartItems);

    const dispatch = useDispatch();

    const handleDeleteFromCart = (cartItem) => {
        console.log(cartItem);
        dispatch(removeFromCart(cartItem))
    };
    return (


        <div className="flex items-center flex-col h-screen">
            <div className="mt-16 shadow-xl w-[20rem] min-h-[25rem] rounded-lg ">
                <h1 className="text-2xl font-semibold text-center">carrinho de compras</h1>
                <div className="flex flex-col items-center  gap-2 h-full mt-4">
                    <div className={`${cartItems >= 0 ? 'block' : 'hidden'}`}>
                        <CartPlaceholder />
                    </div>
                    {cartItems.map((cartItem, i) => {
                        return (
                            <div className='relative' key={i}>
                                <span aria-label='Remover do carrinho' onClick={() => handleDeleteFromCart(cartItem)} className='absolute top-[-8px] right-[-8px] text-red-400'><CiCircleRemove size={25} /></span>
                                <div className="w-[16rem] flex justify-between rounded-lg h-[3rem] shadow-md p-2 border-solid border-[1px] border-gray-200">
                                    <p>{cartItem.qnt + ' ' + cartItem.nome}</p>
                                    <p>R$ {(cartItem.valor).replace('.', ',')}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cart;