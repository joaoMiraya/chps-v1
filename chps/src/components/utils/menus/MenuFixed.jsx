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
                <ul className='flex px-4 justify-around'>
                    <Link to={"/carrinho"}><li className='p-2 inset-shadow rounded-full'><AiOutlineShoppingCart size={25} /></li></Link>
                    <Link to={"/menu"}><li className='p-2 inset-shadow rounded-full'><MdMenuBook size={25} /></li></Link>
                    <Link to={"/perfil"}><li className='p-2 inset-shadow rounded-full'><CgProfile size={25} /></li></Link>
                </ul>
            </div>
        </nav>
    )
}

export default MenuFixed;