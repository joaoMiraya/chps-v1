import PropTypes from 'prop-types';
import { GiHamburger, GiKnifeFork } from 'react-icons/gi';
import { FaPizzaSlice } from 'react-icons/fa';
import { CiBeerMugFull, CiFries } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function MainCompMesa({ id }) {
    MainCompMesa.propTypes = {
        id: PropTypes.string.isRequired
    };

    return (

        <div className='flex justify-center md:justify-around flex-wrap pt-16 gap-2 '>

            <Link tabIndex={0} to={`/mesas/${id}/pedido/lanches`}>
                <div aria-label='Ir para os lanches' className='hover:bg-[#eeeeee90] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <GiHamburger size={50} />
                        <h2 className='text-xl font-bold'>Lanches</h2>
                    </div>
                </div>
            </Link>

            <Link tabIndex={0} to={`/mesas/${id}/pedido/pizzas`}>
                <div aria-label='Ir para as pizzas' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <FaPizzaSlice size={50} />
                        <h2 className='text-xl font-bold'>Pizzas</h2>
                    </div>
                </div>
            </Link>

            <Link tabIndex={0} to={`/mesas/${id}/pedido/porcoes`}>
                <div aria-label='Ir para as porções' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <CiFries size={50} />
                        <h2 className='text-xl font-bold'>Porções</h2>
                    </div>
                </div>
            </Link>
            <Link tabIndex={0} to={`/mesas/${id}/pedido/pratos`}>
                <div aria-label='Ir para os pratos' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <GiKnifeFork size={50} />
                        <h2 className='text-xl font-bold'>Pratos</h2>
                    </div>
                </div>
            </Link>
            <div className='flex w-full px-8'>
                <Link to={`/mesas/${id}/pedido/bebidas`} tabIndex={0} aria-label='Ir para bebidas' className='hover:bg-[#eeeeee60] cursor-pointer flex items-center w-full border-[1px] border-solid py-2 px-6 border-gray-300 rounded-lg'>
                    <CiBeerMugFull size={50} />
                    <h2 className='text-xl font-bold text-center w-full'>Bebidas</h2>
                </Link>
            </div>
        </div>
    )
}


export default MainCompMesa;