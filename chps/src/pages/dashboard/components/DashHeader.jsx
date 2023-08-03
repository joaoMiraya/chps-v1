import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function DashHeader() {

    return (

        <header className="bg-white border-b-2 border-solid border-gray-300">
            <nav className="flex justify-between items-center px-6">
                <Link to={"/dashboard"}>
                    <div className="flex h-16 items-center">
                        <h1 className="text-xl font-semibold">Chapas Dashboard</h1>
                    </div>
                </Link>
                <div className='flex gap-6'>
                    <ul className="flex gap-4 ">
                        <Link to={"/dashboard/lanches"}><li className='hover:underline cursor-pointer'>Lanches</li></Link>
                        <Link><li className='hover:underline cursor-pointer'>Pizzas</li></Link>
                        <Link><li className='hover:underline cursor-pointer'>Porções</li></Link>
                        <Link><li className='hover:underline cursor-pointer'>Artesanais</li></Link>
                        <Link><li className='hover:underline cursor-pointer'>Bebidas</li></Link>
                        <Link><li className='hover:underline cursor-pointer'>Acréscimos</li></Link>
                    </ul>
                    <div>
                        <BsFillGearFill size={30} />
                    </div>
                </div>
            </nav>
        </header>


    )
}

export default DashHeader;