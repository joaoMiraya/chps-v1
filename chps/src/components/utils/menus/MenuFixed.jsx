import { Link, useLocation } from 'react-router-dom';
import { BsBookHalf, BsPersonCircle, BsCart2 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function MenuFixed() {

    const { cartItems } = useSelector(state => state.cart);

    const [activeButton, setActiveButton] = useState('');
    const location = useLocation();

    useEffect(() => {
        const { 0: lastParam } = location.pathname.split('/').filter(Boolean);
        setActiveButton(lastParam);
    }, [location.pathname]);


    return (
        <nav className={` fixed bottom-0 left-0 transition-all duration-700 z-40`}>
            <div className='bg-white py-2 w-screen text-gray-500  border-t-2 border-gray-300 shadow-inner border-solid md:hidden'>
                <div className='flex px-4 justify-around'>
                    <Link tabIndex={0} aria-label='Navegar para carrinho' to={"/carrinho"} className={`py-2 relative px-4 inset-shadow rounded-full ${activeButton === 'carrinho' ? 'active text-white' : ''}`}>
                        <span className={`${cartItems.length > 0 ? 'flex' : 'hidden'} w-[.8rem]  drop-shadow-lg h-[.8rem] rounded-full bg-gradient-to-tr from-red-800 to-red-300 absolute top-[-6px] right-0`}></span>
                        <BsCart2 size={25} />
                    </Link>
                    <Link tabIndex={0} aria-label='Navegar para menu' to={"/menu"} className={`py-2 px-4 inset-shadow rounded-full ${activeButton === 'menu' ? 'active text-white' : ''}`}><BsBookHalf size={25} /></Link>
                    <Link tabIndex={0} aria-label='Navegar para perfil' to={"/perfil"} className={`py-2 px-4 inset-shadow rounded-full ${activeButton === 'perfil' ? 'active text-white' : ''}`}><BsPersonCircle size={25} /></Link>
                </div>
            </div>
        </nav>
    )
}

export default MenuFixed;