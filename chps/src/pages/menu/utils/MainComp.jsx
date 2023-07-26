import { GiHamburger, GiKnifeFork } from 'react-icons/gi';
import { FaPizzaSlice } from 'react-icons/fa';
import { CiFries } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function MainComp() {

    return (

        <div className='flex justify-center md:justify-around flex-wrap gap-4 px-2'>

            <Link to={"/menu/lanches"}>
                <div aria-label='Botão para ir ao cardápio de Lanches' className='hover:bg-[#eeeeee90] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <GiHamburger size={50} />
                        <h2 className='text-xl font-bold'>Lanches</h2>
                    </div>
                </div>
            </Link>

            <Link to={"/menu/pizzas"}>
                <div aria-label='Botão para ir ao cardápio de Pizzas' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <FaPizzaSlice size={50} />
                        <h2 className='text-xl font-bold'>Pizzas</h2>
                    </div>
                </div>
            </Link>

            <Link to={"/menu/porcoes"}>
                <div aria-label='Botão para ir ao cardápio de Porções' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <CiFries size={50} />
                        <h2 className='text-xl font-bold'>Porções</h2>
                    </div>
                </div>
            </Link>
            <Link to={"/menu/pratos"}>
                <div aria-label='Botão para ir ao cardápio de Porções' className='hover:bg-[#eeeeee60] w-[10rem] py-8 cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg shadow-inner'>
                    <div className='flex flex-col justify-center items-center'>
                        <GiKnifeFork size={50} />
                        <h2 className='text-xl font-bold'>Pratos</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default MainComp;