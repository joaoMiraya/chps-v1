import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdMenuBook } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

function MenuFixed({ menuFixedRef, menuHide }) {
    MenuFixed.propTypes = {
        menuFixedRef: PropTypes.instanceOf(Object).isRequired,
        menuHide: PropTypes.bool.isRequired,
    };
    return (
        <nav className={`${menuHide ? 'hidden' : ' '} menuFixedPosition z-40`} ref={menuFixedRef}>
            <div className='bg-white py-2 w-screen text-gray-500  border-t-2 border-gray-300 shadow-inner border-solid md:hidden'>
                <div className='flex px-4 justify-around'>
                    <Link tabIndex={0} aria-label='Navegar para carrinho' to={"/carrinho"} className='py-2 px-4 inset-shadow rounded-full'><AiOutlineShoppingCart size={25} /></Link>
                    <Link tabIndex={0} aria-label='Navegar para menu' to={"/menu"} className='py-2 px-4 inset-shadow rounded-full'><MdMenuBook size={25} /></Link>
                    <Link tabIndex={0} aria-label='Navegar para perfil' to={"/perfil"} className='py-2 px-4 inset-shadow rounded-full'><CgProfile size={25} /></Link>
                </div>
            </div>
        </nav>
    )
}

export default MenuFixed;