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
                        <Link to={"/dashboard/entregas"}><li className='hover:underline cursor-pointer'>Entregas</li></Link>
                        <Link to={"/dashboard/usuarios"}><li className='hover:underline cursor-pointer'>Usuarios</li></Link>
                        <Link to={"/dashboard/lanches"}><li className='hover:underline cursor-pointer'>Lanches</li></Link>
                        <Link to={"/dashboard/pizzas"}><li className='hover:underline cursor-pointer'>Pizzas</li></Link>
                        <Link to={"/dashboard/porcoes"}><li className='hover:underline cursor-pointer'>Porções</li></Link>
                        <Link to={"/dashboard/pratos"}><li className='hover:underline cursor-pointer'>Pratos</li></Link>
                        <Link to={"/dashboard/bebidas"}><li className='hover:underline cursor-pointer'>Bebidas</li></Link>
                        <Link to={"/dashboard/acrescimos"}><li className='hover:underline cursor-pointer'>Acréscimos</li></Link>
                    </ul>
                </div>
            </nav>
        </header>


    )
}

export default DashHeader;