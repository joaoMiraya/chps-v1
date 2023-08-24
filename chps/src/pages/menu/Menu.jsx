import { Link } from "react-router-dom";
import { CiBeerMugFull } from 'react-icons/ci';
import { lazy } from "react";

const Carousel = lazy(() => import("./utils/Carousel"));
const MainComp = lazy(() => import("./utils/MainComp"));

function Menu() {

    return (
        <div className=" flex flex-col ">
            <Carousel />
            <h1 className="text-3xl font-semibold text-center my-6">Está com fome do que hoje?!</h1>
            <main>
                <MainComp />
                <h2 className="text-2xl font-semibold text-start ml-6 mt-6">E para beber?</h2>
                <div className='flex justify-center px-4 my-6'>
                    <Link to={"/menu/bebidas"} tabIndex={0} aria-label='Ir para bebidas' className='hover:bg-[#eeeeee60] cursor-pointer flex items-center w-full border-[1px] border-solid py-2 px-6 border-gray-300 rounded-lg'>
                        <CiBeerMugFull size={50} />
                        <h2 className='text-xl font-bold text-center w-full'>Bebidas</h2>
                    </Link>
                </div>
            </main>
            <section className="bg-[#FFFFE0] py-16">
                <p className="text-center text-lg px-4">
                    Bem-vindo ao Chapas! Experimente nossos lanches, lanches artesanais,
                    pizzas e porções deliciosas. Cada prato é preparado com carinho para tornar sua refeição única.
                    Peça agora mesmo direto do seu celular e aproveite! Bom apetite!
                </p>
            </section>
        </div>
    )
}

export default Menu;