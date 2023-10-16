import PropTypes from 'prop-types';
import { GiHamburger, GiKnifeFork } from 'react-icons/gi';
import { FaPizzaSlice } from 'react-icons/fa';
import { CiFries } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function MainCompMesa({id}) {
    MainCompMesa.propTypes = {
        id: PropTypes.string.isRequired
    };
    
    return (

        <div className='flex justify-center md:justify-around flex-wrap pt-16 gap-4 px-2'>

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
        </div>
    )
}


export default MainCompMesa;