import { Link } from 'react-router-dom';


import { BsBookHalf, BsPersonCircle,BsCart2 } from 'react-icons/bs';

function MenuFixed() {

    return (
        <nav className={` fixed bottom-0 left-0 transition-all duration-700 z-40`}>
            <div className='bg-white py-2 w-screen text-gray-500  border-t-2 border-gray-300 shadow-inner border-solid md:hidden'>
                <div className='flex px-4 justify-around'>
                    <Link tabIndex={0} aria-label='Navegar para carrinho' to={"/carrinho"} className='py-2 px-4 inset-shadow rounded-full'><BsCart2 size={25} /></Link>
                    <Link tabIndex={0} aria-label='Navegar para menu' to={"/menu"} className='py-2 px-4 inset-shadow rounded-full'><BsBookHalf size={25} /></Link>
                    <Link tabIndex={0} aria-label='Navegar para perfil' to={"/perfil"} className='py-2 px-4 inset-shadow rounded-full'><BsPersonCircle size={25} /></Link>
                </div>
            </div>
        </nav>
    )
}

export default MenuFixed;