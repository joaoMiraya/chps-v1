import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdMenuBook } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

function MenuFixed({ menuFixedRef }) {
    MenuFixed.propTypes = {
        menuFixedRef: PropTypes.instanceOf(Object).isRequired,
    };
    return (
        <nav ref={menuFixedRef}>
            <div className='bg-white w-screen text-[#6A6A6A] fixed bottom-0 border-t-2 border-gray-400 border-solid md:hidden z-30'>
                <div className='flex px-4 justify-around'>
                    <Link aria-label='Navegar para carrinho' to={"/carrinho"} className='p-2 inset-shadow rounded-full'><AiOutlineShoppingCart size={25} /></Link>
                    <Link aria-label='Navegar para menu' to={"/menu"} className='p-2 inset-shadow rounded-full'><MdMenuBook size={25} /></Link>
                    <Link aria-label='Navegar para perfil' to={"/perfil"} className='p-2 inset-shadow rounded-full'><CgProfile size={25} /></Link>
                </div>
            </div>
        </nav>
    )
}

export default MenuFixed;